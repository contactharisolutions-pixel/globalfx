import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Loader2, AlertTriangle, ArrowUpFromLine, Wallet,
  History as HistoryIcon, ShieldCheck, Lock, Info, CheckCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, StatCard, DataTable, Badge, Spinner, Panel } from '../../components/member/ui'

const FEE_PERCENT = 20

const schema = z.object({
  amount: z.coerce.number()
    .min(20, 'Minimum withdrawal is $20')
    .refine(val => val % 20 === 0, 'Amount must be a multiple of $20'),
  pin: z.string().length(6, 'Enter your 6-digit PIN'),
})

const HIST_COLS = [
  { label: '#',          render: (v, row, i) => <span style={{ fontWeight: 700, color: '#94a3b8' }}>{i + 1}</span> },
  { key: 'created_at',  label: 'Date',       render: (v) => <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  { key: 'amount',      label: 'Requested',  render: (v) => <span style={{ fontWeight: 700, color: '#ffffff' }}>${(+v).toLocaleString()}</span> },
  { key: 'fee',         label: 'Fee',        render: (v) => <span style={{ color: '#ef4444', fontWeight: 600 }}>-${(+v).toLocaleString()}</span> },
  { key: 'net_amount',  label: 'You Receive',render: (v) => <span style={{ color: '#10b981', fontWeight: 800 }}>${(+v).toLocaleString()}</span> },
  { key: 'status',      label: 'Status',     render: (v) => <Badge status={v} /> },
]

export default function WithdrawPage() {
  const [balance,    setBalance]    = useState(0)
  const [wallet,     setWallet]     = useState('')
  const [history,    setHistory]    = useState([])
  const [loading,    setLoading]    = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [tab,        setTab]        = useState('request')

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { amount: 20, pin: '' },
  })
  const amount = watch('amount') || 0
  const fee    = +(amount * FEE_PERCENT / 100).toFixed(2)
  const net    = +(amount - fee).toFixed(2)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [dashRes, histRes, profileRes] = await Promise.all([
        api.get('/member/dashboard'),
        api.get('/withdrawals/history'),
        api.get('/member/profile'),
      ])
      setBalance(dashRes.data.stats.income_wallet)
      setHistory(histRes.data.withdrawals || [])
      setWallet(profileRes.data.bep20_wallet || '')
    } catch { toast.error('Could not load data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const onSubmit = async (data) => {
    if (!wallet) return toast.error('Please add your USDT wallet address in My Account first.')
    if (data.amount > balance) return toast.error('Not enough balance in your Earnings Wallet.')
    setSubmitting(true)
    try {
      await api.post('/withdrawals/request', data)
      toast.success('Withdrawal request submitted! Processing within 24 hours.')
      reset()
      fetchData()
      setTab('history')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Withdrawal failed. Please try again.')
    } finally { setSubmitting(false) }
  }

  const fmt = (n) => `$${(+n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  if (loading) return <Spinner />

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Withdraw Funds"
        subtitle="Transfer your earnings to your USDT (BEP20) wallet"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }} id="withdraw-layout">

        {/* Left: Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Balance Card */}
          <StatCard
            label="Earnings Wallet Balance"
            value={fmt(balance)}
            icon={Wallet}
            color="green"
            sub="Available to withdraw"
          />

          {/* Tab Bar */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.25rem' }}>
            {[
              { id: 'request', label: 'New Withdrawal',    icon: ArrowUpFromLine },
              { id: 'history', label: 'Withdrawal History', icon: HistoryIcon     },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '0.625rem 1rem', border: 'none',
                  background: tab === t.id ? 'rgba(2,216,220,0.15)' : 'transparent',
                  color: tab === t.id ? '#02d8dc' : '#94a3b8',
                  fontWeight: tab === t.id ? 700 : 600,
                  fontSize: '0.8125rem', cursor: 'pointer', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s',
                  border: tab === t.id ? '1px solid rgba(2,216,220,0.3)' : '1px solid transparent',
                }}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Withdrawal Form */}
          {tab === 'request' && (
            <Panel className="scale-in">
              {/* Wallet Status */}
              <div style={{
                marginBottom: '1.5rem', padding: '0.875rem 1.125rem',
                background: wallet ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                border: `1.5px solid ${wallet ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
                borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: '0.875rem',
              }}>
                {wallet ? (
                  <>
                    <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>Withdrawal Wallet</p>
                      <code style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#ffffff', wordBreak: 'break-all' }}>{wallet}</code>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#f59e0b' }}>
                        No wallet configured.{' '}
                        <Link to="/dashboard/wallet-setup" style={{ color: '#02d8dc', textDecoration: 'none' }}>
                          Add wallet address →
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="withdraw-inputs">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                      Amount to Withdraw
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b' }}>$</span>
                      <input
                        {...register('amount')}
                        type="number" min={20} step={20} max={balance}
                        placeholder="Min. $20"
                        className="input"
                        style={{ paddingLeft: '2rem', fontWeight: 700, fontSize: '1rem' }}
                        autoComplete="off"
                      />
                    </div>
                    {errors.amount && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.amount.message}</p>}
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>Available: <strong style={{ color: '#10b981' }}>{fmt(balance)}</strong></p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.625rem' }}>
                      Security PIN
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        {...register('pin')}
                        type="password" maxLength={6}
                        placeholder="6-digit PIN"
                        className="input"
                        style={{ paddingLeft: '2.75rem', letterSpacing: '0.35em', textAlign: 'center', fontSize: '1.125rem', fontWeight: 800 }}
                      />
                    </div>
                    {errors.pin && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.pin.message}</p>}
                  </div>
                </div>

                {/* Breakdown */}
                {amount >= 20 && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.125rem 1.25rem' }}>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>Withdrawal Summary</p>
                    {[
                      { label: 'Requested Amount', value: `$${(+amount).toLocaleString()}`,   color: '#ffffff' },
                      { label: `Processing Fee (${FEE_PERCENT}%)`, value: `-$${fee.toLocaleString()}`, color: 'var(--red)' },
                    ].map((row) => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>{row.label}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff' }}>You Receive</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--green)' }}>${net.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !wallet}
                  className="btn-primary"
                  style={{ height: 52 }}
                >
                  {submitting
                    ? <Loader2 size={18} className="animate-spin" />
                    : <><ArrowUpFromLine size={18} /><span>Submit Withdrawal</span></>
                  }
                </button>
              </form>
            </Panel>
          )}

          {/* History Tab */}
          {tab === 'history' && (
            <div className="scale-in">
              <DataTable columns={HIST_COLS} data={history} emptyText="No withdrawals yet." />
            </div>
          )}
        </div>

        {/* Right: Policy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={18} style={{ color: '#f97316' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>Withdrawal Rules</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Please read before submitting</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Processing Days', value: 'Monday to Friday',     color: '#02d8dc' },
                { label: 'Processing Hours', value: '6:00 AM – 11:00 AM (IST)', color: '#3b82f6' },
                { label: 'Minimum Amount',  value: '$20.00',               color: '#7c3aed' },
                { label: 'Allowed Steps',   value: '$20 steps',            color: '#f97316' },
                { label: 'Processing Fee',  value: `${FEE_PERCENT}%`,      color: '#ef4444' },
                { label: 'Network',         value: 'USDT BEP20 (BSC)',     color: '#10b981' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10 }}>
              <p style={{ fontSize: '0.8125rem', color: '#fca5a5', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
                ⚠️ Make sure your wallet address is correct. Funds sent to the wrong address cannot be recovered.
              </p>
            </div>
          </Panel>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #withdraw-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #withdraw-inputs { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
