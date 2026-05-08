/**
 * Seed Requested Members
 * ─────────────────────────────────────────────────────────────────────────────
 * Registers 5 members with a sequential referral chain.
 *
 * Usage:
 *   node scripts/seedMembersRequested.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })

const bcrypt = require('bcryptjs')
const prisma = require('../lib/prisma')

const MEMBERS = [
  { name: 'Jay Mataji 01', email: 'jaymataji01@gmail.com', phone: '+919876543210', password: 'abcd@1234' },
  { name: 'Jay Mataji 02', email: 'jaymataji02@gmail.com', phone: '+919876543210', password: 'abcd@1234' },
  { name: 'Jay Mataji 03', email: 'jaymataji03@gmail.com', phone: '+919876543210', password: 'abcd@1234' },
  { name: 'Jay Mataji 04', email: 'jaymataji04@gmail.com', phone: '+919876543210', password: 'abcd@1234' },
  { name: 'Jay Mataji 05', email: 'jaymataji05@gmail.com', phone: '+919876543210', password: 'abcd@1234' },
]

/** Generate a unique 6-digit user_id */
async function generateUserId() {
  let id, exists = true
  while (exists) {
    id     = String(Math.floor(100000 + Math.random() * 900000))
    exists = await prisma.user.findUnique({ where: { user_id: id } })
  }
  return id
}

async function main() {
  console.log('\n👥  Registering Requested Members...\n')

  let lastReferralCode = null

  for (const memberData of MEMBERS) {
    console.log(`⏳  Registering: ${memberData.name}...`)
    
    // Resolve sponsor
    let sponsor = null
    if (lastReferralCode) {
      sponsor = await prisma.user.findUnique({ where: { referral_code: lastReferralCode } })
    }

    const user_id       = await generateUserId()
    const password_hash = await bcrypt.hash(memberData.password, 12)
    const referral_code = `${user_id}`

    const user = await prisma.user.create({
      data: {
        user_id,
        name:          memberData.name,
        email:         memberData.email,
        phone:         memberData.phone,
        password_hash,
        referral_code,
        sponsor_id:    sponsor?.id ?? null,
        status:        'active', // Set to active so they can participate immediately
      },
    })

    console.log(`✅  Registered: ${user.name} (User ID: ${user.user_id}, Sponsor: ${sponsor ? sponsor.name : 'None'})`)
    
    // Set this user as the sponsor for the next one
    lastReferralCode = user.referral_code
  }

  console.log('\n✨  All members registered successfully!\n')
}

main()
  .catch((e) => {
    console.error('\n❌  Registration failed:', e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
