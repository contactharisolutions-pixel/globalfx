import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, QrCode, Loader2, CheckCircle, Copy, ShieldCheck, AlertCircle, X, ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, Panel } from '../../components/member/ui'

const DEFAULT_ADDRESS = 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXglobalfx'

const schema = z.object({
  amount:  z.coerce.number()
    .min(25, 'Minimum deposit is $25')
    .max(5000, 'Maximum deposit is $5,000')
    .refine(val => val === 25 || val % 10 === 0, 'Amount must be $25 or a multiple of $10'),
  tx_hash: z.string().min(10, 'Enter the transaction ID from your wallet app'),
})

const QUICK_AMOUNTS = [25, 50, 100, 250, 500, 1000, 2500, 5000]

const STEPS = [
  { num: '1', label: 'Choose Amount',   color: '#02d8dc', bg: 'rgba(2,216,220,0.08)'  },
  { num: '2', label: 'Send Payment',    color: '#3b82f6', bg: 'rgba(59,130,246,0.08)'  },
  { num: '3', label: 'Upload Proof',    color: '#7c3aed', bg: 'rgba(124,58,237,0.08)'  },
]

export default function TopupPage() {
  const [screenshot, setScreenshot] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [submitted,  setSubmitted]  = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [settings,   setSettings]   = useState({ deposit_address: DEFAULT_ADDRESS, deposit_qr_url: null })
  const [copied,     setCopied]     = useState(false)

  useEffect(() => {
    api.get('/public/settings')
      .then(({ data }) => { if (data.settings) setSettings(data.settings) })
      .catch(() => {})
  }, [])

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })
  const amount = watch('amount')

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setScreenshot(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const onSubmit = async (data) => {
    if (!screenshot) return toast.error('Please upload a payment screenshot')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('amount',     data.amount)
      fd.append('tx_hash',    data.tx_hash)
      fd.append('screenshot', screenshot)
      await api.post('/deposits/create', fd)
      setSubmitted(true)
      toast.success('Deposit submitted! You will be notified once approved.')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(settings.deposit_address)
    setCopied(true)
    toast.success('Address copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  // Success screen
  if (submitted) {
    return (
      <div className="fade-in" style={{ maxWidth: 520, margin: '4rem auto', textAlign: 'center' }}>
        <Panel style={{ padding: '4rem 2.5rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 12px 32px rgba(16,185,129,0.3)',
          }}>
            <CheckCircle size={40} style={{ color: '#fff' }} strokeWidth={2} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif', margin: '0 0 0.75rem' }}>
            Deposit Submitted!
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2.5rem', fontWeight: 500 }}>
            Your deposit of <strong style={{ color: '#02d8dc' }}>${(+amount).toLocaleString()}</strong> USDT has been submitted for review. Funds will appear in your Deposit Wallet once approved (usually within 24 hours).
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ width: '100%', height: 50 }}>
            Submit Another Deposit
          </button>
        </Panel>
      </div>
    )
  }

  return (
    <div className="fade-in" style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Add Funds"
        subtitle="Deposit USDT (BEP20) to your account"
      />

      {/* Step Indicators */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {STEPS.map(({ num, label, color, bg }) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 1rem', background: bg, borderRadius: 10, border: `1px solid ${color}30` }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>
              {num}
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step 1 — Choose Amount */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#02d8dc', color: '#080f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 900 }}>1</div>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Choose Amount</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem' }} id="amount-grid">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setValue('amount', a)}
              className={`amount-btn ${+amount === a ? 'active' : ''}`}
              style={{ padding: '0.75rem 0.5rem', fontSize: '0.875rem' }}
            >
              ${a.toLocaleString()}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-faint)', fontSize: '1rem' }}>$</span>
          <input
            {...register('amount')}
            type="number"
            placeholder="Custom amount — min $25, max $5,000, multiples of $10"
            className="input"
            style={{ paddingLeft: '2rem', fontWeight: 700, fontSize: '0.9375rem' }}
          />
        </div>
        {errors.amount && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.amount.message}</p>}
      </Panel>

      {/* Step 2 — Send Payment */}
      <Panel style={{ border: '1.5px solid rgba(2,216,220,0.25)', background: 'var(--bg-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 900 }}>2</div>
          <p style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Send Payment</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* QR Code */}
          <div style={{ padding: '1rem', background: '#ffffff', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {settings.deposit_qr_url ? (
              <img src={settings.deposit_qr_url} alt="USDT QR Code" style={{ width: 120, height: 120, objectFit: 'contain', display: 'block' }} />
            ) : (
              <QrCode size={120} style={{ color: '#080f1e' }} />
            )}
          </div>

          {/* Address Info */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.625rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Network</p>
                <p style={{ fontSize: '0.9375rem', color: '#02d8dc', fontWeight: 800 }}>USDT BEP20 (BSC)</p>
              </div>
              <div>
                <p style={{ fontSize: '0.625rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>Currency</p>
                <p style={{ fontSize: '0.9375rem', color: '#ffffff', fontWeight: 800 }}>USDT</p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.625rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Wallet Address to Send To</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <code style={{
                  flex: 1, padding: '0.75rem 1rem',
                  background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10, fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#ffffff', fontWeight: 700,
                  wordBreak: 'break-all',
                }}>
                  {settings.deposit_address}
                </code>
                <button
                  type="button"
                  onClick={copyAddress}
                  style={{
                    width: 42, flexShrink: 0,
                    background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: copied ? '#10b981' : '#64748b',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', padding: '0.875rem 1rem', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 10, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <AlertCircle size={16} style={{ color: '#f97316', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.8125rem', color: '#fdba74', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>
            <strong>Important:</strong> Only send USDT via the <strong>BEP20 (Binance Smart Chain)</strong> network. Sending via any other network will result in permanent loss of funds.
          </p>
        </div>
      </Panel>

      {/* Step 3 — Upload Proof */}
      <Panel>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#02d8dc', color: '#080f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 900 }}>3</div>
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Upload Proof</p>
          </div>

          {/* TX Hash */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.625rem' }}>
              Transaction ID (TX Hash)
            </label>
            <input
              {...register('tx_hash')}
              placeholder="Paste the transaction ID from your wallet app (e.g. 0xabc...def)"
              className="input mono"
              style={{ fontSize: '0.8125rem' }}
            />
            {errors.tx_hash && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.tx_hash.message}</p>}
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>You can find this in your wallet app or on BSCScan after sending.</p>
          </div>

          {/* Screenshot Upload */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '0.625rem' }}>
              Payment Screenshot
            </label>
            <label className="upload-box" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              minHeight: 180, cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: 14,
              background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.15)',
            }}>
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#ef4444', borderRadius: 8, padding: '0.25rem 0.625rem', fontSize: '0.75rem', fontWeight: 700, color: '#fff', cursor: 'pointer', zIndex: 1 }}
                    onClick={(e) => { e.preventDefault(); setScreenshot(null); setPreviewUrl(null) }}>
                    <X size={12} style={{ display: 'inline', marginRight: 4 }} />Remove
                  </div>
                </>
              ) : (
                <>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={22} style={{ color: '#94a3b8' }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#02d8dc', fontWeight: 700, margin: 0 }}>Click to upload screenshot</p>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>JPG or PNG, max 5MB</p>
                  </div>
                </>
              )}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileChange} />
            </label>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ height: 52 }}>
            {loading
              ? <Loader2 size={18} className="animate-spin" />
              : <><ShieldCheck size={18} /><span>Submit Deposit Request</span></>
            }
          </button>
        </form>
      </Panel>

      <style>{`
        @media (max-width: 640px) { #amount-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 420px) { #amount-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
