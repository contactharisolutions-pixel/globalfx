import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai, India',
    initials: 'AM',
    color: '#0d9488',
    rating: 5,
    quote: 'I started with the basic plan and within 3 months I had more than doubled my investment. The daily profits just kept adding up and I could see everything clearly.',
    earned: '$2,400',
    plan: 'Standard Plan',
  },
  {
    name: 'Sarah Williams',
    location: 'London, UK',
    initials: 'SW',
    color: '#3b82f6',
    rating: 5,
    quote: 'I referred my friends and now my team of 84 people generates extra income for me every single day. GlobalFX completely changed how I think about money.',
    earned: '$8,760',
    plan: 'Premium Plan',
  },
  {
    name: 'Ahmed Al-Rashid',
    location: 'Dubai, UAE',
    initials: 'AA',
    color: '#7c3aed',
    rating: 5,
    quote: "Withdrawals are always on time. I've taken out my money 12 times and every payment came through within 24 hours. I fully trust this platform.",
    earned: '$5,100',
    plan: 'Standard Plan',
  },
  {
    name: 'Maria Santos',
    location: 'São Paulo, Brazil',
    initials: 'MS',
    color: '#f97316',
    rating: 5,
    quote: 'As someone new to investing, the platform is simple and easy to understand. The support team answered all my questions right away. Amazing experience!',
    earned: '$1,800',
    plan: 'Starter Plan',
  },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setIdx((idx + 1) % TESTIMONIALS.length)
  const t    = TESTIMONIALS[idx]

  return (
    <section id="testimonials" style={{ padding: '6rem 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '5rem', alignItems: 'center' }} id="testimonials-grid">

          {/* Left: Header + Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: '#f0fdfa', border: '1.5px solid rgba(13,148,136,0.2)', borderRadius: 9999, alignSelf: 'flex-start' }}>
              <ShieldCheck size={13} style={{ color: '#0d9488' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Real Members</span>
            </div>

            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
              What Our Members<br />
              <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Are Saying</span>
            </h2>

            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, margin: 0 }}>
              Thousands of people from around the world are earning with GlobalFX every day. Join them and start your journey.
            </p>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 9999, background: i === idx ? '#0d9488' : '#e2e8f0', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[prev, next].map((fn, i) => {
                const Ic = i === 0 ? ChevronLeft : ChevronRight
                return (
                  <button
                    key={i}
                    onClick={fn}
                    style={{ width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #e2e8f0', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0f172a', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0d9488'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0d9488' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.borderColor = '#e2e8f0' }}
                  >
                    <Ic size={20} />
                  </button>
                )
              })}
            </div>

            <Link
              to="/register"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem', background: 'linear-gradient(135deg, #0d9488, #0f766e)', color: '#fff', fontWeight: 800, fontSize: '0.9375rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 20px rgba(13,148,136,0.25)', alignSelf: 'flex-start', fontFamily: 'Outfit, sans-serif' }}
            >
              Join Our Members →
            </Link>
          </div>

          {/* Right: Testimonial Card */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -32, right: -32, width: 200, height: 200, background: 'rgba(13,148,136,0.04)', borderRadius: '50%', filter: 'blur(60px)' }} />
            <div
              style={{
                background: '#ffffff', borderRadius: 32,
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 32px 80px rgba(0,0,0,0.07)',
                padding: '3rem', minHeight: 380,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Top color accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`, borderRadius: '32px 32px 0 0' }} />

              {/* Quote icon */}
              <Quote size={56} style={{ position: 'absolute', top: 24, right: 24, color: '#f8fafc' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} style={{ color: '#f59e0b', fill: '#f59e0b' }} />)}
                </div>
                {/* Quote */}
                <p style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  "{t.quote}"
                </p>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1rem', boxShadow: `0 6px 16px ${t.color}40` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 800, color: '#0f172a', fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>{t.name}</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>{t.location} · {t.plan}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Total Earned</p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.625rem', fontWeight: 900, color: '#10b981', margin: 0 }}>{t.earned}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #testimonials-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      `}</style>
    </section>
  )
}
