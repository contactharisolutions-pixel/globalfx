import { UserPlus, Wallet, TrendingUp, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const BG       = '#080f1e'
const SURFACE  = '#0e1a2e'
const BORDER   = 'rgba(255,255,255,0.08)'
const PRIMARY  = '#02d8dc'
const ACCENT   = '#0d9dc0'
const TEXT     = '#f1f5f9'
const TEXT_SUB = '#94a3b8'

const STEPS = [
  { num: '01', icon: UserPlus,   title: 'Create Your Account',      desc: 'Sign up for free in under 2 minutes. No hidden fees, no documents required to start.', color: PRIMARY,   bg: 'rgba(2,216,220,0.08)',   border: 'rgba(2,216,220,0.2)' },
  { num: '02', icon: Wallet,     title: 'Add Your Funds',           desc: 'Deposit as little as $25 using USDT (BEP20). Your money is always secure and tracked.',  color: ACCENT,    bg: 'rgba(13,157,192,0.08)', border: 'rgba(13,157,192,0.2)' },
  { num: '03', icon: TrendingUp, title: 'AI Starts Trading',        desc: 'Our algorithm immediately puts your funds to work 24/7 across global crypto markets.',   color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
  { num: '04', icon: DollarSign, title: 'Receive Daily Profits',    desc: 'Watch your balance compound every day. Withdraw your money anytime — no lock-in.',      color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)' },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ padding: '6rem 0', background: BG, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(2,216,220,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(2,216,220,0.08)', border: '1.5px solid rgba(2,216,220,0.2)', borderRadius: 9999, marginBottom: '1.5rem' }}>
            <CheckCircle2 size={13} style={{ color: PRIMARY }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Simple 4-Step Process</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
            How Does It Work?
          </h2>
          <p style={{ fontSize: '1.0625rem', color: TEXT_SUB, lineHeight: 1.8, fontWeight: 500, margin: 0 }}>
            Getting started is simple. No financial experience needed — we handle everything for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative' }} id="steps-grid">
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '4.5rem', left: '12.5%', right: '12.5%', height: 2, background: `linear-gradient(90deg, ${PRIMARY}, ${ACCENT}, #7c3aed, #f97316)`, zIndex: 0, borderRadius: 9999, opacity: 0.4 }} id="step-line" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '2rem 1.5rem 1.75rem', background: SURFACE, border: `1.5px solid ${BORDER}`, borderRadius: 24, textAlign: 'center', position: 'relative', zIndex: 1, transition: 'all 0.25s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = step.border; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: step.bg, border: `2px solid ${step.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', position: 'relative' }}>
                  <Icon size={30} style={{ color: step.color }} strokeWidth={2} />
                  <div style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: step.color, color: '#fff', fontSize: '0.625rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${step.color}60` }}>
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.0625rem', fontWeight: 800, color: TEXT, margin: '0 0 0.625rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: TEXT_SUB, lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem', padding: '0.875rem 1.5rem', background: SURFACE, border: `1.5px solid ${BORDER}`, borderRadius: 9999, marginBottom: '2rem' }}>
            <div style={{ width: 32, height: 32, background: 'rgba(2,216,220,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={17} style={{ color: PRIMARY }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: TEXT_SUB }}>Average setup time: <strong style={{ color: TEXT }}>less than 5 minutes</strong></span>
          </div>
          <br />
          <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9375rem 2rem', background: `linear-gradient(135deg, #1e3a5f, ${PRIMARY})`, color: '#fff', fontWeight: 800, fontSize: '1rem', borderRadius: 14, textDecoration: 'none', boxShadow: '0 8px 24px rgba(2,216,220,0.25)', fontFamily: 'Outfit, sans-serif' }}>
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
