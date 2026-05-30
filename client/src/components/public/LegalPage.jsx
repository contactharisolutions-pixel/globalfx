import { ShieldCheck } from 'lucide-react'

/** Premium legal page template reimagined for Light Theme */
export default function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-white skew-x-[-12deg] translate-x-1/4 pointer-events-none border-l border-slate-100 shadow-2xl" />
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Header Area */}
        <div className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border-subtle rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
             <ShieldCheck size={14} /> Compliance & Legal
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-text-main tracking-tight leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-[10px] font-black text-text-faint uppercase tracking-widest">
             <span>Version 2.4.0</span>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
             <span>Last Updated: April 2026</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[48px] p-10 lg:p-16 border border-border-subtle shadow-[0_32px_120px_rgba(0,0,0,0.06)]">
          <div className="prose prose-slate max-w-none">
            {children}
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                   <span className="font-black text-lg italic">G</span>
                </div>
                <p className="text-sm font-black text-text-main">BitLance Integrity Desk</p>
             </div>
             <p className="text-[10px] font-black text-text-faint uppercase tracking-[0.2em]">Secured Legal Document</p>
          </div>
        </div>
      </div>
    </div>
  )
}
