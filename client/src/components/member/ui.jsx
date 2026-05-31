/* ─── Shared Member UI Primitives ───────────────────────────────
   BitLance Brand Theme: Deep Navy #0a1628 + Electric Cyan #02d8dc + Dark BG
   All colors follow the logo palette — dark background, teal accents.
────────────────────────────────────────────────────────────────── */

import { Activity } from 'lucide-react'

// Brand color palette
const BRAND = {
  teal:        '#02d8dc',
  navy:        '#1e3a5f',
  panelBg:     '#0a1628',
  cardBg:      '#0d1f35',
  border:      'rgba(255,255,255,0.07)',
  borderTeal:  'rgba(2,216,220,0.2)',
  textPrim:    '#f1f5f9',
  textSub:     '#cbd5e1',
  textMuted:   '#94a3b8',
  textFaint:   '#64748b',
}

const COLOR_MAP = {
  primary: { accent: '#02d8dc', bg: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)',   shadow: 'rgba(2,216,220,0.1)'   },
  green:   { accent: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  shadow: 'rgba(16,185,129,0.1)'  },
  emerald: { accent: '#059669', bg: 'rgba(5,150,105,0.08)',   border: 'rgba(5,150,105,0.2)',   shadow: 'rgba(5,150,105,0.1)'   },
  cyan:    { accent: '#02d8dc', bg: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)',   shadow: 'rgba(2,216,220,0.1)'   },
  blue:    { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  shadow: 'rgba(59,130,246,0.1)'  },
  accent:  { accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  shadow: 'rgba(59,130,246,0.1)'  },
  purple:  { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  shadow: 'rgba(139,92,246,0.1)'  },
  violet:  { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  shadow: 'rgba(139,92,246,0.1)'  },
  orange:  { accent: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)',  shadow: 'rgba(249,115,22,0.1)'  },
  warning: { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  shadow: 'rgba(245,158,11,0.1)'  },
  amber:   { accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  shadow: 'rgba(245,158,11,0.1)'  },
  red:     { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   shadow: 'rgba(239,68,68,0.1)'   },
  error:   { accent: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   shadow: 'rgba(239,68,68,0.1)'   },
  success: { accent: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  shadow: 'rgba(16,185,129,0.1)'  },
}

/** KPI Stat Card — dark brand card with colored accent */
export function StatCard({ label, value, sub, icon: Icon, color = 'primary' }) {
  const p = COLOR_MAP[color] || COLOR_MAP.primary
  return (
    <div
      className="card-hover"
      style={{
        background: BRAND.panelBg,
        border: `1px solid ${p.border}`,
        borderRadius: 20,
        padding: '1.5rem 1.625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.125rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${p.accent}30`
        e.currentTarget.style.borderColor = `${p.accent}50`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
        e.currentTarget.style.borderColor = p.border
      }}
    >
      {/* Top accent bar — brand color */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${BRAND.navy}, ${p.accent})`,
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 80, height: 80,
        background: p.bg, borderRadius: '0 20px 0 80px', opacity: 0.5,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 14,
          background: p.bg,
          border: `1px solid ${p.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={22} style={{ color: p.accent }} strokeWidth={2.5} />}
        </div>
        {sub && (
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, color: BRAND.textFaint,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem',
            borderRadius: 9999, border: `1px solid ${BRAND.border}`,
          }}>{sub}</span>
        )}
      </div>

      <div>
        <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: BRAND.textFaint, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
          {label}
        </p>
        <p style={{ fontSize: '1.75rem', fontWeight: 900, color: BRAND.textPrim, fontFamily: 'Outfit, sans-serif', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {value ?? '—'}
        </p>
      </div>
    </div>
  )
}

/** Page header */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 900, color: BRAND.textPrim,
          fontFamily: 'Outfit, sans-serif',
          margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: BRAND.textMuted, fontSize: '0.9rem', marginTop: '0.4rem', fontWeight: 500, margin: '0.4rem 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

