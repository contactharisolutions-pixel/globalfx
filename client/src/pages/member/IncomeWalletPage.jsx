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
  { label: '#',           render: (v, row, i) => <span style={{ fontWeight: 700, color: '#94a3b8' }}>{i + 1}</span> },
  { key: 'created_at',   label: 'Date',     render: (v) => <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  { key: 'amount',       label: 'Amount',   render: (v, row) => (
    <span style={{ fontWeight: 900, color: row.type === 'credit' ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {row.type === 'credit' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
      ${(+v).toLocaleString(undefined, { minimumFractionDigits: 2 })}
    </span>
  )},
  { key: 'remarks',      label: 'Reason',   render: (v) => <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{v || '—'}</span> },
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
          <div style={{ display: 'flex', gap: '0.25rem', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 12, padding: '0.25rem' }}>
            {[
              { id: 'ledger',   label: 'Transaction History', icon: History },
              { id: 'transfer', label: 'Move to Deposit',     icon: Send    },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '0.625rem 1rem', border: 'none',
                  background: tab === t.id ? '#ffffff' : 'transparent',
                  color: tab === t.id ? '#0f172a' : '#94a3b8',
                  fontWeight: tab === t.id ? 700 : 600,
                  fontSize: '0.8125rem', cursor: 'pointer', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: tab === t.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
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
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={18} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 800, color: '#0f172a' }}>Move to Deposit Wallet</h3>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Funds moved here can be used for investing</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onTransfer)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="transfer-inputs">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Amount to Move</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: '#64748b' }}>$</span>
                      <input {...register('amount')} type="number" min={10} max={balance} placeholder="Min. $10" className="input" style={{ paddingLeft: '2rem', fontWeight: 700, fontSize: '1rem' }} />
                    </div>
                    {errors.amount && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.amount.message}</p>}
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>Available: <strong style={{ color: '#7c3aed' }}>${(+balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Security PIN</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input {...register('pin')} type="password" maxLength={6} placeholder="6-digit PIN" className="input" style={{ paddingLeft: '2.75rem', letterSpacing: '0.35em', textAlign: 'center', fontSize: '1.125rem', fontWeight: 800 }} />
                    </div>
                    {errors.pin && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.pin.message}</p>}
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="btn-primary" style={{ height: 50, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
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
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f0fdfa', border: '1px solid rgba(13,148,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Info size={18} style={{ color: '#0d9488' }} />
              </div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>How Your Earnings Work</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Earnings come from',  value: 'Daily investment profit',   color: '#0d9488', bg: '#f0fdfa' },
                { label: 'Transfer fee',         value: 'Zero — completely free',    color: '#10b981', bg: '#f0fdf4' },
                { label: 'Minimum transfer',     value: '$10',                       color: '#3b82f6', bg: '#eff6ff' },
                { label: 'Can you reverse it?',  value: 'No — one-way only',        color: '#f97316', bg: '#fff7ed' },
                { label: 'Withdraw directly?',   value: 'Yes, from Earnings Wallet', color: '#7c3aed', bg: '#f5f3ff' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: item.bg, borderRadius: 10, border: `1px solid ${item.color}20` }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{item.label}</span>
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
