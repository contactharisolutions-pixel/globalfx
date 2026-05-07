import { useState, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, User } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Markets',      href: '/#markets' },
  { label: 'What is Crypto?', href: '/what-is-crypto' },
  { label: 'Crypto Forex', href: '/crypto-forex' },
  { label: 'Why GlobalFX', href: '/why-globalfx' },
  { label: 'About',        href: '/#about' },
  { label: 'Services',     href: '/#services' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e) => { setIsDesktop(e.matches); if (e.matches) setMenuOpen(false) }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleAnchor = useCallback((e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      setMenuOpen(false)
      const id = href.replace('/#', '')
      // If we are not on home page, navigate home first then scroll
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location.pathname])

  return (
    <>
      <nav
        className={`navbar fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled py-3' : 'py-5'}`}
        style={{ transition: 'all 0.3s' }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/src/assets/images/logo.png" alt="GlobalFX Logo" style={{ height: 48, width: 'auto' }} />
          </Link>

          {/* Desktop Nav Links */}
          {isDesktop && (
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-subtle)', borderRadius: 9999,
              padding: '0.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              {NAV_LINKS.map(({ label, href }) => (
                href.startsWith('/#') ? (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => handleAnchor(e, href)}
                    style={{
                      padding: '0.5rem 1.125rem',
                      fontSize: '0.875rem', fontWeight: 600,
                      color: 'var(--text-sub)',
                      borderRadius: 9999,
                      textDecoration: 'none',
                      transition: 'color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(13,148,136,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-sub)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    style={{
                      padding: '0.5rem 1.125rem',
                      fontSize: '0.875rem', fontWeight: 600,
                      color: 'var(--text-sub)',
                      borderRadius: 9999,
                      textDecoration: 'none',
                      transition: 'color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(13,148,136,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-sub)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    {label}
                  </Link>
                )
              ))}
            </div>
          )}

          {/* Desktop Actions */}
          {isDesktop ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem', fontWeight: 700,
                color: 'var(--text-sub)', textDecoration: 'none',
                borderRadius: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sub)'}
              >
                <User size={15} /> Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.625rem 1.375rem', fontSize: '0.875rem' }}>
                Join Now
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#ffffff', border: '1.5px solid var(--border-subtle)',
                borderRadius: 12, cursor: 'pointer', color: 'var(--text-main)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: '#ffffff',
          display: 'flex', flexDirection: 'column',
          animation: 'fadeIn 0.25s ease',
        }}>
          <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setMenuOpen(false)}>
              <img src="/src/assets/images/logo.png" alt="GlobalFX Logo" style={{ height: 38, width: 'auto' }} />
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border-subtle)', borderRadius: 10, background: '#f8fafc', cursor: 'pointer', color: 'var(--text-main)' }}>
              <X size={20} />
            </button>
          </div>

          <div className="container" style={{ flex: 1 }}>
            {NAV_LINKS.map(({ label, href }) => (
              href.startsWith('/#') ? (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleAnchor(e, href)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid #f1f5f9',
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    fontSize: '1.5rem', fontWeight: 800,
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                  <ChevronRight size={20} style={{ color: 'var(--border-medium)' }} />
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.25rem 0',
                    borderBottom: '1px solid #f1f5f9',
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    fontSize: '1.5rem', fontWeight: 800,
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                  <ChevronRight size={20} style={{ color: 'var(--border-medium)' }} />
                </Link>
              )
            ))}
          </div>

          <div className="container" style={{ paddingBottom: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link to="/login" className="btn-secondary" style={{ padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </>
  )
}
