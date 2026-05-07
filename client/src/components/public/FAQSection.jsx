import { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'

const FAQS = [
  {
    q: 'How does the AI trading work?',
    a: 'Our systems use neural networks to analyze massive amounts of historical and real-time market data. The AI identifies high-probability setups in Crypto and Forex markets and executes trades with micro-second precision, eliminating human emotion.',
  },
  {
    q: 'What are the investment limits?',
    a: 'You can start with as little as $50 (Starter Plan). The maximum investment depends on the plan chosen, with our Premium plan offering unlimited capital deployment for high-net-worth investors.',
  },
  {
    q: 'When do I receive my profits?',
    a: 'Profits are calculated based on trading pool performance and credited to your Income Wallet daily. You can track your daily yield and earnings history directly from your member dashboard.',
  },
  {
    q: 'Are there any withdrawal restrictions?',
    a: 'The minimum withdrawal is $10. We process payouts in USDT (BEP20) to ensure low fees and fast transaction times. Most withdrawals are approved and processed within 24 hours.',
  },
  {
    q: 'How safe is my data?',
    a: 'We use 256-bit SSL encryption, cold-storage for crypto assets, and multi-factor authentication to protect user data and funds. We are committed to maintaining the highest security standards in the industry.',
  },
  {
    q: 'How can I contact support?',
    a: 'Our support team is available 24/7. You can reach out via the official Telegram channel, submit a support ticket from your dashboard, or email us at support@globalfx.vip.',
  },
]

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0)
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" className="section bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-widest shadow-sm">
              <HelpCircle size={14} /> Common Questions
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-text-main leading-tight tracking-tight">
              Curiosity Fuels <br />
              <span className="gradient-text">Discovery</span>
            </h2>
            <p className="text-lg text-text-sub leading-relaxed max-w-sm">
              Everything you need to know about GlobalFX. Can't find what you're looking for? Our team is standing by.
            </p>
            
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-6">
               <p className="text-sm font-bold text-text-main">Still have questions?</p>
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} alt="Support" className="w-10 h-10 rounded-full border-4 border-white" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-primary flex items-center justify-center text-white text-[10px] font-black">+4</div>
               </div>
               <button className="btn-primary w-full !py-4">
                  <MessageCircle size={18} /> Chat with Support
               </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div 
                key={q}
                className={`group border border-border-subtle rounded-[24px] overflow-hidden transition-all duration-300 ${openIdx === i ? 'bg-slate-50 border-transparent shadow-lg' : 'bg-white hover:border-primary/20'}`}
              >
                <button 
                  onClick={() => toggle(i)}
                  className="w-100 flex items-center justify-between p-8 text-left group"
                >
                  <span className={`text-xl font-black transition-colors ${openIdx === i ? 'text-primary' : 'text-text-main'}`}>{q}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openIdx === i ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${openIdx === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="px-8 pb-8 text-text-sub font-semibold leading-relaxed border-t border-slate-200/50 pt-6">
                      {a}
                   </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
