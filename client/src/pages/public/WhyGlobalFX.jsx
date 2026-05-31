import { ShieldCheck, TrendingUp, Cpu, Award, Zap, Users, BarChart3, Lock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const NAVY      = '#1e3a5f'
const PRIMARY   = '#02d8dc'
const ACCENT    = '#059db2'
const BG        = '#080f1e'
const SURFACE   = '#0e1a2e'
const BORDER    = 'rgba(255,255,255,0.08)'
const TEXT      = '#f1f5f9'
const TEXT_SUB  = '#94a3b8'

export default function WhyBitLance() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: BG, color: TEXT }}>
      {/* Hero */}
      <section style={{ 
        padding: '10rem 0 7rem', 
        background: `radial-gradient(circle at top right, rgba(2,216,220,0.06), transparent), radial-gradient(circle at bottom left, rgba(30,58,95,0.05), transparent)`,
        color: TEXT,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '80%', background: `radial-gradient(circle, rgba(2,216,220,0.08) 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '40%', height: '80%', background: `radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)`, borderRadius: '50%' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', marginBottom: '2rem',
              background: `rgba(2,216,220,0.06)`, border: `1px solid rgba(2,216,220,0.15)`,
              borderRadius: 9999, color: PRIMARY,
              fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              <Award size={14} /> The BitLance Standard
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, 
              lineHeight: 1.1, fontFamily: 'Outfit, sans-serif', 
              letterSpacing: '-0.04em', margin: '0 0 2rem',
              color: TEXT
            }}>
              Built for <span style={{ color: PRIMARY }}>Results</span>. <br />
              Powered by <span style={{ color: ACCENT }}>Intelligence</span>.
            </h1>
            <p style={{ fontSize: '1.25rem', color: TEXT_SUB, lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
              We've re-engineered the crypto investing experience from the ground up, combining institutional-grade AI with a focus on retail investor success.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Join the Ecosystem</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #02d8dc)', border: '2px solid var(--border-subtle)', marginLeft: i === 1 ? 0 : -12 }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: TEXT_SUB }}>50k+ Active Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section style={{ padding: '7rem 0', background: SURFACE }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 900, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.875rem' }}>Why BitLance</p>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              The Four Pillars of{' '}
              <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>BitLance</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: ShieldCheck, 
                title: 'Security First', 
                text: 'Your assets are protected by enterprise-grade encryption and multi-layer security protocols. We prioritize safety above all else.',
                color: PRIMARY,
              },
              { 
                icon: Cpu, 
                title: 'AI Trading Core', 
                text: 'Our proprietary neural network processes millions of data points per second to identify high-probability crypto entries.',
                color: ACCENT,
              },
              { 
                icon: Users, 
                title: 'Community Driven', 
                text: 'Transparent reporting and a shared-success model mean BitLance only thrives when our community of investors thrives.',
                color: '#7c3aed',
              },
              { 
                icon: Lock, 
                title: 'Total Privacy', 
                text: 'We respect your data. Your personal and financial information is anonymized and never shared with third parties.',
                color: '#f97316',
              }
            ].map((pillar, i) => (
              <div key={i} style={{
                padding: '3rem', background: BG, border: `1px solid ${BORDER}`,
                borderRadius: 32, transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.35)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <pillar.icon size={40} style={{ color: pillar.color, marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: TEXT }}>{pillar.title}</h3>
                <p style={{ color: TEXT_SUB, lineHeight: 1.7, margin: 0 }}>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: '7rem 0', background: BG }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem', fontFamily: 'Outfit, sans-serif', color: TEXT }}>How We Compare</h2>
            <div style={{ overflow: 'hidden', border: `1.5px solid ${BORDER}`, borderRadius: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: SURFACE }}>
                  <tr>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', color: TEXT_SUB }}>Feature</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '1rem', fontWeight: 900, color: PRIMARY }}>BitLance</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.875rem', fontWeight: 700, color: TEXT_SUB }}>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Neural Signal Accuracy', g: '94.2%', o: 'Avg. 60%' },
                    { f: 'Withdrawal Speed', g: 'Instant', o: '24-48 Hours' },
                    { f: 'Asset Protection', g: 'Insured Fund', o: 'Optional' },
                    { f: 'Daily ROI Support', g: 'Yes (AI Automated)', o: 'Manual Only' },
                    { f: 'Hybrid Crypto Access', g: 'All-in-One', o: 'Fragmented' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                      <td style={{ padding: '1.25rem 2rem', fontWeight: 700, color: TEXT }}>{row.f}</td>
                      <td style={{ padding: '1.25rem 2rem', color: PRIMARY, fontWeight: 800 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={16} /> {row.g}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', color: 'var(--text-faint)', fontWeight: 600 }}>{row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: '7rem 0', background: `linear-gradient(135deg, ${NAVY} 0%, ${PRIMARY} 100%)`, color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', fontFamily: 'Outfit, sans-serif' }}>Our Vision</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '3rem', opacity: 0.9 }}>
              "To empower every individual with the same intelligent crypto instruments previously reserved for the world's largest hedge funds."
            </p>
            <Link to="/register" style={{ 
              display: 'inline-block', padding: '1.25rem 3rem', background: '#fff', 
              color: NAVY, borderRadius: 16, fontWeight: 800, textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
              fontFamily: 'Outfit, sans-serif',
            }}>
              Start Your Evolution
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
