import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const BG       = '#080f1e'
const SURFACE  = '#0e1a2e'
const SURFACE2 = '#111f33'
const BORDER   = 'rgba(255,255,255,0.08)'
const PRIMARY  = '#02d8dc'
const TEXT     = '#f1f5f9'
const TEXT_SUB = '#94a3b8'

const FAQS = [
  { q: 'How do I start earning money?',   a: 'Simply create a free account, deposit funds using USDT (BEP20), and choose an investment plan. Our AI manages everything from there — you receive daily compounding profits directly to your account wallet.' },
  { q: 'How much do I need to start?',    a: 'You can start with as little as $25. We have plans for every budget, so whether you are starting small or investing more, there is an option for you.' },
  { q: 'When do I receive my profits?',   a: 'Profits are calculated daily and credited to your Income Wallet every day. You can view your full earnings history anytime from your personal dashboard.' },
  { q: 'Can I withdraw my money anytime?',a: 'Yes. The minimum withdrawal is $10. We process payouts in USDT (BEP20) with low fees. Most withdrawals are approved and sent within 24 hours.' },
  { q: 'Is my money and data safe?',      a: 'Absolutely. We use strong encryption and secure login protection to keep your account and personal information fully safe. Your funds are always protected.' },
  { q: 'How do I contact support?',       a: 'Our support team is available 24 hours a day, 7 days a week. You can submit a support ticket from your dashboard or reach us on our official Telegram channel.' },
]

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0)
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" style={{ padding: '6rem 0', background: SURFACE, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '30%', height: '50%', background: 'radial-gradient(ellipse, rgba(2,216,220,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: '4rem', alignItems: 'start' }} id="faq-grid">

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'sticky', top: '7rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(2,216,220,0.08)', border: '1px solid rgba(2,216,220,0.2)', borderRadius: 9999 }}>
              <HelpCircle size={14} style={{ color: PRIMARY }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Common Questions</span>
            </div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.625rem)', fontWeight: 900, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
              Got Questions?<br />
              <span style={{ background: `linear-gradient(135deg, #02d8dc, #059db2)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>We Have Answers.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: TEXT_SUB, lineHeight: 1.7, maxWidth: '22rem', margin: 0 }}>
              Everything you need to know about BitLance. Can't find what you're looking for? Our team is standing by.
            </p>

            <div style={{ padding: '2rem', background: BG, borderRadius: 24, border: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: TEXT, margin: 0 }}>Still have questions?</p>
              <div style={{ display: 'flex' }}>
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} alt="Support" style={{ width: 40, height: 40, borderRadius: '50%', border: `3px solid ${SURFACE}`, marginLeft: i === 1 ? 0 : -12 }} />
                ))}
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: `3px solid ${SURFACE}`, background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.625rem', fontWeight: 900, marginLeft: -12 }}>+4</div>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: `linear-gradient(135deg, #1e3a5f, #02d8dc)`, color: '#fff', fontWeight: 800, fontSize: '0.9375rem', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', boxShadow: '0 6px 20px rgba(2,216,220,0.25)' }}>
                <MessageCircle size={18} /> Chat with Support
              </button>
            </div>
          </div>

          {/* Right: FAQ items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={q} style={{ border: `1.5px solid ${openIdx === i ? 'rgba(2,216,220,0.25)' : BORDER}`, borderRadius: 20, overflow: 'hidden', transition: 'all 0.3s', background: openIdx === i ? 'rgba(2,216,220,0.04)' : BG }}>
                <button onClick={() => toggle(i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: openIdx === i ? PRIMARY : TEXT, transition: 'color 0.2s' }}>{q}</span>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', background: openIdx === i ? PRIMARY : SURFACE2, color: openIdx === i ? '#fff' : TEXT_SUB, transform: openIdx === i ? 'rotate(180deg)' : 'none', flexShrink: 0, marginLeft: '1rem' }}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div style={{ maxHeight: openIdx === i ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, opacity 0.3s', opacity: openIdx === i ? 1 : 0 }}>
                  <div style={{ padding: '0 2rem 1.5rem', color: TEXT_SUB, fontWeight: 500, lineHeight: 1.8, borderTop: `1px solid ${BORDER}`, paddingTop: '1rem' }}>
                    {a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) { #faq-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
