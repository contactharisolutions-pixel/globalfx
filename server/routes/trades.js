const router       = require('express').Router()
const bcrypt       = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const { triggerDirectAndLevelBonus } = require('../services/bonusEngine')
const { processRewards }              = require('../services/rewardEngine')
const { updateRoyaltyRanks }          = require('../services/royaltyEngine')

const prisma = require('../lib/prisma')
router.use(authenticate)

/** Verify the user's transaction PIN */
async function verifyPin(userId, pin) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user.transaction_pin_hash) throw new Error('Transaction PIN not set. Please set your PIN first.')
  const valid = await bcrypt.compare(pin, user.transaction_pin_hash)
  if (!valid) throw new Error('Invalid transaction PIN')
}

/** Credit income wallet + write ledger entry */
async function creditIncome(tx, userId, amount, remarks, refType = null, refId = null) {
  const user = await tx.user.update({
    where: { id: userId },
    data:  { income_wallet_balance: { increment: amount } },
  })
  await tx.incomeLedger.create({
    data: {
      user_id:        userId,
      type:           'credit',
      amount,
      balance_after:  user.income_wallet_balance,
      remarks,
      reference_type: refType,
      reference_id:   refId,
    },
  })
}

// ─── Shared investment constants ──────────────────────────────
const MIN_AMOUNT = 25
const MAX_AMOUNT = 5000

router.post('/activate-for-other', async (req, res, next) => {
  const { targetUserId, amount, pin } = req.body
  const amt = parseFloat(amount)

  if (!targetUserId || !amt || !pin) return res.status(400).json({ error: 'Target Member ID, amount and pin required' })

  try {
    await verifyPin(req.user.id, pin)

    const sender = await prisma.user.findUnique({ where: { id: req.user.id } })
    const target = await prisma.user.findUnique({ where: { user_id: targetUserId } })

    if (!target) return res.status(404).json({ error: 'Target member not found' })
    if (parseFloat(sender.fund_wallet_balance) < amt) return res.status(400).json({ error: 'Insufficient fund wallet balance' })

    if (amt < MIN_AMOUNT) return res.status(400).json({ error: `Minimum investment is $${MIN_AMOUNT}` })
    if (amt > MAX_AMOUNT) return res.status(400).json({ error: `Maximum investment is $${MAX_AMOUNT.toLocaleString()}` })

    // Flat 2× max return — no early adopter cap
    const maxReturn = amt * 2

    await prisma.$transaction(async (tx) => {
      // 1. Deduct from sender fund wallet
      const updatedSender = await tx.user.update({
        where: { id: sender.id },
        data: { fund_wallet_balance: { decrement: amt } }
      })

      // 2. Create package for target (daily_roi set to 2% — cron will keep in sync)
      await tx.tradePackage.create({
        data: {
          user_id:           target.id,
          amount:            amt,
          daily_roi_percent: 2.0,
          max_return:        maxReturn,
          status:            'active',
        }
      })

      // 3. Activate target if inactive
      if (target.status === 'inactive') {
        await tx.user.update({
          where: { id: target.id },
          data: { status: 'active' }
        })
      }

      // 4. Record ledger for sender
      await tx.fundLedger.create({
        data: {
          user_id:        sender.id,
          type:           'debit',
          amount:         amt,
          balance_after:  updatedSender.fund_wallet_balance,
          remarks:        `External Activation for ${targetUserId} (${target.name})`,
          reference_type: 'external_activation'
        }
      })
    })

    // Trigger bonuses + instant rank/royalty checks for target's sponsor chain
    if (target.sponsor_id) {
      triggerDirectAndLevelBonus(target.id, amt).catch(console.error)
    }
    // Performance rank and royalty rank re-evaluated immediately after activation
    processRewards().catch(console.error)
    updateRoyaltyRanks().catch(console.error)

    res.status(201).json({ message: `Successfully activated ID ${targetUserId} for $${amt}` })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ─── POST /api/trades/invest ──────────────────────────────────
router.post('/invest', async (req, res, next) => {
  const { amount, source, pin } = req.body
  if (!amount || !source || !pin) return res.status(400).json({ error: 'amount, source and pin required' })

  try {
    await verifyPin(req.user.id, pin)

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    if (parseFloat(amount) < MIN_AMOUNT) return res.status(400).json({ error: `Minimum investment is $${MIN_AMOUNT}` })
    if (parseFloat(amount) > MAX_AMOUNT) return res.status(400).json({ error: `Maximum investment is $${MAX_AMOUNT.toLocaleString()}` })

    const balanceField = source === 'fund' ? 'fund_wallet_balance' : 'income_wallet_balance'
    if (parseFloat(user[balanceField]) < parseFloat(amount)) return res.status(400).json({ error: 'Insufficient balance' })

    // Flat 2× max return — no early adopter cap
    const maxReturn = parseFloat(amount) * 2

    // Atomic: deduct balance, create package, activate user if needed
    const pkg = await prisma.$transaction(async (tx) => {
      const p = await tx.tradePackage.create({
        data: {
          user_id:           req.user.id,
          amount:            parseFloat(amount),
          daily_roi_percent: 2.0,  // flat 2% daily
          max_return:        maxReturn,
          status:            'active',
        },
      })
      await tx.user.update({
        where: { id: req.user.id },
        data:  { [balanceField]: { decrement: parseFloat(amount) } },
      })
      
      if (user.status === 'inactive') {
        await tx.user.update({
          where: { id: req.user.id },
          data:  { status: 'active' },
        })
      }
      return p
    })

    // Trigger direct + level bonuses for sponsor chain
    if (user.sponsor_id) {
      triggerDirectAndLevelBonus(req.user.id, parseFloat(amount)).catch(console.error)
    }
    // Performance rank and royalty rank re-evaluated immediately after activation
    processRewards().catch(console.error)
    updateRoyaltyRanks().catch(console.error)

    res.status(201).json({ message: 'Trade package activated', package_id: pkg.id })
  } catch (err) {
    if (err.message.includes('PIN') || err.message.includes('balance')) {
      return res.status(400).json({ error: err.message })
    }
    next(err)
  }
})

// ─── GET /api/trades/active ───────────────────────────────────
router.get('/active', async (req, res, next) => {
  try {
    const packages = await prisma.tradePackage.findMany({
      where:   { user_id: req.user.id, status: 'active' },
      orderBy: { started_at: 'desc' },
    })
    res.json({ packages })
  } catch (err) { next(err) }
})

// ─── GET /api/trades/history ──────────────────────────────────
router.get('/history', async (req, res, next) => {
  try {
    const packages = await prisma.tradePackage.findMany({
      where:   { user_id: req.user.id },
      orderBy: { started_at: 'desc' },
    })
    res.json({ packages })
  } catch (err) { next(err) }
})

module.exports = router
