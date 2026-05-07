import { Link } from 'react-router-dom'
import { Check, Star, Zap, Crown, ArrowRight, ShieldCheck } from 'lucide-react'

const PLANS = [
  {
    icon: Zap, name: 'Starter', min: '$50', max: '$499', roi: '0.5%',
    duration: 'Until 200% return',
    features: ['Daily ROI payouts', 'Direct referral bonus', '15-level team income', 'Standard support'],
    featured: false, accent: '#64748b',
  },
  {
    icon: Star, name: 'Standard', min: '$500', max: '$4,999', roi: '1.0%',
    duration: 'Until 200% return',
    features: ['Increased daily yield', 'Priority team bonuses', 'Detailed trade reports', 'Advanced dashboard', '24/7 Priority support'],
    featured: true, badge: 'Most Popular', accent: '#0d9488',
  },
  {
    icon: Crown, name: 'Premium', min: '$5,000', max: 'Unlimited', roi: '2.0%',
    duration: 'Until 200% return',
    features: ['Maximum daily ROI', 'VIP referral rates', 'Account manager', 'Private trade signals', 'Instant withdrawals'],
    featured: false, accent: '#3b82f6',
  },
]

export default function PlansSection() {
  return (
    <section id="plans" style={{ padding: '5rem 0', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, #fff, transparent)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 9999, marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Flexible Packages</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Tailored Investment{' '}
            <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Strategies</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-sub)', lineHeight: 1.75 }}>
            Choose a plan that fits your financial goals. Every package is powered by our core AI engine for consistent, transparent yields.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'start' }} id="plans-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              position: 'relative',
              background: '#fff',
              border: plan.featured ? `2px solid var(--primary)` : '1.5px solid var(--border-subtle)',
              borderRadius: 32,
              padding: plan.featured ? '2.5rem 2rem' : '2rem',
              boxShadow: plan.featured ? '0 20px 60px rgba(13,148,136,0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              marginTop: plan.featured ? 0 : 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = plan.featured ? '0 20px 60px rgba(13,148,136,0.12)' : '0 4px 16px rgba(0,0,0,0.04)' }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--primary)', color: '#fff',
                  fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '0.375rem 1rem', borderRadius: 9999,
                  boxShadow: '0 4px 12px rgba(13,148,136,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16, marginBottom: '1.25rem',
                  background: plan.featured ? 'var(--primary)' : '#f8fafc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: plan.featured ? '0 8px 24px rgba(13,148,136,0.25)' : 'none',
                }}>
                  <plan.icon size={26} style={{ color: plan.featured ? '#fff' : plan.accent }} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.25rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Investment: {plan.min} – {plan.max}</p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 16, padding: '1.25rem', marginBottom: '1.75rem', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 900, color: plan.featured ? 'var(--primary)' : 'var(--text-main)', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{plan.roi}</span>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-muted)' }}>Daily</span>
                </div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{plan.duration}</p>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-sub)' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: plan.featured ? 'rgba(13,148,136,0.1)' : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={12} style={{ color: plan.featured ? 'var(--primary)' : '#94a3b8' }} strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/register" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', padding: '0.875rem',
                background: plan.featured ? 'var(--primary)' : '#fff',
                color: plan.featured ? '#fff' : 'var(--text-main)',
                border: plan.featured ? 'none' : '1.5px solid var(--border-medium)',
                borderRadius: 16, fontWeight: 800, fontSize: '0.9375rem',
                textDecoration: 'none', transition: 'background 0.2s, box-shadow 0.2s',
                boxShadow: plan.featured ? '0 4px 16px rgba(13,148,136,0.2)' : 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = plan.featured ? 'var(--primary-hover)' : '#f8fafc' }}
                onMouseLeave={e => { e.currentTarget.style.background = plan.featured ? 'var(--primary)' : '#fff' }}
              >
                Deploy Now <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} style={{ color: '#10b981' }} />
          Capital is managed through professional quantitative strategies with strict risk protocols.
        </p>
      </div>

      <style>{`
        @media (max-width: 1023px) { #plans-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 640px) and (max-width: 1023px) { #plans-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  )
}
