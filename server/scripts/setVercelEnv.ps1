$env_vars = @{
    "DATABASE_URL"            = "postgresql://postgres:Life@20242526@db.gcbuommyucwhrznqkuuf.supabase.co:5432/postgres"
    "DIRECT_URL"              = "postgresql://postgres:Life@20242526@db.gcbuommyucwhrznqkuuf.supabase.co:5432/postgres"
    "JWT_SECRET"              = "globalfx_secret_key_1234567890_min_64_chars_long_make_sure"
    "JWT_REFRESH_SECRET"      = "globalfx_refresh_secret_key_1234567890_min_64_chars"
    "JWT_EXPIRES_IN"          = "7d"
    "CRON_SECRET"             = "globalfx_cron_secret"
    "CLIENT_URL"              = "https://www.bitlance.cloud"
    "CORS_ORIGINS"            = "https://bitlance.cloud,https://www.bitlance.cloud,https://member.bitlance.cloud,https://admin.bitlance.cloud"
    "SUPABASE_URL"            = "https://gcbuommyucwhrznqkuuf.supabase.co"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYnVvbW15dWN3aHJ6bnFrdXVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODEwNjg3OCwiZXhwIjoyMDkzNjgyODc4fQ.Mrd9Hu3tb_yiZV0NKRSQtd4Ep8L3QUXUUuNt4Wu_SJM"
    "NODE_ENV"                = "production"
}

foreach ($key in $env_vars.Keys) {
    $value = $env_vars[$key]
    Write-Host "Setting $key ..." -ForegroundColor Cyan
    $value | npx vercel env add $key production --force
    Write-Host "  Done." -ForegroundColor Green
}

Write-Host "`nAll environment variables set! Run 'npx vercel --prod' to redeploy." -ForegroundColor Yellow
