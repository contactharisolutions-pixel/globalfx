import { ShieldCheck, TrendingUp, Cpu, Award, Zap, Users, BarChart3, Lock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function WhyGlobalFX() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero */}
      <section style={{ 
        padding: '10rem 0 7rem', 
        background: 'radial-gradient(circle at top right, rgba(13,148,136,0.05), transparent), radial-gradient(circle at bottom left, rgba(59,130,246,0.05), transparent)',
        color: 'var(--text-main)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', marginBottom: '2rem',
              background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.1)',
              borderRadius: 9999, color: '#0d9488',
              fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              <Award size={14} /> The GlobalFX Standard
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, 
              lineHeight: 1.1, fontFamily: 'Outfit, sans-serif', 
              letterSpacing: '-0.04em', margin: '0 0 2rem'
            }}>
              Built for <span style={{ color: '#0d9488' }}>Results</span>. <br />
              Powered by <span style={{ color: '#3b82f6' }}>Intelligence</span>.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
              We've re-engineered the trading experience from the ground up, combining institutional-grade technology with a focus on retail investor success.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Join the Ecosystem</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', border: '2px solid #fff', marginLeft: i === 1 ? 0 : -12 }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)' }}>50k+ Active Traders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section style={{ padding: '7rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: ShieldCheck, 
                title: 'Security First', 
                text: 'Your assets are protected by enterprise-grade encryption and cold storage protocols. We prioritize safety above all else.'
              },
              { 
                icon: Cpu, 
                title: 'AI Trading Core', 
                text: 'Our proprietary neural network processes millions of data points per second to identify high-probability entries.'
              },
              { 
                icon: Users, 
                title: 'Community Driven', 
                text: 'Transparent reporting and a shared-success model mean we only thrive when our community of traders thrives.'
              },
              { 
                icon: Lock, 
                title: 'Total Privacy', 
                text: 'We respect your data. Your personal and financial information is anonymized and never shared with third parties.'
              }
            ].map((pillar, i) => (
              <div key={i} style={{
                padding: '3rem', background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: 32, transition: 'all 0.3s ease'
              }}>
                <pillar.icon size={40} style={{ color: '#0d9488', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{pillar.title}</h3>
                <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, margin: 0 }}>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table (Visual) */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem', fontFamily: 'Outfit, sans-serif' }}>How We Compare</h2>
            <div style={{ overflow: 'hidden', border: '1.5px solid #e2e8f0', borderRadius: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc' }}>
                  <tr>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-faint)' }}>Feature</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '1rem', fontWeight: 900, color: '#0d9488' }}>GlobalFX</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-sub)' }}>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Neural Signal Accuracy', g: '94.2%', o: 'Avg. 60%' },
                    { f: 'Withdrawal Speed', g: 'Instant', o: '24-48 Hours' },
                    { f: 'Asset Protection', g: 'Insured Fund', o: 'Optional' },
                    { f: 'Daily ROI Support', g: 'Yes (Automated)', o: 'Manual Only' },
                    { f: 'Hybrid Access', g: 'All-in-One', o: 'Fragmented' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1.25rem 2rem', fontWeight: 700, color: 'var(--text-main)' }}>{row.f}</td>
                      <td style={{ padding: '1.25rem 2rem', color: '#0d9488', fontWeight: 800 }}>
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
      <section style={{ padding: '7rem 0', background: 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', fontFamily: 'Outfit, sans-serif' }}>Our Vision</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '3rem', opacity: 0.9 }}>
              "To empower every individual with the same financial instruments previously reserved for the world's largest hedge funds."
            </p>
            <Link to="/register" style={{ 
              display: 'inline-block', padding: '1.25rem 3rem', background: '#fff', 
              color: '#0d9488', borderRadius: 16, fontWeight: 800, textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              Start Your Evolution
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
