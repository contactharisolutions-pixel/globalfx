import { TrendingUp, DollarSign, Briefcase, Users, ShieldCheck, Lock, ChevronRight } from 'lucide-react'

const SERVICES = [
  {
    icon: TrendingUp,
    title: 'Smart Investing',
    desc: 'We manage your investment 24 hours a day and pay you a fixed daily profit — no experience needed.',
    color: '#0d9488', bg: '#f0fdfa', border: 'rgba(13,148,136,0.2)',
  },
  {
    icon: DollarSign,
    title: 'Forex Trading',
    desc: 'We trade major global currency pairs and share the profits directly with our members daily.',
    color: '#3b82f6', bg: '#eff6ff', border: 'rgba(59,130,246,0.2)',
  },
  {
    icon: Briefcase,
    title: 'Hands-Off Growth',
    desc: 'Just deposit, choose a plan, and let our team handle everything. You earn while you live your life.',
    color: '#f97316', bg: '#fff7ed', border: 'rgba(249,115,22,0.2)',
  },
  {
    icon: Users,
    title: 'Referral Earnings',
    desc: 'Invite friends and family. Earn a bonus every time someone in your network makes a deposit.',
    color: '#10b981', bg: '#f0fdf4', border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: ShieldCheck,
    title: 'Daily Reports',
    desc: 'Every member gets a full daily profit report. No guessing — you can always see what\'s happening.',
    color: '#7c3aed', bg: '#f5f3ff', border: 'rgba(124,58,237,0.2)',
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    desc: 'Your account and funds are protected with the highest level of security available.',
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
              <p style={{ fontSize: '0.7rem', fontWeight: 900, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.875rem' }}>What We Offer</p>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                Everything You Need<br />
                <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>To Grow Your Money</span>
              </h2>
            </div>
            <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 320, lineHeight: 1.7, fontWeight: 500, borderLeft: '3px solid rgba(13,148,136,0.3)', paddingLeft: '1.25rem' }}>
              We give you the tools, the team, and the technology — so you can focus on your goals.
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
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${item.color}18` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Subtle corner blob */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: item.bg, borderRadius: '50%', opacity: 0.6 }} />

                <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
                  <Icon size={22} style={{ color: item.color }} strokeWidth={2} />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.0625rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.625rem', position: 'relative', zIndex: 1 }}>{item.title}</h3>
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
