/**
 * member.js — Member API Routes
 * Updated for new BitLance income engine (sponsor_l1/l2/l3, match_reward, monthly_salary, royalty, monsoon)
 */
const router       = require('express').Router()
const bcrypt       = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const prisma = require('../lib/prisma')
const { getMatchedBusiness, getTeamSize } = require('../services/businessUtils')
const { BUSINESS_MATCH_TIERS, CORPORATE_ROYALTY_TIERS, MONSOON_BONANZA_TIERS } = require('../lib/ranks')
router.use(authenticate)

// ─── GET /api/member/dashboard ─────────────────────────────────
router.get('/dashboard', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        user_id:               true,
        name:                  true,
        status:                true,
        referral_code:         true,
        fund_wallet_balance:   true,
        income_wallet_balance: true,
      },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const IST = 'Asia/Kolkata'

    const [
      totalTopup, totalActivePackages, totalWithdraw, totalEarning,
      todayRoiSum, totalRoiSum,
      todaySponsorSum, totalSponsorSum,
      teamData
    ] = await Promise.all([
      prisma.tradePackage.aggregate({ where: { user_id: req.user.id }, _sum: { amount: true } }),
      prisma.tradePackage.aggregate({ where: { user_id: req.user.id, status: 'active' }, _sum: { amount: true } }),
      prisma.withdrawal.aggregate({ where: { user_id: req.user.id, status: 'approved' }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { user_id: req.user.id }, _sum: { amount: true } }),

      // Today's ROI (trading type)
      prisma.$queryRaw`SELECT SUM(amount) as total FROM "Bonus" WHERE user_id = ${req.user.id} AND type = 'trading'::"BonusType" AND (created_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date`,
      prisma.$queryRaw`SELECT SUM(amount) as total FROM "Bonus" WHERE user_id = ${req.user.id} AND type = 'trading'::"BonusType"`,

      // Today's Sponsor (L1+L2+L3)
      prisma.$queryRaw`SELECT SUM(amount) as total FROM "Bonus" WHERE user_id = ${req.user.id} AND type IN ('sponsor_l1'::"BonusType",'sponsor_l2'::"BonusType",'sponsor_l3'::"BonusType") AND (created_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date`,
      prisma.$queryRaw`SELECT SUM(amount) as total FROM "Bonus" WHERE user_id = ${req.user.id} AND type IN ('sponsor_l1'::"BonusType",'sponsor_l2'::"BonusType",'sponsor_l3'::"BonusType")`,

      // Team metrics
      prisma.$queryRaw`
        WITH RECURSIVE tree AS (
          SELECT id, status, created_at FROM "User" WHERE sponsor_id = ${req.user.id}
          UNION ALL
          SELECT u.id, u.status, u.created_at FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id
        ),
        member_packages AS (
          SELECT user_id, amount, started_at,
                 ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY started_at ASC) as rank
          FROM "TradePackage"
          WHERE user_id IN (SELECT id FROM tree)
        )
        SELECT
          COUNT(id) as team_total,
          COUNT(id) FILTER (WHERE status = 'active') as active_team,
          COUNT(id) FILTER (WHERE (created_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date) as today_joining,
          COALESCE(SUM(p.amount), 0) as total_team_business,
          COALESCE(SUM(p.amount) FILTER (WHERE (p.started_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date), 0) as today_business,
          COUNT(DISTINCT p.user_id) FILTER (WHERE rank = 1 AND (p.started_at AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date) as today_activation
        FROM tree t
        LEFT JOIN member_packages p ON t.id = p.user_id
      `
    ])

    const stats = teamData[0] || {}

    res.json({
      user,
      stats: {
        fund_wallet:           user.fund_wallet_balance,
        income_wallet:         user.income_wallet_balance,
        total_topup:           totalTopup._sum.amount               || 0,
        total_active_packages: totalActivePackages._sum.amount       || 0,
        total_withdraw:        totalWithdraw._sum.amount             || 0,
        total_earning:         totalEarning._sum.amount              || 0,
        team_total:            Number(stats.team_total               || 0),
        active_team:           Number(stats.active_team              || 0),
        today_joining:         Number(stats.today_joining            || 0),
        today_business:        Number(stats.today_business           || 0),
        today_activation:      Number(stats.today_activation         || 0),
        total_team_business:   Number(stats.total_team_business      || 0),
        today_roi:             Number(todayRoiSum[0]?.total          || 0),
        total_roi:             Number(totalRoiSum[0]?.total          || 0),
        today_sponsor_income:  Number(todaySponsorSum[0]?.total      || 0),
        total_sponsor_income:  Number(totalSponsorSum[0]?.total      || 0),
      },
    })
  } catch (err) { next(err) }
})

// ─── GET /api/member/profile ───────────────────────────────────
router.get('/profile', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        user_id:       true,
        name:          true,
        email:         true,
        phone:         true,
        status:        true,
        referral_code: true,
        bep20_wallet:  true,
        created_at:    true,
        sponsor:       { select: { user_id: true, name: true } },
      },
    })
    res.json(user)
  } catch (err) { next(err) }
})

