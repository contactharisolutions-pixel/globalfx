/* ─── Shared Admin UI Primitives ───────────────────────────────────────
   BitLance Brand Theme: Deep Navy #1e3a5f + Electric Cyan #02d8dc + Dark BG
   Extracted from logo color palette.
──────────────────────────────────────────────────────────────────────── */

// ── Brand Color Constants ─────────────────────────────────────────────
const C = {
  // Backgrounds
  panelBg:    '#0a1628',
  navyCard:   '#0d1f35',
  pageBg:     '#060e1c',

  // Brand
  teal:       '#02d8dc',
  tealDim:    'rgba(2,216,220,0.1)',
  tealBorder: 'rgba(2,216,220,0.25)',
  navy:       '#1e3a5f',
  navyGlow:   'rgba(30,58,95,0.35)',

  // Borders
  border:     'rgba(255,255,255,0.07)',
  borderHov:  'rgba(2,216,220,0.3)',

  // Functional
  green:      '#10b981',
  red:        '#ef4444',
  orange:     '#f59e0b',
  purple:     '#8b5cf6',
  blue:       '#3b82f6',

  // Text
  textPrim:   '#f1f5f9',
  textSub:    '#cbd5e1',
  textMuted:  '#94a3b8',
  textFaint:  '#64748b',

  radiusMd:   '12px',
  radiusLg:   '20px',
}

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap',
    }}>
      <div>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 900, fontFamily: 'Outfit, sans-serif',
          color: C.textPrim, lineHeight: 1.1, letterSpacing: '-0.02em',
          margin: 0,
        }}>{title}</h2>
        {subtitle && (
          <p style={{ color: C.textMuted, fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 500, margin: '0.5rem 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  )
}

export function AdminStatCard({ label, value, icon: Icon, color = 'teal', sub }) {
  const palette = {
    teal:   { accent: C.teal,    glow: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)'   },
    orange: { accent: '#f59e0b', glow: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
    red:    { accent: C.red,     glow: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'   },
    green:  { accent: C.green,   glow: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
    blue:   { accent: C.blue,    glow: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)'  },
    purple: { accent: C.purple,  glow: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)'  },
    cyan:   { accent: C.teal,    glow: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)'   },
  }
  const p = palette[color] || palette.teal

  return (
    <div
      style={{
        background: C.panelBg,
        border: `1px solid ${C.border}`,
        borderRadius: C.radiusLg,
        padding: '1.5rem 1.75rem',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${p.accent}30`
        e.currentTarget.style.borderColor = `${p.accent}40`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = C.border
      }}
    >
      {/* Left accent bar — teal brand color */}
      <div style={{ position: 'absolute', left: 0, top: '1.25rem', bottom: '1.25rem', width: 3, background: p.accent, borderRadius: '0 4px 4px 0' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.7rem', color: C.textMuted, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          {label}
        </p>
        {Icon && (
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: p.glow, border: `1px solid ${p.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} style={{ color: p.accent }} />
          </div>
        )}
      </div>
      <p style={{ fontSize: '2rem', fontWeight: 900, color: C.textPrim, lineHeight: 1, fontFamily: 'Outfit, sans-serif', margin: 0 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: '0.75rem', color: C.textMuted, marginTop: '0.625rem', fontWeight: 500 }}>{sub}</p>}
    </div>
  )
}

export function AdminTable({ columns, data, emptyText = 'No records found.' }) {
  if (!data?.length) return (
    <div style={{
      textAlign: 'center', padding: '5rem 1rem',
      color: C.textMuted,
      background: C.panelBg,
      borderRadius: C.radiusLg,
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.15 }}>📭</div>
      <p style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{emptyText}</p>
    </div>
  )
  return (
    <div style={{
      width: '100%', overflowX: 'auto',
      background: C.panelBg,
      border: `1px solid ${C.border}`,
      borderRadius: C.radiusLg,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: 'left',
                padding: '0.875rem 1.25rem',
                fontSize: '0.65rem', fontWeight: 900,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: C.teal,
                borderBottom: `1px solid ${C.border}`,
                background: 'rgba(2,216,220,0.03)',
                whiteSpace: 'nowrap',
              }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              style={{ borderBottom: i < data.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(2,216,220,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {columns.map((c) => (
                <td key={c.key} style={{
                  padding: '0.875rem 1.25rem',
                  fontSize: '0.875rem',
                  color: C.textSub,
                  whiteSpace: 'nowrap',
                }}>
                  {c.render ? c.render(row[c.key], row, i) : row[c.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatusBadge({ status }) {
  const map = {
    pending:     { bg: 'rgba(245,158,11,0.1)',  text: '#f59e0b', border: 'rgba(245,158,11,0.2)'  },
    approved:    { bg: 'rgba(16,185,129,0.1)',  text: '#10b981', border: 'rgba(16,185,129,0.2)'  },
    rejected:    { bg: 'rgba(239,68,68,0.1)',   text: '#ef4444', border: 'rgba(239,68,68,0.2)'   },
    active:      { bg: 'rgba(2,216,220,0.1)',   text: '#02d8dc', border: 'rgba(2,216,220,0.2)'   },
    inactive:    { bg: 'rgba(100,116,139,0.1)', text: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
    blocked:     { bg: 'rgba(239,68,68,0.1)',   text: '#ef4444', border: 'rgba(239,68,68,0.2)'   },
    open:        { bg: 'rgba(59,130,246,0.1)',  text: '#3b82f6', border: 'rgba(59,130,246,0.2)'  },
    in_progress: { bg: 'rgba(2,216,220,0.1)',   text: '#02d8dc', border: 'rgba(2,216,220,0.2)'   },
    closed:      { bg: 'rgba(100,116,139,0.1)', text: '#94a3b8', border: 'rgba(100,116,139,0.2)' },
    completed:   { bg: 'rgba(16,185,129,0.1)',  text: '#10b981', border: 'rgba(16,185,129,0.2)'  },
  }
  const s = map[status?.toLowerCase()] || map.inactive
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '0.25rem 0.75rem', borderRadius: 999,
      fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em',
      background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      textTransform: 'capitalize', whiteSpace: 'nowrap',
    }}>
      {status?.replace(/_/g, ' ')}
    </span>
  )
}

export function AdminModal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(2,6,23,0.92)', backdropFilter: 'blur(16px)' }}
        className="fade-in"
        onClick={onClose}
      />
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: 520,
        background: C.panelBg,
        border: `1px solid rgba(2,216,220,0.2)`,
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(2,216,220,0.05)',
        overflow: 'hidden',
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
      }} className="scale-in">
        {/* Teal brand accent bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, #1e3a5f, #02d8dc, #1e3a5f)', flexShrink: 0 }} />
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 900, fontSize: '1.125rem', fontFamily: 'Outfit, sans-serif', color: C.textPrim, letterSpacing: '-0.01em', margin: 0 }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`,
                borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
                color: C.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = C.teal; e.currentTarget.style.borderColor = C.tealBorder }}
              onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.borderColor = C.border }}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export function AdminSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem', gap: '1.25rem' }}>
      <div style={{ position: 'relative', width: 48, height: 48 }}>
        <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(2,216,220,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '4px solid transparent', borderTopColor: C.teal, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <p style={{ fontSize: '0.65rem', fontWeight: 900, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
        Loading...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null
  const range = Array.from({ length: Math.min(pages, 7) }, (_, i) => {
    if (pages <= 7) return i + 1
    if (page <= 4) return i + 1
    if (page >= pages - 3) return pages - 6 + i
    return page - 3 + i
  })

  const btnStyle = (active) => ({
    minWidth: 40, height: 40, borderRadius: 10, fontSize: '0.875rem', fontWeight: 800,
    background: active ? 'rgba(2,216,220,0.12)' : 'rgba(255,255,255,0.03)',
    color: active ? C.teal : C.textMuted,
    border: active ? '1px solid rgba(2,216,220,0.3)' : `1px solid ${C.border}`,
    cursor: 'pointer', transition: 'all 0.2s', padding: '0 0.75rem',
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '2rem' }}>
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page === 1}
        style={{ ...btnStyle(false), opacity: page === 1 ? 0.35 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
        ← Prev
      </button>
      {range.map((p) => (
        <button key={p} onClick={() => onPage(p)} style={btnStyle(p === page)}>{p}</button>
      ))}
      <button onClick={() => onPage(Math.min(pages, page + 1))} disabled={page === pages}
        style={{ ...btnStyle(false), opacity: page === pages ? 0.35 : 1, cursor: page === pages ? 'not-allowed' : 'pointer' }}>
        Next →
      </button>
    </div>
  )
}

export function Panel({ children, style = {} }) {
  return (
    <div style={{
      background: C.panelBg,
      border: `1px solid ${C.border}`,
      borderRadius: C.radiusLg,
      padding: '1.5rem 1.75rem',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function Badge({ children, status }) {
  return (
    <span style={{
      background: 'rgba(2,216,220,0.08)',
      color: C.teal,
      border: `1px solid rgba(2,216,220,0.2)`,
      padding: '0.2rem 0.6rem',
      borderRadius: 999,
      fontSize: '0.65rem',
      fontWeight: 900,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      {children || status}
    </span>
  )
}

// Admin input field
export function AdminInput({ label, error, style = {}, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...style }}>
      {label && (
        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {label}
        </label>
      )}
      <input
        style={{
          width: '100%', padding: '0.75rem 1rem',
          background: 'rgba(255,255,255,0.03)',
          border: `1.5px solid ${error ? '#ef4444' : C.border}`,
          borderRadius: 10,
          color: C.textPrim, fontSize: '0.9rem', fontFamily: 'inherit',
          outline: 'none', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = C.teal}
        onBlur={e => e.target.style.borderColor = error ? '#ef4444' : C.border}
        {...props}
      />
      {error && <p style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, margin: 0 }}>{error}</p>}
    </div>
  )
}
