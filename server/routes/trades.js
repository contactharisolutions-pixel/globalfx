/**
 * trades.js — Package Investment & Capital Withdrawal Routes
 *
 * Rules (Incomeengine.md):
 * - Fixed package amounts: $150, $300, $500, $1000, $2000, $5000
 * - 2% daily compounding ROI — unlimited days
 * - Income withdrawal locked 60 days from activation
 * - Capital withdrawal: 30% penalty if withdrawn before 30 days
 */

const router       = require('express').Router()
const bcrypt       = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const { triggerSponsorIncome } = require('../services/sponsorEngine')
const { processBusinessMatch } = require('../services/rewardEngine')
const { processMonsoonBonanza } = require('../services/monsoonEngine')
const { PACKAGE_AMOUNTS } = require('../lib/ranks')
const prisma = require('../lib/prisma')

router.use(authenticate)

/** Verify the user's transaction PIN */
async function verifyPin(userId, pin) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user.transaction_pin_hash) throw new Error('Transaction PIN not set. Please set your PIN first.')
  const valid = await bcrypt.compare(pin, user.transaction_pin_hash)
  if (!valid) throw new Error('Invalid transaction PIN')
}

// ── POST /api/trades/invest ────────────────────────────────────
router.post('/invest', async (req, res, next) => {
  const { amount, source, pin } = req.body
  if (!amount || !source || !pin) return res.status(400).json({ error: 'amount, source and pin required' })

  const amt = parseFloat(amount)

  // Validate fixed package amount
  if (!PACKAGE_AMOUNTS.includes(amt)) {
    return res.status(400).json({
      error: `Invalid package amount. Choose from: $${PACKAGE_AMOUNTS.join(', $')}`,
    })
  }

  try {
    await verifyPin(req.user.id, pin)

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    const balanceField = source === 'fund' ? 'fund_wallet_balance' : 'income_wallet_balance'
    if (parseFloat(user[balanceField]) < amt) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    // Income lock: 60 days | Capital lock: 30 days (penalty threshold)
    const now = new Date()
    const incomeLock   = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
    const capitalLock  = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const pkg = await prisma.$transaction(async (tx) => {
      const p = await tx.tradePackage.create({
        data: {
          user_id:              req.user.id,
          amount:               amt,
          daily_roi_percent:    2.0,
          max_return:           null, // unlimited compounding
          status:               'active',
          income_locked_until:  incomeLock,
          capital_locked_until: capitalLock,
        },
      })

      await tx.user.update({
        where: { id: req.user.id },
        data:  { [balanceField]: { decrement: amt } },
      })

      if (user.status === 'inactive') {
        await tx.user.update({
          where: { id: req.user.id },
          data:  { status: 'active' },
        })
      }

      // Fund wallet ledger entry
      if (source === 'fund') {
        const updated = await tx.user.findUnique({ where: { id: req.user.id } })
        await tx.fundLedger.create({
          data: {
            user_id:        req.user.id,
            type:           'debit',
            amount:         amt,
            balance_after:  updated.fund_wallet_balance,
            remarks:        `Package Activated — $${amt}`,
            reference_type: 'investment',
            reference_id:   p.id,
          },
        })
      }

      return p
    })

    // Fire-and-forget: sponsor income + business match + monsoon
    if (user.sponsor_id) {
      triggerSponsorIncome(req.user.id, amt).catch(console.error)
    }
    processBusinessMatch().catch(console.error)
    processMonsoonBonanza().catch(console.error)

    res.status(201).json({
      message:    `Package $${amt} activated successfully`,
      package_id: pkg.id,
      income_locked_until:  incomeLock.toISOString(),
      capital_locked_until: capitalLock.toISOString(),
    })
  } catch (err) {
    if (err.message.includes('PIN') || err.message.includes('balance') || err.message.includes('package')) {
      return res.status(400).json({ error: err.message })
    }
    next(err)
  }
})