// ─── PUT /api/member/profile ───────────────────────────────────
router.put('/profile', async (req, res, next) => {
  const { name, phone } = req.body
  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data:  { name, phone },
      select: { user_id: true, name: true, phone: true },
    })
    res.json({ message: 'Profile updated', user: updated })
  } catch (err) { next(err) }
})

// ─── PUT /api/member/change-password ──────────────────────────
router.put('/change-password', async (req, res, next) => {
  const { current_password, new_password } = req.body
  try {
    const user  = await prisma.user.findUnique({ where: { id: req.user.id } })
    const valid = await bcrypt.compare(current_password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
    const hash = await bcrypt.hash(new_password, 12)
    await prisma.user.update({ where: { id: req.user.id }, data: { password_hash: hash } })
    res.json({ message: 'Password updated successfully' })
  } catch (err) { next(err) }
})

// ─── PUT /api/member/transaction-pin ──────────────────────────
router.put('/transaction-pin', async (req, res, next) => {
  const { new_pin } = req.body
  if (!new_pin || new_pin.length !== 6 || !/^\d+$/.test(new_pin)) {
    return res.status(400).json({ error: 'PIN must be exactly 6 digits' })
  }
  try {
    const hash = await bcrypt.hash(new_pin, 12)
    await prisma.user.update({ where: { id: req.user.id }, data: { transaction_pin_hash: hash } })
    res.json({ message: 'Transaction PIN set successfully' })
  } catch (err) { next(err) }
})

// ─── PUT /api/member/wallet-address ───────────────────────────
router.put('/wallet-address', async (req, res, next) => {
  const { bep20_wallet, pin } = req.body
  if (!bep20_wallet || bep20_wallet.length < 20) return res.status(400).json({ error: 'Invalid wallet address' })
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (user.transaction_pin_hash) {
      const valid = await bcrypt.compare(pin, user.transaction_pin_hash)
      if (!valid) return res.status(401).json({ error: 'Invalid transaction PIN' })
    }
    await prisma.user.update({ where: { id: req.user.id }, data: { bep20_wallet } })
    res.json({ message: 'Wallet address updated' })
  } catch (err) { next(err) }
})

// ─── GET /api/member/performance ─────────────────────────────────
// Updated: 50:50 binary business match, all new income tiers
router.get('/performance', async (req, res, next) => {
  try {
    const [user, { left, right, matched }, teamSize] = await Promise.all([
      prisma.user.findUnique({
        where:  { id: req.user.id },
        select: { royalty_rank: true, royalty_rank_id: true },
      }),
      getMatchedBusiness(req.user.id),
      getTeamSize(req.user.id),
    ])

    // Business match tier progress
    const match_progress = BUSINESS_MATCH_TIERS.map(tier => ({
      match:   tier.match,
      reward:  tier.reward,
      salary:  tier.salary,
      achieved: matched >= tier.match,
      progress_pct: Math.min(100, (matched / tier.match) * 100).toFixed(1),
    })).reverse() // ascending for display

    // Corporate royalty tier progress
    const royalty_progress = CORPORATE_ROYALTY_TIERS.map(tier => ({
      business:    tier.business,
      percent:     tier.percent,
      achieved:    matched >= tier.business,
      progress_pct: Math.min(100, (matched / tier.business) * 100).toFixed(1),
    }))

    // Monsoon bonanza milestone progress
    const monsoon_progress = MONSOON_BONANZA_TIERS.map(tier => ({
      teamSize:    tier.teamSize,
      bonus:       tier.bonus,
      achieved:    teamSize >= tier.teamSize,
      progress_pct: Math.min(100, (teamSize / tier.teamSize) * 100).toFixed(1),
    }))

    // Already awarded reward tiers
    const awardedTiers = await prisma.rewardMatch.findMany({
      where:  { user_id: req.user.id },
      select: { tier_match: true, reward_paid: true, salaries_paid: true, salary_amt: true },
    })

    res.json({
      binary: { left, right, matched, total: left + right },
      team_size: teamSize,
      current_royalty:    user.royalty_rank,
      current_royalty_id: user.royalty_rank_id,
      match_progress,
      royalty_progress,
      monsoon_progress,
      awarded_tiers: awardedTiers,
    })
  } catch (err) { next(err) }
})

// ─── GET /api/member/search ───────────────────────────────────
router.get('/search', async (req, res, next) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'userId query required' })
  try {
    const target = await prisma.user.findUnique({
      where:  { user_id: userId },
      select: { name: true, id: true }
    })
    if (!target || target.id === req.user.id) {
      return res.status(404).json({ error: 'User not found or invalid' })
    }
    res.json({ name: target.name })
  } catch (err) { next(err) }
})

module.exports = router
