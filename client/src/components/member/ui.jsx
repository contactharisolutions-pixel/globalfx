/* ─── Shared Member UI Primitives ───────────────────────────────
   Clean white-background design system for the member portal.
   All colors are chosen for WCAG AA compliance on white backgrounds.
────────────────────────────────────────────────────────────────── */

import { Activity } from 'lucide-react'

const COLOR_MAP = {
  primary: { accent: '#0d9488', bg: '#f0fdfa',  border: 'rgba(13,148,136,0.2)',  shadow: 'rgba(13,148,136,0.15)'  },
  green:   { accent: '#10b981', bg: '#f0fdf4',  border: 'rgba(16,185,129,0.2)',  shadow: 'rgba(16,185,129,0.15)'  },
  emerald: { accent: '#059669', bg: '#ecfdf5',  border: 'rgba(5,150,105,0.2)',   shadow: 'rgba(5,150,105,0.15)'   },
  cyan:    { accent: '#0d9488', bg: '#f0fdfa',  border: 'rgba(13,148,136,0.2)',  shadow: 'rgba(13,148,136,0.15)'  },
  blue:    { accent: '#3b82f6', bg: '#eff6ff',  border: 'rgba(59,130,246,0.2)',  shadow: 'rgba(59,130,246,0.15)'  },
  accent:  { accent: '#3b82f6', bg: '#eff6ff',  border: 'rgba(59,130,246,0.2)',  shadow: 'rgba(59,130,246,0.15)'  },
  purple:  { accent: '#7c3aed', bg: '#f5f3ff',  border: 'rgba(124,58,237,0.2)', shadow: 'rgba(124,58,237,0.15)'  },
  violet:  { accent: '#7c3aed', bg: '#f5f3ff',  border: 'rgba(124,58,237,0.2)', shadow: 'rgba(124,58,237,0.15)'  },
  orange:  { accent: '#f97316', bg: '#fff7ed',  border: 'rgba(249,115,22,0.2)', shadow: 'rgba(249,115,22,0.15)'  },
  warning: { accent: '#f59e0b', bg: '#fffbeb',  border: 'rgba(245,158,11,0.2)', shadow: 'rgba(245,158,11,0.15)'  },
  amber:   { accent: '#f59e0b', bg: '#fffbeb',  border: 'rgba(245,158,11,0.2)', shadow: 'rgba(245,158,11,0.15)'  },
  red:     { accent: '#ef4444', bg: '#fef2f2',  border: 'rgba(239,68,68,0.2)',  shadow: 'rgba(239,68,68,0.15)'   },
  error:   { accent: '#ef4444', bg: '#fef2f2',  border: 'rgba(239,68,68,0.2)',  shadow: 'rgba(239,68,68,0.15)'   },
  success: { accent: '#10b981', bg: '#f0fdf4',  border: 'rgba(16,185,129,0.2)', shadow: 'rgba(16,185,129,0.15)'  },
}