// ── POST /api/trades/activate-for-other ───────────────────────
router.post('/activate-for-other', async (req, res, next) => {
  const { targetUserId, amount, pin } = req.body
  const amt = parseFloat(amount)

  if (!targetUserId || !amt || !pin) {
    return res.status(400).json({ error: 'Target Member ID, amount and pin required' })
  }
  if (!PACKAGE_AMOUNTS.includes(amt)) {
    return res.status(400).json({ error: `Invalid package amount. Choose: $${PACKAGE_AMOUNTS.join(', $')}` })
  }

  try {
    await verifyPin(req.user.id, pin)

    const sender = await prisma.user.findUnique({ where: { id: req.user.id } })
    const target = await prisma.user.findUnique({ where: { user_id: targetUserId } })

    if (!target) return res.status(404).json({ error: 'Target member not found' })
    if (parseFloat(sender.fund_wallet_balance) < amt) {
      return res.status(400).json({ error: 'Insufficient fund wallet balance' })
    }

    const now = new Date()
    const incomeLock  = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
    const capitalLock = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.$transaction(async (tx) => {
      const updatedSender = await tx.user.update({
        where: { id: sender.id },
        data:  { fund_wallet_balance: { decrement: amt } },
      })

      await tx.tradePackage.create({
        data: {
          user_id:              target.id,
          amount:               amt,
          daily_roi_percent:    2.0,
          max_return:           null,
          status:               'active',
          income_locked_until:  incomeLock,
          capital_locked_until: capitalLock,
        },
      })

      if (target.status === 'inactive') {
        await tx.user.update({ where: { id: target.id }, data: { status: 'active' } })
      }

      await tx.fundLedger.create({
        data: {
          user_id:        sender.id,
          type:           'debit',
          amount:         amt,
          balance_after:  updatedSender.fund_wallet_balance,
          remarks:        `External Activation for ${targetUserId}`,
          reference_type: 'external_activation',
        },
      })
    })

    if (target.sponsor_id) {
      triggerSponsorIncome(target.id, amt).catch(console.error)
    }
    processBusinessMatch().catch(console.error)
    processMonsoonBonanza().catch(console.error)

    res.status(201).json({ message: `Successfully activated ${targetUserId} with $${amt}` })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ── POST /api/trades/withdraw-capital ─────────────────────────
// Withdraw capital from an active package (30% penalty if < 30 days)
router.post('/withdraw-capital', async (req, res, next) => {
  const { package_id, pin } = req.body
  if (!package_id || !pin) return res.status(400).json({ error: 'package_id and pin required' })

  try {
    await verifyPin(req.user.id, pin)

    const pkg = await prisma.tradePackage.findFirst({
      where: { id: parseInt(package_id), user_id: req.user.id, status: 'active' },
    })
    if (!pkg) return res.status(404).json({ error: 'Active package not found' })

    const principal = parseFloat(pkg.amount)
    const now       = new Date()
    const isPenalty = pkg.capital_locked_until && now < new Date(pkg.capital_locked_until)
    const penalty   = isPenalty ? parseFloat((principal * 0.30).toFixed(2)) : 0
    const refund    = parseFloat((principal - penalty).toFixed(2))

    await prisma.$transaction(async (tx) => {
      // Mark package as completed
      await tx.tradePackage.update({
        where: { id: pkg.id },
        data:  { status: 'completed', completed_at: now },
      })

      // Refund to fund wallet
      const updated = await tx.user.update({
        where: { id: req.user.id },
        data:  { fund_wallet_balance: { increment: refund } },
      })

      await tx.fundLedger.create({
        data: {
          user_id:        req.user.id,
          type:           'credit',
          amount:         refund,
          balance_after:  updated.fund_wallet_balance,
          remarks:        isPenalty
            ? `Capital withdrawal (30% penalty applied — $${penalty} deducted)`
            : 'Capital withdrawal (no penalty)',
          reference_type: 'capital_refund',
          reference_id:   pkg.id,
        },
      })
    })

    res.json({
      message:   `Capital refunded: $${refund}`,
      principal,
      penalty,
      refund,
      penalty_applied: isPenalty,
    })
  } catch (err) { next(err) }
})

// ── GET /api/trades/active ─────────────────────────────────────
router.get('/active', async (req, res, next) => {
  try {
    const packages = await prisma.tradePackage.findMany({
      where:   { user_id: req.user.id, status: 'active' },
      orderBy: { started_at: 'desc' },
    })
    res.json({ packages })
  } catch (err) { next(err) }
})

// ── GET /api/trades/history ────────────────────────────────────
router.get('/history', async (req, res, next) => {
  try {
    const packages = await prisma.tradePackage.findMany({
      where:   { user_id: req.user.id },
      orderBy: { started_at: 'desc' },
    })
    res.json({ packages })
  } catch (err) { next(err) }
})

// ── GET /api/trades/packages ───────────────────────────────────
// Return available fixed package options
router.get('/packages', (_req, res) => {
  const { SPONSOR_INCOME_TABLE } = require('../lib/ranks')
  const options = PACKAGE_AMOUNTS.map(amt => ({
    amount:        amt,
    daily_roi:     '2.0%',
    roi_type:      'Daily Compounding',
    duration:      'Unlimited Days',
    l1_sponsor:    `$${SPONSOR_INCOME_TABLE[amt][0]}`,
    l2_sponsor:    `$${SPONSOR_INCOME_TABLE[amt][1]}`,
    l3_sponsor:    `$${SPONSOR_INCOME_TABLE[amt][2]}`,
    income_lock:   '60 days',
    capital_lock:  '30 days (30% penalty if early)',
  }))
  res.json({ packages: options })
})

module.exports = router
