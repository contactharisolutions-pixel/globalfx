import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpFromLine, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, DataTable, Badge, Spinner } from '../../components/member/ui'

const COLUMNS = [
  { key: 'created_at',    label: 'Date',       render: (v) => <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  { key: 'amount',        label: 'Requested',  render: (v) => <span style={{ fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>${(+v).toLocaleString()}</span> },
  { key: 'fee',           label: 'Fee',        render: (v) => <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: '0.8125rem' }}>-${(+v).toLocaleString()}</span> },
  { key: 'net_amount',    label: 'You Receive', render: (v) => <span style={{ fontWeight: 900, color: 'var(--green)' }}>${(+v).toLocaleString()}</span> },
  {
    key: 'wallet_address', label: 'Sent To',
    render: (v) => v
      ? <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-faint)' }}>{v.slice(0, 10)}…{v.slice(-8)}</span>
      : '—',
  },
  {
    key: 'tx_hash', label: 'TX ID',
    render: (v) => v ? (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--primary)' }}>
        {v.slice(0, 10)}… <ExternalLink size={11} style={{ opacity: 0.6 }} />
      </span>
    ) : <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontStyle: 'italic' }}>Pending</span>,
  },
  { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
]

export default function WithdrawHistoryPage() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/withdrawals/history')
      .then(({ data }) => setData(data.withdrawals || []))
      .catch(() => toast.error('Could not load withdrawal history'))
      .finally(() => setLoading(false))
  }, [])

  const totalWithdrawn = data.reduce((s, d) => s + (+d.net_amount || 0), 0)
  const pendingCount   = data.filter(d => d.status === 'pending').length

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Withdrawal History"
        subtitle="All your past withdrawals and their current status"
        action={
          <Link to="/dashboard/withdraw" className="btn-primary">
            <ArrowUpFromLine size={16} /><span>Withdraw Now</span>
          </Link>
        }
      />

      {data.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Total Withdrawals', value: data.length,                          color: 'var(--primary)', bg: 'rgba(2,216,220,0.06)' },
            { label: 'Pending',           value: pendingCount,                          color: '#f59e0b', bg: 'rgba(245,158,11,0.06)' },
            { label: 'Total Received',    value: `$${totalWithdrawn.toLocaleString()}`, color: 'var(--green)', bg: 'rgba(16,185,129,0.06)' },
          ].map(({ label, value, color, bg }) => (
            <div key={label} style={{ padding: '1rem 1.25rem', background: 'var(--bg-card)', border: '1.5px solid var(--border-subtle)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 8px ${color}50` }} />
              <div>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                <p style={{ margin: '0.125rem 0 0', fontSize: '1.125rem', fontWeight: 900, color, fontFamily: 'Outfit, sans-serif' }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading ? <Spinner /> : (
        <div className="scale-in">
          <DataTable columns={COLUMNS} data={data} emptyText="No withdrawals yet." />
        </div>
      )}
    </div>
  )
}
