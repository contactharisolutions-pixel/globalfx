import { useEffect, useState } from 'react'
import {
  TrendingUp, Wallet, DollarSign, ShieldCheck,
  Loader2, Info, Activity, RefreshCw, CheckCircle,
  Lock,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import useAuthStore from '../../store/useAuthStore'
import { PageHeader, Spinner, Panel, DataTable, Badge } from '../../components/member/ui'

// Fixed package amounts per Incomeengine.md
const FIXED_PACKAGES = [150, 300, 500, 1000, 2000, 5000]

// Sponsor income table (L1, L2, L3)
const SPONSOR_TABLE = {
  150:  [10, 12, 5],
  300:  [20, 25, 8],
  500:  [30, 35, 10],
  1000: [80, 85, 15],
  2000: [110, 120, 25],
  5000: [270, 280, 80],
}

const INVESTMENT_HIGHLIGHTS = [
  { label: 'Daily ROI',      value: '2% Compounding', color: '#02d8dc', bg: 'rgba(2,216,220,0.08)' },
  { label: 'Duration',       value: 'Unlimited Days', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { label: 'Income Lock',    value: '60 Days',         color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { label: 'Capital Penalty',value: '30% if <30 Days', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
]

const PACKAGE_COLS = [
  { key: 'amount',              label: 'Package',   render: (v) => <span style={{ fontWeight: 800, color: '#ffffff' }}>${(+v).toLocaleString()}</span> },
  { key: 'total_earned',        label: 'Earned',    render: (v) => <span style={{ color: 'var(--green)', fontWeight: 700 }}>${(+v).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> },
  { key: 'income_locked_until', label: 'Income Unlock', render: (v) => v ? <span style={{ color: 'var(--orange)', fontSize: '0.8rem' }}>{new Date(v).toLocaleDateString()}</span> : <span style={{ color: 'var(--text-muted)' }}>—</span> },
  { key: 'status',              label: 'Status',    render: (v) => <Badge status={v} /> },
  { key: 'started_at',          label: 'Started',   render: (v) => <span style={{ fontSize: '0.8125rem', color: 'var(--text-faint)' }}>{new Date(v).toLocaleDateString()}</span> },
]

export default function TradePage() {
  const { user }                    = useAuthStore()
  const [wallets, setWallets]       = useState({ fund_wallet: 0, income_wallet: 0 })
  const [packages, setPackages]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [amount, setAmount]         = useState('500')
  const [source, setSource]         = useState('fund_wallet')
  const [pin, setPin]               = useState('')
  const [success, setSuccess]       = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const [dashRes, pkgRes] = await Promise.all([
        api.get('/member/dashboard'),
        api.get('/trades/active'),
      ])
      setWallets(dashRes.data.stats)
      setPackages(pkgRes.data.packages || [])
    } catch {
      toast.error('Could not load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const amt = +amount
    if (!FIXED_PACKAGES.includes(amt)) return toast.error(`Select a valid package: $${FIXED_PACKAGES.join(', $')}`)
    if (!pin || pin.length !== 6)       return toast.error('Enter your 6-digit PIN')

    const bal = parseFloat(wallets[source] || 0)
    if (amt > bal) return toast.error('Not enough balance in selected wallet')

    setSubmitting(true)
    try {
      await api.post('/trades/invest', { amount: amt, source: source === 'fund_wallet' ? 'fund' : 'income', pin })
      toast.success('Package activated! Compounding ROI starts today.')
      useAuthStore.getState().refreshUser()
      setAmount('500')
      setPin('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      loadData()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Investment failed. Check your PIN and balance.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner />

  const selectedBalance = parseFloat(wallets[source] || 0)

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Start Investing"
        subtitle="Choose an amount, select your wallet, and activate your investment"
        action={
          <button onClick={loadData} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
            <RefreshCw size={14} /> Refresh
          </button>
        }
      />

      {/* Investment Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} id="trade-highlights">
        {INVESTMENT_HIGHLIGHTS.map((h, i) => (
          <div key={i} style={{
            padding: '1rem 1.25rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: '0.875rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: h.color, flexShrink: 0, boxShadow: `0 0 8px ${h.color}40` }} />
            <div>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.125rem' }}>{h.label}</p>
              <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 900, color: h.color }}>{h.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }} id="trade-layout">

        {/* Left: Investment Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Wallet Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} id="trade-wallets">
            {[
              { key: 'fund_wallet',   label: 'Deposit Wallet',  icon: Wallet,     color: '#02d8dc', bg: 'rgba(2,216,220,0.08)', border: 'rgba(2,216,220,0.2)'  },
              { key: 'income_wallet', label: 'Earnings Wallet', icon: DollarSign, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
            ].map(({ key, label, icon: Icon, color, bg, border }) => {
              const selected = source === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSource(key)}
                  style={{
                    padding: '1.25rem',
                    background: selected ? bg : 'var(--bg-card)',
                    border: `2px solid ${selected ? color : 'var(--border-subtle)'}`,
                    borderRadius: 16, textAlign: 'left',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    boxShadow: selected ? `0 4px 20px ${border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: selected ? color : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={15} style={{ color: selected ? '#fff' : 'var(--text-muted)' }} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: selected ? color : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '1.375rem', fontWeight: 900, color: selected ? color : '#ffffff', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                    ${(+wallets[key]).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  {selected && (
                    <p style={{ margin: '0.375rem 0 0', fontSize: '0.6875rem', color: color, fontWeight: 700 }}>
                      ✓ Selected
                    </p>
                  )}
                </button>
              )
            })}
          </div>

          {/* Form */}
          <Panel>
            <h3 style={{ margin: '0 0 1.5rem', fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              Investment Amount
            </h3>

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Fixed Package Buttons */}
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Select Package</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
                  {FIXED_PACKAGES.map((v) => {
                    const [l1, l2, l3] = SPONSOR_TABLE[v]
                    const selected = amount === v.toString()
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAmount(v.toString())}
                        style={{
                          padding: '0.875rem 0.5rem', fontSize: '0.9rem', fontWeight: 800,
                          borderRadius: 12, border: `2px solid ${selected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                          background: selected ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                          color: selected ? 'var(--primary)' : '#ffffff',
                          cursor: 'pointer', transition: 'all 0.2s',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                        }}
                      >
                        <span>${v.toLocaleString()}</span>
                        <span style={{ fontSize: '0.6rem', color: selected ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>L1 ${l1} · L2 ${l2} · L3 ${l3}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Input — hidden, value driven by package buttons */}
              <div style={{ display: 'none' }}>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>

              {/* PIN */}
              <div>
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                  Security PIN
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                  <input
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter your 6-digit PIN"
                    className="input"
                    style={{ paddingLeft: '2.75rem', textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.125rem', fontWeight: 800 }}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.5rem' }}>
                  Set or update your PIN in <a href="/dashboard/profile" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>My Account</a>
                </p>
              </div>

              {/* Summary */}
              {amount > 0 && FIXED_PACKAGES.includes(+amount) && (() => {
                const amt = +amount
                const [l1, l2, l3] = SPONSOR_TABLE[amt] || [0, 0, 0]
                return (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Package Amount</span>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>${amt.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Daily ROI (2% compounding)</span>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--green)' }}>+${(amt * 0.02).toFixed(2)}/day (Day 1)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Sponsor Income (L1/L2/L3)</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3b82f6' }}>${l1} / ${l2} / ${l3}</span>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Income Withdrawal Lock</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--orange)' }}>60 Days</span>
                    </div>
                  </div>
                )
              })()}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ height: 52, fontSize: '0.9375rem' }}
              >
                {submitting
                  ? <Loader2 size={18} className="animate-spin" />
                  : success
                    ? <><CheckCircle size={18} /><span>Investment Activated!</span></>
                    : <><ShieldCheck size={18} /><span>Activate Investment</span></>
                }
              </button>
            </form>
          </Panel>
        </div>

        {/* Right: Info + Active Investments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* How It Works */}
          <Panel>
            <h3 style={{ margin: '0 0 1.25rem', fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
              How It Works
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { step: '1', title: 'Choose Package',    desc: 'Select one of the 6 fixed packages ($150–$5,000).', color: '#02d8dc' },
                { step: '2', title: 'Confirm with PIN',  desc: 'Enter your 6-digit PIN to authorize the investment.', color: '#3b82f6' },
                { step: '3', title: 'Earn Every Day',    desc: 'Get 2% compounding ROI daily — grows every day with no cap.', color: '#7c3aed' },
                { step: '4', title: 'Sponsor Bonuses',   desc: 'Your upline earns fixed $ sponsor income when you activate.', color: '#f97316' },
              ].map((item) => (
                <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: item.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 900, flexShrink: 0,
                    boxShadow: `0 4px 10px ${item.color}40`,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#ffffff' }}>{item.title}</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Active Investments Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <Activity size={16} style={{ color: '#10b981' }} />
              <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Active Investments</p>
            </div>
            <DataTable columns={PACKAGE_COLS} data={packages} emptyText="No active investments yet." />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1279px) { #trade-highlights { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 1023px) { #trade-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #trade-wallets { grid-template-columns: 1fr !important; } #trade-highlights { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
