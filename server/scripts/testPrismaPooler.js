const { PrismaClient } = require('@prisma/client');
const url = `postgres://postgres.gcbuommyucwhrznqkuuf:Life%4020242526@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;

async function testConnection() {
  console.log(`Testing Prisma with URL: ${url}`);
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    const res = await prisma.$queryRaw`SELECT 1 as result`;
    console.log(`✅ Success:`, res);
  } catch (e) {
    console.log(`❌ Failed:`, e.message);
  } finally {
    await prisma.$disconnect();
  }
}
testConnection();
