import { UserPlus, Wallet, TrendingUp, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    num: '01', icon: UserPlus, title: 'Create Your Account',
    desc: 'Sign up for free in under 2 minutes. No hidden fees, no documents required to start.',
    color: '#0d9488', bg: '#f0fdfa', border: 'rgba(13,148,136,0.15)',
  },
  {
    num: '02', icon: Wallet, title: 'Add Your Funds',
    desc: 'Deposit as little as $25 using USDT (BEP20). Your money is always secure and tracked.',
    color: '#3b82f6', bg: '#eff6ff', border: 'rgba(59,130,246,0.15)',
  },
  {
    num: '03', icon: TrendingUp, title: 'Choose an Investment Plan',
    desc: 'Pick a plan that suits your budget. We manage everything and work 24 hours a day.',
    color: '#7c3aed', bg: '#f5f3ff', border: 'rgba(124,58,237,0.15)',
  },
  {
    num: '04', icon: DollarSign, title: 'Receive Daily Profits',
    desc: 'Watch your balance grow every day. Withdraw your money anytime — no waiting periods.',
    color: '#f97316', bg: '#fff7ed', border: 'rgba(249,115,22,0.15)',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: '6rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Background shimmer */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(13,148,136,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#f0fdfa', border: '1.5px solid rgba(13,148,136,0.2)', borderRadius: 9999, marginBottom: '1.5rem' }}>
            <CheckCircle2 size={13} style={{ color: '#0d9488' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Simple 4-Step Process</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
            How Does It Work?
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.8, fontWeight: 500, margin: 0 }}>
            Getting started is simple. No financial experience needed — we handle everything for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative' }} id="steps-grid">
          {/* Connector line (desktop only) */}
          <div style={{ position: 'absolute', top: '4.5rem', left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #0d9488, #3b82f6, #7c3aed, #f97316)', zIndex: 0, borderRadius: 9999 }} id="step-line" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 1.5rem 1.75rem', background: '#ffffff', border: `1.5px solid ${step.border}`, borderRadius: 24, textAlign: 'center', position: 'relative', zIndex: 1, transition: 'all 0.25s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${step.color}18` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Icon */}
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: step.bg, border: `2px solid ${step.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', position: 'relative' }}>
                  <Icon size={30} style={{ color: step.color }} strokeWidth={2} />
                  {/* Step number bubble */}
                  <div style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: step.color, color: '#fff', fontSize: '0.625rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${step.color}50` }}>
                    {i + 1}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.625rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', padding: '0.875rem 1.5rem', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 9999, marginBottom: '2rem' }}>
            <div style={{ width: 32, height: 32, background: '#f0fdfa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={17} style={{ color: '#0d9488' }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Average setup time: <strong style={{ color: '#0f172a' }}>less than 5 minutes</strong></span>
          </div>
          <br />
          <Link
            to="/register"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9375rem 2rem', background: 'linear-gradient(135deg, #0d9488, #0f766e)', color: '#fff', fontWeight: 800, fontSize: '1rem', borderRadius: 14, textDecoration: 'none', boxShadow: '0 8px 24px rgba(13,148,136,0.3)', fontFamily: 'Outfit, sans-serif' }}
          >
            Get Started Today <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #steps-grid { grid-template-columns: repeat(2, 1fr) !important; } #step-line { display: none !important; } }
        @media (max-width: 639px)  { #steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
