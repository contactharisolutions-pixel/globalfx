import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet, DollarSign, TrendingUp, ArrowUpFromLine,
  Users, Copy, RefreshCw, Activity, Zap, BarChart3,
  ShieldCheck, Share2, CheckCheck, Globe, ArrowRight,
  Network, Award, Clock, ChevronRight,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import useAuthStore, { siteOrigin } from '../../store/useAuthStore'
import { StatCard, Spinner, Panel } from '../../components/member/ui'
import { CapitalHubTicker, ForexLiveGraph } from '../../components/member/DashboardWidgets'

const QUICK_ACTIONS = [
  { label: 'Add Funds',    to: '/dashboard/topup',     icon: Wallet,          color: '#0d9488', bg: '#f0fdfa', desc: 'Deposit USDT'    },
  { label: 'Invest Now',   to: '/dashboard/trade',     icon: TrendingUp,      color: '#3b82f6', bg: '#eff6ff', desc: 'Start earning'   },
  { label: 'Withdraw',     to: '/dashboard/withdraw',  icon: ArrowUpFromLine, color: '#f97316', bg: '#fff7ed', desc: 'Cash out funds'  },
  { label: 'My Network',   to: '/dashboard/genealogy', icon: Users,           color: '#7c3aed', bg: '#f5f3ff', desc: 'View your team'  },
]

