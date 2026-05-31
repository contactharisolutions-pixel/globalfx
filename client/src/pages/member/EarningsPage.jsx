import { useEffect, useState } from 'react'
import { DollarSign, TrendingUp, Users, Calendar, PieChart as PieIcon, Activity, Network, Award } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import api from '../../lib/api'
import { PageHeader, StatCard, Spinner, Panel } from '../../components/member/ui'

const PIE_COLORS = ['#02d8dc', '#7c3aed', '#10b981', '#f97316']

export default function EarningsPage() {
  const [summary, setSummary] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/earnings/summary'),
      api.get('/earnings/history'),
    ])
      .then(([sumRes, histRes]) => {
        setSummary(sumRes.data)
        setHistory(histRes.data.history || [])
      })
      .catch(() => toast.error('Could not load earnings data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  const fmt = (n) => `$${(+n || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  const pieData = [
    { name: 'Daily ROI',       value: +(summary?.trading_income || 0) },
    { name: 'Sponsor Income',  value: +(summary?.sponsor_income || 0) },
    { name: 'Match Reward',    value: +(summary?.match_reward   || 0) },
    { name: 'Monthly Salary',  value: +(summary?.monthly_salary || 0) },
    { name: 'Royalty',         value: +(summary?.royalty_income || 0) },
    { name: 'Monsoon',         value: +(summary?.monsoon_income || 0) },
  ].filter(d => d.value > 0)

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: 'var(--bg-card)', border: '1.5px solid rgba(2,216,220,0.2)', borderRadius: 12, padding: '0.75rem 1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
        {label && <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>{label}</p>}
        <p style={{ fontSize: '1rem', color: '#02d8dc', fontWeight: 900 }}>{fmt(payload[0].value)}</p>
      </div>
    )
  }

  const EARNING_LINKS = [
    { label: 'Daily Profits',    to: '/dashboard/earnings/daily',   color: '#02d8dc', bg: 'rgba(2,216,220,0.08)'  },
    { label: 'Sponsor Income',   to: '/dashboard/earnings/sponsor', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)'  },
    { label: 'Match Reward',     to: '/dashboard/earnings/reward',  color: '#7c3aed', bg: 'rgba(124,58,237,0.08)'  },
    { label: 'Monthly Salary',   to: '/dashboard/earnings/salary',  color: '#f97316', bg: 'rgba(249,115,22,0.08)'  },
    { label: 'Royalty',          to: '/dashboard/earnings/royalty', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)'  },
    { label: 'Monsoon Bonanza',  to: '/dashboard/earnings/monsoon', color: '#818cf8', bg: 'rgba(129,140,248,0.08)'  },
  ]

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Earnings Summary"
        subtitle="All your income sources in one place"
      />

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <StatCard label="Total Earned"      value={fmt(summary?.total)}          icon={DollarSign} color="cyan"   />
        <StatCard label="Daily ROI"          value={fmt(summary?.trading_income)} icon={TrendingUp} color="green"  />
        <StatCard label="Sponsor Income"     value={fmt(summary?.sponsor_income)} icon={Users}      color="purple" />
        <StatCard label="Match Reward"       value={fmt(summary?.match_reward)}   icon={Activity}   color="orange" />
      </div>

      {/* Chart Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }} id="earnings-layout">

        {/* Area Chart */}
        <Panel style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>Daily Earnings</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Last 30 days</p>
            </div>
            <Link to="/dashboard/earnings/daily" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#02d8dc', textDecoration: 'none' }}>
              View Details →
            </Link>
          </div>

          <div style={{ height: 280, width: '100%' }}>
            {history.length > 0 ? (
              <ResponsiveContainer>
                <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#02d8dc" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#02d8dc" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => new Date(v).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => `$${v}`}
                    width={45}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="earning"
                    stroke="#02d8dc"
                    strokeWidth={2.5}
                    fill="url(#areaGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#fff', stroke: '#02d8dc', strokeWidth: 2.5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <Calendar size={32} style={{ color: '#e2e8f0' }} />
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600 }}>No earnings data yet.</p>
                <p style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>Start investing to see your daily profit chart.</p>
              </div>
            )}
          </div>
        </Panel>

        {/* Pie Chart */}
        <Panel style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>Earnings Breakdown</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>By income source</p>
          </div>

          {pieData.length > 0 ? (
            <>
              <div style={{ height: 200, width: '100%' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      dataKey="value"
                      paddingAngle={4}
                      stroke="none"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {pieData.map((entry, i) => {
                  const pct = summary?.total > 0 ? ((entry.value / summary.total) * 100).toFixed(1) : 0
                  return (
                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: PIE_COLORS[i], flexShrink: 0, boxShadow: `0 0 6px ${PIE_COLORS[i]}60` }} />
                        <span style={{ fontSize: '0.8125rem', color: '#cbd5e1', fontWeight: 600 }}>{entry.name}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#ffffff' }}>{fmt(entry.value)}</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.375rem' }}>{pct}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <PieIcon size={32} style={{ color: '#e2e8f0' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600 }}>No data available yet.</p>
            </div>
          )}
        </Panel>
      </div>

      {/* Quick Links to Detailed Views */}
      <Panel>
        <p style={{ margin: '0 0 1.25rem', fontWeight: 800, fontSize: '0.9375rem', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>View Detailed Reports</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.875rem' }} id="earnings-links">
          {EARNING_LINKS.map(({ label, to, color, bg }) => (
            <Link key={to} to={to} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '1.125rem 0.75rem', gap: '0.5rem',
              background: bg, border: `1.5px solid ${color}25`,
              borderRadius: 14, textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${color}20` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = bg }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}60` }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
            </Link>
          ))}
        </div>
      </Panel>

      <style>{`
        @media (max-width: 1023px) { #earnings-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px)  { #earnings-links  { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px)  { #earnings-links  { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
