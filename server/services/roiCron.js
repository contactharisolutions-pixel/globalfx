/**
 * roiCron.js — Daily Compounding ROI Distribution
 *
 * Rules (Incomeengine.md):
 * - 2% daily compounding on (original amount + total_earned) — UNLIMITED days
 * - Runs every day Mon–Sun (7 days/week)
 * - Income wallet locked 60 days from package activation
 * - No max_return cap
 */

const cron   = require('node-cron')
const prisma = require('../lib/prisma')

/** Credit income wallet and write ledger entry */
async function creditROI(tx, userId, amount, remarks, refId) {
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
      remarks,
    },
  })
}

/** Main ROI distribution — 2% compounding daily, unlimited days */
async function distributeROI() {
  console.log(`[ROI Cron] Starting compounding distribution — ${new Date().toISOString()}`)

  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
  const todayIST  = new Date(Date.now() + IST_OFFSET_MS)
  const todayStr  = todayIST.toISOString().split('T')[0]
  const dayStart  = new Date(todayStr + 'T00:00:00+05:30')

  // Fetch active packages + already-distributed today
  const [activePackages, todayDist] = await Promise.all([
    prisma.tradePackage.findMany({ where: { status: 'active' } }),
    prisma.roiDistribution.findMany({
      where:  { created_at: { gte: dayStart } },
      select: { package_id: true },
    }),
  ])

  const distributedIds = new Set(todayDist.map(d => d.package_id))
  const toProcess = activePackages.filter(p => !distributedIds.has(p.id))

  console.log(`[ROI Cron] ${activePackages.length} active, ${toProcess.length} to process`)
  if (toProcess.length === 0) return

  let processed = 0

  for (const pkg of toProcess) {
    const principal   = parseFloat(pkg.amount)
    const totalEarned = parseFloat(pkg.total_earned)
    const dailyRate   = parseFloat(pkg.daily_roi_percent || 2.0)

    // Compounding: ROI on (principal + total_earned)
    const currentBalance = principal + totalEarned
    const roiAmount      = parseFloat((currentBalance * dailyRate / 100).toFixed(2))

    if (roiAmount <= 0) continue

    try {
      await prisma.$transaction(async (tx) => {
        // Update package total_earned
        await tx.tradePackage.update({
          where: { id: pkg.id },
          data:  { total_earned: { increment: roiAmount } },
        })

        // Credit income wallet
        await creditROI(
          tx,
          pkg.user_id,
          roiAmount,
          `Daily ROI ${dailyRate}% compounding — package #${pkg.id} (balance $${currentBalance.toFixed(2)})`,
          pkg.id,
        )

        // Log distribution
        await tx.roiDistribution.create({
          data: {
            package_id: pkg.id,
            user_id:    pkg.user_id,
            amount:     roiAmount,
            pair_name:  pickTradingPair(),
          },
        })
      })

      processed++
    } catch (err) {
      console.error(`[ROI Cron] Error for package #${pkg.id}:`, err.message)
    }
  }

  console.log(`[ROI Cron] Done. Processed: ${processed}`)
}

/** Pick a random trading pair for display in daily reports */
function pickTradingPair() {
  const pairs = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT', 'MATIC/USDT', 'ADA/USDT', 'DOT/USDT']
  return pairs[Math.floor(Math.random() * pairs.length)]
}

/** Schedule — runs every day at 12:00 AM IST, 7 days/week */
function startROICron() {
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    console.log('[ROI Cron] Vercel detected — cron disabled. Use /api/cron/run via Vercel Cron.')
    return
  }

  // Every day midnight IST — no weekend restriction
  cron.schedule('0 0 * * *', async () => {
    const now  = new Date()
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
    const istNow = new Date(now.getTime() + IST_OFFSET_MS)
    const date   = istNow.getUTCDate()

    // ROI: every day
    await distributeROI()

    // Business match + monsoon: every day
    const { processBusinessMatch }   = require('./rewardEngine')
    const { processCorporateRoyalty } = require('./royaltyEngine')
    const { processMonsoonBonanza }   = require('./monsoonEngine')
    await processBusinessMatch()
    await processCorporateRoyalty()
    await processMonsoonBonanza()

    // Pending payments (72h rewards + monthly salaries)
    await creditPendingRewards()
    await creditMonthlySalaries(date)
  }, { timezone: 'Asia/Kolkata' })

  console.log('[ROI Cron] Scheduled — daily 12:00 AM IST, 7 days/week')
}