/** Loading spinner */
export function Spinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', gap: '1.25rem' }}>
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div style={{ position: 'absolute', inset: 0, border: '3px solid rgba(2,216,220,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#02d8dc', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
      </div>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: BRAND.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Loading...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/** Status badge */
export function Badge({ status }) {
  const styles = {
    pending:     { bg: 'rgba(245,158,11,0.1)',  color: '#f59e0b', border: 'rgba(245,158,11,0.3)',  label: 'Pending'     },
    approved:    { bg: 'rgba(16,185,129,0.1)',  color: '#10b981', border: 'rgba(16,185,129,0.3)', label: 'Approved'    },
    rejected:    { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', border: 'rgba(239,68,68,0.3)',  label: 'Rejected'    },
    active:      { bg: 'rgba(2,216,220,0.1)',   color: '#02d8dc', border: 'rgba(2,216,220,0.3)', label: 'Active'      },
    inactive:    { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.3)', label: 'Inactive'  },
    completed:   { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.25)', label: 'Completed' },
    open:        { bg: 'rgba(59,130,246,0.1)',  color: '#3b82f6', border: 'rgba(59,130,246,0.3)', label: 'Open'        },
    in_progress: { bg: 'rgba(2,216,220,0.1)',   color: '#02d8dc', border: 'rgba(2,216,220,0.3)', label: 'In Progress' },
    closed:      { bg: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: 'rgba(100,116,139,0.25)', label: 'Closed'   },
    blocked:     { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444', border: 'rgba(239,68,68,0.3)',  label: 'Blocked'    },
    qualified:   { bg: 'rgba(16,185,129,0.1)',  color: '#10b981', border: 'rgba(16,185,129,0.3)', label: 'Qualified'  },
    next_goal:   { bg: 'rgba(2,216,220,0.1)',   color: '#02d8dc', border: 'rgba(2,216,220,0.3)', label: 'Next Goal'  },
  }
  const s = styles[status?.toLowerCase()?.replace(/\s+/g, '_')] || { bg: 'rgba(100,116,139,0.1)', color: '#64748b', border: 'rgba(100,116,139,0.2)' }
  const displayLabel = s.label || (status?.replace(/_/g, ' ') || 'Unknown')
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.25rem 0.75rem', borderRadius: 9999,
      fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {displayLabel}
    </span>
  )
}

/** Full-featured data table */
export function DataTable({ columns, data, emptyText = 'No records found.' }) {
  if (!data?.length) {
    return (
      <div style={{
        textAlign: 'center', padding: '4rem 1.5rem',
        background: BRAND.panelBg, border: `1px solid ${BRAND.border}`, borderRadius: 20,
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          width: 56, height: 56, background: 'rgba(2,216,220,0.06)', border: `1px solid rgba(2,216,220,0.15)`,
          borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
        }}>
          <Activity size={24} style={{ color: 'rgba(2,216,220,0.4)' }} />
        </div>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: BRAND.textFaint, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {emptyText}
        </p>
      </div>
    )
  }
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map(col => <th key={col.key || col.label}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key || col.label}>
                  {col.render ? col.render(row[col.key], row, i) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Dark card panel wrapper — brand navy background */
export function Panel({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: BRAND.panelBg,
        border: `1px solid rgba(2,216,220,0.1)`,
        borderRadius: 20,
        padding: '1.75rem 2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Panel section header with icon */
export function PanelTitle({ children, icon: Icon, color = '#02d8dc' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {Icon && (
        <div style={{
          width: 36, height: 36, background: 'rgba(2,216,220,0.08)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(2,216,220,0.2)',
        }}>
          <Icon size={18} style={{ color }} strokeWidth={2.5} />
        </div>
      )}
      <p style={{ fontWeight: 800, fontSize: '1rem', color: BRAND.textPrim, fontFamily: 'Outfit, sans-serif', margin: 0 }}>
        {children}
      </p>
    </div>
  )
}

/** Info row — label on left, value on right */
export function InfoRow({ label, value, valueColor }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.875rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{ fontSize: '0.875rem', color: BRAND.textFaint, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: valueColor || BRAND.textPrim }}>{value}</span>
    </div>
  )
}

/** Alert box for notices, warnings, errors */
export function AlertBox({ type = 'info', children }) {
  const config = {
    info:    { bg: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)',    color: '#02d8dc' },
    success: { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  color: '#10b981' },
    warning: { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  color: '#f59e0b' },
    error:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   color: '#ef4444' },
  }
  const c = config[type] || config.info
  return (
    <div style={{
      background: c.bg, border: `1.5px solid ${c.border}`,
      borderRadius: 12, padding: '0.875rem 1rem', color: c.color,
      fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.6,
    }}>
      {children}
    </div>
  )
}
