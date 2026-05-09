/**
 * Fix Incomplete Activations
 * 
 * For users who are 'active' and have funds in 'fund_wallet_balance' 
 * but NO 'tradePackage', this script will:
 * 1. Create the missing tradePackage.
 * 2. Deduct the amount from fund_wallet_balance.
 * 3. Log the operation in fundLedger.
 */

require('dotenv').config()
const prisma = require('../lib/prisma')

async function fix() {
  console.log('🔍 Auditing active members with missing packages...')
  
  const activeUsers = await prisma.user.findMany({
    where: { 
      status: 'active',
      fund_wallet_balance: { gt: 0 }
    },
    include: { packages: true }
  })

  const toFix = activeUsers.filter(u => u.packages.length === 0)
  console.log(`Found ${toFix.length} users needing package creation.`)

  for (const user of toFix) {
    const amount = parseFloat(user.fund_wallet_balance)
    const maxReturn = amount * 2
    
    console.log(`Fixing User ${user.user_id} (${user.name}) - Amount: $${amount}`)

    try {
      await prisma.$transaction(async (tx) => {
        // 1. Create Package
        await tx.tradePackage.create({
          data: {
            user_id:           user.id,
            amount:            amount,
            daily_roi_percent: 2.0,
            max_return:        maxReturn,
            status:            'active',
            started_at:        new Date(user.updated_at || user.created_at) // Use activation date if possible
          }
        })

        // 2. Deduct Balance
        await tx.user.update({
          where: { id: user.id },
          data:  { fund_wallet_balance: 0 }
        })

        // 3. Log Ledger
        await tx.fundLedger.create({
          data: {
            user_id:        user.id,
            type:           'debit',
            amount:         amount,
            balance_after:  0,
            remarks:        'System Correction: Missing package creation for active member',
            reference_type: 'correction'
          }
        })
      })
      console.log(`✅ Fixed User ${user.user_id}`)
    } catch (err) {
      console.error(`❌ Failed to fix User ${user.user_id}:`, err.message)
    }
  }

  console.log('\nAudit and Fix complete.')
}

fix().then(() => prisma.$disconnect())
