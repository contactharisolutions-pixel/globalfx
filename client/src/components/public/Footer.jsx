import { Link } from 'react-router-dom'
import { TrendingUp, Send, MessageCircle, AtSign, PlayCircle, Mail, Clock, ShieldCheck, MapPin } from 'lucide-react'

const SOCIALS = [
  { icon: Send,          href: 'https://t.me/globalfx_official', bg: '#26a5e4' },
  { icon: AtSign,        href: '#', bg: '#000000' },
  { icon: MessageCircle, href: '#', bg: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' },
  { icon: PlayCircle,    href: '#', bg: '#ff0000' },
]

const FOOTER_LINKS = [
  { label: 'Home',       href: '/#home' },
  { label: 'Markets',    href: '/#markets' },
  { label: 'About',      href: '/#about' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Risk Disclaimer',  to: '/disclaimer' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" style={{ background: '#f8fafc', borderTop: '1px solid var(--border-subtle)', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '4rem' }} id="footer-grid">

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <img src="/src/assets/images/logo.png" alt="GlobalFX Logo" style={{ height: 54, width: 'auto' }} />
            </Link>

            <p style={{ fontSize: '0.9375rem', color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: '22rem' }}>
              Democratizing high-frequency algorithmic trading for investors worldwide. Secure, transparent, and driven by institutional-grade AI performance.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: s.bg, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'transform 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', alignSelf: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(16,185,129,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)' }}>Assets Insured</p>
                <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Market Protection Active</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {FOOTER_LINKS.map(l => (
                <li key={l.label}>
                  <a href={l.href} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-sub)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {LEGAL_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.to} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-sub)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(13,148,136,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Support Email</p>
                  <a href="mailto:support@globalfx.vip" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>support@globalfx.vip</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(13,148,136,0.08)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Global Presence</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Dubai, UAE & London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-faint)' }}>
            &copy; {year} <strong style={{ color: 'var(--text-main)' }}>GlobalFX Trading Platform</strong>. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { icon: Clock, label: 'System Uptime: 99.9%' },
              { icon: ShieldCheck, label: 'SSL Encrypted', color: '#10b981' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-faint)' }}>
                <Icon size={14} style={{ color: color || 'var(--primary)' }} /> {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: 16, textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.7, maxWidth: '56rem', margin: '0 auto' }}>
            Risk Warning: Trading financial instruments involves significant risk and can result in the loss of your invested capital. Past performance does not guarantee future results.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 639px)  { #footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
