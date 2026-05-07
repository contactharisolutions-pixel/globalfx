const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function run() {
  // Check admins
  const admins = await prisma.admin.findMany({
    select: { id: true, email: true, name: true, role: true, is_active: true, password_hash: true }
  });
  console.log('\n=== ADMINS IN DB ===');
  console.log(JSON.stringify(admins.map(a => ({...a, password_hash: a.password_hash?.slice(0,20)+'...'})), null, 2));

  // Test password comparison
  if (admins.length > 0) {
    const a = admins[0];
    const valid = await bcrypt.compare('Life@20242526', a.password_hash);
    console.log(`\nPassword 'Life@20242526' valid for ${a.email}:`, valid);
  }

  // Check what URL the client is calling
  const envPath = require('path').join(__dirname, '../client/.env');
  const fs = require('fs');
  if (fs.existsSync(envPath)) {
    console.log('\n=== CLIENT .env ===');
    console.log(fs.readFileSync(envPath, 'utf-8'));
  } else {
    console.log('\nNo client .env found at', envPath);
    // check for .env.local
    const envLocal = envPath + '.local';
    if (fs.existsSync(envLocal)) {
      console.log('Found .env.local:');
      console.log(fs.readFileSync(envLocal, 'utf-8'));
    }
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
