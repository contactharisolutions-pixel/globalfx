/**
 * earnings.js — Member Earnings API
 * Updated for new BitLance income types:
 * trading | sponsor_l1 | sponsor_l2 | sponsor_l3 | match_reward | monthly_salary | royalty | monsoon
 */
const router       = require('express').Router()
const authenticate = require('../middleware/authenticate')
const prisma = require('../lib/prisma')
router.use(authenticate)

// ─── GET /api/earnings/summary ────────────────────────────────
router.get('/summary', async (req, res, next) => {
  try {
    const [roi, l1, l2, l3, matchReward, salary, royalty, monsoon] = await Promise.all([
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'trading'        }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'sponsor_l1'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'sponsor_l2'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'sponsor_l3'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'match_reward'   }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'monthly_salary' }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'royalty'        }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id, type: 'monsoon'        }, _sum: { amount: true } }),
    ])

    const trading_income  = +(roi._sum.amount         || 0)
    const sponsor_l1      = +(l1._sum.amount           || 0)
    const sponsor_l2      = +(l2._sum.amount           || 0)
    const sponsor_l3      = +(l3._sum.amount           || 0)
    const sponsor_income  = sponsor_l1 + sponsor_l2 + sponsor_l3
    const match_reward    = +(matchReward._sum.amount  || 0)
    const monthly_salary  = +(salary._sum.amount       || 0)
    const royalty_income  = +(royalty._sum.amount      || 0)
    const monsoon_income  = +(monsoon._sum.amount      || 0)

    res.json({
      total: trading_income + sponsor_income + match_reward + monthly_salary + royalty_income + monsoon_income,
      trading_income,
      sponsor_l1,
      sponsor_l2,
      sponsor_l3,
      sponsor_income,   // total L1+L2+L3
      match_reward,
      monthly_salary,
      royalty_income,
      monsoon_income,
    })
  } catch (err) { next(err) }
})

// ─── GET /api/earnings/history ────────────────────────────────
// Last 30 days of ALL bonus types aggregated per day for the area chart.
router.get('/history', async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const records = await prisma.bonus.findMany({
      where:   { user_id: req.user.id, created_at: { gte: thirtyDaysAgo } },
      orderBy: { created_at: 'asc' },
      select:  { amount: true, created_at: true },
    })

    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
    const byDay = {}
    records.forEach((r) => {
      const istDate = new Date(r.created_at.getTime() + IST_OFFSET_MS)
      const day = istDate.toISOString().slice(0, 10)
      byDay[day] = (byDay[day] || 0) + +r.amount
    })

    res.json({
      history: Object.entries(byDay)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, earning]) => ({ date, earning: +earning.toFixed(2) })),
    })
  } catch (err) { next(err) }
})

// ─── GET /api/earnings/report ─────────────────────────────────
// Query: ?type=trading|sponsor_l1|sponsor_l2|sponsor_l3|match_reward|monthly_salary|royalty|monsoon|sponsor (all sponsor levels)
router.get('/report', async (req, res, next) => {
  const { type } = req.query
  const VALID_TYPES = ['trading', 'sponsor_l1', 'sponsor_l2', 'sponsor_l3', 'sponsor', 'match_reward', 'monthly_salary', 'royalty', 'monsoon']
  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `Invalid report type. Valid: ${VALID_TYPES.join(', ')}` })
  }

  try {
    // 'sponsor' = all 3 levels combined
    const typeFilter = type === 'sponsor'
      ? { in: ['sponsor_l1', 'sponsor_l2', 'sponsor_l3'] }
      : { equals: type }

    const records = await prisma.bonus.findMany({
      where:   { user_id: req.user.id, type: typeFilter },
      orderBy: { created_at: 'desc' },
      include: {
        from_user: { select: { user_id: true, name: true } },
      },
    })
    res.json({ records })
  } catch (err) {
    console.error(`[Earnings Report Error - ${type}]:`, err.message)
    res.status(500).json({ error: `Internal server error: ${err.message}` })
  }
})

module.exports = router
