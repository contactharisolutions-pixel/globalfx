import { ShieldCheck, Zap, Shield, Users, Headphones, BadgeDollarSign, ArrowRight } from 'lucide-react'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Full Transparency',
    desc: 'Audit every single AI-executed trade in real-time. No hidden operations.',
    color: 'text-primary',
    bg: 'bg-primary/5'
  },
  {
    icon: Zap,
    title: 'Instant Rewards',
    desc: 'Receive referral bonuses the moment your network deploys their capital.',
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    icon: Shield,
    title: 'Asset Protection',
    desc: 'Cold-storage wallets and multi-sig protocols for institutional security.',
    color: 'text-success',
    bg: 'bg-success/5'
  },
  {
    icon: Users,
    title: 'Network Growth',
    desc: 'Earn from a powerful 15-level team structure as your alliance expands.',
    color: 'text-accent',
    bg: 'bg-accent/5'
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    desc: '24/7 access to dedicated support agents and technical specialists.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    icon: BadgeDollarSign,
    title: 'No Entry Fees',
    desc: 'Zero registration or monthly maintenance fees. You keep what you earn.',
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section bg-slate-50 relative overflow-hidden">
      {/* Architectural decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-white skew-x-[-15deg] translate-x-1/2 pointer-events-none border-l border-slate-100 shadow-2xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border-subtle rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
              <ShieldCheck size={14} /> The GlobalFX Edge
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-text-main leading-tight tracking-tight">
              Built for the <br />
              <span className="gradient-text">Next Generation</span> <br />
              of Investors
            </h2>
            <p className="text-lg text-text-sub leading-relaxed">
              We've eliminated the barriers to high-performance trading. Thousands of users trust us because our platform is engineered for consistency and security.
            </p>
            <div className="pt-4">
               <button className="flex items-center gap-3 font-black text-text-main group">
                  EXPLORE OUR TECHNOLOGY <div className="w-10 h-10 rounded-full bg-white border border-border-subtle flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm"><ArrowRight size={18} /></div>
               </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {REASONS.map((item, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-[32px] bg-white border border-border-subtle hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 border-white shadow-xl group-hover:scale-110 transition-transform ${item.bg} ${item.color}`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-text-main mb-3">{item.title}</h3>
                <p className="text-text-sub text-sm font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
