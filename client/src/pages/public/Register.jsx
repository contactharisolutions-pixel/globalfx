import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  TrendingUp, Eye, EyeOff, Loader2, User, Mail, Phone,
  Gift, Lock, ShieldCheck, ArrowRight, CheckCircle2,
  Copy, X, BadgeCheck, Share2, Globe, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore, { siteOrigin } from '../../store/useAuthStore'
import api from '../../lib/api'

const schema = z
  .object({
    name:             z.string().min(3, 'Full name must be at least 3 characters'),
    email:            z.string().email('Enter a valid email address'),
    phone:            z.string().min(7, 'Enter a valid phone number'),
    referral_code:    z.string().optional(),
    password:         z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

/* ── Success Modal ─────────────────────────────────────────────────────────── */
function SuccessModal({ data, onClose }) {
  const [copied, setCopied] = useState(null)
  const copy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field); toast.success('Copied!'); setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-10">
         <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success border-4 border-success/20 animate-bounce">
            <BadgeCheck size={48} />
         </div>
         
         <div className="space-y-4">
            <h2 className="text-4xl font-black text-text-main tracking-tight">Welcome to the Elite</h2>
            <p className="text-lg text-text-sub font-medium leading-relaxed">Your GlobalFX identity has been established. Please save your access keys securely.</p>
         </div>

         <div className="bg-slate-50 border border-border-subtle rounded-[32px] p-8 space-y-6 shadow-inner">
            <div className="flex justify-between items-center py-2 border-b border-slate-200/50">
               <span className="text-xs font-black text-text-faint uppercase tracking-widest">User Identity</span>
               <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-text-main">{data.user_id}</span>
                  <button onClick={() => copy(data.user_id, 'id')} className="text-primary hover:scale-110 transition-transform"><Copy size={16} /></button>
               </div>
            </div>
            <div className="flex justify-between items-center py-2">
               <span className="text-xs font-black text-text-faint uppercase tracking-widest">Access Key</span>
               <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-primary font-mono">{data.password}</span>
                  <button onClick={() => copy(data.password, 'pw')} className="text-primary hover:scale-110 transition-transform"><Copy size={16} /></button>
               </div>
            </div>
         </div>

         <div className="space-y-4">
           <button onClick={onClose} className="btn-primary w-full !py-5 text-lg font-black shadow-2xl shadow-primary/30">
              OPEN TERMINAL <ArrowRight size={20} />
           </button>
           <p className="text-xs font-bold text-error uppercase tracking-widest animate-pulse">Never share your access key with anyone.</p>
         </div>
      </div>
    </div>
  )
}

