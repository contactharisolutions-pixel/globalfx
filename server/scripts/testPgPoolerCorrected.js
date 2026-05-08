const { Client } = require('pg');
const regions = ['us-east-1', 'us-west-1', 'eu-central-1', 'eu-west-1', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'sa-east-1'];

async function testConnection() {
  for (const awsVer of ['aws-0', 'aws-1']) {
    for (const region of regions) {
      const url = `postgres://postgres.gcbuommyucwhrznqkuuf:Life%4020242526@${awsVer}-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
      console.log(`Testing ${awsVer}-${region}...`);
      
      const client = new Client({
        connectionString: url,
        ssl: { rejectUnauthorized: false }
      });

      try {
        await client.connect();
        console.log(`✅✅✅ SUCCESS in region: ${awsVer}-${region}`);
        await client.end();
        return url;
      } catch (e) {
        if (!e.message.includes('Tenant or user not found')) {
           console.log(`❌ Interesting Failed on ${awsVer}-${region}:`, e.message);
        }
      }
    }
  }
}
testConnection();
