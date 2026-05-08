import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, TrendingUp, Users, Star, CheckCircle2, Globe, DollarSign, Zap } from 'lucide-react'

const STATS = [
  { value: '50,000+', label: 'Active Members',   color: '#0d9488' },
  { value: '$12M+',   label: 'Total Managed',    color: '#3b82f6' },
  { value: '80+',     label: 'Countries',         color: '#7c3aed' },
  { value: '2.0%',    label: 'Daily Profit Rate', color: '#f97316' },
]

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: 'Secured & Safe'     },
  { icon: TrendingUp,  label: 'Daily Profits'      },
  { icon: Globe,       label: '80+ Countries'      },
  { icon: Users,       label: '50K+ Members'       },
]

const barHeights = [40, 65, 50, 85, 60, 78, 92, 68, 82, 55, 72, 88]

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 60) }, [])

  return (
    <section style={{ background: '#ffffff', paddingTop: '7rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg decoration */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'linear-gradient(135deg, #f0fdfa 0%, #eff6ff 100%)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-5rem', left: '-5rem', width: '22rem', height: '22rem', background: 'rgba(13,148,136,0.05)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} id="hero-grid">

          {/* Left — Content */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '2rem',
            opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#f0fdfa', border: '1.5px solid rgba(13,148,136,0.2)', borderRadius: 9999, alignSelf: 'flex-start' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live & Active — 50,000+ Members</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 900, lineHeight: 1.1,
              color: '#0f172a', letterSpacing: '-0.03em', margin: 0,
            }}>
              Earn Daily Profits<br />
              <span style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>From Your Money</span>
            </h1>

            <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, margin: 0, maxWidth: '30rem', fontWeight: 500 }}>
              GlobalFX manages your investment 24/7 and pays daily profits directly to your account. Transparent, simple, and secure.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} id="hero-ctas">
              <Link
                to="/register"
                className="hero-btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.9375rem 2rem', background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                  color: '#ffffff', fontWeight: 800, fontSize: '1rem', borderRadius: 14,
                  textDecoration: 'none', boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                  justifyContent: 'center',
                }}
              >
                Start Earning Now <ArrowRight size={18} />
              </Link>
              <a
                href="#how-it-works"
                className="hero-btn-secondary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.9375rem 2rem', background: '#ffffff',
                  border: '1.5px solid #e2e8f0', color: '#0f172a',
                  fontWeight: 700, fontSize: '1rem', borderRadius: 14,
                  textDecoration: 'none', transition: 'all 0.2s',
                  justifyContent: 'center',
                }}
              >
                How It Works
              </a>
            </div>

            {/* Trust chips */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 9999 }}>
                  <Icon size={13} style={{ color: '#0d9488' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats Card */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'scale(0.97) translateY(12px)',
            transition: 'all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{
              background: '#ffffff', borderRadius: 28,
              border: '1.5px solid #e2e8f0',
              boxShadow: '0 24px 64px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
              overflow: 'visible', position: 'relative',
            }}>
              {/* Card top strip */}
              <div style={{ height: 4, background: 'linear-gradient(90deg, #0d9488, #3b82f6, #7c3aed)', borderRadius: '28px 28px 0 0' }} />

              <div style={{ padding: '1.75rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Total Funds Managed</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, margin: 0 }}>$12,450,230</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 900, fontSize: '0.9375rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', margin: 0 }}>
                      <TrendingUp size={15} /> +2.0%
                    </p>
                    <p style={{ fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>Daily Profit</p>
                  </div>
                </div>

                {/* Chart bars */}
                <div style={{ background: '#f8fafc', borderRadius: 16, padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.875rem' }}>30-Day Performance</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 70 }}>
                    {barHeights.map((h, i) => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '4px 4px 0 0',
                        background: i === barHeights.length - 1
                          ? 'linear-gradient(180deg, #0d9488, #0f766e)'
                          : `rgba(13,148,136,${0.1 + (h / 100) * 0.3})`,
                        height: `${h}%`, transition: 'background 0.2s',
                      }} />
                    ))}
                  </div>
                </div>

                {/* 2-col mini cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '1rem', background: '#f0fdfa', borderRadius: 16, border: '1px solid rgba(13,148,136,0.15)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Daily Rate</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>2.0%</p>
                    <span style={{ padding: '0.2rem 0.6rem', background: '#0d9488', color: '#fff', fontSize: '0.6rem', fontWeight: 900, borderRadius: 8 }}>ACTIVE</span>
                  </div>
                  <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: 16, border: '1px solid rgba(59,130,246,0.15)' }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Members Online</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.375rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>2,891</p>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }} />
                    </div>
                  </div>
                </div>

                {/* Last payout */}
                <div style={{ padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f0fdf4', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DollarSign size={16} style={{ color: '#10b981' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8' }}>Last Profit Paid</p>
                      <p style={{ margin: 0, fontWeight: 900, color: '#0f172a', fontSize: '0.9375rem', fontFamily: 'Outfit, sans-serif' }}>+$420.50</p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10b981', background: '#f0fdf4', padding: '0.25rem 0.75rem', borderRadius: 9999, border: '1px solid rgba(16,185,129,0.2)' }}>Just Now</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: -18, left: -16,
              background: '#fff', border: '1.5px solid #e2e8f0',
              borderRadius: 18, padding: '0.875rem 1.25rem',
              boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <div style={{ width: 36, height: 36, background: '#fef2f2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={17} style={{ color: '#f97316' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Members Today</p>
                <p style={{ margin: 0, fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', fontSize: '0.9375rem' }}>+127 joined</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid #f1f5f9' }} id="hero-stats">
          {STATS.map(({ value, label, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '2rem', color, letterSpacing: '-0.02em', margin: '0 0 0.375rem' }}>{value}</p>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600, margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #hero-grid  { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #hero-ctas { flex-direction: column !important; }
          .hero-btn-primary, .hero-btn-secondary { width: 100% !important; }
        }
        @media (max-width: 480px) {
          #hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.6); }
          50%       { box-shadow: 0 0 14px rgba(16,185,129,0.9); }
        }
      `}</style>
    </section>
  )
}
