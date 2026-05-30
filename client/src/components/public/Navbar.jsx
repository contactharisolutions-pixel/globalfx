import { useState, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, User } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Markets',        href: '/#markets' },
  { label: 'What is Crypto?', href: '/what-is-crypto' },
  { label: 'Crypto & AI',    href: '/crypto-forex' },
  { label: 'Why BitLance',   href: '/why-bitlance' },
  { label: 'About',          href: '/#about' },
  { label: 'Services',       href: '/#services' },
  { label: 'Plans',          href: '/#plans' },
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
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location.pathname])

  const PRIMARY = '#00b4a6'
  const NAVY    = '#1e3a5f'

  const linkStyle = {
    padding: '0.5rem 1.125rem',
    fontSize: '0.875rem', fontWeight: 600,
    color: '#475569',
    borderRadius: 9999,
    textDecoration: 'none',
    transition: 'color 0.2s, background 0.2s',
  }

  const renderLink = ({ label, href }) => {
    const hoverIn  = e => { e.currentTarget.style.color = PRIMARY; e.currentTarget.style.background = 'rgba(0,180,166,0.07)' }
    const hoverOut = e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = 'transparent' }

    if (href.startsWith('/#')) {
      return (
        <a key={label} href={href} onClick={e => handleAnchor(e, href)}
          style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
          {label}
        </a>
      )
    }
    return (
      <Link key={label} to={href}
        style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        {label}
      </Link>
    )
  }

  const mobileLink = ({ label, href }) => {
    const mStyle = {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.25rem 0',
      borderBottom: '1px solid #f1f5f9',
      textDecoration: 'none',
      color: NAVY,
      fontSize: '1.5rem', fontWeight: 800,
      fontFamily: 'Outfit, sans-serif',
      transition: 'color 0.2s',
    }
    if (href.startsWith('/#')) {
      return (
        <a key={label} href={href} onClick={e => handleAnchor(e, href)} style={mStyle}>
          {label}<ChevronRight size={20} style={{ color: '#cbd5e1' }} />
        </a>
      )
    }
    return (
      <Link key={label} to={href} onClick={() => setMenuOpen(false)} style={mStyle}>
        {label}<ChevronRight size={20} style={{ color: '#cbd5e1' }} />
      </Link>
    )
  }

  return (
    <>
      <nav
        className={`navbar fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled py-3' : 'py-4'}`}
        style={{ transition: 'all 0.3s', background: scrolled ? undefined : 'rgba(255,255,255,0.97)' }}
      >
        <div className="nav-container" style={{ width: '100%', maxWidth: '100%', padding: '0 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/bitlance-logo.png" alt="BitLance Logo" style={{ height: 44, width: 'auto' }} />
          </Link>

          {/* Desktop Nav Links */}
          {isDesktop && (
            <div style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              border: '1px solid #e2e8f0', borderRadius: 9999,
              padding: '0.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              {NAV_LINKS.map(renderLink)}
            </div>
          )}

          {/* Desktop Actions */}
          {isDesktop ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1.25rem',
                fontSize: '0.875rem', fontWeight: 700,
                color: NAVY, textDecoration: 'none',
                borderRadius: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
                onMouseLeave={e => e.currentTarget.style.color = NAVY}
              >
                <User size={15} /> Login
              </Link>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.625rem 1.375rem', fontSize: '0.875rem', fontWeight: 800,
                background: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`,
                color: '#fff', borderRadius: 10, textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,180,166,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,180,166,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,180,166,0.3)' }}
              >
                Get Started
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#ffffff', border: '1.5px solid #e2e8f0',
                borderRadius: 12, cursor: 'pointer', color: NAVY,
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
          <div className="nav-container" style={{ width: '100%', padding: '1.5rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
              <img src="/bitlance-logo.png" alt="BitLance Logo" style={{ height: 38, width: 'auto' }} />
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', cursor: 'pointer', color: NAVY }}>
              <X size={20} />
            </button>
          </div>

          <div className="nav-container" style={{ width: '100%', padding: '0 4rem', flex: 1 }}>
            {NAV_LINKS.map(mobileLink)}
          </div>

          <div className="nav-container" style={{ width: '100%', padding: '0 4rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link to="/login" className="btn-secondary" style={{ padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '1rem', fontSize: '1.125rem', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1023px) { 
          .nav-container { padding: 0 1.5rem !important; } 
        }
      `}</style>
    </>
  )
}
