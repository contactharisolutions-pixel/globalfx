import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Lock, Loader2, ShieldCheck, Mail, Phone, Calendar, Copy, UserCheck, Eye, EyeOff, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, Spinner, Panel } from '../../components/member/ui'

const TABS = [
  { key: 'info',     label: 'Personal Info',  icon: User        },
  { key: 'password', label: 'Change Password', icon: Lock        },
  { key: 'pin',      label: 'Security PIN',    icon: ShieldCheck },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('info')

  useEffect(() => {
    api.get('/member/profile')
      .then(({ data }) => setProfile(data))
      .catch(() => toast.error('Could not load profile'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: 1000 }}>
      <PageHeader
        title="My Account"
        subtitle={`Member ID: ${profile?.user_id}`}
      />

      {/* Profile Card Header */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.625rem', fontWeight: 900, color: '#fff',
            boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
            flexShrink: 0,
          }}>
            {profile?.name?.[0]?.toUpperCase() || 'M'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{profile?.name}</h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{profile?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Member ID</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', fontFamily: 'JetBrains Mono, monospace' }}>{profile?.user_id}</p>
            </div>
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: profile?.status === 'active' ? '#f0fdf4' : '#fffbeb', borderRadius: 12, border: `1px solid ${profile?.status === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
              <p style={{ margin: 0, fontSize: '0.625rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', fontWeight: 800, color: profile?.status === 'active' ? '#10b981' : '#f59e0b', textTransform: 'capitalize' }}>{profile?.status}</p>
            </div>
          </div>
        </div>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.5rem' }} id="profile-layout">

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.875rem 1.125rem', borderRadius: 14,
                  background: active ? '#f0fdfa' : '#ffffff',
                  border: `1.5px solid ${active ? 'rgba(13,148,136,0.3)' : '#e2e8f0'}`,
                  color: active ? '#0d9488' : '#64748b',
                  fontSize: '0.875rem', fontWeight: active ? 700 : 600,
                  transition: 'all 0.18s', textAlign: 'left', cursor: 'pointer',
                  boxShadow: active ? '0 4px 16px rgba(13,148,136,0.1)' : 'none',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 10, background: active ? 'rgba(13,148,136,0.12)' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} style={{ color: active ? '#0d9488' : '#94a3b8' }} strokeWidth={2.5} />
                </div>
                {label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="scale-in">
          {tab === 'info'     && <ProfileInfo profile={profile} setProfile={setProfile} />}
          {tab === 'password' && <ChangePassword />}
          {tab === 'pin'      && <ChangePin />}
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) { #profile-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

/* ── Profile Info ── */
function ProfileInfo({ profile, setProfile }) {
  const schema = z.object({
    name:  z.string().min(3, 'Name must be at least 3 characters'),
    phone: z.string().min(7, 'Enter a valid phone number'),
  })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: profile?.name, phone: profile?.phone },
  })

  const onSubmit = async (data) => {
    try {
      const { data: updated } = await api.put('/member/profile', data)
      setProfile(p => ({ ...p, ...updated.user }))
      toast.success('Profile updated successfully!')
    } catch { toast.error('Could not update profile') }
  }

  const copyRef = () => {
    navigator.clipboard.writeText(profile?.referral_code || '')
    toast.success('Referral code copied!')
  }

  const infoItems = [
    { label: 'Email Address',   value: profile?.email,                                              icon: Mail     },
    { label: 'Joined On',       value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—', icon: Calendar  },
    { label: 'Referred By',     value: profile?.sponsor?.user_id || 'GlobalFX Admin',              icon: UserCheck },
  ]

  return (
    <Panel style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Info Grid */}
      <div>
        <p style={{ margin: '0 0 1rem', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Account Information</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {infoItems.map(({ label, value, icon: Icon }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Icon size={15} style={{ color: '#94a3b8' }} />
                <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{label}</span>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>{value}</span>
            </div>
          ))}
          {/* Referral Code row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Copy size={15} style={{ color: '#94a3b8' }} />
              <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Referral Code</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0d9488', fontFamily: 'JetBrains Mono, monospace' }}>{profile?.referral_code}</span>
              <button onClick={copyRef} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', padding: 0 }}>
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1.5px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 1.25rem', fontSize: '0.6875rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Update Details</p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="info-inputs">
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Full Name</label>
              <input {...register('name')} className="input" placeholder="Your full name" />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.name.message}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Phone Number</label>
              <input {...register('phone')} className="input" placeholder="Your phone number" />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.phone.message}</p>}
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><CheckCircle size={16} /><span>Save Changes</span></>}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 639px) { #info-inputs { grid-template-columns: 1fr !important; } }
      `}</style>
    </Panel>
  )
}

/* ── Change Password ── */
function ChangePassword() {
  const [show, setShow] = useState({ current: false, new: false, confirm: false })
  const schema = z.object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password:     z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
  }).refine(d => d.new_password === d.confirm_password, {
    message: "Passwords don't match", path: ['confirm_password'],
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await api.put('/member/change-password', data)
      toast.success('Password updated successfully!')
      reset()
    } catch (err) { toast.error(err?.response?.data?.error || 'Update failed') }
  }

  const fields = [
    { name: 'current_password', label: 'Current Password', key: 'current' },
    { name: 'new_password',     label: 'New Password',     key: 'new'     },
    { name: 'confirm_password', label: 'Confirm Password', key: 'confirm' },
  ]

  return (
    <Panel style={{ maxWidth: 500 }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>Change Password</h3>
        <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Keep your account safe with a strong password.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {fields.map(({ name, label, key }) => (
          <div key={name}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>{label}</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                {...register(name)}
                type={show[key] ? 'text' : 'password'}
                className="input"
                style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
              >
                {show[key] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors[name].message}</p>}
          </div>
        ))}
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><CheckCircle size={16} /><span>Update Password</span></>}
        </button>
      </form>
    </Panel>
  )
}

