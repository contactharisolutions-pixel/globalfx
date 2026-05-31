import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Activity, BarChart3 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, DataTable, Badge, Spinner } from '../../components/member/ui'

const COLUMNS = [
  { key: 'amount',            label: 'Invested',    render: (v) => <span style={{ fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>${(+v).toLocaleString()}</span> },
  { key: 'daily_roi_percent', label: 'Daily Rate',  render: (v) => <span style={{ color: 'var(--primary)', fontWeight: 800, background: 'var(--primary-light)', padding: '0.125rem 0.5rem', borderRadius: 6, fontSize: '0.8125rem' }}>{v}%</span> },
  { key: 'total_earned',      label: 'Earned',      render: (v) => <span style={{ color: 'var(--green)', fontWeight: 800 }}>${(+v).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> },
  { key: 'max_return',        label: 'Target',      render: (v) => <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>${(+v).toLocaleString()}</span> },
  { key: 'status',            label: 'Status',      render: (v) => <Badge status={v} /> },
  { key: 'started_at',        label: 'Started',     render: (v) => <span style={{ fontSize: '0.8125rem', color: 'var(--text-faint)', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
]

export default function TradeHistoryPage() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/trades/history')
      .then(({ data }) => setData(data.packages || []))
      .catch(() => toast.error('Could not load investment history'))
      .finally(() => setLoading(false))
  }, [])

  const activeCount    = data.filter(d => d.status === 'active').length
  const completedCount = data.filter(d => d.status === 'completed').length
  const totalInvested  = data.reduce((s, d) => s + (+d.amount || 0), 0)

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Investment History"
        subtitle="All your active and completed investments"
        action={
          <Link to="/dashboard/trade" className="btn-primary">
            <TrendingUp size={16} /><span>Invest Now</span>
          </Link>
        }
      />

      {/* Quick summary */}
      {data.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Active Investments',   value: activeCount,    color: 'var(--primary)', bg: 'var(--primary-light)' },
            { label: 'Completed',            value: completedCount, color: 'var(--green)', bg: 'rgba(16,185,129,0.06)' },
            { label: 'Total Invested',       value: `$${totalInvested.toLocaleString()}`, color: 'var(--purple)', bg: 'rgba(124,58,237,0.06)' },
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
          <DataTable columns={COLUMNS} data={data} emptyText="No investments yet. Start investing to see your history here!" />
        </div>
      )}
    </div>
  )
}
