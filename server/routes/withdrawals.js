/**
 * withdrawals.js — Income Withdrawal Route
 *
 * Rules (Incomeengine.md):
 * - Minimum: $20 in multiples of $20
 * - Fee: 20% admin charge on withdrawal amount
 * - Income wallet locked for 60 days from latest active package
 */

const router       = require('express').Router()
const bcrypt       = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const prisma = require('../lib/prisma')

const FEE_PERCENT = 20  // 20% admin charge

router.use(authenticate)

// ── POST /api/withdrawals/request ─────────────────────────────
router.post('/request', async (req, res, next) => {
  const { amount, pin } = req.body

  // 1. Amount Validation
  const amt = parseFloat(amount)
  if (!amt || amt < 20) {
    return res.status(400).json({ error: 'Minimum withdrawal amount is $20.' })
  }
  if (amt % 20 !== 0) {
    return res.status(400).json({ error: 'Withdrawal amount must be in multiples of $20 (e.g., $20, $40, $60).' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })

    if (!user.bep20_wallet) {
      return res.status(400).json({ error: 'No withdrawal wallet address set. Please add your wallet in Wallet Setup.' })
    }
    if (!user.transaction_pin_hash) {
      return res.status(400).json({ error: 'Transaction PIN not set.' })
    }

    const valid = await bcrypt.compare(pin, user.transaction_pin_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid transaction PIN.' })

    if (parseFloat(user.income_wallet_balance) < amt) {
      return res.status(400).json({ error: 'Insufficient income wallet balance.' })
    }

    // 2. Check 60-day income lock from any active package
    const activePackage = await prisma.tradePackage.findFirst({
      where: {
        user_id: req.user.id,
        status:  'active',
        income_locked_until: { gt: new Date() },
      },
      orderBy: { income_locked_until: 'desc' },
    })
    if (activePackage) {
      const lockDate = new Date(activePackage.income_locked_until)
      return res.status(400).json({
        error: `Income withdrawal is locked until ${lockDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} (60-day lock on your active package).`,
      })
    }

    // 3. Calculate fee
    const fee        = parseFloat((amt * FEE_PERCENT / 100).toFixed(2))
    const net_amount = parseFloat((amt - fee).toFixed(2))

    await prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id: req.user.id },
        data:  { income_wallet_balance: { decrement: amt } },
      })
      await tx.withdrawal.create({
        data: {
          user_id:        req.user.id,
          amount:         amt,
          fee,
          net_amount,
          wallet_address: user.bep20_wallet,
          status:         'pending',
        },
      })
      await tx.incomeLedger.create({
        data: {
          user_id:        req.user.id,
          type:           'debit',
          amount:         amt,
          balance_after:  updated.income_wallet_balance,
          remarks:        `Withdrawal request — $${amt} gross, $${fee} fee (20%), $${net_amount} net`,
          reference_type: 'withdrawal',
        },
      })
    })

    res.status(201).json({
      message:    'Withdrawal request submitted. Processing within 24 hours.',
      gross:      amt,
      fee,
      net_amount,
      fee_note:   '20% admin charge deducted',
    })
  } catch (err) { next(err) }
})

// ── GET /api/withdrawals/history ──────────────────────────────
router.get('/history', async (req, res, next) => {
  try {
    const withdrawals = await prisma.withdrawal.findMany({
      where:   { user_id: req.user.id },
      orderBy: { created_at: 'desc' },
    })
    res.json({ withdrawals })
  } catch (err) { next(err) }
})

module.exports = router
