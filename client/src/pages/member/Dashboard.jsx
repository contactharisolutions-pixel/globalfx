import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet, DollarSign, TrendingUp, ArrowUpFromLine,
  Users, Copy, RefreshCw, Activity,
  Zap, UserPlus, BarChart3, TrendingDown, ShieldCheck,
  Share2, CheckCheck, Globe, Cpu, ArrowRight, Network,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import useAuthStore, { siteOrigin } from '../../store/useAuthStore'
import { StatCard, Spinner, PageHeader, Panel, PanelTitle } from '../../components/member/ui'
import { CapitalHubTicker, ForexLiveGraph } from '../../components/member/DashboardWidgets'

const QUICK_ACTIONS = [
  { label: 'Add Funds',  to: '/dashboard/topup',     icon: Wallet,         color: '#0d9488' },
  { label: 'Trade Now',  to: '/dashboard/trade',     icon: Zap,            color: '#3b82f6' },
  { label: 'Withdraw',   to: '/dashboard/withdraw',  icon: ArrowUpFromLine, color: '#f97316' },
  { label: 'My Network', to: '/dashboard/genealogy', icon: Users,          color: '#10b981' },
]

export default function Dashboard() {
  const { user, refreshUser } = useAuthStore()
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied,  setCopied]  = useState(false)

  const referralCode = user?.referral_code?.replace('NVX', '') || (user?.user_id ? `${user.user_id}` : '')
  const referralLink = `${siteOrigin()}/register?ref=${referralCode}`

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/member/dashboard')
      setStats(data.stats)
      if (!user?.referral_code && data.user?.referral_code) refreshUser()
    } catch {
      toast.error('Could not load terminal data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDashboard() }, [])

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true); toast.success('Referral link copied!'); setTimeout(() => setCopied(false), 2500)
    })
  }

  const fmt = (n) => `$${(+n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  if (loading) return <Spinner />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* Hero Welcome Section */}
      <div style={{ 
        padding: '3rem', 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: 32, 
        color: '#fff', 
        position: 'relative', 
        overflow: 'hidden',
        boxShadow: '0 32px 64px rgba(0,0,0,0.12)'
      }}>
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', marginBottom: '1.5rem',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999, color: '#10b981', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em'
            }}>
              <ShieldCheck size={14} /> System Verified
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', margin: '0 0 0.75rem' }}>
              Welcome, <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name?.split(' ')[0] || 'Investor'}</span>
            </h1>
            <p style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 600, margin: 0 }}>
              Operational Performance & Asset Analytics Overview
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={fetchDashboard} className="btn-secondary" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: 16 }}>
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link to="/dashboard/trade" className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: 16 }}>
              Execute Trade
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Core Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} id="dash-stats">
        <StatCard label="Available Capital" value={fmt(stats?.fund_wallet)} icon={Wallet} color="primary" sub="Main Wallet" />
        <StatCard label="Income Wallet" value={fmt(stats?.income_wallet)} icon={DollarSign} color="success" sub="Earnings" />
        <StatCard label="Total Yield" value={fmt(stats?.total_roi)} icon={TrendingUp} color="purple" sub="Lifetime ROI" />
        <StatCard label="Team Volume" value={fmt(stats?.total_team_business)} icon={BarChart3} color="accent" sub="Performance" />
      </div>

      {/* Secondary Stats Mini-Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {[
          { label: 'Today ROI', val: fmt(stats?.today_roi), icon: Zap, col: '#0d9488' },
          { label: 'Direct Bonus', val: fmt(stats?.total_sponsor_income), icon: Users, col: '#3b82f6' },
          { label: 'Team Active', val: stats?.active_team ?? 0, icon: ShieldCheck, col: '#10b981' },
          { label: 'Network Size', val: stats?.team_total ?? 0, icon: Network, col: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '1.25rem 1.5rem', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 20, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.col}10`, color: s.col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }} id="dash-main-row">
        
        {/* Chart Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Panel style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '1.5rem 2rem', background: '#fff', borderBottom: '1.5px solid #f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <PanelTitle icon={TrendingUp}>BTC/USD Live Terminal</PanelTitle>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['1m', '5m', '15m', '1h'].map(t => (
                  <span key={t} style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', fontWeight: 900, background: t === '1h' ? '#0d9488' : '#f8fafc', color: t === '1h' ? '#fff' : '#64748b', borderRadius: 6, cursor: 'pointer' }}>{t}</span>
                ))}
              </div>
            </div>
            <ForexLiveGraph symbol="BITSTAMP:BTCUSD" />
          </Panel>

          {/* Quick Transaction Hub */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {QUICK_ACTIONS.map(({ label, to, icon: Icon, color }) => (
              <Link key={label} to={to} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.5rem', background: '#fff', border: '1.5px solid #f1f5f9',
                borderRadius: 24, textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative', overflow: 'hidden'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${color}10` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 16, background: `${color}10`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                  <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: '1rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Execute now</p>
                </div>
                <ArrowRight size={18} style={{ color: '#e2e8f0' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Referral Card */}
          <Panel style={{ background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)', border: 'none', color: '#fff', padding: '2rem' }}>
            <PanelTitle icon={Share2}><span style={{ color: '#fff' }}>Referral Ecosystem</span></PanelTitle>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Scale your earnings by inviting partners to the GlobalFX trading infrastructure.
            </p>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <input
                readOnly value={referralLink}
                style={{ width: '100%', padding: '1rem 3rem 1rem 1rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: '#fff', fontSize: '0.75rem', fontWeight: 700, outline: 'none' }}
              />
              <button onClick={copyReferral} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#10b981', cursor: 'pointer' }}>
                {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>ID: </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 900, color: '#fff' }}>{referralCode}</span>
              </div>
              <button onClick={() => { if (navigator.share) navigator.share({ title: 'GlobalFX', text: 'Join my team', url: referralLink }); else copyReferral() }}
                style={{ padding: '0.6rem 1.25rem', background: '#fff', color: '#0d9488', borderRadius: 10, fontSize: '0.75rem', fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={14} /> Share Link
              </button>
            </div>
          </Panel>

          {/* AI Signal Core */}
          <Panel style={{ background: '#0f172a', border: 'none', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(13,148,136,0.15)', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={24} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>Neural Logic Core</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>Synchronized</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {[
                { label: 'Algorithm Accuracy', val: '94.8%', icon: Activity },
                { label: 'Neural Latency', val: '0.04ms', icon: Zap },
                { label: 'Active Strategy', val: 'HyperScalp V4', icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <item.icon size={16} style={{ color: '#475569' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 900, color: '#fff' }}>{item.val}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        @media (max-width: 1279px) { #dash-stats { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 1023px) { #dash-main-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #dash-stats { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
