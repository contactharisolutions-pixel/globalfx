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

const QUICK_AMOUNTS = [25, 50, 100, 250, 500, 1000, 2500, 5000]

const INVESTMENT_HIGHLIGHTS = [
  { label: 'Daily Return',    value: '2% per day',    color: '#0d9488', bg: '#f0fdfa' },
  { label: 'Total Payout',   value: '200% return',   color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Min. Amount',    value: '$25',            color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Max. Amount',    value: '$5,000',         color: '#f97316', bg: '#fff7ed' },
]

const PACKAGE_COLS = [
  { key: 'amount',      label: 'Invested',   render: (v) => <span style={{ fontWeight: 800, color: '#0f172a' }}>${(+v).toLocaleString()}</span> },
  { key: 'total_earned',label: 'Earned',     render: (v) => <span style={{ color: '#10b981', fontWeight: 700 }}>${(+v).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> },
  { key: 'max_return',  label: 'Total Limit',render: (v) => <span style={{ color: '#94a3b8', fontWeight: 600 }}>${(+v).toLocaleString()}</span> },
  { key: 'status',      label: 'Status',     render: (v) => <Badge status={v} /> },
  { key: 'started_at',  label: 'Started',    render: (v) => <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{new Date(v).toLocaleDateString()}</span> },
]

export default function TradePage() {
  const { user }                    = useAuthStore()
  const [wallets, setWallets]       = useState({ fund_wallet: 0, income_wallet: 0 })
  const [packages, setPackages]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [amount, setAmount]         = useState('25')
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
    if (!amt || amt < 25)          return toast.error('Minimum investment is $25')
    if (amt > 5000)                return toast.error('Maximum investment is $5,000')
    if (amt !== 25 && amt % 10 !== 0) return toast.error('Amount must be $25 or multiples of $10')
    if (!pin || pin.length !== 6)  return toast.error('Enter your 6-digit PIN')

    const bal = parseFloat(wallets[source] || 0)
    if (amt > bal) return toast.error('Not enough balance in selected wallet')

    setSubmitting(true)
    try {
      await api.post('/trades/invest', { amount: amt, source: source === 'fund_wallet' ? 'fund' : 'income', pin })
      toast.success('Investment activated! Earnings start today.')
      useAuthStore.getState().refreshUser()
      setAmount('25')
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
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: '0.875rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: h.color, flexShrink: 0, boxShadow: `0 0 8px ${h.color}60` }} />
            <div>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.125rem' }}>{h.label}</p>
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
              { key: 'fund_wallet',   label: 'Deposit Wallet',  icon: Wallet,     color: '#0d9488', bg: '#f0fdfa', border: 'rgba(13,148,136,0.3)'  },
              { key: 'income_wallet', label: 'Earnings Wallet', icon: DollarSign, color: '#7c3aed', bg: '#f5f3ff', border: 'rgba(124,58,237,0.3)' },
            ].map(({ key, label, icon: Icon, color, bg, border }) => {
              const selected = source === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSource(key)}
                  style={{
                    padding: '1.25rem',
                    background: selected ? bg : '#ffffff',
                    border: `2px solid ${selected ? color : '#e2e8f0'}`,
                    borderRadius: 16, textAlign: 'left',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    boxShadow: selected ? `0 4px 20px ${border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: selected ? color : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={15} style={{ color: selected ? '#fff' : '#94a3b8' }} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: selected ? color : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '1.375rem', fontWeight: 900, color: selected ? color : '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
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
            <h3 style={{ margin: '0 0 1.5rem', fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
              Investment Amount
            </h3>

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Quick Pick */}
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Quick Select</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.625rem' }}>
                  {QUICK_AMOUNTS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAmount(v.toString())}
                      className={`amount-btn ${amount === v.toString() ? 'active' : ''}`}
                      style={{ padding: '0.75rem 0.5rem', fontSize: '0.8125rem' }}
                    >
                      ${v.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                  Custom Amount (min $25, max $5,000, multiples of $10)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b', fontSize: '1rem' }}>$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="input"
                    style={{ paddingLeft: '2rem', fontSize: '1.0625rem', fontWeight: 800, letterSpacing: '-0.01em' }}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 500 }}>
                  Balance in selected wallet: <strong style={{ color: '#0d9488' }}>${selectedBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                </p>
              </div>

              {/* PIN */}
              <div>
                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                  Security PIN
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
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
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  Set or update your PIN in <a href="/dashboard/profile" style={{ color: '#0d9488', textDecoration: 'none', fontWeight: 600 }}>My Account</a>
                </p>
              </div>

              {/* Summary */}
              {amount > 0 && (
                <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Amount to invest</span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>${(+amount || 0).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Daily earnings (2%)</span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#10b981' }}>+${((+amount || 0) * 0.02).toLocaleString(undefined, { minimumFractionDigits: 2 })}/day</span>
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Total return (200%)</span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 900, color: '#0d9488' }}>${((+amount || 0) * 2).toLocaleString()}</span>
                  </div>
                </div>
              )}

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
            <h3 style={{ margin: '0 0 1.25rem', fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
              How It Works
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { step: '1', title: 'Choose Amount',   desc: 'Select between $25 and $5,000 from your wallet.', color: '#0d9488' },
                { step: '2', title: 'Confirm with PIN', desc: 'Enter your 6-digit PIN to authorize the investment.', color: '#3b82f6' },
                { step: '3', title: 'Earn Every Day',  desc: 'Receive 2% of your investment into your Earnings Wallet daily.', color: '#7c3aed' },
                { step: '4', title: 'Reach 200%',      desc: 'Your investment completes once you earn double the amount.', color: '#f97316' },
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
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{item.title}</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Active Investments Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <Activity size={16} style={{ color: '#10b981' }} />
              <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Active Investments</p>
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