/** KPI Stat Card — clean white card with colored accent icon */
export function StatCard({ label, value, sub, icon: Icon, color = 'primary' }) {
  const p = COLOR_MAP[color] || COLOR_MAP.primary
  return (
    <div
      className="card-hover"
      style={{
        background: '#ffffff',
        border: `1.5px solid ${p.border}`,
        borderRadius: 20,
        padding: '1.5rem 1.625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.125rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: `0 4px 20px ${p.shadow}`,
      }}
    >
      {/* Subtle top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${p.accent}, ${p.accent}88)`,
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 14,
          background: p.bg,
          border: `1.5px solid ${p.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={22} style={{ color: p.accent }} strokeWidth={2.5} />}
        </div>
        {sub && (
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, color: '#64748b',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            background: '#f8fafc', padding: '0.2rem 0.5rem',
            borderRadius: 9999, border: '1px solid #e2e8f0',
          }}>{sub}</span>
        )}
      </div>

      <div>
        <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
          {label}
        </p>
        <p style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {value ?? '—'}
        </p>
      </div>
    </div>
  )
}

/** Page header with title, subtitle and optional action button */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 900, color: '#0f172a',
          fontFamily: 'Outfit, sans-serif',
          margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem', fontWeight: 500, margin: '0.4rem 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

/** Loading spinner with branded color */
export function Spinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', gap: '1.25rem' }}>
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div style={{ position: 'absolute', inset: 0, border: '3px solid #f0fdfa', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '3px solid transparent', borderTopColor: '#0d9488', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
      </div>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Loading...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/** Status badge — color-coded pill */
export function Badge({ status }) {
  const styles = {
    pending:     { bg: '#fffbeb', color: '#92400e', border: 'rgba(245,158,11,0.3)',  label: 'Pending'     },
    approved:    { bg: '#f0fdf4', color: '#065f46', border: 'rgba(16,185,129,0.3)', label: 'Approved'    },
    rejected:    { bg: '#fef2f2', color: '#991b1b', border: 'rgba(239,68,68,0.3)',  label: 'Rejected'    },
    active:      { bg: '#f0fdfa', color: '#134e4a', border: 'rgba(13,148,136,0.3)', label: 'Active'      },
    inactive:    { bg: '#f8fafc', color: '#475569', border: 'rgba(100,116,139,0.3)', label: 'Inactive'   },
    completed:   { bg: '#f8fafc', color: '#334155', border: 'rgba(100,116,139,0.25)', label: 'Completed' },
    open:        { bg: '#eff6ff', color: '#1e40af', border: 'rgba(59,130,246,0.3)', label: 'Open'        },
    in_progress: { bg: '#f5f3ff', color: '#4c1d95', border: 'rgba(124,58,237,0.3)', label: 'In Progress' },
    closed:      { bg: '#f8fafc', color: '#475569', border: 'rgba(100,116,139,0.25)', label: 'Closed'    },
    blocked:     { bg: '#fef2f2', color: '#991b1b', border: 'rgba(239,68,68,0.3)',  label: 'Blocked'     },
    qualified:   { bg: '#f0fdf4', color: '#065f46', border: 'rgba(16,185,129,0.3)', label: 'Qualified'   },
    next_goal:   { bg: '#eff6ff', color: '#1e40af', border: 'rgba(59,130,246,0.3)', label: 'Next Goal'  },
  }
  const s = styles[status?.toLowerCase()?.replace(/\s+/g, '_')] || { bg: '#f1f5f9', color: '#475569', border: 'rgba(100,116,139,0.2)' }
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

/** Full-featured data table with empty state */
export function DataTable({ columns, data, emptyText = 'No records found.' }) {
  if (!data?.length) {
    return (
      <div style={{
        textAlign: 'center', padding: '4rem 1.5rem',
        background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20,
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          width: 56, height: 56, background: '#f8fafc', border: '1.5px solid #e2e8f0',
          borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
        }}>
          <Activity size={24} style={{ color: '#cbd5e1' }} />
        </div>
        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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

/** White card panel wrapper */
export function Panel({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: 20,
        padding: '1.75rem 2rem',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Panel section header with icon */
export function PanelTitle({ children, icon: Icon, color = '#0d9488' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {Icon && (
        <div style={{
          width: 36, height: 36, background: 'rgba(13,148,136,0.08)',
          borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(13,148,136,0.15)',
        }}>
          <Icon size={18} style={{ color }} strokeWidth={2.5} />
        </div>
      )}
      <p style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
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
      padding: '0.875rem 0', borderBottom: '1px solid #f1f5f9',
    }}>
      <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: valueColor || '#0f172a' }}>{value}</span>
    </div>
  )
}

/** Alert box for notices, warnings, errors */
export function AlertBox({ type = 'info', children }) {
  const config = {
    info:    { bg: '#eff6ff', border: 'rgba(59,130,246,0.25)',  color: '#1e40af' },
    success: { bg: '#f0fdf4', border: 'rgba(16,185,129,0.25)', color: '#065f46' },
    warning: { bg: '#fffbeb', border: 'rgba(245,158,11,0.25)', color: '#92400e' },
    error:   { bg: '#fef2f2', border: 'rgba(239,68,68,0.25)',  color: '#991b1b' },
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
