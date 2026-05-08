import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, CheckCircle, Clock, XCircle, Loader2, ShieldCheck, AlertTriangle, ImageIcon, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, Spinner, Panel } from '../../components/member/ui'

const schema = z.object({
  doc_type: z.enum(['passport', 'aadhar_card', 'pan_card'], { required_error: 'Please select a document type' }),
})

const DOC_TYPES = [
  { value: 'aadhar_card', label: 'Aadhar Card', emoji: '🪪' },
  { value: 'pan_card',    label: 'PAN Card',     emoji: '📄' },
  { value: 'passport',    label: 'Passport',     emoji: '📘' },
]

const STATUS_CONFIG = {
  pending:  { icon: Clock,       color: '#f59e0b', bg: '#fffbeb', border: 'rgba(245,158,11,0.25)',  label: 'Under Review',     desc: 'Your documents are being checked by our team. This usually takes less than 24 hours.' },
  approved: { icon: CheckCircle, color: '#10b981', bg: '#f0fdf4', border: 'rgba(16,185,129,0.25)', label: 'Identity Verified', desc: 'Your identity has been verified. You now have full access to all platform features.' },
}

export default function KYCPage() {
  const [kyc,        setKyc]        = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [frontPrev,  setFrontPrev]  = useState(null)
  const [backPrev,   setBackPrev]   = useState(null)
  const [frontFile,  setFrontFile]  = useState(null)
  const [backFile,   setBackFile]   = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { doc_type: 'aadhar_card' },
  })
  const selectedType = watch('doc_type')

  const loadKyc = () => {
    setLoading(true)
    api.get('/kyc/status')
      .then(({ data }) => setKyc(data.kyc))
      .catch(() => toast.error('Could not load verification status'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadKyc() }, [])

  const onFileChange = (side, e) => {
    const file = e.target.files[0]
    if (!file) return
    if (side === 'front') { setFrontFile(file); setFrontPrev(URL.createObjectURL(file)) }
    else                  { setBackFile(file);  setBackPrev(URL.createObjectURL(file))  }
  }

  const clearFile = (side, e) => {
    e.preventDefault()
    if (side === 'front') { setFrontFile(null); setFrontPrev(null) }
    else                  { setBackFile(null);  setBackPrev(null)  }
  }

  const onSubmit = async (data) => {
    if (!frontFile) return toast.error('Please upload the front image of your document')
    if (selectedType === 'aadhar_card' && !backFile) return toast.error('Aadhar Card requires a back image too')

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('doc_type', data.doc_type)
      fd.append('front', frontFile)
      if (backFile) fd.append('back', backFile)
      await api.post('/kyc/submit', fd)
      toast.success('Documents submitted! We\'ll review within 24 hours.')
      setFrontFile(null); setFrontPrev(null)
      setBackFile(null);  setBackPrev(null)
      loadKyc()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Submission failed. Please try again.')
    } finally { setSubmitting(false) }
  }

  if (loading) return <Spinner />

  // Status screen for approved/pending
  if (kyc && kyc.status !== 'rejected') {
    const cfg = STATUS_CONFIG[kyc.status]
    const Icon = cfg.icon
    return (
      <div className="fade-in" style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <PageHeader title="ID Verification" subtitle="Your identity verification status" />

        <Panel style={{ textAlign: 'center', padding: '3.5rem 2rem', background: cfg.bg, border: `1.5px solid ${cfg.border}` }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `${cfg.color}20`, border: `2px solid ${cfg.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.75rem',
          }}>
            <Icon size={38} style={{ color: cfg.color }} strokeWidth={2} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', marginBottom: '0.75rem' }}>
            {cfg.label}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 2rem', fontWeight: 500 }}>
            {cfg.desc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
            {[
              { label: 'Document Type', value: kyc.doc_type?.replace(/_/g, ' ')?.replace(/\b\w/g, c => c.toUpperCase()) },
              { label: 'Submitted On',  value: new Date(kyc.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.625rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{label}</p>
                <p style={{ fontSize: '0.9375rem', color: '#0f172a', fontWeight: 700 }}>{value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div className="fade-in" style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="ID Verification"
        subtitle="Upload a valid government-issued photo ID to verify your account"
      />

      {/* Rejection Notice */}
      {kyc?.status === 'rejected' && (
        <div style={{
          padding: '1rem 1.25rem',
          background: '#fef2f2', border: '1.5px solid rgba(239,68,68,0.25)',
          borderRadius: 14, display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
        }}>
          <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontWeight: 800, color: '#991b1b', marginBottom: '0.375rem' }}>Verification Rejected</p>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              {kyc.review_note || 'Please resubmit with clearer photos of a valid ID document.'}
            </p>
          </div>
        </div>
      )}

      {/* Why verify */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Secure Account',    desc: 'Protect against unauthorized access',  color: '#0d9488', bg: '#f0fdfa'  },
          { label: 'Higher Limits',     desc: 'Unlock higher withdrawal amounts',      color: '#3b82f6', bg: '#eff6ff'  },
          { label: 'Faster Approvals',  desc: 'Priority processing of your requests', color: '#7c3aed', bg: '#f5f3ff'  },
        ].map((b) => (
          <div key={b.label} style={{ flex: '1 1 160px', padding: '1rem', background: b.bg, borderRadius: 12, border: `1px solid ${b.color}25` }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '0.875rem', color: b.color }}>{b.label}</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <Panel>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {/* Document Type Selection */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.875rem' }}>
              Select Document Type
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {DOC_TYPES.map(({ value, label, emoji }) => (
                <label key={value} style={{ cursor: 'pointer' }}>
                  <input type="radio" {...register('doc_type')} value={value} style={{ display: 'none' }} />
                  <div
                    className="kyc-radio-item"
                    style={{
                      padding: '1rem', textAlign: 'center',
                      borderRadius: 14,
                      border: `1.5px solid ${selectedType === value ? '#0d9488' : '#e2e8f0'}`,
                      background: selectedType === value ? '#f0fdfa' : '#fff',
                      fontSize: '0.875rem', fontWeight: selectedType === value ? 700 : 600,
                      color: selectedType === value ? '#0d9488' : '#64748b',
                      transition: 'all 0.18s',
                      boxShadow: selectedType === value ? '0 4px 14px rgba(13,148,136,0.12)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>{emoji}</div>
                    {label}
                  </div>
                </label>
              ))}
            </div>
            {errors.doc_type && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.doc_type.message}</p>}
          </div>

          {/* Upload Areas */}
          <div
            style={{ display: 'grid', gridTemplateColumns: selectedType === 'pan_card' ? '1fr' : '1fr 1fr', gap: '1.5rem' }}
            id="kyc-upload-row"
          >
            {[
              { side: 'front', label: 'Front of Document', required: true,                              preview: frontPrev, show: true },
              { side: 'back',  label: 'Back of Document',  required: selectedType === 'aadhar_card',    preview: backPrev,  show: selectedType !== 'pan_card' },
            ].filter(f => f.show).map(({ side, label, required, preview }) => (
              <div key={side}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#475569' }}>{label}</label>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: required ? '#ef4444' : '#94a3b8' }}>
                    {required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <label style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  minHeight: 180, border: `2px dashed ${preview ? '#10b981' : '#e2e8f0'}`,
                  borderRadius: 14, cursor: 'pointer',
                  transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden',
                  background: preview ? '#f0fdf4' : '#fafafa',
                }}
                  onMouseEnter={e => { if (!preview) { e.currentTarget.style.borderColor = '#0d9488'; e.currentTarget.style.background = '#f0fdfa' } }}
                  onMouseLeave={e => { if (!preview) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fafafa' } }}
                >
                  {preview ? (
                    <>
                      <img src={preview} alt={`${side} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                      <button
                        type="button"
                        onClick={(e) => clearFile(side, e)}
                        style={{
                          position: 'absolute', top: 8, right: 8, zIndex: 1,
                          background: '#ef4444', border: 'none', borderRadius: 8,
                          padding: '0.25rem 0.5rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '0.25rem',
                          color: '#fff', fontSize: '0.75rem', fontWeight: 700,
                        }}
                      >
                        <X size={12} /> Remove
                      </button>
                      <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '0.125rem 0.5rem' }}>
                        <CheckCircle size={12} style={{ color: '#10b981', display: 'inline', marginRight: 4 }} />
                        <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 700 }}>Uploaded</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: 52, height: 52, borderRadius: 16, background: '#f0fdfa', border: '1.5px solid rgba(13,148,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={22} style={{ color: '#0d9488' }} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: '#0d9488', fontWeight: 700, margin: 0 }}>Click to Upload</p>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>JPG, PNG, PDF — max 5MB</p>
                      </div>
                    </>
                  )}
                  <input type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={(e) => onFileChange(side, e)} />
                </label>
              </div>
            ))}
          </div>

          <div style={{ padding: '0.875rem 1rem', background: '#f0fdf4', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
            <p style={{ fontSize: '0.8125rem', color: '#065f46', fontWeight: 600, lineHeight: 1.6 }}>
              ✅ Upload a clear, readable photo of your document. Make sure all text and corners are visible.
            </p>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ height: 52 }}>
            {submitting
              ? <Loader2 size={18} className="animate-spin" />
              : <><ShieldCheck size={18} /><span>Submit for Verification</span></>
            }
          </button>
        </form>
      </Panel>

      <style>{`
        @media (max-width: 639px) { #kyc-upload-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
