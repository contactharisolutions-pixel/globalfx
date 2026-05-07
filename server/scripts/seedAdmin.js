/**
 * Admin Seeder Script
 * Creates the first superadmin account.
 *
 * Usage:
 *   node server/scripts/seedAdmin.js
 *
 * Set credentials via env vars or edit defaults below.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })

const bcrypt = require('bcryptjs')
const prisma = require('../lib/prisma')
const ADMIN_NAME     = process.env.SEED_ADMIN_NAME  || 'Super Admin'
const ADMIN_EMAIL    = process.env.SEED_ADMIN_EMAIL  || 'admin@globalfx.vip'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASS   || 'Admin@GlobalFX2024!'

async function main() {
  console.log('\n🌱  GlobalFX Admin Seeder\n')

  const password_hash = await bcrypt.hash(ADMIN_PASSWORD, 12)

  const admin = await prisma.admin.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password_hash,
      is_active: true,
    },
    create: {
      name:          ADMIN_NAME,
      email:         ADMIN_EMAIL,
      password_hash,
      role:          'superadmin',
      is_active:     true,
    },
  })

  // Seed default platform settings (Synced with central ranks.js and documentation)
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

  console.log('✅  Admin created:')
  console.log(`    ID:       ${admin.id}`)
  console.log(`    Name:     ${admin.name}`)
  console.log(`    Email:    ${admin.email}`)
  console.log(`    Password: ${ADMIN_PASSWORD}`)
  console.log(`    Role:     ${admin.role}`)
  console.log(`\n✅  Default platform settings seeded (${Object.keys(DEFAULT_SETTINGS).length} keys)`)
  console.log('\n🔐  Change the password after first login!\n')
}

main()
  .catch((e) => { console.error('❌ Seeder failed:', e.message); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