/**
 * Credit instant rewards that have been pending ≥ 72 hours
 */
async function creditPendingRewards() {
  const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000)
  const pending = await prisma.rewardMatch.findMany({
    where: { reward_paid: false, created_at: { lte: cutoff } },
  })

  for (const rm of pending) {
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { id: rm.user_id },
          data:  { income_wallet_balance: { increment: rm.reward_amt } },
        })
        await tx.incomeLedger.create({
          data: {
            user_id:        rm.user_id,
            type:           'credit',
            amount:         rm.reward_amt,
            balance_after:  user.income_wallet_balance,
            remarks:        `Business Match Instant Reward — $${rm.tier_match} tier`,
            reference_type: 'match_reward',
            reference_id:   rm.id,
          },
        })
        await tx.bonus.create({
          data: {
            user_id: rm.user_id,
            type:    'match_reward',
            amount:  rm.reward_amt,
            remarks: `Business Match Instant Reward — $${rm.tier_match} tier`,
          },
        })

        // Set next salary date: 5th of next month
        const nextSalary = getNext5th()
        await tx.rewardMatch.update({
          where: { id: rm.id },
          data:  { reward_paid: true, reward_paid_at: new Date(), next_salary_at: nextSalary },
        })
      })
      console.log(`[RewardCron] Instant reward $${rm.reward_amt} credited to user #${rm.user_id}`)
    } catch (err) {
      console.error(`[RewardCron] Error crediting reward #${rm.id}:`, err.message)
    }
  }
}

/**
 * Credit monthly salaries on the 5th of each month.
 */
async function creditMonthlySalaries(dateOfMonth) {
  if (dateOfMonth !== 5) return

  const today = new Date()
  const duePayments = await prisma.rewardMatch.findMany({
    where: {
      reward_paid:   true,
      salaries_paid: { lt: 12 },
      next_salary_at: { lte: today },
    },
  })

  for (const rm of duePayments) {
    try {
      await prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { id: rm.user_id },
          data:  { income_wallet_balance: { increment: rm.salary_amt } },
        })
        await tx.incomeLedger.create({
          data: {
            user_id:        rm.user_id,
            type:           'credit',
            amount:         rm.salary_amt,
            balance_after:  user.income_wallet_balance,
            remarks:        `Monthly Salary (${rm.salaries_paid + 1}/12) — $${rm.tier_match} tier`,
            reference_type: 'monthly_salary',
            reference_id:   rm.id,
          },
        })
        await tx.bonus.create({
          data: {
            user_id: rm.user_id,
            type:    'monthly_salary',
            amount:  rm.salary_amt,
            remarks: `Monthly Salary (${rm.salaries_paid + 1}/12)`,
          },
        })

        const newPaid = rm.salaries_paid + 1
        const nextSalary = newPaid < 12 ? getNext5th() : null
        await tx.rewardMatch.update({
          where: { id: rm.id },
          data: {
            salaries_paid:  newPaid,
            last_salary_at: new Date(),
            next_salary_at: nextSalary,
          },
        })
      })
      console.log(`[SalaryCron] Salary $${rm.salary_amt} paid to user #${rm.user_id} (${rm.salaries_paid + 1}/12)`)
    } catch (err) {
      console.error(`[SalaryCron] Error for RewardMatch #${rm.id}:`, err.message)
    }
  }
}

/** Returns the 5th of the next calendar month */
function getNext5th() {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 5, 0, 0, 0)
  return next
}

module.exports = { startROICron, distributeROI, creditPendingRewards, creditMonthlySalaries }
