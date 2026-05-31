/**
 * cron.js — Cron Trigger Routes
 *
 * Wires all BitLance income engines together.
 * Called daily by Vercel Cron / external scheduler at /api/cron/run.
 */

const router = require('express').Router()

const { distributeROI, creditPendingRewards, creditMonthlySalaries } = require('../services/roiCron')
const { processBusinessMatch }    = require('../services/rewardEngine')
const { processCorporateRoyalty } = require('../services/royaltyEngine')
const { processMonsoonBonanza }   = require('../services/monsoonEngine')

/** Secret guard */
function verifyCronSecret(req, res, next) {
  const secret = process.env.CRON_SECRET
  if (!secret) return res.status(500).json({ error: 'CRON_SECRET not configured' })

  const fromHeader = req.headers['x-cron-secret']
  const fromQuery  = req.query.secret
  const fromBearer = req.headers['authorization']?.replace('Bearer ', '')

  if (fromHeader === secret || fromQuery === secret || fromBearer === secret) {
    return next()
  }
  return res.status(401).json({ error: 'Unauthorized — invalid cron secret' })
}

// ── POST /api/cron/run ─────────────────────────────────────────
// Main daily cron — runs all income engines
router.all('/run', verifyCronSecret, async (req, res) => {
  const startTime = Date.now()
  const results   = {}

  try {
    const now = new Date()
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
    const istNow  = new Date(now.getTime() + IST_OFFSET_MS)
    const date    = istNow.getUTCDate()  // day of month in IST

    console.log(`[CronTrigger] Daily run — IST: ${istNow.toISOString()}, date=${date}`)

    // 1. Daily Compounding ROI — every day (Mon–Sun)
    await distributeROI()
    results.daily_roi = 'completed'

    // 2. Business Match Reward check — every day
    await processBusinessMatch()
    results.business_match = 'completed'

    // 3. Corporate Royalty check — every day
    await processCorporateRoyalty()
    results.corporate_royalty = 'completed'

    // 4. Monsoon Bonanza check — every day
    await processMonsoonBonanza()
    results.monsoon_bonanza = 'completed'

    // 5. Credit pending rewards (72h elapsed) — every day
    await creditPendingRewards()
    results.pending_rewards = 'completed'

    // 6. Monthly salary — only on 5th of month
    if (date === 5) {
      await creditMonthlySalaries(date)
      results.monthly_salary = 'completed'
    } else {
      results.monthly_salary = `skipped (not 5th — today is ${date}th)`
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[CronTrigger] Completed in ${duration}s`, results)

    res.json({ success: true, duration: `${duration}s`, ran_at: now.toISOString(), results })
  } catch (err) {
    console.error('[CronTrigger] Fatal error:', err.message)
    res.status(500).json({ success: false, error: err.message, results })
  }
})

// ── POST /api/cron/run-roi-only ────────────────────────────────
// Manual trigger: ROI only (for testing/backfill)
router.all('/run-roi-only', verifyCronSecret, async (req, res) => {
  try {
    await distributeROI()
    res.json({ success: true, message: 'ROI distribution completed' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// ── POST /api/cron/run-match ───────────────────────────────────
// Manual trigger: Business match + royalty + monsoon check
router.all('/run-match', verifyCronSecret, async (req, res) => {
  const results = {}
  try {
    await processBusinessMatch()
    results.business_match = 'completed'
    await processCorporateRoyalty()
    results.corporate_royalty = 'completed'
    await processMonsoonBonanza()
    results.monsoon_bonanza = 'completed'
    await creditPendingRewards()
    results.pending_rewards = 'completed'
    res.json({ success: true, results })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, results })
  }
})

// ── GET /api/cron/health ───────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), engine: 'BitLance Income Engine v2' })
})

module.exports = router
