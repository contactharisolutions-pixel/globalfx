import { TrendingUp, DollarSign, Briefcase, Users, Cpu, Lock, ChevronRight } from 'lucide-react'

const SERVICES = [
  {
    icon: TrendingUp,
    title: 'Precision Trading',
    desc: 'Proprietary AI neural networks analyzing 10,000+ data points per second for high-confidence signals.',
    accent: 'border-primary',
    bg: 'bg-primary/5'
  },
  {
    icon: DollarSign,
    title: 'Global Forex',
    desc: 'Deep liquidity access to major and minor forex pairs managed by our institutional desk.',
    accent: 'border-accent',
    bg: 'bg-accent/5'
  },
  {
    icon: Briefcase,
    title: 'Portfolio Mastery',
    desc: 'Hands-off investment management focusing on capital preservation and consistent compound growth.',
    accent: 'border-orange-500',
    bg: 'bg-orange-50'
  },
  {
    icon: Users,
    title: 'Alliance Network',
    desc: 'Powerful 15-level referral structure designed for long-term community-driven earnings.',
    accent: 'border-success',
    bg: 'bg-success/5'
  },
  {
    icon: Cpu,
    title: 'Quantum Tech',
    desc: 'Low-latency execution bots and real-time transparent reporting for every single trade.',
    accent: 'border-indigo-500',
    bg: 'bg-indigo-50'
  },
  {
    icon: Lock,
    title: 'Fortress Security',
    desc: 'Military-grade encryption, 2FA, and cold-storage practices to keep your assets safe.',
    accent: 'border-error',
    bg: 'bg-error/5'
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section relative bg-white">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="text-primary font-black text-[10px] tracking-[0.2em] uppercase mb-4">Core Capabilities</div>
            <h2 className="text-4xl lg:text-5xl font-black text-text-main tracking-tight">
              Ecosystem Built for <br />
              <span className="gradient-text">Institutional Performance</span>
            </h2>
          </div>
          <p className="text-lg text-text-sub max-w-sm leading-relaxed border-l-4 border-primary/20 pl-6">
            We provide the tools, the technology, and the team to help you scale your wealth in any market condition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((item) => (
            <div 
              key={item.title} 
              className="group p-8 rounded-[32px] bg-white border border-border-subtle hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover background decoration */}
              <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.bg}`} />
              
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border-2 ${item.accent} ${item.bg} group-hover:scale-110 transition-transform`}>
                <item.icon size={22} className={`${item.accent.replace('border-', 'text-')}`} />
              </div>
              
              <h3 className="text-xl font-black text-text-main mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-text-sub text-sm font-medium leading-relaxed mb-6">
                {item.desc}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-black text-primary opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                LEARN MORE <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