export default function Dashboard() {
  const { user, refreshUser } = useAuthStore()
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied,  setCopied]  = useState(false)

  const referralCode = user?.referral_code || user?.user_id || ''
  const referralLink = `${siteOrigin()}/register?ref=${referralCode}`

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/member/dashboard')
      setStats(data.stats)
      if (!user?.referral_code && data.user?.referral_code) refreshUser()
    } catch {
      toast.error('Could not load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDashboard() }, [])

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true)
      toast.success('Referral link copied!')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const fmt  = (n) => `$${(+n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const fmtN = (n) => (+n || 0).toLocaleString()

  if (loading) return <Spinner />

  const isActive = user?.status === 'active'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Welcome Banner */}
      <div style={{
        padding: '2rem 2.5rem',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        borderRadius: 24,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
      }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-40%', right: '-5%', width: 280, height: 280, background: 'radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '20%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: isActive ? '#10b981' : '#ef4444',
                boxShadow: `0 0 10px ${isActive ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)'}`,
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: isActive ? '#10b981' : '#ef4444', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Account {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 900, color: '#ffffff',
              fontFamily: 'Outfit, sans-serif',
              margin: '0 0 0.5rem',
              lineHeight: 1.2, letterSpacing: '-0.02em',
            }}>
              Welcome back, <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{user?.name?.split(' ')[0] || 'Member'}</span>
            </h1>
            <p style={{ fontSize: '0.9375rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>
              Your portfolio at a glance. Last refreshed just now.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={fetchDashboard}
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s',
              }}
              title="Refresh data"
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#94a3b8' }}
            >
              <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
            <Link to="/dashboard/trade" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6875rem 1.5rem',
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              color: '#fff', borderRadius: 12, textDecoration: 'none',
              fontWeight: 700, fontSize: '0.875rem',
              boxShadow: '0 4px 16px rgba(13,148,136,0.4)',
              transition: 'all 0.2s',
            }}>
              <Zap size={16} />
              Start Investing
            </Link>
          </div>
        </div>
      </div>

      {/* Main KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} id="dash-stats">
        <StatCard label="Deposit Wallet"   value={fmt(stats?.fund_wallet)}           icon={Wallet}     color="cyan"   sub="Available"  />
        <StatCard label="Earnings Wallet"  value={fmt(stats?.income_wallet)}          icon={DollarSign} color="green"  sub="Earned"    />
        <StatCard label="Active Packages"  value={fmt(stats?.total_active_packages)}  icon={Zap}        color="orange" sub="Working"   />
        <StatCard label="Team Investment"  value={fmt(stats?.total_team_business)}    icon={BarChart3}  color="blue"   sub="Volume"    />
      </div>

      {/* Income Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} id="dash-income">
        <StatCard label="Total ROI"            value={fmt(stats?.total_roi)}            icon={TrendingUp} color="purple" sub="Packages"  />
        <StatCard label="Total Sponsor Income" value={fmt(stats?.total_sponsor_income)} icon={Users}      color="green"  sub="Direct"    />
        <StatCard label="Total Level Income"   value={fmt(stats?.total_level_income)}   icon={Network}    color="blue"   sub="Network"   />
        <StatCard label="Total Profit"         value={fmt(stats?.total_earning)}        icon={Award}      color="orange" sub="All Time"  />
      </div>

      {/* Secondary Stat Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} id="dash-secondary">
        {[
          { label: "Today's ROI",       val: fmt(stats?.today_roi),               color: '#0d9488', bg: '#f0fdfa', icon: Zap           },
          { label: "Today's Business",  val: fmt(stats?.today_business),          color: '#3b82f6', bg: '#eff6ff', icon: BarChart3      },
          { label: 'Active Members',    val: fmtN(stats?.active_team),            color: '#10b981', bg: '#f0fdf4', icon: ShieldCheck   },
          { label: 'Total Team',        val: fmtN(stats?.team_total),             color: '#7c3aed', bg: '#f5f3ff', icon: Network       },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '1.125rem 1.375rem',
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
            className="card-hover"
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={18} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}>{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Two-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }} id="dash-main-row">

        {/* Left: Chart + Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Live Chart */}
          <Panel style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>BTC/USD Live Chart</p>
                <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Real-time price feed</p>
              </div>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['1h', '4h', '1d'].map(t => (
                  <span key={t} style={{
                    padding: '0.25rem 0.625rem', fontSize: '0.6875rem', fontWeight: 700,
                    background: t === '1h' ? '#0d9488' : '#f8fafc',
                    color: t === '1h' ? '#fff' : '#64748b',
                    borderRadius: 8, cursor: 'pointer',
                    border: t === '1h' ? 'none' : '1px solid #e2e8f0',
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <ForexLiveGraph symbol="BITSTAMP:BTCUSD" />
          </Panel>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
            {QUICK_ACTIONS.map(({ label, to, icon: Icon, color, bg, desc }) => (
              <Link key={label} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.25rem 1.5rem',
                background: '#ffffff',
                border: `1.5px solid #e2e8f0`,
                borderRadius: 16, textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color
                  e.currentTarget.style.background = bg
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = `0 8px 24px ${color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f0'
                  e.currentTarget.style.background = '#ffffff'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} style={{ color }} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{label}</p>
                  <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{desc}</p>
                </div>
                <ChevronRight size={16} style={{ color: '#cbd5e1', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Referral + System Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Referral Card */}
          <div style={{
            padding: '1.75rem',
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            borderRadius: 20,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(13,148,136,0.3)',
          }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 160, height: 160, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.125rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={16} />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', fontFamily: 'Outfit, sans-serif' }}>Invite & Earn</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>Share your referral link</p>
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Earn a bonus every time someone joins using your link and starts investing.
              </p>

              {/* Referral ID Chip */}
              <div style={{ marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your ID:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 900, background: 'rgba(255,255,255,0.15)', padding: '0.125rem 0.625rem', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace' }}>{referralCode}</span>
              </div>

              {/* Link Box */}
              <div style={{ position: 'relative', marginBottom: '1.125rem' }}>
                <input
                  readOnly
                  value={referralLink}
                  style={{
                    width: '100%', padding: '0.75rem 3rem 0.75rem 0.875rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 10, color: 'rgba(255,255,255,0.85)',
                    fontSize: '0.6875rem', fontWeight: 600, outline: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                />
                <button onClick={copyReferral} style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: copied ? '#10b981' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s',
                }}>
                  {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
                </button>
              </div>

              <button
                onClick={() => { if (navigator.share) navigator.share({ title: 'BitLance', url: referralLink }); else copyReferral() }}
                style={{
                  width: '100%', padding: '0.75rem',
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 10, color: '#fff',
                  fontSize: '0.8125rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              >
                <Globe size={15} /> Share My Link
              </button>
            </div>
          </div>

          {/* Platform Status Card */}
          <Panel>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>Platform Status</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Live performance indicators</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Daily Return Rate', val: '2.0% / day', color: '#0d9488' },
                { label: 'Investment Cap',    val: '$5,000',      color: '#3b82f6' },
                { label: 'Minimum Deposit',   val: '$25',         color: '#7c3aed' },
                { label: 'Profit Multiplier', val: '2× Returns',  color: '#f59e0b' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: '#f8fafc',
                  borderRadius: 10,
                  border: '1px solid #f1f5f9',
                }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: item.color }}>{item.val}</span>
                </div>
              ))}
            </div>

            <Link to="/dashboard/trade" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginTop: '1.25rem', padding: '0.75rem',
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              color: '#fff', borderRadius: 12, textDecoration: 'none',
              fontWeight: 700, fontSize: '0.875rem',
              boxShadow: '0 4px 14px rgba(13,148,136,0.3)',
            }}>
              <Zap size={16} />
              Start Investing Now
            </Link>
          </Panel>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.5); } }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @media (max-width: 1279px) { #dash-stats, #dash-income { grid-template-columns: repeat(2, 1fr) !important; } #dash-secondary { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 1023px) { #dash-main-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #dash-stats, #dash-income { grid-template-columns: 1fr !important; } #dash-secondary { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
