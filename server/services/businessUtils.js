/**
 * businessUtils.js — Binary Tree Business Calculation
 * BitLance uses a 2-leg (binary) 50:50 structure.
 * Left leg = first direct referral's entire subtree
 * Right leg = all other referrals' subtrees combined
 */

const prisma = require('../lib/prisma')

/**
 * Get total invested business in a subtree rooted at rootId (inclusive).
 */
async function getSubtreeBusiness(rootId) {
  const [res] = await prisma.$queryRaw`
    WITH RECURSIVE tree AS (
      SELECT id FROM "User" WHERE id = ${rootId}
      UNION ALL
      SELECT u.id FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id
    )
    SELECT COALESCE(SUM(tp.amount), 0) AS total
    FROM "TradePackage" tp
    WHERE tp.user_id IN (SELECT id FROM tree)
  `
  return parseFloat(res?.total || 0)
}

/**
 * Get binary (left/right) business volumes for a user.
 * Left = first direct referral subtree.
 * Right = sum of all other direct referrals' subtrees.
 */
async function getBinaryBusiness(userId) {
  const directs = await prisma.user.findMany({
    where:   { sponsor_id: userId },
    select:  { id: true },
    orderBy: { created_at: 'asc' },
  })

  if (directs.length === 0) return { left: 0, right: 0 }

  const leftVol = await getSubtreeBusiness(directs[0].id)

  let rightVol = 0
  for (const d of directs.slice(1)) {
    rightVol += await getSubtreeBusiness(d.id)
  }

  return { left: leftVol, right: rightVol }
}

/**
 * Get total downline team size (all descendants, not including self).
 */
async function getTeamSize(userId) {
  const [res] = await prisma.$queryRaw`
    WITH RECURSIVE tree AS (
      SELECT id FROM "User" WHERE sponsor_id = ${userId}
      UNION ALL
      SELECT u.id FROM "User" u INNER JOIN tree t ON u.sponsor_id = t.id
    )
    SELECT COUNT(*) AS total FROM tree
  `
  return parseInt(res?.total || 0)
}

/**
 * Get the 50:50 matched volume for a user.
 * Matched = 2 × min(left, right)
 */
async function getMatchedBusiness(userId) {
  const { left, right } = await getBinaryBusiness(userId)
  const matched = 2 * Math.min(left, right)
  return { left, right, matched }
}

module.exports = { getBinaryBusiness, getSubtreeBusiness, getTeamSize, getMatchedBusiness }
