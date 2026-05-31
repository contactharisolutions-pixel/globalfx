import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Shield, Mail, Lock, ArrowLeft, ShieldAlert, Cpu } from 'lucide-react'
import toast from 'react-hot-toast'
import useAdminStore from '../../store/useAdminStore'

const BG       = '#080f1e'
const SURFACE  = '#0e1a2e'
const SURFACE2 = '#111f33'
const BORDER   = 'rgba(255,255,255,0.08)'
const PRIMARY  = '#02d8dc'
const TEXT     = '#f1f5f9'
const TEXT_SUB = '#94a3b8'

const schema = z.object({
  email:    z.string().email('Enter a valid administrative email'),
  password: z.string().min(1, 'Access key required'),
})

export default function AdminLogin() {
  const [showPw, setShowPw] = useState(false)
  const { login, loading }  = useAdminStore()
  const navigate             = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      toast.success('Administrative session established.')
      navigate('/admin')
    } catch (err) {
      console.error('Login error:', err)
      const errorMsg = err?.response?.data?.error || err.message || 'Authorization failed. Invalid credentials.'
      toast.error(errorMsg)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.25rem',
      background: BG,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position: 'fixed', top: '-10%', left: '-5%', width: '50%', height: '60%', background: 'radial-gradient(ellipse, rgba(2,216,220,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-5%', width: '40%', height: '60%', background: 'radial-gradient(ellipse, rgba(30,58,95,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {/* Logo */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2rem' }}>
            <img
              src="https://gcbuommyucwhrznqkuuf.supabase.co/storage/v1/object/public/GlobalFX/Logo.png"
              alt="BitLance Logo"
              style={{ height: 52, width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '1.375rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: TEXT, lineHeight: 1.1, margin: 0, letterSpacing: '-0.01em' }}>
                BITLANCE
              </p>
              <p style={{ fontSize: '0.625rem', color: PRIMARY, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                Command Center
              </p>
            </div>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: TEXT, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            System Authorization
          </h1>
          <p style={{ color: TEXT_SUB, fontSize: '0.9375rem', fontWeight: 500, margin: 0 }}>
            Restricted access — admin clearance required
          </p>
        </div>

        {/* Security Warning */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center',
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 14, padding: '0.875rem 1.25rem', marginBottom: '1.75rem',
          fontSize: '0.75rem', color: '#f87171', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          <ShieldAlert size={15} />
          Unauthorized access attempts are logged
        </div>

        {/* Login Card */}
        <div style={{
          background: SURFACE,
          border: `1.5px solid ${BORDER}`,
          borderRadius: 28,
          padding: '2.5rem',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top color bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, #1e3a5f, ${PRIMARY})`, borderRadius: '28px 28px 0 0' }} />

          {/* AI badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0.5rem 1rem', background: 'rgba(2,216,220,0.08)', border: '1px solid rgba(2,216,220,0.15)', borderRadius: 10, width: 'fit-content' }}>
            <Cpu size={13} style={{ color: PRIMARY }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: PRIMARY, textTransform: 'uppercase', letterSpacing: '0.12em' }}>AI-Secured Access Portal</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 800, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Administrative Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB, pointerEvents: 'none' }} />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@bitlance.system"
                  style={{
                    width: '100%', height: 52, paddingLeft: '3rem', paddingRight: '1rem',
                    fontSize: '0.9375rem', borderRadius: 12,
                    color: TEXT,
                    background: SURFACE2,
                    border: `1.5px solid ${errors.email ? 'rgba(239,68,68,0.5)' : BORDER}`,
                    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : BORDER}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 800, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                System Access Key
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translateY(-50%)', color: TEXT_SUB, pointerEvents: 'none' }} />
                <input
                  {...register('password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%', height: 52,
                    paddingLeft: '3rem', paddingRight: '3.5rem',
                    fontSize: '0.9375rem', letterSpacing: '0.1em', borderRadius: 12,
                    color: TEXT,
                    background: SURFACE2,
                    border: `1.5px solid ${errors.password ? 'rgba(239,68,68,0.5)' : BORDER}`,
                    outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = PRIMARY}
                  onBlur={e => e.target.style.borderColor = errors.password ? 'rgba(239,68,68,0.5)' : BORDER}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute', right: '1.125rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: TEXT_SUB, display: 'flex', padding: 0, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT_SUB}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 56, marginTop: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                fontSize: '0.9375rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                background: loading ? SURFACE2 : `linear-gradient(135deg, #1e3a5f, ${PRIMARY})`,
                color: '#ffffff', border: 'none', borderRadius: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 28px rgba(2,216,220,0.3)',
                transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(2,216,220,0.4)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 8px 28px rgba(2,216,220,0.3)' }}
            >
              {loading
                ? <><Loader2 size={20} className="animate-spin" /> Authenticating...</>
                : <><Shield size={18} /> Initialize Authorization</>
              }
            </button>
          </form>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{
            fontSize: '0.875rem', color: TEXT_SUB, textDecoration: 'none',
            fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = PRIMARY}
            onMouseLeave={e => e.currentTarget.style.color = TEXT_SUB}
          >
            <ArrowLeft size={16} /> Return to Public Ecosystem
          </Link>
        </div>
      </div>

      <style>{`
        input::placeholder { color: #475569 !important; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px ${SURFACE2} inset !important;
          -webkit-text-fill-color: ${TEXT} !important;
          caret-color: ${TEXT};
        }
      `}</style>
    </div>
  )
}