/* ── Register Page ─────────────────────────────────────────────────────────── */
export default function Register() {
  const [showPw, setShowPw]           = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [params]                      = useSearchParams()
  const { register: registerUser, loading: authLoading } = useAuthStore()
  const navigate = useNavigate()

  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { referral_code: params.get('ref') || '' },
  })

  const [sponsorName, setSponsorName] = useState('')
  const referralCode = watch('referral_code')

  useEffect(() => {
    if (!referralCode || referralCode.length < 3) { setSponsorName(''); return }
    const timer = setTimeout(async () => {
      try { const { data } = await api.get(`/public/sponsor/${referralCode}`); setSponsorName(data.name) } 
      catch (err) { setSponsorName('') }
    }, 500)
    return () => clearTimeout(timer)
  }, [referralCode])

  const onSubmit = async (data) => {
    try {
      const { confirm_password, ...payload } = data
      const res = await registerUser(payload)
      setSuccessData({
        name: res.user.name, user_id: res.user_id, email: data.email, 
        phone: data.phone, sponsor_id: data.referral_code || 'Direct',
        refCode: res.user.referral_code?.replace('NVX', '') || `${res.user_id}`,
        password: data.password,
      })
    } catch (err) { toast.error(err?.response?.data?.error || 'Registration failed') }
  }

  const fields = [
    { name: 'name',          label: 'Full Legal Name', icon: User,  placeholder: 'John Doe',              type: 'text'  },
    { name: 'email',         label: 'Email Address',   icon: Mail,  placeholder: 'john@example.com',      type: 'email' },
    { name: 'phone',         label: 'Contact Number',  icon: Phone, placeholder: '+1 234 567 8900',       type: 'tel'   },
    { name: 'referral_code', label: 'Invite Code',     icon: Gift,  placeholder: 'Optional invite code', type: 'text', optional: true },
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-slate-50 skew-y-[-6deg] -translate-y-1/2 border-b border-slate-100 shadow-sm z-0" />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-accent/5 rounded-full blur-[80px] z-0" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="hidden lg:block space-y-10 animate-fade-up">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <Sparkles size={28} />
              </div>
              <div>
                 <p className="text-xs font-black text-primary uppercase tracking-[0.25em]">Join the Network</p>
                 <h2 className="text-4xl font-black text-text-main tracking-tight">Institutional Wealth <br /> For Everyone</h2>
              </div>
           </div>

           <p className="text-xl text-text-sub max-w-md leading-relaxed font-medium">
             Connect to the most advanced AI trading infrastructure. Deploy capital, grow your network, and build sustainable wealth.
           </p>

           <div className="space-y-6">
              {[
                { icon: ShieldCheck, label: 'Secured with 256-bit SSL', color: 'text-success' },
                { icon: Globe, label: 'Available in 80+ Countries', color: 'text-accent' },
                { icon: TrendingUp, label: 'Instant Daily Yields', color: 'text-primary' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <div className={`w-10 h-10 rounded-xl bg-white border border-border-subtle flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                      <item.icon size={20} />
                   </div>
                   <span className="text-sm font-black text-text-main uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white rounded-[48px] p-10 lg:p-14 border border-border-subtle shadow-[0_32px_120px_rgba(0,0,0,0.1)] animate-fade-up">
             <div className="mb-12">
                <h1 className="text-4xl font-black text-text-main mb-3 tracking-tight">Establish Identity</h1>
                <p className="text-sm font-bold text-text-muted">Takes less than 120 seconds to set up</p>
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                   {fields.slice(0, 2).map((f) => (
                      <div key={f.name}>
                        <label className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-2 block">{f.label}</label>
                        <div className="relative group">
                          <f.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                          <input {...register(f.name)} className="input !pl-11 !py-3.5 text-sm font-bold" placeholder={f.placeholder} />
                        </div>
                        {errors[f.name] && <p className="text-[10px] text-error font-black mt-2">{errors[f.name].message}</p>}
                      </div>
                   ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                   {fields.slice(2).map((f) => (
                      <div key={f.name}>
                        <div className="flex justify-between items-center mb-2">
                           <label className="text-[10px] font-black text-text-faint uppercase tracking-widest block">
                             {f.label} {f.optional && <span className="opacity-40">(OPT)</span>}
                           </label>
                           {f.name === 'referral_code' && sponsorName && (
                             <span className="text-[9px] font-black text-success animate-pulse uppercase tracking-widest">MEMBER: {sponsorName}</span>
                           )}
                        </div>
                        <div className="relative group">
                          <f.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                          <input {...register(f.name)} className="input !pl-11 !py-3.5 text-sm font-bold" placeholder={f.placeholder} />
                        </div>
                        {errors[f.name] && <p className="text-[10px] text-error font-black mt-2">{errors[f.name].message}</p>}
                      </div>
                   ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                   <div>
                      <label className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-2 block">Access Key</label>
                      <div className="relative group">
                         <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                         <input {...register('password')} type={showPw ? 'text' : 'password'} className="input !pl-11 !py-3.5 text-sm font-bold" placeholder="••••••••" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-text-faint uppercase tracking-widest mb-2 block">Verify Key</label>
                      <div className="relative group">
                         <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" />
                         <input {...register('confirm_password')} type={showPw ? 'text' : 'password'} className="input !pl-11 !py-3.5 text-sm font-bold" placeholder="••••••••" />
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                   <button disabled={authLoading} className="btn-primary w-full !py-5 text-lg font-black shadow-xl shadow-primary/20">
                      {authLoading ? <Loader2 className="animate-spin" /> : <>CREATE ACCOUNT <ArrowRight size={20} /></>}
                   </button>
                   <p className="text-[10px] text-text-faint font-bold mt-4 text-center px-4 leading-relaxed">
                     BY REGISTERING, YOU AGREE TO OUR <Link to="/terms" className="text-primary hover:underline">TERMS</Link> AND <Link to="/disclaimer" className="text-primary hover:underline">RISK DISCLOSURE</Link>.
                   </p>
                </div>
             </form>

             <div className="mt-10 pt-10 border-t border-slate-50 text-center">
                <p className="text-sm font-bold text-text-muted uppercase tracking-widest">
                   Already have an identity? <Link to="/login" className="text-primary font-black hover:underline">Access Terminal</Link>
                </p>
             </div>
          </div>
        </div>

      </div>

      {successData && <SuccessModal data={successData} onClose={() => navigate('/dashboard')} />}
    </div>
  )
}
