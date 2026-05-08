const { PrismaClient } = require('@prisma/client');

const regions = ['us-east-1', 'us-west-1', 'eu-central-1', 'eu-west-1', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'sa-east-1'];

async function testAll() {
  for (const awsVer of ['aws-0', 'aws-1']) {
    for (const region of regions) {
      const url = `postgres://postgres.gcbuommyucwhrznqkuuf:Life%4020242526@${awsVer}-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;
      console.log(`Testing ${awsVer}-${region}...`);
      const prisma = new PrismaClient({ datasources: { db: { url } } });
      try {
        await prisma.$queryRaw`SELECT 1`;
        console.log(`✅✅✅ SUCCESS: ${url}`);
        return;
      } catch (e) {
        if (!e.message.includes('Tenant or user not found')) {
           console.log(`Interesting error on ${awsVer}-${region}:`, e.message);
        }
      } finally {
        await prisma.$disconnect();
      }
    }
  }
}
testAll();
