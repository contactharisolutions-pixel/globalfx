import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Clock, ExternalLink, ArrowDownCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, DataTable, Badge, Spinner } from '../../components/member/ui'

const COLUMNS = [
  { key: 'created_at', label: 'Date',   render: (v) => <span style={{ fontSize: '0.8125rem', color: '#475569', fontWeight: 600 }}>{new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  { key: 'amount',     label: 'Amount', render: (v) => <span style={{ fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>${(+v).toLocaleString()}</span> },
  { key: 'tx_hash',   label: 'TX ID',  render: (v) => v ? (
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      {v.slice(0, 10)}…{v.slice(-8)}
      <ExternalLink size={11} style={{ opacity: 0.6 }} />
    </span>
  ) : '—' },
  { key: 'status',     label: 'Status', render: (v) => <Badge status={v} /> },
  { key: 'note',       label: 'Note',   render: (v) => <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontStyle: v ? 'normal' : 'italic' }}>{v || 'Pending review'}</span> },
]

export default function TopupHistoryPage() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/deposits/history')
      .then(({ data }) => setData(data.deposits || []))
      .catch(() => toast.error('Could not load deposit history'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Deposit History"
        subtitle="All your previous USDT deposits and their status"
        action={
          <Link to="/dashboard/topup" className="btn-primary">
            <Plus size={16} /><span>Add Funds</span>
          </Link>
        }
      />

      {loading ? <Spinner /> : (
        <div className="scale-in">
          {data.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <ArrowDownCircle size={16} style={{ color: '#0d9488' }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {data.length} deposit{data.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}
          <DataTable columns={COLUMNS} data={data} emptyText="No deposits yet. Make your first deposit to get started!" />
        </div>
      )}
    </div>
  )
}
