const router            = require('express').Router()
const jwt               = require('jsonwebtoken')
const authenticateAdmin = require('../../middleware/authenticateAdmin')
const prisma = require('../../lib/prisma')
const { triggerSponsorIncome }  = require('../../services/sponsorEngine')
const { processBusinessMatch }   = require('../../services/rewardEngine')
const { processMonsoonBonanza }  = require('../../services/monsoonEngine')
const { PACKAGE_AMOUNTS }        = require('../../lib/ranks')

router.use(authenticateAdmin)

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

const signRefresh = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

// ─── GET /api/admin/members ──────────────────────────────────
// Query: ?page, ?status, ?search (user_id or name or email), ?from, ?to
router.get('/', async (req, res, next) => {
  const page     = parseInt(req.query.page   || '1')
  const pageSize = parseInt(req.query.limit  || '20')
  const status   = req.query.status  || undefined
  const search   = req.query.search  || ''
  const from     = req.query.from ? new Date(req.query.from) : undefined
  const to       = req.query.to   ? new Date(req.query.to)   : undefined

  try {
    const where = {
      ...(status && { status }),
      ...( (from || to) && { created_at: { ...(from && { gte: from }), ...(to && { lte: to }) } } ),
      ...(search && {
        OR: [
          { user_id: { contains: search, mode: 'insensitive' } },
          { name:    { contains: search, mode: 'insensitive' } },
          { email:   { contains: search, mode: 'insensitive' } },
        ],
      }),
    }
    const [members, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip:    (page - 1) * pageSize,
        take:    pageSize,
        orderBy: { created_at: 'desc' },
        select: {
          id: true, user_id: true, name: true, email: true, phone: true,
          status: true, fund_wallet_balance: true, income_wallet_balance: true,
          referral_code: true, created_at: true,
          sponsor: { select: { user_id: true, name: true } },
          _count:  { select: { referrals: true, packages: true } },
          packages: {
            where: { status: 'active' },
            select: { amount: true }
          }
        },
      }),
      prisma.user.count({ where }),
    ])

    const membersWithTotal = members.map(m => {
      const total_fund = m.packages.reduce((acc, p) => acc + parseFloat(p.amount || 0), 0)
      const { packages, ...rest } = m
      return { ...rest, total_fund }
    })

    res.json({ members: membersWithTotal, total, page, pages: Math.ceil(total / pageSize) })
  } catch (err) { next(err) }
})

// ─── GET /api/admin/members/:id/impersonate ──────────────────
router.get('/:id/impersonate', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const token   = signToken({ id: user.id, user_id: user.user_id })
    const refresh = signRefresh({ id: user.id })

    res.json({
      message: 'Impersonation successful',
      token,
      refresh,
      user: {
        id:      user.id,
        user_id: user.user_id,
        name:    user.name,
        email:   user.email,
        status:  user.status,
      },
    })
  } catch (err) { next(err) }
})

// ─── GET /api/admin/members/:id ──────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const member = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        packages:   { orderBy: { started_at: 'desc' }, take: 20 },
        deposits:   { orderBy: { created_at: 'desc' }, take: 10 },
        withdrawals:{ orderBy: { created_at: 'desc' }, take: 10 },
        bonuses:    { orderBy: { created_at: 'desc' }, take: 20 },
        kyc_document: true,
        sponsor: { select: { user_id: true, name: true } },
      },
    })
    if (!member) return res.status(404).json({ error: 'Member not found' })
    res.json({ member })
  } catch (err) { next(err) }
})

// ─── PUT /api/admin/members/:id/status ───────────────────────
router.put('/:id/status', async (req, res, next) => {
  const { status } = req.body
  const VALID = ['active', 'inactive', 'blocked']
  if (!VALID.includes(status)) return res.status(400).json({ error: 'Invalid status' })
  try {
    await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: { status } })
    res.json({ message: `Member ${status}` })
  } catch (err) { next(err) }
})

