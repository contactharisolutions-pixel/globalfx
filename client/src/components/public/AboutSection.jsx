import { Shield, Users, Globe, Calendar, CheckCircle2, TrendingUp, ArrowRight, Cpu, LineChart, Activity, Zap, BarChart2, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '50K+', label: 'Global Members' },
  { value: '80+',  label: 'Nations Active' },
  { value: '100%', label: 'Transparency'   },
  { value: '2022', label: 'Est. Year'       },
]

const BAR_DATA = [55, 70, 45, 90, 65, 80, 95, 72, 88, 60, 78, 92]

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '6rem 0', background: '#f8fafc', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} id="about-grid">

          {/* ── Left: Visual Mosaic ── */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

              {/* Column 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Trading Card */}
                <div style={{
                  height: 240, borderRadius: 28,
                  background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  boxShadow: '0 20px 50px rgba(15,23,42,0.25)', overflow: 'hidden',
                  position: 'relative',
                }}>
                  {/* Glow blob */}
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'rgba(13,148,136,0.2)', borderRadius: '50%', filter: 'blur(30px)' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                    <div style={{ width: 28, height: 28, background: 'rgba(13,148,136,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LineChart size={14} style={{ color: '#0d9488' }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Trading</span>
                  </div>

                  {/* Mini bar chart */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60, zIndex: 1 }}>
                    {BAR_DATA.map((h, i) => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '3px 3px 0 0',
                        background: i === BAR_DATA.length - 1 ? '#0d9488' : `rgba(13,148,136,${0.2 + (h / 100) * 0.4})`,
                        height: `${h}%`,
                      }} />
                    ))}
                  </div>

                  <div style={{ zIndex: 1 }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Avg. Daily Yield</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0, lineHeight: 1 }}>
                      +1.25% <span style={{ fontSize: '0.75rem', color: '#0d9488' }}>↑ ROI</span>
                    </p>
                  </div>
                </div>

                {/* Market Leaders */}
                <div style={{
                  height: 160, background: 'var(--primary)', borderRadius: 28, padding: '1.75rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  boxShadow: '0 16px 40px rgba(13,148,136,0.3)', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 50, height: 50, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
                  <TrendingUp size={28} style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.5)' }} />
                  <p style={{ fontWeight: 900, fontSize: '1.375rem', lineHeight: 1.1, margin: 0, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Market<br/>Leaders</p>
                </div>
              </div>

              {/* Column 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>

                {/* Community First */}
                <div style={{
                  height: 160, background: '#fff', borderRadius: 28, padding: '1.75rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  border: '1.5px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                }}>
                  <Users size={28} style={{ marginBottom: '0.75rem', color: 'rgba(13,148,136,0.4)' }} />
                  <p style={{ fontWeight: 900, fontSize: '1.375rem', lineHeight: 1.1, color: 'var(--text-main)', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Community<br/>First</p>
                </div>

                {/* Tech Card */}
                <div style={{
                  height: 240, borderRadius: 28,
                  background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  border: '1.5px solid #bfdbfe',
                  boxShadow: '0 16px 40px rgba(59,130,246,0.12)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, background: 'rgba(59,130,246,0.1)', borderRadius: '50%', filter: 'blur(30px)' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, background: 'rgba(59,130,246,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cpu size={14} style={{ color: '#3b82f6' }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tech</span>
                  </div>

                  {/* Activity pulses */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1 }}>
                    {[
                      { label: 'Neural Net',  val: '98.2%', w: '98%'  },
                      { label: 'Execution',   val: '94.7%', w: '94%'  },
                      { label: 'Risk Score',  val: '12ms',  w: '88%'  },
                    ].map(row => (
                      <div key={row.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#1e3a8a' }}>{row.label}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#3b82f6' }}>{row.val}</span>
                        </div>
                        <div style={{ height: 4, background: 'rgba(59,130,246,0.15)', borderRadius: 4 }}>
                          <div style={{ height: '100%', width: row.w, background: 'linear-gradient(90deg, #3b82f6, #0d9488)', borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Systems Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Live Status Badge — sits below the mosaic, left-aligned */}
            <div style={{
              marginTop: '1rem',
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              background: '#fff', padding: '1rem 1.5rem', borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0',
            }} id="floating-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>Live Status</span>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                System managing <span style={{ color: '#0d9488' }}>$12M+</span> assets securely.
              </p>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>The GlobalFX Story</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.15, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', margin: '0 0 1.5rem' }}>
                Bridging the Gap Between <br />
                <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Retail & Institutional</span>
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--text-sub)', lineHeight: 1.8, margin: 0 }}>
                GlobalFX was founded by a team of elite traders and developers with a simple vision: to democratize high-frequency algorithmic trading. We believe that professional-grade market strategies shouldn't be locked behind institutional doors.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.625rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Regulated liquidity providers & secure gateways',
                'Transparent daily auditing of every AI execution',
                'Community-centric referral and reward ecosystem',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                  }}>
                    <CheckCircle2 size={15} strokeWidth={3} />
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--text-sub)', fontSize: '0.9375rem' }}>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <Link to="/register" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Explore Our Vision <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #about-grid    { grid-template-columns: 1fr !important; gap: 5rem !important; }
          #floating-badge { right: 0 !important; bottom: -24px !important; }
        }
        @media (max-width: 480px) {
          #about-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
