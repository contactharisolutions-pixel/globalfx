import { UserPlus, Wallet, BarChart2, TrendingUp, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    icon: UserPlus,
    title: 'Identity Setup',
    desc: 'Register your secure investor account and verify your details in seconds.',
    color: 'text-primary',
    bg: 'bg-primary/5',
    border: 'border-primary/20'
  },
  {
    icon: Wallet,
    title: 'Fund Allocation',
    desc: 'Deposit USDT via BEP20. Our gateways are instant and fully encrypted.',
    color: 'text-accent',
    bg: 'bg-accent/5',
    border: 'border-accent/20'
  },
  {
    icon: BarChart2,
    title: 'Strategy Activation',
    desc: 'Choose your growth package and let our AI agents handle the market execution.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  {
    icon: TrendingUp,
    title: 'Wealth Growth',
    desc: 'Watch your ROI grow daily. Withdraw your profits anytime with zero friction.',
    color: 'text-success',
    bg: 'bg-success/5',
    border: 'border-success/20'
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <CheckCircle2 size={14} /> Step-by-Step Guide
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-text-main mb-6 tracking-tight">
            How to Scale Your <br />
            <span className="gradient-text">Financial Future</span>
          </h2>
          <p className="text-lg text-text-sub leading-relaxed">
            We've simplified complex algorithmic trading into a seamless 4-step experience. No technical expertise required — our systems do the heavy lifting for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="group relative">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 -translate-x-6 z-0" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-[32px] bg-white border border-border-subtle group-hover:border-primary/20 group-hover:shadow-2xl transition-all duration-500">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl transition-transform group-hover:scale-110 duration-500 ${step.bg} ${step.color}`}>
                  <step.icon size={36} strokeWidth={2.5} />
                </div>
                
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-text-main text-white text-xs font-black mb-4">
                  {i + 1}
                </div>
                
                <h3 className="text-xl font-black text-text-main mb-3">{step.title}</h3>
                <p className="text-text-sub text-sm font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
           <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-4 pr-6">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary">
                 <CheckCircle2 size={20} />
              </div>
              <span className="text-sm font-black text-text-sub uppercase tracking-wider">Average setup time: <span className="text-text-main font-black">145 Seconds</span></span>
           </div>
        </div>
      </div>
    </section>
  )
}
