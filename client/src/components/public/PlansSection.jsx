import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown, ArrowRight, ShieldCheck } from 'lucide-react'

const NAVY    = '#1e3a5f'
const PRIMARY = '#00b4a6'
const ACCENT  = '#0d9dc0'

const PLANS = [
  {
    icon: Zap, name: 'Starter', min: '$25', max: '$499', roi: '2.0%',
    duration: 'Paid until 200% return',
    features: ['Daily profit payouts', 'Direct referral bonus', '5-level team bonus', 'Standard support'],
    featured: false, accent: '#64748b',
  },
  {
    icon: Star, name: 'Growth', min: '$500', max: '$4,999', roi: '2.0%',
    duration: 'Paid until 200% return',
    features: ['Higher daily profits', 'Priority team bonuses', 'Detailed daily reports', 'Personal dashboard', '24/7 Priority support'],
    featured: true, badge: 'Most Popular', accent: PRIMARY,
  },
  {
    icon: Crown, name: 'Elite', min: '$5,000', max: 'Unlimited', roi: '2.0%',
    duration: 'Paid until 200% return',
    features: ['Maximum daily profits', 'VIP referral rates', 'Dedicated manager', 'Priority withdrawals', 'Exclusive bonuses'],
    featured: false, accent: NAVY,
  },
]

export default function PlansSection() {
  return (
    <section id="plans" style={{ padding: '6rem 0', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, #fff, transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9999, marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <ShieldCheck size={14} style={{ color: PRIMARY }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Flexible Plans</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: NAVY, fontFamily: 'Outfit, sans-serif', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Choose Your{' '}
            <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${NAVY})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Investment Plan</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.75, fontWeight: 500 }}>
            Pick a package that fits your goals. Every plan is powered by BitLance AI to grow your money daily with full transparency and security.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }} id="plans-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: 'relative',
              background: '#fff',
              border: plan.featured ? `2px solid ${PRIMARY}` : '1.5px solid #e2e8f0',
              borderRadius: 32,
              padding: plan.featured ? '3rem 2rem' : '2.5rem 2rem',
              boxShadow: plan.featured ? `0 32px 80px rgba(0,180,166,0.14)` : '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = plan.featured ? `0 32px 80px rgba(0,180,166,0.14)` : '0 4px 20px rgba(0,0,0,0.04)' }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: `linear-gradient(135deg, ${NAVY}, ${PRIMARY})`, color: '#fff',
                  fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
                  padding: '0.5rem 1.25rem', borderRadius: 9999,
                  boxShadow: `0 8px 20px rgba(0,180,166,0.3)`,
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 20, marginBottom: '1.25rem',
                  background: plan.featured ? `linear-gradient(135deg, ${NAVY}, ${PRIMARY})` : '#f8fafc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: plan.featured ? `0 8px 24px rgba(0,180,166,0.25)` : 'none',
                  margin: '0 auto 1.5rem',
                }}>
                  <plan.icon size={28} style={{ color: plan.featured ? '#fff' : plan.accent }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: NAVY, fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ padding: '0.375rem 0.875rem', background: '#f1f5f9', borderRadius: 9999, display: 'inline-block' }}>
                   <p style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 800, margin: 0 }}>Investment: {plan.min} – {plan.max}</p>
                </div>
              </div>

              <div style={{ background: plan.featured ? 'linear-gradient(135deg, #e6faf9, #e8f7fc)' : '#f8fafc', borderRadius: 20, padding: '1.5rem', marginBottom: '2rem', border: plan.featured ? `1px solid rgba(0,180,166,0.2)` : '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.375rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: plan.featured ? PRIMARY : NAVY, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{plan.roi}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#94a3b8' }}>Daily</span>
                </div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{plan.duration}</p>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', padding: 0 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', fontSize: '0.9375rem', fontWeight: 600, color: '#475569' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      background: plan.featured ? 'rgba(0,180,166,0.1)' : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={14} style={{ color: plan.featured ? PRIMARY : '#94a3b8' }} strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/register" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                width: '100%', padding: '1rem', boxSizing: 'border-box',
                background: plan.featured ? `linear-gradient(135deg, ${NAVY}, ${PRIMARY})` : '#ffffff',
                color: plan.featured ? '#fff' : NAVY,
                border: plan.featured ? 'none' : '1.5px solid #e2e8f0',
                borderRadius: 16, fontWeight: 800, fontSize: '1rem',
                textDecoration: 'none', transition: 'all 0.2s',
                boxShadow: plan.featured ? `0 8px 24px rgba(0,180,166,0.3)` : 'none',
                fontFamily: 'Outfit, sans-serif',
              }}
                onMouseEnter={e => { if (!plan.featured) { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.background = '#e6faf9' } }}
                onMouseLeave={e => { if (!plan.featured) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff' } }}
              >
                Join This Plan <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', padding: '1.25rem 2rem', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 24, display: 'inline-flex', alignItems: 'center', gap: '1rem', width: '100%', boxSizing: 'border-box', justifyContent: 'center' }}>
          <ShieldCheck size={20} style={{ color: '#10b981' }} />
          <p style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: 600, margin: 0 }}>
             Your capital is managed by <strong style={{ color: NAVY }}>BitLance AI</strong> with a focus on <strong style={{ color: NAVY }}>consistent growth</strong> and <strong style={{ color: NAVY }}>maximum security</strong>.
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
