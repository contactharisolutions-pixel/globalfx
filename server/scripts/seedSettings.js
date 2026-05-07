const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding business settings...')

  const settings = [
    {
      key: 'direct_bonus_pct',
      value: '5',
      description: 'Direct referral bonus percentage paid on package activation'
    },
    {
      key: 'level_bonus_rates',
      value: JSON.stringify([0, 25, 20, 15, 10, 5]),
      description: 'ROI Matching Bonus percentages for levels 1-5'
    },
    {
      key: 'withdrawal_fee_pct',
      value: '10',
      description: 'Platform fee percentage deducted from withdrawals'
    },
    {
      key: 'min_investment',
      value: '25',
      description: 'Minimum investment amount allowed ($)'
    },
    {
      key: 'min_withdrawal',
      value: '20',
      description: 'Minimum withdrawal amount allowed ($)'
    }
  ]

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s
    })
    console.log(`✅ Setting [${s.key}] initialized.`)
  }

  console.log('✨ Business settings seeding completed.')
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
