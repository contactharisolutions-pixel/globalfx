/**
 * royaltyEngine.js — Corporate Royalty Income Engine
 *
 * Rules (Incomeengine.md):
 * - Requires 50:50 binary matched business volume
 * - Tiers: $100K=1%, $200K=2%, $300K=3%, $400K=4%, $500K=5% of company turnover
 * - Transferred after 72 hours
 * - Cumulative: user qualified for highest tier they've achieved
 */

const prisma = require('../lib/prisma')
const { getMatchedBusiness } = require('./businessUtils')
const { CORPORATE_ROYALTY_TIERS } = require('../lib/ranks')

/**
 * Check all active users and distribute corporate royalty based on matched business.
 * Royalty = % of total company deposit turnover (all TradePackages ever).
 */
async function processCorporateRoyalty() {
  console.log('[RoyaltyEngine] Processing corporate royalty...')

  // Total company turnover = sum of all TradePackage amounts
  const turnoverRes = await prisma.tradePackage.aggregate({ _sum: { amount: true } })
  const turnover    = parseFloat(turnoverRes._sum.amount || 0)
  if (turnover <= 0) {
    console.log('[RoyaltyEngine] No turnover yet. Skipping.')
    return
  }

  const users = await prisma.user.findMany({
    where:  { status: 'active' },
    select: { id: true, user_id: true, royalty_rank_id: true },
  })

  for (const user of users) {
    try {
      const { matched } = await getMatchedBusiness(user.id)

      // Find highest royalty tier qualified
      let qualifiedTier = null
      for (const tier of [...CORPORATE_ROYALTY_TIERS].reverse()) {
        if (matched >= tier.business) { qualifiedTier = tier; break }
      }
      if (!qualifiedTier) continue

      // Find tier index (1-based) for rank tracking
      const tierIndex = CORPORATE_ROYALTY_TIERS.indexOf(qualifiedTier) + 1
      if (tierIndex <= user.royalty_rank_id) continue // already at or above this rank

      const royaltyAmt = parseFloat((turnover * qualifiedTier.percent / 100).toFixed(2))
      if (royaltyAmt <= 0) continue

      // Create pending bonus (72h delay — credited by creditPendingRoyalty)
      await prisma.$transaction(async (tx) => {
        // Update royalty rank
        await tx.user.update({
          where: { id: user.id },
          data: {
            royalty_rank:    `Corporate ${qualifiedTier.percent}%`,
            royalty_rank_id: tierIndex,
          },
        })

        // Create bonus record (pending — not yet in income wallet)
        await tx.bonus.create({
          data: {
            user_id:    user.id,
            type:       'royalty',
            amount:     royaltyAmt,
            is_matured: false, // will be released after 72h
            remarks:    `Corporate Royalty ${qualifiedTier.percent}% — $${matched.toFixed(0)} matched business`,
          },
        })
      })

      console.log(`[RoyaltyEngine] User ${user.user_id} qualified ${qualifiedTier.percent}% royalty — $${royaltyAmt}`)
    } catch (err) {
      console.error(`[RoyaltyEngine] Error for user ${user.user_id}:`, err.message)
    }
  }

  // Credit pending royalties older than 72h
  await creditPendingRoyalties()
  console.log('[RoyaltyEngine] Done.')
}

/** Credit royalty bonuses older than 72 hours to income wallet */
async function creditPendingRoyalties() {
  const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000)
  const pending = await prisma.bonus.findMany({
    where: { type: 'royalty', is_matured: false, created_at: { lte: cutoff } },
  })

  for (const bonus of pending) {
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { id: bonus.user_id },
          data:  { income_wallet_balance: { increment: bonus.amount } },
        })
        await tx.incomeLedger.create({
          data: {
            user_id:        bonus.user_id,
            type:           'credit',
            amount:         bonus.amount,
            balance_after:  user.income_wallet_balance,
            remarks:        bonus.remarks || 'Corporate Royalty Income',
            reference_type: 'royalty',
            reference_id:   bonus.id,
          },
        })
        await tx.bonus.update({
          where: { id: bonus.id },
          data:  { is_matured: true, matured_at: new Date() },
        })
      })
      console.log(`[RoyaltyEngine] Royalty $${bonus.amount} credited to user #${bonus.user_id}`)
    } catch (err) {
      console.error(`[RoyaltyEngine] Error crediting royalty #${bonus.id}:`, err.message)
    }
  }
}

module.exports = { processCorporateRoyalty }