/* ── Change PIN ── */
function ChangePin() {
  const [show, setShow] = useState(false)
  const schema = z.object({
    new_pin:     z.string().length(6, 'PIN must be exactly 6 digits').regex(/^\d+$/, 'Digits only'),
    confirm_pin: z.string(),
  }).refine(d => d.new_pin === d.confirm_pin, { message: "PINs don't match", path: ['confirm_pin'] })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await api.put('/member/transaction-pin', data)
      toast.success('Security PIN updated!')
      reset()
    } catch (err) { toast.error(err?.response?.data?.error || 'Update failed') }
  }

  return (
    <Panel style={{ maxWidth: 500 }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>Security PIN</h3>
        <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>Your 6-digit PIN is required for all transactions.</p>
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fffbeb', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 12 }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400e', fontWeight: 600, lineHeight: 1.6 }}>
          💡 Your PIN is used every time you invest, withdraw, or transfer funds. Choose a 6-digit code you'll remember, but keep it private.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <button type="button" onClick={() => setShow(!show)} style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {show ? <><EyeOff size={14} /> Hide</>  : <><Eye size={14} /> Show</>}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {[
          { name: 'new_pin',     label: 'New PIN'      },
          { name: 'confirm_pin', label: 'Confirm PIN'  },
        ].map(({ name, label }) => (
          <div key={name}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>{label}</label>
            <input
              {...register(name)}
              type={show ? 'text' : 'password'}
              maxLength={6}
              className="input"
              style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem', fontWeight: 900 }}
              placeholder="••••••"
            />
            {errors[name] && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors[name].message}</p>}
          </div>
        ))}
        <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 14px rgba(249,115,22,0.35)' }}>
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><ShieldCheck size={16} /><span>Set Security PIN</span></>}
        </button>
      </form>
    </Panel>
  )
}
