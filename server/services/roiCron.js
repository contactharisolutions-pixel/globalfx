/**
 * ROI Cron Job
 * Runs daily at midnight UTC via node-cron.
 * For each active TradePackage: calculates daily ROI, credits Income Wallet,
 * and marks package as 'completed' when max_return (2×) is reached.
 */

const cron   = require('node-cron')
const prisma = require('../lib/prisma')
const { triggerROIMatchingBonus } = require('./bonusEngine')

/** Credit income wallet and write ledger entry */
async function creditIncome(tx, userId, amount, remarks, refId) {
  const user = await tx.user.update({
    where: { id: userId },
    data:  { income_wallet_balance: { increment: amount } },
  })
  await tx.incomeLedger.create({
    data: {
      user_id:        userId,
      type:           'credit',
      amount,
      balance_after:  user.income_wallet_balance,
      remarks,
      reference_type: 'roi',
      reference_id:   refId,
    },
  })
  await tx.bonus.create({
    data: {
      user_id: userId,
      type:    'trading',
      level:   0,
      amount,
    },
  })
}

/** Main ROI distribution function */
async function distributeROI() {
  console.log(`[ROI Cron] Starting distribution — ${new Date().toISOString()}`)

  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
  const todayIST = new Date(Date.now() + IST_OFFSET_MS)
  const todayStr = todayIST.toISOString().split('T')[0]
  const dayStart = new Date(todayStr + 'T00:00:00+05:30')

  // 1. Fetch all active packages and today's distributions in bulk
  const [activePackages, todayDistributions] = await Promise.all([
    prisma.tradePackage.findMany({ where: { status: 'active' } }),
    prisma.roiDistribution.findMany({
      where: { created_at: { gte: dayStart } },
      select: { package_id: true }
    })
  ])

  const distributedPkgIds = new Set(todayDistributions.map(d => d.package_id))
  
  // 2. Filter out already processed
  const toProcess = activePackages.filter(p => !distributedPkgIds.has(p.id))
  console.log(`[ROI Cron] Found ${activePackages.length} active packages. ${toProcess.length} need processing.`)

  if (toProcess.length === 0) return

  // 3. Process each package and aggregate ROI per user
  let processed = 0, completed = 0
  const userRoiTotals = {} // user_id -> { total: number, display_id: string }

  // Fetch all user display IDs once to avoid repeated queries
  const userIds = [...new Set(toProcess.map(p => p.user_id))]
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, user_id: true }
  })
  const userMap = Object.fromEntries(users.map(u => [u.id, u.user_id]))

  for (const pkg of toProcess) {
    const amount      = parseFloat(pkg.amount)
    const totalEarned = parseFloat(pkg.total_earned)
    const dailyRoi    = parseFloat(pkg.daily_roi_percent || 2.0)
    const maxReturn   = amount * 2

    const roiEarned   = parseFloat((amount * dailyRoi / 100).toFixed(2))
    const creditable  = Math.min(roiEarned, maxReturn - totalEarned)

    if (creditable <= 0) {
      if (totalEarned >= maxReturn) {
        await prisma.tradePackage.update({
          where: { id: pkg.id },
          data: { status: 'completed', completed_at: new Date() },
        })
      }
      continue
    }

    const newTotal = totalEarned + creditable
    const isDone   = newTotal >= maxReturn

    try {
      await prisma.$transaction(async (tx) => {
        await tx.tradePackage.update({
          where: { id: pkg.id },
          data: {
            total_earned: newTotal,
            status:       isDone ? 'completed' : 'active',
            completed_at: isDone ? new Date() : null,
          },
        })
        await creditIncome(tx, pkg.user_id, creditable, `Daily ROI ${dailyRoi}% on package #${pkg.id}`, pkg.id)
        await tx.roiDistribution.create({
          data: {
            package_id: pkg.id,
            user_id:    pkg.user_id,
            amount:     creditable,
            pair_name:  pickTradingPair(),
          },
        })
      })

      // Aggregate for matching bonus
      userRoiTotals[pkg.user_id] = (userRoiTotals[pkg.user_id] || 0) + creditable
      processed++
      if (isDone) completed++
    } catch (err) {
      console.error(`[ROI Cron] Error for package #${pkg.id}:`, err.message)
    }
  }

  // 4. Trigger matching bonuses ONCE per user (Aggregated)
  console.log(`[ROI Cron] Triggering matching bonuses for ${Object.keys(userRoiTotals).length} members...`)
  for (const [userId, totalRoi] of Object.entries(userRoiTotals)) {
    try {
      await triggerROIMatchingBonus(parseInt(userId), userMap[userId] || 'Member', totalRoi)
    } catch (err) {
      console.error(`[ROI Cron] Matching bonus fail for user ${userId}:`, err.message)
    }
  }

  console.log(`[ROI Cron] Done. Processed: ${processed}, Completed: ${completed}`)
}



/** Simulate a trading pair for daily reports */
function pickTradingPair() {
  const pairs = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'EUR/GBP', 'USD/JPY', 'GBP/USD', 'SOL/USDT']
  return pairs[Math.floor(Math.random() * pairs.length)]
}

const { processRewards, matureRewards } = require('./rewardEngine')
const { updateRoyaltyRanks, distributeMonthlyRoyalty } = require('./royaltyEngine')

/** Schedule: every day at 12:00 AM IST (only on persistent servers) */
function startROICron() {
  // On Vercel (serverless), node-cron does nothing — the process dies after each request.
  // The daily job is triggered instead via HTTP POST /api/cron/run by Vercel Cron Jobs.
  // Only activate the in-process scheduler when running on a persistent server (local dev / VPS).
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    console.log('[ROI Cron] Running on Vercel — in-process cron DISABLED. Using Vercel Cron Jobs via /api/cron/run')
    return
  }

  cron.schedule('0 0 * * *', async () => {
    const today = new Date()
    const day   = today.getDay()
    const date  = today.getDate()

    if (date === 1) await distributeMonthlyRoyalty()
    if (day >= 1 && day <= 5) await distributeROI()
    await processRewards()
    await updateRoyaltyRanks()
    await matureRewards()
  }, { timezone: 'Asia/Kolkata' })

  console.log('[ROI/Reward/Royalty Cron] Scheduled — runs daily at 12:00 AM IST')
}

module.exports = { startROICron, distributeROI }
