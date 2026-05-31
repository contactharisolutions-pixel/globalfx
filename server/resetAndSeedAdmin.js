/**
 * resetAndSeedAdmin.js
 * Cleans all member/transaction data and creates a fresh admin account.
 * Run with: node resetAndSeedAdmin.js
 */

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('🧹 Starting database cleanup...\n');

  // ── 1. Delete data in dependency order ─────────────────────────
  // (child tables first, then parent tables)

  await prisma.ticketReply.deleteMany({});
  console.log('  ✔ Cleared TicketReply');

  await prisma.supportTicket.deleteMany({});
  console.log('  ✔ Cleared SupportTicket');

  await prisma.kycDocument.deleteMany({});
  console.log('  ✔ Cleared KycDocument');

  await prisma.announcement.deleteMany({});
  console.log('  ✔ Cleared Announcement');

  await prisma.roiDistribution.deleteMany({});
  console.log('  ✔ Cleared RoiDistribution');

  await prisma.tradePackage.deleteMany({});
  console.log('  ✔ Cleared TradePackage');

  await prisma.bonus.deleteMany({});
  console.log('  ✔ Cleared Bonus');

  await prisma.incomeLedger.deleteMany({});
  console.log('  ✔ Cleared IncomeLedger');

  await prisma.fundLedger.deleteMany({});
  console.log('  ✔ Cleared FundLedger');

  await prisma.fundTransfer.deleteMany({});
  console.log('  ✔ Cleared FundTransfer');

  await prisma.withdrawal.deleteMany({});
  console.log('  ✔ Cleared Withdrawal');

  await prisma.deposit.deleteMany({});
  console.log('  ✔ Cleared Deposit');

  await prisma.setting.deleteMany({});
  console.log('  ✔ Cleared Setting');

  // Clear sponsor references first to avoid FK constraint issues on User self-relation
  await prisma.user.updateMany({ data: { sponsor_id: null } });
  await prisma.user.deleteMany({});
  console.log('  ✔ Cleared User (members)');

  await prisma.admin.deleteMany({});
  console.log('  ✔ Cleared Admin\n');

  // ── 2. Create fresh admin ───────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@1234', 12);
  const admin = await prisma.admin.create({
    data: {
      name:          'BitLance Admin',
      email:         'admin@bitlance.cloud',
      password_hash: hashedPassword,
      role:          'superadmin',
      is_active:     true,
    },
  });

  console.log('✅ New admin created successfully!');
  console.log('   Email    :', admin.email);
  console.log('   Password : Admin@1234');
  console.log('   Role     :', admin.role);
  console.log('   ID       :', admin.id);
}

run()
  .catch(err => { console.error('❌ Error:', err.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
