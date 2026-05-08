/**
 * System Reset & Admin Seeder
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Deletes ALL member and transactional data.
 * 2. Deletes ALL existing admin accounts.
 * 3. Creates the requested Super Admin account.
 *
 * Usage:
 *   node scripts/resetSystem.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })

const bcrypt = require('bcryptjs')
const prisma = require('../lib/prisma')

const NEW_ADMIN_EMAIL = 'admin@globalfx.pro'
const NEW_ADMIN_PASS  = 'Globalfx@2026'
const NEW_ADMIN_NAME  = 'Super Admin'

async function main() {
  console.log('\n🚀  GlobalFX System Reset Starting...\n')

  // ── 1. Delete Child Records ───────────────────────────────────────────────
  console.log('🗑️  Cleaning transactional data...')
  
  await prisma.roiDistribution.deleteMany({})
  await prisma.ticketReply.deleteMany({})
  await prisma.bonus.deleteMany({})
  await prisma.incomeLedger.deleteMany({})
  await prisma.fundLedger.deleteMany({})
  await prisma.fundTransfer.deleteMany({})
  await prisma.kycDocument.deleteMany({})
  await prisma.announcement.deleteMany({})
  await prisma.supportTicket.deleteMany({})
  await prisma.tradePackage.deleteMany({})
  await prisma.withdrawal.deleteMany({})
  await prisma.deposit.deleteMany({})

  // ── 2. Delete All Users ──────────────────────────────────────────────────
  const userCount = await prisma.user.deleteMany({})
  console.log(`✅  Deleted ${userCount.count} users.`)

  // ── 3. Delete All Admins ─────────────────────────────────────────────────
  console.log('🗑️  Cleaning existing admin accounts...')
  const adminCount = await prisma.admin.deleteMany({})
  console.log(`✅  Deleted ${adminCount.count} admin accounts.`)

  // ── 4. Create New Super Admin ────────────────────────────────────────────
  console.log(`🌱  Seeding new Super Admin: ${NEW_ADMIN_EMAIL}...`)
  
  const password_hash = await bcrypt.hash(NEW_ADMIN_PASS, 12)
  
  const admin = await prisma.admin.create({
    data: {
      name:          NEW_ADMIN_NAME,
      email:         NEW_ADMIN_EMAIL,
      password_hash,
      role:          'superadmin',
      is_active:     true,
    },
  })

  // ── 5. Seed Default Settings ─────────────────────────────────────────────
  console.log('⚙️  Resetting platform settings...')
  const DEFAULT_SETTINGS = {
    direct_bonus_pct:       '5',
    level_bonus_rates:      JSON.stringify([0, 25, 20, 15, 10, 5]),
    withdrawal_fee_pct:     '10',
    min_withdrawal:         '20',
    max_withdrawal:         '5000',
    withdrawal_days:        'mon,tue,wed,thu,fri',
    min_investment:         '25',
    roi_cap_multiplier:     '2.0',
    maintenance_mode:       'off',
    deposit_wallet_address: '',
  }

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await prisma.setting.upsert({
      where:  { key },
      update: { value, updated_by: admin.id },
      create: { key, value, updated_by: admin.id },
    })
  }

  console.log('\n✨  SYSTEM RESET COMPLETE  ✨')
  console.log('─────────────────────────────────')
  console.log(`Email    : ${admin.email}`)
  console.log(`Password : ${NEW_ADMIN_PASS}`)
  console.log('─────────────────────────────────\n')
}

main()
  .catch((e) => {
    console.error('\n❌  Reset failed:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
