import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, ArrowLeft, Send, MessageSquare, Loader2, LifeBuoy, Clock, ShieldCheck, User, ChevronRight, CheckCircle2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, Badge, Spinner, Panel } from '../../components/member/ui'
import useAuthStore from '../../store/useAuthStore'

const createSchema = z.object({
  subject:  z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.enum(['withdrawal', 'investment', 'technical', 'other'], { required_error: 'Select a category' }),
  message:  z.string().min(20, 'Message must be at least 20 characters'),
})
const replySchema = z.object({
  message: z.string().min(5, 'Reply must be at least 5 characters'),
})

const CATEGORIES = [
  { value: 'withdrawal',  label: 'Withdrawal',  emoji: '💸' },
  { value: 'investment',  label: 'Investment',  emoji: '📈' },
  { value: 'technical',   label: 'Technical',   emoji: '🔧' },
  { value: 'other',       label: 'Other',       emoji: '💬' },
]

/* ── Create Ticket ── */
function CreateTicket({ onCreated, onCancel }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(createSchema) })

  const onSubmit = async (data) => {
    try {
      await api.post('/tickets/create', data)
      toast.success('Your support request has been submitted!')
      onCreated()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to submit. Please try again.')
    }
  }

  return (
    <Panel className="scale-in" style={{ maxWidth: 700 }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#eff6ff', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LifeBuoy size={18} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>New Support Request</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>We'll respond within 24 hours</p>
            </div>
          </div>
          <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} id="ticket-meta">
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.625rem' }}>Category</label>
            <select {...register('category')} className="input" style={{ fontWeight: 600 }}>
              <option value="">Choose a topic…</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
            </select>
            {errors.category && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.category.message}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.625rem' }}>Subject</label>
            <input {...register('subject')} placeholder="Brief description of your issue" className="input" />
            {errors.subject && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.subject.message}</p>}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#475569', marginBottom: '0.625rem' }}>Details</label>
          <textarea {...register('message')} rows={6} placeholder="Describe your issue in detail. Include any relevant amounts, dates, or transaction IDs." className="input" style={{ resize: 'none', lineHeight: 1.6 }} />
          {errors.message && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.message.message}</p>}
        </div>

        <div style={{ display: 'flex', gap: '0.875rem' }}>
          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1, height: 46 }}>
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} /><span>Submit Request</span></>}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary" style={{ flex: 1, height: 46 }}>Cancel</button>
        </div>
      </form>
      <style>{`@media (max-width: 639px) { #ticket-meta { grid-template-columns: 1fr !important; } }`}</style>
    </Panel>
  )
}

