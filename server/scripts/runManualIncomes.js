/**
 * Manual Income Calculation Runner
 * This script runs all daily/monthly income distributions manually.
 * 
 * Usage: node scripts/runManualIncomes.js
 */

require('dotenv').config()
const prisma = require('../lib/prisma')
const { distributeROI } = require('../services/roiCron')
const { processRewards, matureRewards } = require('../services/rewardEngine')
const { updateRoyaltyRanks, distributeMonthlyRoyalty } = require('../services/royaltyEngine')

async function run() {
  console.log('🚀 Starting Manual Income Calculations...')
  const startTime = Date.now()
  
  try {
    // 1. Daily ROI Distribution
    // This will process all active packages that haven't received ROI TODAY.
    console.log('\n--- [1/4] Daily ROI Distribution ---')
    await distributeROI()

    // 2. Reward Maturation
    // This credits rewards to income wallet if they were awarded > 30 days ago.
    console.log('\n--- [2/4] Reward Maturation ---')
    await matureRewards()

    // 3. Performance Rank Updates
    // This checks user business volume and awards new ranks/rewards.
    console.log('\n--- [3/4] Performance Rank & Reward Processing ---')
    await processRewards()

    // 4. Royalty Rank Updates
    // This updates the royalty_rank based on team business.
    console.log('\n--- [4/4] Royalty Rank Updates ---')
    await updateRoyaltyRanks()

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`\n✅ Manual income calculations completed in ${duration}s`)
    
    console.log('\nNOTE: Monthly Royalty Distribution was NOT run because it is a once-a-month operation.')
    console.log('If you need to run it, please run: node scripts/runMonthlyRoyalty.js')

  } catch (error) {
    console.error('\n❌ Error during manual income run:', error)
  } finally {
    await prisma.$disconnect()
  }
}

run()
