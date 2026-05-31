import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, ArrowRight, History, Send, Wallet, Info, Lock, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, StatCard, DataTable, Spinner, Badge, Panel } from '../../components/member/ui'

const transferSchema = z.object({
  amount: z.coerce.number().min(10, 'Minimum transfer is $10'),
  pin:    z.string().length(6, 'Enter your 6-digit PIN'),
})

const LEDGER_COLS = [
  { label: '#',           render: (v, row, i) => <span style={{ fontWeight: 700, color: 'var(--text-faint)' }}>{i + 1}</span> },
  { key: 'created_at',   label: 'Date',     render: (v) => <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  { key: 'amount',       label: 'Amount',   render: (v, row) => (
    <span style={{ fontWeight: 900, color: row.type === 'credit' ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {row.type === 'credit' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
      ${(+v).toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  )},
  { key: 'remarks',      label: 'Reason',   render: (v) => <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{v || '—'}</span> },
]

export default function IncomeWalletPage() {
  const [balance,    setBalance]    = useState(0)
  const [ledger,     setLedger]     = useState([])
  const [loading,    setLoading]    = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [tab,        setTab]        = useState('ledger')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(transferSchema),
  })

  const fetchData = async () => {
    setLoading(true)
    try {
      const [dashRes, ledgerRes] = await Promise.all([
        api.get('/member/dashboard'),
        api.get('/income-wallet/ledger'),
      ])
      setBalance(dashRes.data.stats.income_wallet)
      setLedger(ledgerRes.data.ledger || [])
    } catch { toast.error('Could not load wallet data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const onTransfer = async (data) => {
    setSubmitting(true)
    try {
      await api.post('/income-wallet/fund-transfer', data)
      toast.success(`$${data.amount} moved to Deposit Wallet!`)
      reset()
      fetchData()
      setTab('ledger')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Transfer failed')
    } finally { setSubmitting(false) }
  }

  if (loading) return <Spinner />

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Earnings Wallet"
        subtitle="View your earnings history and move funds to your Deposit Wallet"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }} id="income-layout">

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <StatCard
            label="Earnings Wallet Balance"
            value={`$${(+balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={Wallet}
            color="purple"
            sub="Available"
          />

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-alt)', border: '1.5px solid var(--border-subtle)', borderRadius: 12, padding: '0.25rem' }}>
            {[
              { id: 'ledger',   label: 'Transaction History', icon: History },
              { id: 'transfer', label: 'Move to Deposit',     icon: Send    },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '0.625rem 1rem', border: 'none',
                  background: tab === t.id ? 'var(--bg-card)' : 'transparent',
                  color: tab === t.id ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: tab === t.id ? 700 : 600,
                  fontSize: '0.8125rem', cursor: 'pointer', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: tab === t.id ? '0 2px 8px rgba(255,255,255,0.03)' : 'none',
                }}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </div>

          {/* History */}
          {tab === 'ledger' && (
            <div className="scale-in">
              <DataTable columns={LEDGER_COLS} data={ledger} emptyText="No transactions yet." />
            </div>
          )}

          {/* Transfer Form */}
          {tab === 'transfer' && (
            <Panel className="scale-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={18} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: 'var(--text-main)' }}>Move to Deposit Wallet</h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Funds moved here can be used for investing</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onTransfer)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="transfer-inputs">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '0.5rem' }}>Amount to Move</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-muted)' }}>$</span>
                      <input {...register('amount')} type="number" min={10} max={balance} placeholder="Min. $10" className="input" style={{ paddingLeft: '2rem', fontWeight: 700, fontSize: '1rem' }} />
                    </div>
                    {errors.amount && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.amount.message}</p>}
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.5rem' }}>Available: <strong style={{ color: 'var(--purple)' }}>${(+balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '0.5rem' }}>Security PIN</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                      <input {...register('pin')} type="password" maxLength={6} placeholder="6-digit PIN" className="input" style={{ paddingLeft: '2.75rem', letterSpacing: '0.35em', textAlign: 'center', fontSize: '1.125rem', fontWeight: 800 }} />
                    </div>
                    {errors.pin && <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.pin.message}</p>}
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary" style={{ height: 50, background: 'linear-gradient(135deg, #1e3a5f, var(--primary))', boxShadow: '0 4px 14px var(--primary-glow)' }}>
                  {submitting
                    ? <Loader2 size={18} className="animate-spin" />
                    : <><ArrowRight size={18} /><span>Move Funds Now</span></>
                  }
                </button>
              </form>
            </Panel>
          )}
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Panel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-light)', border: '1px solid rgba(2,216,220,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>How Your Earnings Work</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Earnings come from',  value: 'Daily investment profit',   color: 'var(--primary)', bg: 'rgba(2,216,220,0.06)' },
                { label: 'Transfer fee',         value: 'Zero — completely free',    color: 'var(--green)', bg: 'rgba(16,185,129,0.06)' },
                { label: 'Minimum transfer',     value: '$10',                       color: '#3b82f6', bg: 'rgba(59,130,246,0.06)' },
                { label: 'Can you reverse it?',  value: 'No — one-way only',        color: 'var(--orange)', bg: 'rgba(249,115,22,0.06)' },
                { label: 'Withdraw directly?',   value: 'Yes, from Earnings Wallet', color: 'var(--purple)', bg: 'rgba(124,58,237,0.06)' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: item.bg, borderRadius: 10, border: `1px solid ${item.color}30` }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #income-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #transfer-inputs { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
