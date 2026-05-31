/**
 * sponsorEngine.js — 3-Level Direct Sponsor Income
 *
 * When a member activates any package, the system pays FIXED $ amounts
 * to their L1 (direct referrer), L2, and L3 uplines.
 *
 * Income table (from Incomeengine.md):
 *  Package | L1    | L2    | L3
 *  $150    | $10   | $12   | $5
 *  $300    | $20   | $25   | $8
 *  $500    | $30   | $35   | $10
 *  $1,000  | $80   | $85   | $15
 *  $2,000  | $110  | $120  | $25
 *  $5,000  | $270  | $280  | $80
 */

const prisma = require('../lib/prisma')
const { SPONSOR_INCOME_TABLE } = require('../lib/ranks')

/**
 * Credit income wallet + write ledger + bonus record in one transaction.
 */
async function creditSponsorBonus(tx, userId, amount, bonusType, fromUserId, level, remarks) {
  if (amount <= 0) return
  const updated = await tx.user.update({
    where: { id: userId },
    data:  { income_wallet_balance: { increment: amount } },
  })
  await Promise.all([
    tx.bonus.create({
      data: {
        user_id:      userId,
        from_user_id: fromUserId,
        type:         bonusType,
        level,
        amount,
        remarks,
      },
    }),
    tx.incomeLedger.create({
      data: {
        user_id:        userId,
        type:           'credit',
        amount,
        balance_after:  updated.income_wallet_balance,
        remarks,
        reference_type: 'sponsor_income',
      },
    }),
  ])
}

/**
 * Trigger 3-level sponsor income on package activation.
 *
 * @param {number} memberId       - The new member who invested
 * @param {number} packageAmount  - The fixed package amount (150, 300, 500, ...)
 */
async function triggerSponsorIncome(memberId, packageAmount) {
  // Find the income rates for this package
  const rates = SPONSOR_INCOME_TABLE[packageAmount]
  if (!rates) {
    console.warn(`[SponsorEngine] No income table for package $${packageAmount}`)
    return
  }

  const [l1Amt, l2Amt, l3Amt] = rates

  // Walk up 3 levels
  let currentId = memberId
  const uplines = []

  for (let level = 1; level <= 3; level++) {
    const current = await prisma.user.findUnique({
      where:  { id: currentId },
      select: { sponsor_id: true },
    })
    if (!current?.sponsor_id) break
    uplines.push({ userId: current.sponsor_id, level })
    currentId = current.sponsor_id
  }

  if (uplines.length === 0) return

  const amounts = [l1Amt, l2Amt, l3Amt]
  const typeMap  = ['sponsor_l1', 'sponsor_l2', 'sponsor_l3']

  const member = await prisma.user.findUnique({ where: { id: memberId }, select: { user_id: true } })
  const fromDisplay = member?.user_id || `#${memberId}`

  for (const { userId: uplineId, level } of uplines) {
    const amt = amounts[level - 1]
    if (!amt) continue

    // Verify upline is active
    const upline = await prisma.user.findUnique({
      where:  { id: uplineId },
      select: { status: true },
    })
    if (upline?.status !== 'active') continue

    try {
      await prisma.$transaction(async (tx) => {
        await creditSponsorBonus(
          tx,
          uplineId,
          amt,
          typeMap[level - 1],
          memberId,
          level,
          `L${level} Sponsor income from ${fromDisplay} ($${packageAmount} package)`,
        )
      })
      console.log(`[SponsorEngine] L${level} user #${uplineId} +$${amt} from ${fromDisplay}`)
    } catch (err) {
      console.error(`[SponsorEngine] Error crediting L${level} #${uplineId}:`, err.message)
    }
  }
}

module.exports = { triggerSponsorIncome }
