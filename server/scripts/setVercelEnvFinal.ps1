# Set Environment Variables for GlobalFX Production on Vercel
$envVars = @{
    "DATABASE_URL" = "postgresql://postgres:Life@20242526@db.gcbuommyucwhrznqkuuf.supabase.co:5432/postgres"
    "DIRECT_URL" = "postgresql://postgres:Life@20242526@db.gcbuommyucwhrznqkuuf.supabase.co:5432/postgres"
    "JWT_SECRET" = "globalfx_secret_key_1234567890_min_64_chars_long_make_sure"
    "JWT_REFRESH_SECRET" = "globalfx_refresh_secret_key_1234567890_min_64_chars"
    "JWT_EXPIRES_IN" = "7d"
    "SUPABASE_URL" = "https://gcbuommyucwhrznqkuuf.supabase.co"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYnVvbW15dWN3aHJ6bnFrdXVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODEwNjg3OCwiZXhwIjoyMDkzNjgyODc4fQ.Mrd9Hu3tb_yiZV0NKRSQtd4Ep8L3QUXUUuNt4Wu_SJM"
    "CORS_ORIGINS" = "https://globalfx.pro,https://www.globalfx.pro"
    "CLIENT_URL" = "https://globalfx.pro"
    "CRON_SECRET" = "globalfx_cron_secret"
    "NODE_ENV" = "production"
}

foreach ($name in $envVars.Keys) {
    $value = $envVars[$name]
    Write-Host "Setting $name..."
    $value | npx vercel env add $name production --force
}
