import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown, ArrowRight, ShieldCheck } from 'lucide-react'

const BG      = '#080f1e'
const SURFACE = '#0e1a2e'
const BORDER  = 'rgba(255,255,255,0.08)'
const PRIMARY = '#02d8dc'
const ACCENT  = '#0d9dc0'
const NAVY    = '#1e3a5f'
const TEXT    = '#f1f5f9'
const TEXT_SUB = '#94a3b8'

const PLANS = [
  {
    icon: Zap, name: 'Starter', min: '$25', max: '$499', roi: '2.0%',
    duration: 'Daily Compounding — Unlimited Days',
    features: ['Daily profit payouts', 'Direct referral bonus', '5-level team bonus', 'Standard support'],
    featured: false, accent: '#64748b',
    cardBg: SURFACE, cardBorder: BORDER, iconBg: 'rgba(255,255,255,0.04)',
  },
  {
    icon: Star, name: 'Growth', min: '$500', max: '$4,999', roi: '2.0%',
    duration: 'Daily Compounding — Unlimited Days',
    features: ['Higher daily profits', 'Priority team bonuses', 'Detailed daily reports', 'Personal dashboard', '24/7 Priority support'],
    featured: true, badge: 'Most Popular', accent: PRIMARY,
    cardBg: `linear-gradient(145deg, #0a1e38, #0d2644)`,
    cardBorder: `rgba(2,216,220,0.35)`,
    iconBg: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`,
  },
  {
    icon: Crown, name: 'Elite', min: '$5,000', max: 'Unlimited', roi: '2.0%',
    duration: 'Daily Compounding — Unlimited Days',
    features: ['Maximum daily profits', 'VIP referral rates', 'Dedicated manager', 'Priority withdrawals', 'Exclusive bonuses'],
    featured: false, accent: ACCENT,
    cardBg: SURFACE, cardBorder: BORDER, iconBg: 'rgba(13,157,192,0.1)',
  },
]

export default function PlansSection() {
  return (
    <section id="plans" style={{ padding: '6rem 0', background: BG, position: 'relative', overflow: 'hidden' }}>
      {/* Radial glows */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '60%', background: 'radial-gradient(ellipse, rgba(2,216,220,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem',
            background: 'rgba(2,216,220,0.08)', border: '1.5px solid rgba(2,216,220,0.2)',
            borderRadius: 9999, marginBottom: '1.5rem',
          }}>
            <ShieldCheck size={14} style={{ color: PRIMARY }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Flexible Plans</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: TEXT, fontFamily: 'Outfit, sans-serif', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Choose Your{' '}
            <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Investment Plan</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: TEXT_SUB, lineHeight: 1.75, fontWeight: 500 }}>
            Pick a package that fits your goals. Every plan is powered by BitLance AI to grow your money daily with full transparency and security.
          </p>
        </div>

        {/* Plan Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }} id="plans-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: 'relative',
              background: plan.cardBg,
              border: `1.5px solid ${plan.cardBorder}`,
              borderRadius: 32,
              padding: plan.featured ? '3rem 2rem' : '2.5rem 2rem',
              boxShadow: plan.featured ? `0 32px 80px rgba(2,216,220,0.1)` : '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = plan.featured ? `0 40px 100px rgba(2,216,220,0.18)` : `0 24px 60px rgba(0,0,0,0.35)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = plan.featured ? `0 32px 80px rgba(2,216,220,0.1)` : '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`, color: '#fff',
                  fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
                  padding: '0.5rem 1.25rem', borderRadius: 9999,
                  boxShadow: `0 8px 20px rgba(2,216,220,0.35)`,
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Icon + Name */}
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 20, marginBottom: '1.25rem',
                  background: plan.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: plan.featured ? `0 8px 24px rgba(2,216,220,0.25)` : 'none',
                  border: plan.featured ? 'none' : `1px solid ${BORDER}`,
                  margin: '0 auto 1.5rem',
                }}>
                  <plan.icon size={28} style={{ color: plan.featured ? '#fff' : plan.accent }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: TEXT, fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ padding: '0.375rem 0.875rem', background: 'rgba(255,255,255,0.05)', borderRadius: 9999, display: 'inline-block', border: `1px solid ${BORDER}` }}>
                  <p style={{ fontSize: '0.75rem', color: TEXT_SUB, fontWeight: 800, margin: 0 }}>Investment: {plan.min} – {plan.max}</p>
                </div>
              </div>

              {/* ROI Badge */}
              <div style={{
                background: plan.featured ? 'rgba(2,216,220,0.1)' : 'rgba(255,255,255,0.04)',
                borderRadius: 20, padding: '1.5rem', marginBottom: '2rem',
                border: plan.featured ? `1px solid rgba(2,216,220,0.2)` : `1px solid ${BORDER}`,
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: plan.featured ? PRIMARY : plan.accent, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{plan.roi}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: TEXT_SUB }}>Daily</span>
                </div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{plan.duration}</p>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', padding: 0 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', fontSize: '0.9375rem', fontWeight: 600, color: TEXT_SUB }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      background: plan.featured ? 'rgba(2,216,220,0.1)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${plan.featured ? 'rgba(2,216,220,0.2)' : BORDER}`,
                    }}>
                      <Check size={14} style={{ color: plan.featured ? PRIMARY : '#64748b' }} strokeWidth={3} />
                    </div>
                    <span style={{ color: TEXT }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/register" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                width: '100%', padding: '1rem', boxSizing: 'border-box',
                background: plan.featured ? `linear-gradient(135deg, ${NAVY}, ${PRIMARY})` : 'rgba(255,255,255,0.04)',
                color: plan.featured ? '#fff' : TEXT,
                border: plan.featured ? 'none' : `1.5px solid ${BORDER}`,
                borderRadius: 16, fontWeight: 800, fontSize: '1rem',
                textDecoration: 'none', transition: 'all 0.2s',
                boxShadow: plan.featured ? `0 8px 24px rgba(2,216,220,0.3)` : 'none',
                fontFamily: 'Outfit, sans-serif',
              }}
                onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.background = 'rgba(2,216,220,0.08)'; e.currentTarget.style.color = PRIMARY } }}
                onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = TEXT } }}
              >
                Join This Plan <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom security note */}
        <div style={{ marginTop: '4rem', padding: '1.25rem 2rem', background: SURFACE, border: `1.5px solid ${BORDER}`, borderRadius: 24, display: 'inline-flex', alignItems: 'center', gap: '1rem', width: '100%', boxSizing: 'border-box', justifyContent: 'center' }}>
          <ShieldCheck size={20} style={{ color: '#10b981' }} />
          <p style={{ fontSize: '0.9375rem', color: TEXT_SUB, fontWeight: 600, margin: 0 }}>
            Your capital is managed by <strong style={{ color: TEXT }}>BitLance AI</strong> with a focus on <strong style={{ color: TEXT }}>consistent growth</strong> and <strong style={{ color: TEXT }}>maximum security</strong>.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #plans-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 640px) and (max-width: 1023px) { #plans-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
