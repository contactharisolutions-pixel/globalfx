import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Lock, User, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/useAuthStore'

const schema = z.object({
  user_id:  z.string().min(4, 'Enter your User ID'),
  password: z.string().min(1, 'Enter your password'),
})

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const { login, loading }  = useAuthStore()
  const navigate             = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      await login(data.user_id, data.password)
      toast.success('Access Granted')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Authentication failed')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, backgroundImage: 'radial-gradient(#e2e8f0 0.5px, transparent 0.5px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        
        <div className="hidden lg:block space-y-8 animate-fade-up">
           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-slate-100 mb-12 animate-bounce-slow">
              <TrendingUp size={40} className="text-[#0d9488]" />
           </div>
           <h2 className="text-6xl font-black text-[#0f172a] leading-tight tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Institutional Access <br />
              <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Member Portal</span>
           </h2>
           <p className="text-xl text-slate-500 max-w-md leading-relaxed font-semibold">
              Enter the command center to manage your assets, monitor AI execution, and scale your portfolio.
           </p>
           
           <div className="flex gap-10">
              <div>
                 <p className="text-3xl font-black text-[#0f172a]">256-bit</p>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">AES Encryption</p>
              </div>
              <div style={{ width: 1, height: 40, background: '#e2e8f0' }} />
              <div>
                 <p className="text-3xl font-black text-[#0f172a]">Real-time</p>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Neural Sync</p>
              </div>
           </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-[0_32px_80px_rgba(0,0,0,0.06)] animate-fade-up relative overflow-hidden">
             {/* Subtle internal gradient */}
             <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #0d9488, #3b82f6)' }} />

             <div className="text-center mb-12">
               <h1 className="text-4xl font-black text-[#0f172a] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Sign In</h1>
               <p className="text-sm font-bold text-slate-400">Secure ecosystem authentication</p>
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-3">
                   <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-[0.2em] ml-1">Identity ID</label>
                   <div className="relative group">
                      <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0d9488] transition-colors" />
                      <input 
                        {...register('user_id')}
                        className="w-full bg-[#f8fafc] border-[1.5px] border-slate-100 rounded-2xl py-5 pl-14 pr-5 font-bold text-[#0f172a] focus:outline-none focus:border-[#0d9488] focus:bg-white focus:ring-4 focus:ring-[#0d9488]/5 transition-all placeholder:text-slate-300" 
                        placeholder="GFX-XXXXXX"
                      />
                   </div>
                   {errors.user_id && <p className="text-[11px] text-red-500 font-bold mt-2 ml-1">{errors.user_id.message}</p>}
                </div>

                <div className="space-y-3">
                   <div className="flex justify-between items-center ml-1">
                      <label className="text-[11px] font-black text-[#0f172a] uppercase tracking-[0.2em]">Access Key</label>
                      <button type="button" className="text-[10px] font-black text-[#0d9488] hover:opacity-70 transition-opacity">FORGOT KEY?</button>
                   </div>
                   <div className="relative group">
                      <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0d9488] transition-colors" />
                      <input 
                        {...register('password')}
                        type={showPw ? 'text' : 'password'}
                        className="w-full bg-[#f8fafc] border-[1.5px] border-slate-100 rounded-2xl py-5 pl-14 pr-14 font-bold text-[#0f172a] focus:outline-none focus:border-[#0d9488] focus:bg-white focus:ring-4 focus:ring-[#0d9488]/5 transition-all placeholder:text-slate-300" 
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0f172a] transition-colors"
                      >
                        {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                   </div>
                   {errors.password && <p className="text-[11px] text-red-500 font-bold mt-2 ml-1">{errors.password.message}</p>}
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-6 rounded-2xl text-lg font-black shadow-2xl shadow-[#0d9488]/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>ENTER COMMAND CENTER <ArrowRight size={22} /></>}
                </button>
             </form>

             <div className="mt-12 pt-10 border-t border-slate-50 text-center">
                <p className="text-sm font-bold text-slate-400">
                   Not part of the ecosystem? <Link to="/register" className="text-[#0d9488] font-black hover:opacity-70 transition-opacity">Establish Account</Link>
                </p>
             </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-[11px] font-black text-slate-300 uppercase tracking-[0.25em]">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             End-to-End Encryption Verified
          </div>
        </div>

      </div>
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
