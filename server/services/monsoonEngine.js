/**
 * monsoonEngine.js — Monsoon Bonanza Team Size Award Engine
 *
 * Rules (Incomeengine.md):
 * - One-time milestone bonus based on total downline team size
 * - Tiers: 50→$20, 100→$50, 200→$100, 500→$250, 1000→$500, 2000→$1000, 5000→$2000
 * - Each milestone awarded only once per user
 * - Transferred to wallet after 72 hours
 */

const prisma = require('../lib/prisma')
const { getTeamSize } = require('./businessUtils')
const { MONSOON_BONANZA_TIERS } = require('../lib/ranks')

/**
 * Check all active users for newly achieved team size milestones.
 * Called daily by cron or immediately after a new member activation.
 */
async function processMonsoonBonanza() {
  console.log('[MonsoonEngine] Checking team size milestones...')

  const users = await prisma.user.findMany({
    where:  { status: 'active' },
    select: { id: true, user_id: true },
  })

  let newAwards = 0

  for (const user of users) {
    try {
      const teamSize = await getTeamSize(user.id)
      if (teamSize === 0) continue

      // Get already awarded milestones
      const existing = await prisma.monsBonanza.findMany({
        where:  { user_id: user.id },
        select: { team_size: true },
      })
      const awarded = new Set(existing.map(m => m.team_size))

      // Find newly qualified milestones
      const newMilestones = MONSOON_BONANZA_TIERS.filter(
        t => teamSize >= t.teamSize && !awarded.has(t.teamSize)
      )

      for (const milestone of newMilestones) {
        await prisma.monsBonanza.create({
          data: {
            user_id:   user.id,
            team_size: milestone.teamSize,
            bonus_amt: milestone.bonus,
            // is_paid stays false — released after 72h
          },
        })
        newAwards++
        console.log(`[MonsoonEngine] User ${user.user_id} milestone team=${milestone.teamSize} → $${milestone.bonus} pending`)
      }
    } catch (err) {
      console.error(`[MonsoonEngine] Error for user ${user.user_id}:`, err.message)
    }
  }

  // Credit pending awards older than 72h
  await creditPendingMonsoon()
  console.log(`[MonsoonEngine] Done. New milestones created: ${newAwards}`)
}

/** Credit Monsoon Bonanza awards that have been pending ≥ 72 hours */
async function creditPendingMonsoon() {
  const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000)
  const pending = await prisma.monsBonanza.findMany({
    where: { is_paid: false, created_at: { lte: cutoff } },
  })

  for (const award of pending) {
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { id: award.user_id },
          data:  { income_wallet_balance: { increment: award.bonus_amt } },
        })
        await tx.incomeLedger.create({
          data: {
            user_id:        award.user_id,
            type:           'credit',
            amount:         award.bonus_amt,
            balance_after:  user.income_wallet_balance,
            remarks:        `Monsoon Bonanza — Team size ${award.team_size} milestone`,
            reference_type: 'monsoon',
            reference_id:   award.id,
          },
        })
        await tx.bonus.create({
          data: {
            user_id: award.user_id,
            type:    'monsoon',
            amount:  award.bonus_amt,
            remarks: `Monsoon Bonanza — ${award.team_size} team milestone`,
          },
        })
        await tx.monsBonanza.update({
          where: { id: award.id },
          data:  { is_paid: true, paid_at: new Date() },
        })
      })
      console.log(`[MonsoonEngine] $${award.bonus_amt} credited to user #${award.user_id} (team=${award.team_size})`)
    } catch (err) {
      console.error(`[MonsoonEngine] Error crediting award #${award.id}:`, err.message)
    }
  }
}

module.exports = { processMonsoonBonanza, creditPendingMonsoon }
