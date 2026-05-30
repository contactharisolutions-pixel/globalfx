import { TrendingUp, DollarSign, Cpu, Users, ShieldCheck, Lock, ChevronRight } from 'lucide-react'

const NAVY    = '#1e3a5f'
const PRIMARY = '#00b4a6'
const ACCENT  = '#0d9dc0'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Algorithmic Trading',
    desc: 'Our neural network processes millions of data points per second to execute optimal crypto trades 24/7.',
    color: PRIMARY, bg: '#e6faf9', border: 'rgba(0,180,166,0.2)',
  },
  {
    icon: TrendingUp,
    title: 'Daily Profit Payouts',
    desc: 'We manage your investment and pay a fixed daily profit directly to your account — no experience needed.',
    color: NAVY, bg: 'rgba(30,58,95,0.05)', border: 'rgba(30,58,95,0.15)',
  },
  {
    icon: DollarSign,
    title: 'USDT & Crypto Markets',
    desc: 'We trade major crypto pairs and stablecoins, sharing profits directly with our members every day.',
    color: ACCENT, bg: '#e8f7fc', border: 'rgba(13,157,192,0.2)',
  },
  {
    icon: Users,
    title: 'Referral Earnings',
    desc: 'Invite friends and family. Earn a bonus every time someone in your network makes a deposit.',
    color: '#10b981', bg: '#f0fdf4', border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: ShieldCheck,
    title: 'Daily Profit Reports',
    desc: 'Every member receives a full daily profit statement. No guessing — full transparency at all times.',
    color: '#7c3aed', bg: '#f5f3ff', border: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'Your account and funds are protected with bank-grade encryption and multi-layer security protocols.',
    color: '#f43f5e', bg: '#fff1f2', border: 'rgba(244,63,94,0.2)',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: '6rem 0', background: '#ffffff', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: 560 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 900, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.875rem' }}>What We Offer</p>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: NAVY, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                Everything You Need<br />
                <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${NAVY})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>To Grow Intelligently</span>
              </h2>
            </div>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 320, lineHeight: 1.7, fontWeight: 500, borderLeft: `3px solid rgba(0,180,166,0.35)`, paddingLeft: '1.25rem' }}>
              We give you the AI, the team, and the technology — so you can focus on your goals.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} id="services-grid">
          {SERVICES.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                style={{
                  padding: '2rem', background: '#ffffff',
                  border: `1.5px solid ${item.border}`,
                  borderRadius: 24, position: 'relative', overflow: 'hidden',
                  transition: 'all 0.25s ease', cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Corner blob */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: item.bg, borderRadius: '50%', opacity: 0.7 }} />

                <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                  <Icon size={22} style={{ color: item.color }} strokeWidth={2} />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.0625rem', fontWeight: 800, color: NAVY, margin: '0 0 0.625rem', position: 'relative', zIndex: 1 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: '0 0 1.25rem', position: 'relative', zIndex: 1 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 800, color: item.color, position: 'relative', zIndex: 1 }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 639px)  { #services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
