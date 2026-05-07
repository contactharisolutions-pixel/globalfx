import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    location: 'Mumbai, India',
    initials: 'AM',
    rating: 5,
    quote: 'I started with the Starter plan and within 3 months I had 2× my investment. The daily earnings and transparent reports gave me full confidence.',
    earned: '$2,400',
    plan: 'Standard Plan',
  },
  {
    name: 'Sarah Williams',
    location: 'London, UK',
    initials: 'SW',
    rating: 5,
    quote: 'The referral system is incredible. My team of 84 members generates passive income every single day. GlobalFX completely changed my financial life.',
    earned: '$8,760',
    plan: 'Premium Plan',
  },
  {
    name: 'Ahmed Al-Rashid',
    location: 'Dubai, UAE',
    initials: 'AA',
    rating: 5,
    quote: "Withdrawals are always processed on time. I've withdrawn 12 times and every single transaction came through within 24 hours. Highly recommend.",
    earned: '$5,100',
    plan: 'Standard Plan',
  },
  {
    name: 'Maria Santos',
    location: 'São Paulo, Brazil',
    initials: 'MS',
    rating: 5,
    quote: 'As someone new to investing, the platform is easy to understand. The support team answered all my questions instantly. Amazing experience!',
    earned: '$1,800',
    plan: 'Starter Plan',
  },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setIdx((idx + 1) % TESTIMONIALS.length)
  const t = TESTIMONIALS[idx]

  return (
    <section id="testimonials" className="section bg-white overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
               <ShieldCheck size={14} /> Member Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-text-main leading-tight tracking-tight">
               Voices of the <br />
               <span className="gradient-text">Global Alliance</span>
            </h2>
            <p className="text-lg text-text-sub font-medium leading-relaxed">
               Thousands of investors are scaling their wealth every day. Join a community that values transparency, growth, and collective success.
            </p>
            
            <div className="flex gap-4">
               <button onClick={prev} className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all shadow-sm">
                  <ChevronLeft size={20} />
               </button>
               <button onClick={next} className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center text-text-main hover:bg-primary hover:text-white transition-all shadow-sm">
                  <ChevronRight size={20} />
               </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
             <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
             
             <div className="relative bg-white rounded-[48px] p-10 lg:p-14 border border-border-subtle shadow-[0_32px_120px_rgba(0,0,0,0.06)] overflow-hidden min-h-[400px] flex flex-col justify-between transition-all duration-500">
                <Quote size={64} className="text-slate-100 absolute top-10 right-10" />
                
                <div className="relative z-10 space-y-8">
                   <div className="flex gap-1 text-warning">
                      {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
                   </div>
                   
                   <p className="text-2xl font-black text-text-main leading-relaxed italic">
                      "{t.quote}"
                   </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 pt-10 border-t border-slate-50">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-black shadow-lg">
                        {t.initials}
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-text-main leading-none mb-2">{t.name}</h4>
                         <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{t.location} · {t.plan}</p>
                      </div>
                   </div>
                   
                   <div className="text-right">
                      <p className="text-[10px] font-black text-text-faint uppercase tracking-[0.2em] mb-1">Total Yield</p>
                      <p className="text-3xl font-black text-success tracking-tight">{t.earned}</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
