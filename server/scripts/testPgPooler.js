const { Client } = require('pg');
const regions = ['us-east-1', 'us-west-1', 'eu-central-1', 'eu-west-1', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'sa-east-1'];

async function testConnection() {
  for (const region of regions) {
    const url = `postgres://postgres.gcbuommyucwhrznqkuuf:Life%4020242526@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true`;
    console.log(`Testing region ${region}...`);
    const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
    try {
      await client.connect();
      console.log(`✅ Success in region: ${region}`);
      await client.end();
      return url;
    } catch (e) {
      console.log(`❌ Failed: ${e.message}`);
    }
  }
}
testConnection();
