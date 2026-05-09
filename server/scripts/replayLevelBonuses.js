/**
 * Level Bonus Replay Script
 * Re-fires matching bonuses for all ROI distributions created today.
 */

require('dotenv').config()
const prisma = require('../lib/prisma')
const { triggerROIMatchingBonus } = require('../services/bonusEngine')

async function run() {
  console.log('🚀 Starting Level Bonus Replay...')
  const startTime = Date.now()

  try {
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
    const todayIST  = new Date(Date.now() + IST_OFFSET_MS)
    const todayStr  = todayIST.toISOString().split('T')[0]
    const dayStart  = new Date(todayStr + 'T00:00:00+05:30')

    const distributions = await prisma.roiDistribution.findMany({
      where:   { created_at: { gte: dayStart } },
      orderBy: { created_at: 'asc' },
      select:  { id: true, user_id: true, amount: true },
    })

    if (distributions.length === 0) {
      console.log(`No ROI distributions found for ${todayStr}. Nothing to replay.`)
      return
    }

    const byUser = {}
    for (const d of distributions) {
      byUser[d.user_id] = (byUser[d.user_id] || 0) + parseFloat(d.amount)
    }

    const userIds = Object.keys(byUser).map(Number)
    const users   = await prisma.user.findMany({
      where:  { id: { in: userIds } },
      select: { id: true, user_id: true },
    })
    const userMap = Object.fromEntries(users.map(u => [u.id, u.user_id]))

    console.log(`Found ${distributions.length} distribution(s) for ${userIds.length} member(s).`)

    let processed = 0, errors = 0
    for (const [dbIdStr, totalRoi] of Object.entries(byUser)) {
      const dbId      = parseInt(dbIdStr)
      const displayId = userMap[dbId] || 'Member'
      try {
        await triggerROIMatchingBonus(dbId, displayId, totalRoi)
        processed++
        console.log(`✓ user ${displayId} — ROI $${totalRoi.toFixed(2)}`)
      } catch (err) {
        errors++
        console.error(`✗ user ${displayId}:`, err.message)
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`\n✅ Level bonus replay completed in ${duration}s. Processed: ${processed}, Errors: ${errors}`)

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

run()
