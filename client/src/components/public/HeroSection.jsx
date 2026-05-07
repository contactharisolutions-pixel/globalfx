import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, TrendingUp, Globe, Play, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const barHeights = [40,70,55,90,65,80,95,70,85,60,75,90]

  return (
    <section style={{ background: '#ffffff', paddingTop: '7rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative BG */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)',
        transform: 'skewX(-8deg) translateX(15%)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '24rem', height: '24rem', background: 'rgba(13,148,136,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} id="hero-grid">
          
          {/* Left Column */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.75rem',
            opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem',
              background: '#eff6ff', border: '1px solid #bfdbfe',
              borderRadius: 9999, color: '#3b82f6',
              fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              alignSelf: 'flex-start',
            }}>
              <Shield size={13} /> Institutional Grade AI
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, lineHeight: 1.1,
              color: 'var(--text-main)',
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              Invest Smarter<br />
              <span style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Trade Better</span>
            </h1>

            <p style={{ fontSize: '1.125rem', color: 'var(--text-sub)', lineHeight: 1.8, margin: 0, maxWidth: '28rem' }}>
              GlobalFX combines proprietary AI neural networks with quantitative strategies to deliver consistent market performance. Secure, transparent, and built for your growth.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem', boxShadow: '0 8px 24px rgba(13,148,136,0.25)' }}>
                Start Investing <ArrowRight size={18} />
              </Link>
              <a href="#markets" className="btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                Live Markets
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/64?u=user${i}`} alt="investor" style={{
                    width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff',
                    marginLeft: i === 1 ? 0 : -12, objectFit: 'cover',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }} />
                ))}
              </div>
              <div>
                <p style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', margin: 0 }}>50,000+ Active Investors</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Trusted globally in 80+ countries</p>
              </div>
            </div>
          </div>

          {/* Right Column — Terminal UI */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'scale(0.97)',
            transition: 'opacity 0.7s 0.2s, transform 0.7s 0.2s',
          }}>
            <div style={{
              background: '#ffffff', borderRadius: 28,
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
              overflow: 'hidden', position: 'relative',
            }}>
              {/* Terminal bar */}
              <div style={{
                background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)',
                padding: '0.875rem 1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#fca5a5','#fde68a','#86efac'].map((c,i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Globe size={13} /> LIVE TERMINAL
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Stats area */}
                <div style={{ background: '#f8fafc', borderRadius: 16, padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Total Assets Managed</p>
                      <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>$12,450,230</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#10b981', fontWeight: 900, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                        <TrendingUp size={14} /> +12.5%
                      </p>
                      <p style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weekly Yield</p>
                    </div>
                  </div>
                  {/* Bar chart */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
                    {barHeights.map((h, i) => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '4px 4px 0 0',
                        background: i === barHeights.length - 1 ? 'var(--primary)' : 'rgba(13,148,136,0.15)',
                        height: `${h}%`, transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--primary)'}
                        onMouseLeave={e => { if (i !== barHeights.length - 1) e.currentTarget.style.background = 'rgba(13,148,136,0.15)' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(13,148,136,0.06)', borderRadius: 16, padding: '1rem', border: '1px solid rgba(13,148,136,0.12)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>BTC Confidence</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>98.2%</span>
                      <span style={{ padding: '0.2rem 0.6rem', background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', fontWeight: 900, borderRadius: 8 }}>BUY</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(59,130,246,0.06)', borderRadius: 16, padding: '1rem', border: '1px solid rgba(59,130,246,0.12)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Active Bots</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>1,240</span>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                    </div>
                  </div>
                </div>

                {/* Watch button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={16} style={{ color: '#fff', marginLeft: 3 }} />
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Watch AI Execution</p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'var(--border-medium)' }} />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: -20, left: -20,
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 20, padding: '0.875rem 1.25rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <div style={{ width: 40, height: 40, background: 'rgba(16,185,129,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Last ROI Paid</p>
                <p style={{ fontSize: '0.9375rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>+$420.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