// ─── POST /api/admin/members/:id/add-balance ─────────────────
router.post('/:id/add-balance', async (req, res, next) => {
  const { wallet, amount, remarks } = req.body
  const amt = parseFloat(amount)
  if (!['fund', 'income'].includes(wallet)) return res.status(400).json({ error: 'wallet must be fund or income' })
  if (!amt || amt <= 0)                    return res.status(400).json({ error: 'Amount must be positive' })

  try {
    const field = wallet === 'fund' ? 'fund_wallet_balance' : 'income_wallet_balance'
    await prisma.$transaction(async (tx) => {
      const target = await tx.user.findUnique({ where: { id: parseInt(req.params.id) } })
      if (!target) throw new Error('Member not found')

      const wasInactive    = target.status === 'inactive'
      const shouldActivate = wasInactive || target.status === 'blocked'
      const finalRemarks   = shouldActivate ? `${remarks} (Account Activated)` : remarks

      const updated = await tx.user.update({
        where: { id: parseInt(req.params.id) },
        data:  { 
          [field]: { increment: amt },
          ...(shouldActivate && { status: 'active' })
        },
      })

      if (wallet === 'income') {
        await tx.incomeLedger.create({
          data: {
            user_id:       parseInt(req.params.id),
            type:          'credit',
            amount:        amt,
            balance_after: updated.income_wallet_balance,
            remarks:       finalRemarks || `Manual allocation by ${req.admin.email}`,
            reference_type: 'admin_credit',
          },
        })
      } else {
        await tx.fundLedger.create({
          data: {
            user_id:       parseInt(req.params.id),
            type:          'credit',
            amount:        amt,
            balance_after: updated.fund_wallet_balance,
            remarks:       finalRemarks || `Manual allocation by ${req.admin.email}`,
            reference_type: 'admin_credit',
          },
        })
      }
    })
    res.json({ message: `$${amount} successfully allocated to ${wallet} wallet. Entity state synchronized.` })
  } catch (err) { next(err) }
})

// ─── POST /api/admin/members/:id/activate-package ────────────
router.post('/:id/activate-package', async (req, res, next) => {
  const { amount } = req.body
  const amt = parseFloat(amount)

  if (!PACKAGE_AMOUNTS.includes(amt)) {
    return res.status(400).json({ error: `Invalid package amount. Valid options: $${PACKAGE_AMOUNTS.join(', $')}` })
  }

  try {
    const target = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!target) return res.status(404).json({ error: 'Target member not found' })

    const now = new Date()
    const incomeLock  = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
    const capitalLock = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.$transaction(async (tx) => {
      await tx.tradePackage.create({
        data: {
          user_id:              target.id,
          amount:               amt,
          daily_roi_percent:    2.0,
          max_return:           null, // unlimited compounding
          status:               'active',
          income_locked_until:  incomeLock,
          capital_locked_until: capitalLock,
        },
      })

      if (target.status === 'inactive' || target.status === 'blocked') {
        await tx.user.update({ where: { id: target.id }, data: { status: 'active' } })
      }
    })

    // Trigger sponsor income + business match + monsoon
    if (target.sponsor_id) {
      triggerSponsorIncome(target.id, amt).catch(console.error)
    }
    processBusinessMatch().catch(console.error)
    processMonsoonBonanza().catch(console.error)

    res.status(201).json({ message: `Successfully activated member with $${amt} package` })
  } catch (err) {
    next(err)
  }
})

// ─── POST /api/admin/members/:id/reset-password ──────────────
const bcrypt = require('bcryptjs')
router.post('/:id/reset-password', async (req, res, next) => {
  const { new_password } = req.body
  if (!new_password || new_password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }
  try {
    const hash = await bcrypt.hash(new_password, 12)
    await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data:  { password_hash: hash },
    })
    res.json({ message: 'Password reset successfully', new_password })
  } catch (err) { next(err) }
})

module.exports = router
