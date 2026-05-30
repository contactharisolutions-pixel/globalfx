import { Shield, Users, Globe, CheckCircle2, TrendingUp, ArrowRight, BarChart2, Lock, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAVY    = '#1e3a5f'
const PRIMARY = '#00b4a6'
const ACCENT  = '#0d9dc0'

const STATS = [
  { value: '50K+',  label: 'Happy Members',  color: PRIMARY },
  { value: '80+',   label: 'Countries',       color: NAVY   },
  { value: '100%',  label: 'Transparent',     color: ACCENT },
  { value: '2022',  label: 'Founded',          color: '#f97316' },
]

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '6rem 0', background: '#f8fafc', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} id="about-grid">

          {/* Left: Visual Cards */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

              {/* Col 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Dark navy chart card */}
                <div style={{ height: 240, borderRadius: 24, background: `linear-gradient(145deg, ${NAVY} 0%, #2d4a6f 100%)`, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 50px rgba(30,58,95,0.25)', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `rgba(0,180,166,0.15)`, borderRadius: '50%', filter: 'blur(30px)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                    <div style={{ width: 28, height: 28, background: `rgba(0,180,166,0.2)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BarChart2 size={14} style={{ color: PRIMARY }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>AI Performance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60, zIndex: 1 }}>
                    {[55,70,45,90,65,80,95,72,88,60,78,92].map((h, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', background: i === 11 ? PRIMARY : `rgba(0,180,166,${0.15 + (h/100)*0.35})`, height: `${h}%` }} />
                    ))}
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Avg. Daily Profit</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0, lineHeight: 1 }}>+2.0% <span style={{ fontSize: '0.75rem', color: PRIMARY }}>daily</span></p>
                  </div>
                </div>

                {/* Teal accent card */}
                <div style={{ height: 150, background: `linear-gradient(135deg, ${PRIMARY}, ${NAVY})`, borderRadius: 24, padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: `0 16px 40px rgba(0,180,166,0.3)`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                  <TrendingUp size={26} style={{ marginBottom: '0.625rem', color: 'rgba(255,255,255,0.6)' }} />
                  <p style={{ fontWeight: 900, fontSize: '1.25rem', lineHeight: 1.2, margin: 0, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Growing<br/>Every Day</p>
                </div>
              </div>

              {/* Col 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
                {/* White card */}
                <div style={{ height: 150, background: '#fff', borderRadius: 24, padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: '1.5px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                  <Cpu size={26} style={{ marginBottom: '0.625rem', color: `rgba(0,180,166,0.5)` }} />
                  <p style={{ fontWeight: 900, fontSize: '1.25rem', lineHeight: 1.2, color: NAVY, margin: 0, fontFamily: 'Outfit, sans-serif' }}>AI-Driven<br/>Returns</p>
                </div>

                {/* Security card */}
                <div style={{ height: 240, borderRadius: 24, background: 'linear-gradient(145deg, #e6faf9 0%, #e8f7fc 100%)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1.5px solid rgba(0,180,166,0.2)`, boxShadow: `0 16px 40px rgba(0,180,166,0.1)`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, background: `rgba(30,58,95,0.06)`, borderRadius: '50%', filter: 'blur(30px)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 28, height: 28, background: `rgba(0,180,166,0.15)`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Lock size={14} style={{ color: PRIMARY }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Security</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { label: 'Fund Protection', val: '100%', w: '100%' },
                      { label: 'Uptime',           val: '99.9%', w: '99%' },
                      { label: 'Payout Speed',     val: 'Instant', w: '95%' },
                    ].map(row => (
                      <div key={row.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: NAVY }}>{row.label}</span>
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: PRIMARY }}>{row.val}</span>
                        </div>
                        <div style={{ height: 4, background: `rgba(0,180,166,0.15)`, borderRadius: 4 }}>
                          <div style={{ height: '100%', width: row.w, background: `linear-gradient(90deg, ${PRIMARY}, ${NAVY})`, borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.1em' }}>All Systems Secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Status badge */}
            <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', background: '#fff', padding: '0.875rem 1.5rem', borderRadius: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1.5px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b' }}>Live</span>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: NAVY, margin: 0 }}>
                Managing <span style={{ color: PRIMARY, fontWeight: 900 }}>$12M+</span> in member funds right now.
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <p style={{ color: PRIMARY, fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Story</p>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: NAVY, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
                AI-Powered Investing<br />
                <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${NAVY})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Built for Everyone</span>
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                BitLance was created with a simple goal: to democratize intelligent crypto investing. We harness neural networks and algorithmic trading to grow your money daily — putting institutional-grade returns in the hands of everyday investors.
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} id="about-stats-grid">
              {STATS.map(({ value, label, color }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.625rem', color, lineHeight: 1, marginBottom: 4 }}>{value}</p>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                'Daily profits paid automatically — no action needed from you',
                'AI algorithms trade 24/7 across 200+ crypto markets',
                'Earn extra with BitLance referral & team bonus system',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#e6faf9', border: `1px solid rgba(0,180,166,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: PRIMARY, flexShrink: 0 }}>
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.9375rem', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`, color: '#fff', fontWeight: 800, fontSize: '1rem', borderRadius: 14, textDecoration: 'none', boxShadow: `0 8px 24px rgba(0,180,166,0.3)`, alignSelf: 'flex-start', fontFamily: 'Outfit, sans-serif' }}>
              Join BitLance <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #about-grid { grid-template-columns: 1fr !important; gap: 4rem !important; } }
        @media (max-width: 768px)  { #about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { 
          #about-grid > div:first-child { display: none !important; } 
          #about-stats-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
