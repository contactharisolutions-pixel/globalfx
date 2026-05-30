import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  TrendingUp, Eye, EyeOff, Loader2, User, Mail, Phone,
  Gift, Lock, ShieldCheck, ArrowRight, CheckCircle2, Copy,
  Globe, BadgeCheck
} from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/useAuthStore'
import api from '../../lib/api'

const schema = z
  .object({
    name:             z.string().min(3, 'Please enter your full name (at least 3 characters)'),
    email:            z.string().email('Please enter a valid email address'),
    phone:            z.string().min(7, 'Please enter a valid phone number'),
    referral_code:    z.string().optional(),
    password:         z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })

/* ── Success Modal ── */
function SuccessModal({ data, onClose }) {
  const [copied, setCopied] = useState(null)
  const copy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field)
      toast.success('Copied!')
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>

        {/* Success Icon */}
        <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 16px 40px rgba(16,185,129,0.3)' }}>
          <BadgeCheck size={44} style={{ color: '#fff' }} strokeWidth={2} />
        </div>

        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
          Welcome to BitLance!
        </h2>
        <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.7, fontWeight: 500, marginBottom: '2rem' }}>
          Your account is ready. Please save your login details below — you'll need them to sign in.
        </p>

        {/* Credentials Box */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 20, padding: '1.75rem', marginBottom: '2rem', textAlign: 'left' }}>
          {[
            { label: 'Your User ID', value: data.user_id },
            { label: 'Your Password', value: data.password },
          ].map(({ label, value }, idx) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: idx === 0 ? '1px solid #f1f5f9' : 'none' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                <p style={{ margin: '0.25rem 0 0', fontWeight: 800, color: '#0f172a', fontFamily: idx === 1 ? 'JetBrains Mono, monospace' : 'Outfit, sans-serif', fontSize: '1rem' }}>{value}</p>
              </div>
              <button
                onClick={() => copy(value, idx === 0 ? 'id' : 'pw')}
                style={{ padding: '0.5rem', background: copied === (idx === 0 ? 'id' : 'pw') ? '#f0fdf4' : '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 10, cursor: 'pointer', color: copied === (idx === 0 ? 'id' : 'pw') ? '#10b981' : '#64748b', display: 'flex' }}
              >
                {copied === (idx === 0 ? 'id' : 'pw') ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            </div>
          ))}
        </div>

        <div style={{ padding: '0.875rem 1rem', background: '#fef2f2', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.8125rem', color: '#991b1b', fontWeight: 700, margin: 0 }}>
            ⚠️ Never share your password with anyone — not even our support team.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #0d9488, #0f766e)', color: '#fff', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', boxShadow: '0 8px 24px rgba(13,148,136,0.3)', fontFamily: 'Outfit, sans-serif' }}>
          Go to My Dashboard <ArrowRight size={18} />
        </button>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  )
}

/* ── Register Page ── */
export default function Register() {
  const [showPw, setShowPw]           = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [params]                      = useSearchParams()
  const { register: registerUser, loading: authLoading } = useAuthStore()
  const navigate = useNavigate()

  const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { referral_code: params.get('ref') || '' },
  })

  const [sponsorName, setSponsorName] = useState('')
  const referralCode = watch('referral_code')

  useEffect(() => {
    if (!referralCode || referralCode.length < 3) { setSponsorName(''); return }
    const timer = setTimeout(async () => {
      try { const { data } = await api.get(`/public/sponsor/${referralCode}`); setSponsorName(data.name) }
      catch { setSponsorName('') }
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
        password: data.password,
      })
    } catch (err) { toast.error(err?.response?.data?.error || 'Registration failed. Please try again.') }
  }

  const inputStyle = (hasError) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '0.875rem 1rem 0.875rem 2.875rem',
    border: `1.5px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: 12, fontSize: '0.9375rem', fontFamily: 'inherit',
    fontWeight: 600, color: '#0f172a', background: '#f8fafc',
    outline: 'none', transition: 'all 0.2s',
  })

  const labelStyle = { display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }

  const FIELD_ROWS = [
    [
      { name: 'name',  label: 'Full Name',    icon: User,  placeholder: 'e.g. John Smith',          type: 'text'  },
      { name: 'email', label: 'Email Address', icon: Mail,  placeholder: 'e.g. john@email.com',      type: 'email' },
    ],
    [
      { name: 'phone', label: 'Phone Number', icon: Phone, placeholder: 'e.g. +1 234 567 8900',     type: 'tel'   },
      { name: 'referral_code', label: 'Referral Code', icon: Gift, placeholder: 'Optional', type: 'text', optional: true },
    ],
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* Left Panel */}
      <div style={{
        flex: '0 0 42%', background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0d2e2a 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem',
        position: 'relative', overflow: 'hidden',
      }} id="reg-left">
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%', background: 'rgba(13,148,136,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', height: '50%', background: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #0d9488, #3b82f6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(13,148,136,0.35)' }}>
            <TrendingUp size={22} style={{ color: '#ffffff' }} />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.375rem', color: '#ffffff', letterSpacing: '-0.01em' }}>BitLance</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Start Today — Free</p>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}>
            Create your account.<br />
            <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Start earning today.</span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500, maxWidth: '22rem', margin: 0 }}>
            Join over 50,000 members who are growing their wealth with BitLance every day.
          </p>
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}>
          {[
            { icon: ShieldCheck, text: 'Your funds are secured with bank-grade protection' },
            { icon: Globe,       text: 'Available in 80+ countries worldwide'              },
            { icon: TrendingUp,  text: 'Daily profits credited to your account'            },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(13,148,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Icon size={14} style={{ color: '#0d9488' }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500, lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1, padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { value: '50K+', label: 'Members'     },
            { value: '$12M+', label: 'Managed'    },
            { value: '100%', label: 'Transparent' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.25rem', color: '#ffffff' }}>{value}</p>
              <p style={{ margin: '0.125rem 0 0', fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5rem 2rem 3rem', background: '#ffffff', overflowY: 'auto' }} id="reg-right">
        <div style={{ width: '100%', maxWidth: 500 }}>

          {/* Mobile Logo */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }} id="reg-mobile-logo">
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #0d9488, #3b82f6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} style={{ color: '#fff' }} />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.125rem', color: '#0f172a' }}>BitLance</span>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.875rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>Create Account</h1>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: 500, margin: 0 }}>It takes less than 2 minutes — completely free</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Field Grid Rows */}
            {FIELD_ROWS.map((row, ri) => (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="reg-row">
                {row.map(({ name, label, icon: Icon, placeholder, type, optional }) => (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={labelStyle}>{label}{optional && <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.75rem', marginLeft: 4 }}>(optional)</span>}</label>
                      {name === 'referral_code' && sponsorName && (
                        <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#10b981' }}>✓ {sponsorName}</span>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input
                        {...register(name)}
                        type={type}
                        placeholder={placeholder}
                        style={inputStyle(!!errors[name])}
                        onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(13,148,136,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = errors[name] ? '#ef4444' : '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                    {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.6875rem', fontWeight: 600, marginTop: '0.375rem' }}>{errors[name].message}</p>}
                  </div>
                ))}
              </div>
            ))}

            {/* Password Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="reg-row">
              {[
                { name: 'password',         label: 'Password',        placeholder: 'At least 6 characters' },
                { name: 'confirm_password', label: 'Confirm Password', placeholder: 'Same password again'   },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      {...register(name)}
                      type={showPw ? 'text' : 'password'}
                      placeholder={placeholder}
                      style={inputStyle(!!errors[name])}
                      onFocus={e => { e.target.style.borderColor = '#0d9488'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(13,148,136,0.08)' }}
                      onBlur={e => { e.target.style.borderColor = errors[name] ? '#ef4444' : '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.6875rem', fontWeight: 600, marginTop: '0.375rem' }}>{errors[name].message}</p>}
                </div>
              ))}
            </div>

            {/* Show password toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showPw} onChange={e => setShowPw(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#0d9488' }} />
              <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>Show passwords</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: '100%', padding: '1rem', marginTop: '0.5rem',
                background: authLoading ? '#94a3b8' : 'linear-gradient(135deg, #0d9488, #0f766e)',
                color: '#ffffff', fontWeight: 800, fontSize: '1rem',
                border: 'none', borderRadius: 14, cursor: authLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                boxShadow: '0 6px 20px rgba(13,148,136,0.3)', transition: 'all 0.2s',
                fontFamily: 'Outfit, sans-serif', letterSpacing: '0.01em',
              }}
            >
              {authLoading ? <Loader2 size={20} style={{ animation: 'spin 0.8s linear infinite' }} /> : <>Create My Account <ArrowRight size={18} /></>}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, lineHeight: 1.6 }}>
              By creating an account, you agree to our{' '}
              <Link to="/terms" style={{ color: '#0d9488', fontWeight: 700 }}>Terms</Link>
              {' '}and{' '}
              <Link to="/disclaimer" style={{ color: '#0d9488', fontWeight: 700 }}>Risk Disclosure</Link>.
            </p>
          </form>

          {/* Already have account */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0 1.5rem' }}>
            <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Already have an account?</span>
            <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
          </div>
          <Link
            to="/login"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.875rem', boxSizing: 'border-box', border: '1.5px solid #e2e8f0', borderRadius: 14, color: '#0f172a', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', background: '#ffffff', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d9488'; e.currentTarget.style.background = '#f0fdfa' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#ffffff' }}
          >
            Sign In Instead
          </Link>
        </div>
      </div>

      {successData && <SuccessModal data={successData} onClose={() => navigate('/dashboard')} />}

      <style>{`
        @media (max-width: 1023px) {
          #reg-left         { display: none !important; }
          #reg-right        { padding: 6rem 1.5rem 3rem !important; }
          #reg-mobile-logo  { display: flex !important; }
        }
        @media (max-width: 639px) {
          .reg-row { grid-template-columns: 1fr !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
