/* ─── Shared Member UI Primitives ───────────────────────────────
   All styles use inline styles or CSS class names defined in index.css
   No Tailwind utility classes are used here to guarantee rendering
────────────────────────────────────────────────────────────────── */

import { Activity } from 'lucide-react'

const COLOR_MAP = {
  primary: { accent: '#0d9488', light: 'rgba(13,148,136,0.1)',  border: 'rgba(13,148,136,0.15)' },
  accent:  { accent: '#3b82f6', light: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.15)' },
  success: { accent: '#10b981', light: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.15)' },
  green:   { accent: '#10b981', light: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.15)' },
  emerald: { accent: '#059669', light: 'rgba(5,150,105,0.1)',   border: 'rgba(5,150,105,0.15)'  },
  warning: { accent: '#f59e0b', light: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.15)' },
  amber:   { accent: '#f59e0b', light: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.15)' },
  orange:  { accent: '#f97316', light: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.15)' },
  error:   { accent: '#ef4444', light: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.15)'  },
  red:     { accent: '#ef4444', light: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.15)'  },
  purple:  { accent: '#7c3aed', light: 'rgba(124,58,237,0.1)',  border: 'rgba(124,58,237,0.15)' },
  violet:  { accent: '#7c3aed', light: 'rgba(124,58,237,0.1)',  border: 'rgba(124,58,237,0.15)' },
  blue:    { accent: '#3b82f6', light: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.15)' },
  cyan:    { accent: '#0d9488', light: 'rgba(13,148,136,0.1)',  border: 'rgba(13,148,136,0.15)' }, // map old cyan → primary
}

/** KPI Stat card */
export function StatCard({ label, value, sub, icon: Icon, color = 'primary' }) {
  const p = COLOR_MAP[color] || COLOR_MAP.primary
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: 24,
        padding: '1.5rem 1.75rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px ${p.accent}40`
        e.currentTarget.style.borderColor = p.accent
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = '#e2e8f0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: p.light,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.25s',
        }}>
          {Icon && <Icon size={22} style={{ color: p.accent }} strokeWidth={2.5} />}
        </div>
        {sub && (
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, color: '#94a3b8',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            background: '#f8fafc', padding: '0.2rem 0.625rem',
            borderRadius: 9999, border: '1px solid #e2e8f0',
          }}>{sub}</span>
        )}
      </div>
      <div>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>{label}</p>
        <p style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', lineHeight: 1, letterSpacing: '-0.02em' }}>{value ?? '—'}</p>
      </div>
    </div>
  )
}

/** Page header */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 600, margin: '0.5rem 0 0' }}>{subtitle}</p>}
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
        <div style={{ position: 'absolute', inset: 0, border: '4px solid #e2e8f0', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '4px solid transparent', borderTopColor: '#0d9488', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <p style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Syncing Terminal...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/** Status badge */
export function Badge({ status }) {
  const styles = {
    pending:     { bg: 'rgba(245,158,11,0.1)',  color: '#92400e', border: 'rgba(245,158,11,0.25)'  },
    approved:    { bg: 'rgba(16,185,129,0.1)',  color: '#065f46', border: 'rgba(16,185,129,0.25)'  },
    rejected:    { bg: 'rgba(239,68,68,0.1)',   color: '#991b1b', border: 'rgba(239,68,68,0.25)'   },
    active:      { bg: 'rgba(13,148,136,0.1)',  color: '#134e4a', border: 'rgba(13,148,136,0.25)'  },
    completed:   { bg: 'rgba(100,116,139,0.1)', color: '#334155', border: 'rgba(100,116,139,0.25)' },
    open:        { bg: 'rgba(59,130,246,0.1)',  color: '#1e40af', border: 'rgba(59,130,246,0.25)'  },
    in_progress: { bg: 'rgba(124,58,237,0.1)',  color: '#4c1d95', border: 'rgba(124,58,237,0.25)'  },
    closed:      { bg: 'rgba(100,116,139,0.1)', color: '#475569', border: 'rgba(100,116,139,0.25)' },
  }
  const s = styles[status?.toLowerCase()] || styles.completed
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.25rem 0.75rem', borderRadius: 9999,
      fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {status}
    </span>
  )
}

/** Data table */
export function DataTable({ columns, data, emptyText = 'No records found.' }) {
  if (!data?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20 }}>
        <div style={{ width: 64, height: 64, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <Activity size={28} style={{ color: '#cbd5e1' }} />
        </div>
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{emptyText}</p>
      </div>
    )
  }
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>{col.render ? col.render(row[col.key], row, i) : (row[col.key] ?? '—')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Panel wrapper */
export function Panel({ children, style = {} }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1.5px solid #e2e8f0',
      borderRadius: 24,
      padding: '1.75rem 2rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      ...style,
    }}>
      {children}
    </div>
  )
}

/** Panel title */
export function PanelTitle({ children, icon: Icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.375rem' }}>
      {Icon && (
        <div style={{ width: 36, height: 36, background: 'rgba(13,148,136,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} style={{ color: '#0d9488' }} strokeWidth={2.5} />
        </div>
      )}
      <p style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#0f172a', fontFamily: 'Outfit, sans-serif', margin: 0 }}>{children}</p>
    </div>
  )
}
