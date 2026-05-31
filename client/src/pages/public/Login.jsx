import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Lock, AtSign, ArrowRight, ShieldCheck, Users, DollarSign, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/useAuthStore'

const BG      = '#080f1e'
const PANEL   = '#0a1628'
const BORDER  = 'rgba(255,255,255,0.08)'
const PRIMARY = '#02d8dc'
const TEXT    = '#f1f5f9'
const TEXT_SUB = '#94a3b8'

const schema = z.object({
  user_id:  z.string().min(4, 'Please enter your User ID'),
  password: z.string().min(1, 'Please enter your password'),
})

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'Secure Login',      desc: 'Bank-grade account protection'  },
  { icon: Users,       label: '50,000+ Members',   desc: 'Trusted worldwide'               },
  { icon: DollarSign,  label: 'Daily Profits',      desc: 'Paid every day automatically'   },
]

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
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      const errorMsg = err?.response?.data?.error || err.message || 'Incorrect ID or password. Please try again.'
      toast.error(errorMsg)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '0.9rem 1rem 0.9rem 2.875rem',
    border: `1.5px solid ${hasError ? '#ef4444' : BORDER}`,
    borderRadius: 12, fontSize: '0.9375rem', fontFamily: 'inherit',
    fontWeight: 600, color: TEXT, background: 'rgba(255,255,255,0.04)',
    outline: 'none', transition: 'all 0.2s',
  })

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Background glows */}
      <div style={{ position: 'fixed', top: '-10%', left: '-10%', width: '50%', height: '60%', background: 'radial-gradient(ellipse, rgba(2,216,220,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '40%', height: '50%', background: 'radial-gradient(ellipse, rgba(30,58,95,0.4) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Left Panel — Brand / Trust */}
      <div style={{
        flex: '0 0 45%', background: 'linear-gradient(160deg, #080f1e 0%, #0a1628 60%, #0d1f3c 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem',
        position: 'relative', overflow: 'hidden', borderRight: `1px solid ${BORDER}`,
      }} id="login-left">
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%', background: 'rgba(2,216,220,0.04)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', height: '50%', background: 'rgba(30,58,95,0.3)', borderRadius: '50%', filter: 'blur(60px)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <img
            src="https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/Logo.png"
            alt="BitLance Logo"
            style={{ height: 52, width: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Member Portal</p>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, color: TEXT, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
            Welcome back.<br />
            <span style={{ background: `linear-gradient(135deg, ${PRIMARY}, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your portfolio awaits.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: TEXT_SUB, lineHeight: 1.7, fontWeight: 500, maxWidth: '20rem', margin: 0 }}>
            Sign in to check your earnings, manage investments, and grow your wealth.
          </p>
        </div>

        {/* Trust Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          {TRUST_POINTS.map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(2,216,220,0.08)', border: '1px solid rgba(2,216,220,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} style={{ color: PRIMARY }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: TEXT, fontSize: '0.875rem' }}>{label}</p>
                <p style={{ margin: 0, fontWeight: 500, color: TEXT_SUB, fontSize: '0.75rem' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div style={{ position: 'relative', zIndex: 1, padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, borderRadius: 18 }}>
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />)}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 0.75rem', fontWeight: 500 }}>
            "I've been earning daily profits for 8 months. The platform is simple to use and the team is always available."
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: TEXT_SUB, margin: 0 }}>— Rahul S., Member since 2024</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', position: 'relative', zIndex: 1 }} id="login-right">
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Mobile logo */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }} id="mobile-logo">
            <img
              src="https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/Logo.png"
              alt="BitLance Logo"
              style={{ height: 44, width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Form card */}
          <div style={{ background: PANEL, border: `1.5px solid ${BORDER}`, borderRadius: 24, padding: '2.5rem', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: 900, color: TEXT, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Sign In</h1>
              <p style={{ fontSize: '0.9375rem', color: TEXT_SUB, fontWeight: 500, margin: 0 }}>Enter your details to access your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* User ID */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.625rem' }}>User ID</label>
                <div style={{ position: 'relative' }}>
                  <AtSign size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB }} />
                  <input
                    {...register('user_id')}
                    placeholder="Your User ID (e.g. GFX-123456)"
                    style={inputStyle(!!errors.user_id)}
                    onFocus={e => { e.target.style.borderColor = PRIMARY; e.target.style.background = 'rgba(2,216,220,0.05)'; e.target.style.boxShadow = `0 0 0 3px rgba(2,216,220,0.1)` }}
                    onBlur={e => { e.target.style.borderColor = errors.user_id ? '#ef4444' : BORDER; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                {errors.user_id && <p style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' }}>{errors.user_id.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#cbd5e1' }}>Password</label>
                  <button type="button" style={{ fontSize: '0.75rem', fontWeight: 700, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Forgot password?</button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB }} />
                  <input
                    {...register('password')}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Your password"
                    style={{ ...inputStyle(!!errors.password), paddingRight: '3rem' }}
                    onFocus={e => { e.target.style.borderColor = PRIMARY; e.target.style.background = 'rgba(2,216,220,0.05)'; e.target.style.boxShadow = `0 0 0 3px rgba(2,216,220,0.1)` }}
                    onBlur={e => { e.target.style.borderColor = errors.password ? '#ef4444' : BORDER; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: TEXT_SUB, cursor: 'pointer', display: 'flex', padding: 0 }}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' }}>{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '1rem', marginTop: '0.25rem',
                  background: loading ? '#1e3a5f' : `linear-gradient(135deg, #1e3a5f, ${PRIMARY})`,
                  color: '#fff', fontWeight: 800, fontSize: '1rem',
                  border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                  boxShadow: `0 6px 20px rgba(2,216,220,0.25)`, transition: 'all 0.2s',
                  fontFamily: 'Outfit, sans-serif', letterSpacing: '0.01em',
                }}
              >
                {loading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : <>Sign In <ArrowRight size={18} /></>}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.75rem 0' }}>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Don't have an account?</span>
              <div style={{ flex: 1, height: 1, background: BORDER }} />
            </div>

            <Link
              to="/register"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', padding: '0.9rem', boxSizing: 'border-box',
                border: `1.5px solid ${BORDER}`, borderRadius: 14,
                color: TEXT_SUB, fontWeight: 700, fontSize: '0.9375rem',
                textDecoration: 'none', background: 'rgba(255,255,255,0.02)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.background = 'rgba(2,216,220,0.05)'; e.currentTarget.style.color = PRIMARY }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = TEXT_SUB }}
            >
              Create a Free Account
            </Link>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginTop: '1.5rem' }}>
              By signing in, you agree to our{' '}
              <Link to="/terms" style={{ color: PRIMARY, fontWeight: 600 }}>Terms</Link>
              {' '}and{' '}
              <Link to="/disclaimer" style={{ color: PRIMARY, fontWeight: 600 }}>Risk Disclosure</Link>.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #login-left { display: none !important; }
          #login-right { padding: 5rem 1.5rem 3rem !important; }
          #mobile-logo { display: flex !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
