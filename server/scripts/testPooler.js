const { PrismaClient } = require('@prisma/client');
const regions = ['us-east-1', 'us-west-1', 'eu-central-1', 'eu-west-1', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'sa-east-1'];

async function testConnection() {
  for (const region of regions) {
    const url = `postgresql://postgres.gcbuommyucwhrznqkuuf:Life%4020242526@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
    console.log(`Testing region ${region}...`);
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      await prisma.$connect();
      console.log(`✅ Success in region: ${region}`);
      await prisma.$disconnect();
      return url;
    } catch (e) {
      console.log(`❌ Failed in region: ${region}`);
    }
  }
}
testConnection();
