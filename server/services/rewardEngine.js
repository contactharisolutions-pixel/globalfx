const prisma = require('../lib/prisma')
/**
 * Performance Rewards Configuration
 * Based on 40%-30%-30% Leg Distribution
 */
/**
 * Performance Rewards Configuration
 * Based on 40%-30%-30% Leg Distribution
 */
const { REWARD_RANKS: FINAL_RANKS } = require('../lib/ranks')

const { getLegBusiness } = require('./businessUtils')

/**
 * Check all users and award new ranks
 */
async function processRewards() {
  console.log('[RewardEngine] Processing performance rewards...')
  const users = await prisma.user.findMany({
    select: { id: true, rank_id: true, user_id: true }
  })

  let awardedCount = 0

  for (const user of users) {
    const { leg1, leg2, leg3 } = await getLegBusiness(user.id)
    
    // Find next potential rank
    const nextRank = FINAL_RANKS.find(r => r.id === user.rank_id + 1)
    if (!nextRank) continue

    const T = nextRank.target
    // Rule: 40%-30%-30%
    if (leg1 >= 0.4 * T && leg2 >= 0.3 * T && leg3 >= 0.3 * T) {
      // Award rank!
      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: {
            rank: nextRank.name,
            rank_id: nextRank.id
          }
        })

        // Create reward bonus record (locked for 30 days)
        await tx.bonus.create({
          data: {
            user_id: user.id,
            type: 'reward',
            amount: nextRank.reward,
            is_matured: false,
            matured_at: null, // Will be handled by maturation cron
            remarks: `Rank Achievement: ${nextRank.name}`
          }
        })
      })
      awardedCount++
      console.log(`[RewardEngine] User ${user.user_id} achieved rank ${nextRank.name}!`)
    }
  }
  console.log(`[RewardEngine] Finished. New ranks awarded: ${awardedCount}`)
}

/**
 * Mature rewards that are older than 30 days
 */
async function matureRewards() {
  console.log('[RewardEngine] Checking for matured rewards...')
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const pendingRewards = await prisma.bonus.findMany({
    where: {
      type: 'reward',
      is_matured: false,
      created_at: { lte: thirtyDaysAgo }
    }
  })

  let maturedCount = 0

  for (const reward of pendingRewards) {
    try {
      await prisma.$transaction(async (tx) => {
        // Mark as matured
        await tx.bonus.update({
          where: { id: reward.id },
          data: {
            is_matured: true,
            matured_at: new Date()
          }
        })

        // Credit income wallet
        const user = await tx.user.update({
          where: { id: reward.user_id },
          data: {
            income_wallet_balance: { increment: reward.amount },
            total_reward_earned:   { increment: reward.amount }
          }
        })

        // Create ledger entry
        await tx.incomeLedger.create({
          data: {
            user_id:        reward.user_id,
            type:           'credit',
            amount:         reward.amount,
            balance_after:  user.income_wallet_balance,
            remarks:        `Matured Reward: ${reward.remarks}`,
            reference_type: 'reward',
            reference_id:   reward.id
          }
        })
      })
      maturedCount++
    } catch (err) {
      console.error(`[RewardEngine] Error maturing reward #${reward.id}:`, err.message)
    }
  }
  console.log(`[RewardEngine] Finished. Rewards matured: ${maturedCount}`)
}

module.exports = { processRewards, matureRewards }
