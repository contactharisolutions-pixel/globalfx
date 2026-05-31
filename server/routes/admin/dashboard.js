const router            = require('express').Router()
const authenticateAdmin = require('../../middleware/authenticateAdmin')
const prisma = require('../../lib/prisma')
router.use(authenticateAdmin)

// ─── GET /api/admin/dashboard ─────────────────────────────────
// Platform-wide KPIs — updated for new BitLance income engine
router.get('/dashboard', async (req, res, next) => {
  try {
    const [
      totalMembers, activeMembers, pendingDeposits, pendingWithdrawals,
      pendingKyc, openTickets, totalDepositVol, totalWithdrawVol,
      roiBonus, sponsorL1Bonus, sponsorL2Bonus, sponsorL3Bonus,
      matchRewardBonus, monthlySalaryBonus, royaltyBonus, monsoonBonus,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'active' } }),
      prisma.deposit.count({ where: { status: 'pending' } }),
      prisma.withdrawal.count({ where: { status: 'pending' } }),
      prisma.kycDocument.count({ where: { status: 'pending' } }),
      prisma.supportTicket.count({ where: { status: { in: ['open', 'in_progress'] } } }),
      prisma.deposit.aggregate({ where:    { status: 'approved' }, _sum: { amount: true } }),
      prisma.withdrawal.aggregate({ where: { status: 'approved' }, _sum: { net_amount: true } }),
      // Per-type bonus aggregates (new income engine types)
      prisma.bonus.aggregate({ where: { type: 'trading'        }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'sponsor_l1'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'sponsor_l2'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'sponsor_l3'     }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'match_reward'   }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'monthly_salary' }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'royalty'        }, _sum: { amount: true } }),
      prisma.bonus.aggregate({ where: { type: 'monsoon'        }, _sum: { amount: true } }),
    ])

    const sevenDaysAgo   = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const newMembersWeek = await prisma.user.count({ where: { created_at: { gte: sevenDaysAgo } } })

    const roi          = +(roiBonus._sum.amount          || 0)
    const l1           = +(sponsorL1Bonus._sum.amount    || 0)
    const l2           = +(sponsorL2Bonus._sum.amount    || 0)
    const l3           = +(sponsorL3Bonus._sum.amount    || 0)
    const matchReward  = +(matchRewardBonus._sum.amount  || 0)
    const salary       = +(monthlySalaryBonus._sum.amount|| 0)
    const royalty      = +(royaltyBonus._sum.amount      || 0)
    const monsoon      = +(monsoonBonus._sum.amount      || 0)

    const totalBonuses = roi + l1 + l2 + l3 + matchReward + salary + royalty + monsoon

    res.json({
      members:         { total: totalMembers, active: activeMembers, new_this_week: newMembersWeek },
      pending_actions: { deposits: pendingDeposits, withdrawals: pendingWithdrawals, kyc: pendingKyc, tickets: openTickets },
      financials: {
        total_deposits:    +(totalDepositVol._sum.amount      || 0),
        total_withdrawals: +(totalWithdrawVol._sum.net_amount || 0),
        total_bonuses:     totalBonuses,
        // Income breakdown
        roi_paid:           roi,
        sponsor_l1_paid:    l1,
        sponsor_l2_paid:    l2,
        sponsor_l3_paid:    l3,
        match_reward_paid:  matchReward,
        monthly_salary_paid: salary,
        royalty_paid:       royalty,
        monsoon_paid:       monsoon,
      },
    })
  } catch (err) { next(err) }
})

module.exports = router