/* ── Ticket Detail ── */
function TicketDetail({ ticketId, onBack }) {
  const { user } = useAuthStore()
  const [ticket,  setTicket]  = useState(null)
  const [loading, setLoading] = useState(true)
  const [closing, setClosing] = useState(false)
  const bottomRef = useRef(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(replySchema) })

  const loadTicket = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/tickets/${ticketId}`)
      setTicket(data.ticket)
    } catch { toast.error('Could not load this conversation') }
    finally { setLoading(false) }
  }

  useEffect(() => { loadTicket() }, [ticketId])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [ticket?.replies])

  const onReply = async (data) => {
    try {
      await api.post(`/tickets/${ticketId}/reply`, data)
      reset()
      loadTicket()
    } catch (err) { toast.error(err?.response?.data?.error || 'Failed to send reply') }
  }

  const onClose = async () => {
    if (!confirm('Mark this ticket as resolved?')) return
    setClosing(true)
    try {
      await api.put(`/tickets/${ticketId}/close`)
      toast.success('Ticket marked as resolved.')
      loadTicket()
    } finally { setClosing(false) }
  }

  if (loading) return <Spinner />
  if (!ticket) return null

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={onBack} style={{ width: 38, height: 38, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', flexShrink: 0 }}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{ticket.subject}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
            <Badge status={ticket.status} />
            <span style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              #{ticket.id} · {ticket.category}
            </span>
          </div>
        </div>
        {ticket.status !== 'closed' && (
          <button onClick={onClose} disabled={closing} style={{
            padding: '0.5rem 1rem', background: '#fef2f2',
            border: '1.5px solid rgba(239,68,68,0.25)', borderRadius: 10,
            color: '#ef4444', fontWeight: 700, fontSize: '0.8125rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            {closing ? <Loader2 size={14} className="animate-spin" /> : <><CheckCircle2 size={14} /><span>Mark Resolved</span></>}
          </button>
        )}
      </div>

      {/* Conversation */}
      <Panel style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
        <div style={{ maxHeight: 550, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '0.25rem' }} className="light-scrollbar">
          {/* Original message */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', padding: '1rem 1.25rem', borderRadius: '18px 18px 4px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <User size={12} style={{ color: 'rgba(255,255,255,0.8)' }} />
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>{user?.name || 'You'}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#ffffff', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{ticket.message}</p>
              <p style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', textAlign: 'right' }}>{new Date(ticket.created_at).toLocaleString()}</p>
            </div>
          </div>

          {/* Replies */}
          {ticket.replies?.map((reply) => (
            <div key={reply.id} style={{ alignSelf: reply.is_admin ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
              <div style={{
                background: reply.is_admin ? '#f0fdfa' : '#f5f3ff',
                border: `1.5px solid ${reply.is_admin ? 'rgba(13,148,136,0.2)' : 'rgba(124,58,237,0.2)'}`,
                padding: '1rem 1.25rem',
                borderRadius: reply.is_admin ? '4px 18px 18px 18px' : '18px 18px 4px 18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {reply.is_admin
                    ? <ShieldCheck size={12} style={{ color: '#0d9488' }} />
                    : <User       size={12} style={{ color: '#7c3aed' }} />
                  }
                  <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: reply.is_admin ? '#0d9488' : '#7c3aed', textTransform: 'uppercase' }}>
                    {reply.is_admin ? 'Support Team' : (reply.user?.name || 'You')}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#0f172a', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{reply.message}</p>
                <p style={{ fontSize: '0.625rem', color: '#94a3b8', marginTop: '0.75rem', textAlign: 'right' }}>{new Date(reply.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Reply input */}
        {ticket.status !== 'closed' ? (
          <form onSubmit={handleSubmit(onReply)} style={{ display: 'flex', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
            <textarea
              {...register('message')}
              placeholder="Write your reply…"
              style={{ flex: 1, minHeight: 56, maxHeight: 120, resize: 'vertical', padding: '0.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.875rem', color: '#0f172a', outline: 'none', lineHeight: 1.6 }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0d9488' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0' }}
            />
            <button type="submit" disabled={isSubmitting} style={{ width: 56, background: 'linear-gradient(135deg, #0d9488, #0f766e)', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(13,148,136,0.3)', flexShrink: 0 }}>
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        ) : (
          <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, textAlign: 'center' }}>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>
              This ticket is closed. <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#0d9488', fontWeight: 700, cursor: 'pointer' }}>Open a new request</button>
            </p>
          </div>
        )}
        {errors.message && <p style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.message.message}</p>}
      </Panel>
    </div>
  )
}

/* ── Main ── */
export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [view,    setView]    = useState('list')
  const [selId,   setSelId]   = useState(null)

  const loadTickets = async () => {
    setLoading(true)
    api.get('/tickets')
      .then(({ data }) => setTickets(data.tickets || []))
      .catch(() => toast.error('Could not load tickets'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadTickets() }, [])

  if (view === 'create') return <CreateTicket onCreated={() => { loadTickets(); setView('list') }} onCancel={() => setView('list')} />
  if (view === 'detail') return <TicketDetail ticketId={selId} onBack={() => { loadTickets(); setView('list') }} />

  const openCount   = tickets.filter(t => t.status === 'open').length
  const closedCount = tickets.filter(t => t.status === 'closed').length

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <PageHeader
        title="Support & Help"
        subtitle="Need help? Create a ticket and we'll get back to you."
        action={
          <button onClick={() => setView('create')} className="btn-primary">
            <Plus size={16} /><span>New Request</span>
          </button>
        }
      />

      {/* Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[
          { label: 'Total Requests',  value: tickets.length, color: '#0d9488', bg: '#f0fdfa', icon: MessageSquare },
          { label: 'Pending Reply',   value: openCount,       color: '#f59e0b', bg: '#fffbeb', icon: Clock        },
          { label: 'Resolved',        value: closedCount,     color: '#10b981', bg: '#f0fdf4', icon: ShieldCheck  },
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} style={{ padding: '1.125rem 1.375rem', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '1.375rem', fontWeight: 900, color, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>{value}</p>
              <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket List */}
      {loading ? <Spinner /> : tickets.length === 0 ? (
        <Panel style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: '#eff6ff', border: '1.5px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <MessageSquare size={28} style={{ color: '#3b82f6' }} />
          </div>
          <p style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>No requests yet</p>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem', fontWeight: 500 }}>Create a support request and our team will help you out.</p>
          <button onClick={() => setView('create')} className="btn-primary" style={{ margin: '0 auto' }}>Create First Request</button>
        </Panel>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => { setSelId(ticket.id); setView('detail') }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.375rem', background: '#ffffff',
                border: '1.5px solid #e2e8f0', borderRadius: 16, cursor: 'pointer',
                transition: 'all 0.2s', textAlign: 'left', gap: '1rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0d9488'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,148,136,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageSquare size={17} style={{ color: '#0d9488' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.subject}</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                    {ticket.category?.charAt(0).toUpperCase() + ticket.category?.slice(1)} · {ticket._count?.replies ?? 0} replies · {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <Badge status={ticket.status} />
                <ChevronRight size={16} style={{ color: '#cbd5e1' }} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
