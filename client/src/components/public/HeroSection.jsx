import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Cpu, Users, FileText } from 'lucide-react'

const PRIMARY  = '#02d8dc'
const ACCENT   = '#0d9dc0'
const NAVY     = '#1e3a5f'
const TEXT     = '#f1f5f9'
const TEXT_SUB = '#cbd5e1'
const BORDER   = 'rgba(255,255,255,0.12)'

const STATS = [
  { value: '50,000+', label: 'Active Members',        color: PRIMARY   },
  { value: '$12M+',   label: 'Total Managed',         color: TEXT      },
  { value: '80+',     label: 'Countries',              color: ACCENT    },
  { value: '2.0%',    label: 'Daily Compounding ROI',  color: '#f97316' },
]

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: 'Secured & Safe'  },
  { icon: Cpu,         label: 'AI-Powered'      },
  { icon: Users,       label: '80+ Countries'   },
  { icon: Users,       label: '50K+ Members'    },
]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  return (
    <section style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: '8rem',
      paddingBottom: '6rem',
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/crypto-hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Dark overlay gradient for readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(8,15,30,0.88) 0%, rgba(8,15,30,0.70) 50%, rgba(8,15,30,0.85) 100%)',
      }} />

      {/* Teal glow overlay — top left */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%', zIndex: 2,
        width: '45%', height: '70%',
        background: 'radial-gradient(ellipse, rgba(2,216,220,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Navy glow — bottom right */}
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%', zIndex: 2,
        width: '40%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(30,58,95,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <div style={{
          maxWidth: 820, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem',
          opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(28px)',
          transition: 'all 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1.125rem',
            background: 'rgba(2,216,220,0.1)',
            border: '1.5px solid rgba(2,216,220,0.25)',
            borderRadius: 9999, backdropFilter: 'blur(8px)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Live & Active — 50,000+ Members</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900, lineHeight: 1.06,
            color: TEXT, letterSpacing: '-0.04em',
            margin: 0,
            textShadow: '0 4px 32px rgba(0,0,0,0.5)',
          }}>
            Intelligent Crypto<br />
            <span style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, ${ACCENT} 50%, #7c3aed 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Growth Engine
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: TEXT_SUB, lineHeight: 1.8, margin: 0,
            maxWidth: '580px', fontWeight: 500,
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            BitLance uses AI-powered algorithmic trading to manage your investment 24/7 and pay daily compounding profits — transparent, simple, and unstoppable.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.25rem',
              background: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`,
              color: '#fff', fontWeight: 800, fontSize: '1.0625rem', borderRadius: 14,
              textDecoration: 'none', boxShadow: '0 8px 28px rgba(2,216,220,0.35)',
              fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(2,216,220,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(2,216,220,0.35)' }}
            >
              Start Growing Now <ArrowRight size={18} />
            </Link>
            <a
              href="https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/BitLance%20Business%20Plan.pdf"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '1rem 2.25rem',
                background: 'rgba(255,255,255,0.07)',
                border: `1.5px solid ${BORDER}`,
                color: TEXT, fontWeight: 700, fontSize: '1.0625rem', borderRadius: 14,
                textDecoration: 'none', transition: 'all 0.2s',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; e.currentTarget.style.background = 'rgba(2,216,220,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              <FileText size={17} /> Business Plan
            </a>
          </div>

          {/* Trust chips */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {TRUST_CHIPS.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 0.875rem',
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${BORDER}`, borderRadius: 9999,
                backdropFilter: 'blur(8px)',
              }}>
                <Icon size={13} style={{ color: PRIMARY }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: TEXT_SUB }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          marginTop: '5rem',
          background: BORDER,
          borderRadius: 20,
          border: `1px solid ${BORDER}`,
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
        }} id="hero-stats">
          {STATS.map(({ value, label, color }, i) => (
            <div key={label} style={{
              textAlign: 'center', padding: '1.75rem 1rem',
              background: 'rgba(8,15,30,0.7)',
              position: 'relative',
            }}>
              {i < STATS.length - 1 && (
                <div style={{ position: 'absolute', right: 0, top: '20%', bottom: '20%', width: 1, background: BORDER }} />
              )}
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', color, letterSpacing: '-0.02em', margin: '0 0 0.375rem', textShadow: `0 0 20px ${color}40` }}>{value}</p>
              <p style={{ fontSize: '0.8125rem', color: TEXT_SUB, fontWeight: 600, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #hero-stats { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 639px)  { #hero-stats { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
