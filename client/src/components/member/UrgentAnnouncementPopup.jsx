import { useEffect, useState } from 'react'
import { X, Zap } from 'lucide-react'
import api from '../../lib/api'

const DISMISSED_KEY = 'nvx_dismissed_announcements'

export default function UrgentAnnouncementPopup() {
  const [announcement, setAnnouncement] = useState(null)

  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]')
    api.get('/announcements/urgent')
      .then(({ data }) => {
        const unseen = (data.announcements || []).find((a) => !dismissed.includes(a.id))
        if (unseen) setAnnouncement(unseen)
      })
      .catch(() => {})
  }, [])

  const dismiss = () => {
    if (!announcement) return
    const dismissed = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]')
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissed, announcement.id]))
    setAnnouncement(null)
  }

  if (!announcement) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.25rem',
    }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }} onClick={dismiss} />

      {/* Modal */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 460,
        background: '#fff',
        border: '1.5px solid #fee2e2',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
      }}>
        {/* Accent bar */}
        <div style={{ height: 4, background: 'linear-gradient(90deg, #ef4444, #f97316)' }} />

        <div style={{ padding: '1.75rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 900, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Urgent Notice</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '2px 0 0' }}>{new Date(announcement.published_at).toLocaleString()}</p>
              </div>
            </div>
            <button onClick={dismiss} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.375rem', cursor: 'pointer', color: '#64748b', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              <X size={16} />
            </button>
          </div>

          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>{announcement.title}</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{announcement.body}</p>

          <button onClick={dismiss} style={{
            width: '100%', padding: '0.875rem',
            background: 'linear-gradient(135deg, #ef4444, #f97316)',
            color: '#fff', border: 'none', borderRadius: 14,
            fontWeight: 800, fontSize: '0.9375rem', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            I Understand — Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
