import { ShieldCheck, Zap, Shield, Users, Headphones, BadgeDollarSign, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Fully Transparent',
    desc: 'See exactly how your money is working. Daily profit reports are available to every member.',
    color: '#00b4a6', bg: '#e6faf9', border: 'rgba(0,180,166,0.15)',
  },
  {
    icon: Zap,
    title: 'Instant Bonuses',
    desc: 'When someone you refer deposits, you receive your referral bonus immediately.',
    color: '#f97316', bg: '#fff7ed', border: 'rgba(249,115,22,0.15)',
  },
  {
    icon: Shield,
    title: 'Your Funds Are Safe',
    desc: 'We use bank-grade security to protect your funds and personal information at all times.',
    color: '#10b981', bg: '#f0fdf4', border: 'rgba(16,185,129,0.15)',
  },
  {
    icon: Users,
    title: 'Earn From Your Team',
    desc: 'Build a team and earn bonuses from up to 15 levels of your network.',
    color: '#0d9dc0', bg: '#e8f7fc', border: 'rgba(13,157,192,0.15)',
  },
  {
    icon: Headphones,
    title: 'Always Available',
    desc: 'Our support team is online 24/7. Got a question? We respond quickly.',
    color: '#7c3aed', bg: '#f5f3ff', border: 'rgba(124,58,237,0.15)',
  },
  {
    icon: BadgeDollarSign,
    title: 'No Joining Fees',
    desc: 'Registering is completely free. You only invest what you choose — and you keep all your profits.',
    color: '#f43f5e', bg: '#fff1f2', border: 'rgba(244,63,94,0.15)',
  },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" style={{ padding: '6rem 0', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      {/* Arch decoration */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '35%', height: '100%', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)', pointerEvents: 'none', borderLeft: '1px solid #f1f5f9' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }} id="why-grid">

          {/* Left: Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'sticky', top: '7rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#e6faf9', border: '1.5px solid rgba(0,180,166,0.2)', borderRadius: 9999, alignSelf: 'flex-start' }}>
              <ShieldCheck size={13} style={{ color: '#00b4a6' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#00b4a6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Why Choose Us</span>
            </div>

            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.625rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
              Built for You,<br />
              <span style={{ background: 'linear-gradient(135deg, #1e3a5f, #00b4a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>By Experts</span>
            </h2>

            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
              Thousands of members trust us because we built a platform that's honest, secure, and delivers results consistently.
            </p>

            <Link
              to="/register"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.75rem', background: 'linear-gradient(135deg, #1e3a5f, #00b4a6)', color: '#fff', fontWeight: 800, fontSize: '0.9375rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 20px rgba(0,180,166,0.25)', alignSelf: 'flex-start', fontFamily: 'Outfit, sans-serif' }}
            >
              Join Free <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Feature Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="why-cards">
            {REASONS.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  style={{ padding: '1.75rem', background: '#ffffff', border: `1.5px solid ${item.border}`, borderRadius: 20, transition: 'all 0.2s ease', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${item.color}18` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: `1px solid ${item.border}` }}>
                    <Icon size={22} style={{ color: item.color }} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.0625rem', fontWeight: 800, color: '#1e3a5f', margin: '0 0 0.625rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #why-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } #why-cards { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 639px)  { #why-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
