import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Shield } from 'lucide-react'

const BG       = '#080f1e'
const SURFACE  = '#0e1a2e'
const BORDER   = 'rgba(255,255,255,0.08)'
const PRIMARY  = '#02d8dc'
const ACCENT   = '#0d9dc0'
const TEXT     = '#f1f5f9'
const TEXT_SUB = '#64748b'

const LINKS = {
  Company:  [{ label: 'About Us',    href: '/#about' },{ label: 'Services', href: '/#services' },{ label: 'Why BitLance', href: '/why-bitlance' }],
  Resources:[{ label: 'What is Crypto?', href: '/what-is-crypto' },{ label: 'Crypto & AI', href: '/crypto-forex' },{ label: 'Business Plan', href: 'https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/BitLance%20Business%20Plan.pdf' }],
  Legal:    [{ label: 'Privacy Policy',  href: '/privacy' },{ label: 'Terms of Service', href: '/terms' },{ label: 'Disclaimer', href: '/disclaimer' }],
}

export default function Footer() {
  return (
    <footer style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      {/* CTA Banner */}
      <div style={{ background: `linear-gradient(135deg, #0e1a2e, #1e3a5f)`, borderBottom: `1px solid ${BORDER}`, padding: '4rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: TEXT, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              Ready to grow your wealth?
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', margin: 0 }}>
              Join 50,000+ members earning daily compounding profits with AI.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ padding: '1rem 2rem', background: `linear-gradient(135deg, #1e3a5f, ${PRIMARY})`, color: '#fff', fontWeight: 800, fontSize: '1rem', borderRadius: 14, textDecoration: 'none', boxShadow: '0 8px 24px rgba(2,216,220,0.25)', fontFamily: 'Outfit, sans-serif' }}>
              Get Started Free
            </Link>
            <Link to="/login" style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${BORDER}`, color: TEXT, fontWeight: 700, fontSize: '1rem', borderRadius: 14, textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              Member Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '5rem 1.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3.5rem' }} id="footer-grid">

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <img src="https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/Logo.png" alt="BitLance Logo" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.75, maxWidth: '22rem', margin: 0, fontWeight: 500 }}>
              BitLance is an AI-powered crypto investment platform delivering consistent daily compounding profits for members worldwide.
            </p>
            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="mailto:support@bitlance.pro" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >
                <Mail size={15} style={{ color: PRIMARY }} /> support@bitlance.pro
              </a>
              <a href="https://t.me/bitlancepro" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >
                <MessageCircle size={15} style={{ color: PRIMARY }} /> @bitlancepro on Telegram
              </a>
            </div>
            {/* Security badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: BG, borderRadius: 10, border: `1px solid ${BORDER}` }}>
              <Shield size={14} style={{ color: PRIMARY }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Enterprise Secured</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 900, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0 }}>{col}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map(({ label, href }) => {
                  const isExt = href.startsWith('http')
                  const props = { style: { textDecoration: 'none', color: '#64748b', fontSize: '0.9375rem', fontWeight: 600, transition: 'color 0.2s' }, onMouseEnter: e => e.currentTarget.style.color = TEXT, onMouseLeave: e => e.currentTarget.style.color = '#64748b' }
                  return isExt
                    ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" {...props}>{label}</a>
                    : <Link key={label} to={href} {...props}>{label}</Link>
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: '#475569', fontWeight: 500 }}>
            © 2026 BitLance. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#334155', fontWeight: 500, maxWidth: 500, textAlign: 'right', lineHeight: 1.6 }}>
            All investments carry risk. Past performance does not guarantee future results. This platform is for informational purposes only.
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
