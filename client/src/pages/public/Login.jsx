import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Lock, AtSign, TrendingUp, ArrowRight, ShieldCheck, Users, DollarSign, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/useAuthStore'

const schema = z.object({
  user_id:  z.string().min(4, 'Please enter your User ID'),
  password: z.string().min(1, 'Please enter your password'),
})

const TRUST_POINTS = [
  { icon: ShieldCheck, label: 'Secure Login',      desc: 'Your account is protected' },
  { icon: Users,       label: '50,000+ Members',   desc: 'Trusted worldwide'         },
  { icon: DollarSign,  label: 'Daily Profits',      desc: 'Paid every day'            },
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
      console.error('Login error:', err)
      const errorMsg = err?.response?.data?.error || err.message || 'Incorrect ID or password. Please try again.'
      toast.error(errorMsg)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* Left Panel — Brand / Trust */}
      <div style={{
        flex: '0 0 45%', background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0d2e2a 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem',
        position: 'relative', overflow: 'hidden',
      }} id="login-left">
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%', background: 'rgba(13,148,136,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', height: '50%', background: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #0d9488, #3b82f6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(13,148,136,0.35)' }}>
            <TrendingUp size={22} style={{ color: '#ffffff' }} />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.375rem', color: '#ffffff', letterSpacing: '-0.01em' }}>BitLance</span>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Member Portal</p>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
            Welcome back.<br />
            <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your portfolio awaits.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500, maxWidth: '20rem', margin: 0 }}>
            Sign in to check your earnings, manage investments, and grow your wealth.
          </p>
        </div>

        {/* Trust Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          {TRUST_POINTS.map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} style={{ color: '#0d9488' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: '#ffffff', fontSize: '0.875rem' }}>{label}</p>
                <p style={{ margin: 0, fontWeight: 500, color: '#64748b', fontSize: '0.75rem' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div style={{ position: 'relative', zIndex: 1, padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18 }}>
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />)}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 0.75rem', fontWeight: 500 }}>
            "I've been earning daily profits for 8 months. The platform is simple to use and the team is always available."
          </p>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', margin: 0 }}>— Rahul S., Member since 2024</p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', background: '#ffffff' }} id="login-right">
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Mobile logo */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }} id="mobile-logo">
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #0d9488, #3b82f6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.125rem', color: '#0f172a' }}>BitLance</span>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Sign In</h1>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: 500, margin: 0 }}>Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* User ID */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.625rem' }}>User ID</label>
              <div style={{ position: 'relative' }}>
                <AtSign size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  {...register('user_id')}
                  placeholder="Your User ID (e.g. GFX-123456)"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.9rem 1rem 0.9rem 2.875rem',
                    border: errors.user_id ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                    borderRadius: 14, fontSize: '0.9375rem', fontFamily: 'inherit',
                    fontWeight: 600, color: '#0f172a', background: '#f8fafc',
                    outline: 'none', transition: 'all 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(13,148,136,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = errors.user_id ? '#ef4444' : '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              {errors.user_id && <p style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' }}>{errors.user_id.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151' }}>Password</label>
                <button type="button" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0d9488', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Forgot password?</button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  {...register('password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Your password"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.9rem 3rem 0.9rem 2.875rem',
                    border: errors.password ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                    borderRadius: 14, fontSize: '0.9375rem', fontFamily: 'inherit',
                    fontWeight: 600, color: '#0f172a', background: '#f8fafc',
                    outline: 'none', transition: 'all 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(13,148,136,0.08)' }}
                  onBlur={e => { e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', padding: 0 }}
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
                width: '100%', padding: '1rem', marginTop: '0.5rem',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0d9488, #0f766e)',
                color: '#ffffff', fontWeight: 800, fontSize: '1rem',
                border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                boxShadow: '0 6px 20px rgba(13,148,136,0.3)', transition: 'all 0.2s',
                fontFamily: 'Outfit, sans-serif', letterSpacing: '0.01em',
              }}
            >
              {loading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
            <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Don't have an account?</span>
            <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
          </div>

          <Link
            to="/register"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', padding: '0.9rem', boxSizing: 'border-box',
              border: '1.5px solid #e2e8f0', borderRadius: 14,
              color: '#0f172a', fontWeight: 700, fontSize: '0.9375rem',
              textDecoration: 'none', background: '#ffffff', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d9488'; e.currentTarget.style.background = '#f0fdfa' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff' }}
          >
            Create a Free Account
          </Link>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, marginTop: '2rem' }}>
            By signing in, you agree to our{' '}
            <Link to="/terms" style={{ color: '#0d9488', fontWeight: 600 }}>Terms</Link>
            {' '}and{' '}
            <Link to="/disclaimer" style={{ color: '#0d9488', fontWeight: 600 }}>Risk Disclosure</Link>.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #login-left { display: none !important; }
          #login-right { padding: 6rem 1.5rem 3rem !important; }
          #mobile-logo { display: flex !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
