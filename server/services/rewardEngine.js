/**
 * rewardEngine.js — Business Match Reward & Monthly Salary Engine
 *
 * Rules (Incomeengine.md):
 * - 50:50 binary matching: Left leg = first referral subtree, Right = rest
 * - When matched volume crosses a tier, user gets instant reward + 12 monthly salaries
 * - Instant reward transferred after 72 hours (handled by roiCron.creditPendingRewards)
 * - Monthly salary credited on 5th of every month for 12 months
 * - Each tier is awarded only once (progressive, not repeating)
 */

const prisma = require('../lib/prisma')
const { getMatchedBusiness } = require('./businessUtils')
const { BUSINESS_MATCH_TIERS } = require('../lib/ranks')

/**
 * Process business match for all active users.
 * Checks new tier unlocks and creates pending RewardMatch records.
 */
async function processBusinessMatch() {
  console.log('[RewardEngine] Processing business match tiers...')

  const users = await prisma.user.findMany({
    where:  { status: 'active' },
    select: { id: true, user_id: true },
  })

  let newRewards = 0

  for (const user of users) {
    try {
      const { matched } = await getMatchedBusiness(user.id)
      if (matched <= 0) continue

      // Get existing awarded tier records for this user
      const existing = await prisma.rewardMatch.findMany({
        where:  { user_id: user.id },
        select: { tier_match: true },
        orderBy: { tier_match: 'desc' },
      })
      const awardedTiers = new Set(existing.map(r => parseFloat(r.tier_match)))

      // Find all tiers now qualified that haven't been awarded yet
      const newTiers = BUSINESS_MATCH_TIERS.filter(
        tier => matched >= tier.match && !awardedTiers.has(tier.match)
      )

      for (const tier of newTiers) {
        await prisma.rewardMatch.create({
          data: {
            user_id:    user.id,
            tier_match: tier.match,
            reward_amt: tier.reward,
            salary_amt: tier.salary,
            // reward_paid stays false — will be released after 72h by creditPendingRewards
          },
        })
        newRewards++
        console.log(`[RewardEngine] User ${user.user_id} unlocked $${tier.match} tier — reward $${tier.reward}, salary $${tier.salary}/mo`)
      }
    } catch (err) {
      console.error(`[RewardEngine] Error for user ${user.user_id}:`, err.message)
    }
  }

  console.log(`[RewardEngine] Done. New reward records created: ${newRewards}`)
}

module.exports = { processBusinessMatch }
