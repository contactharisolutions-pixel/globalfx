/**
 * RewardIncome.jsx — Business Match Reward & Royalty Performance
 * Updated for new BitLance income engine:
 * - 50:50 Binary match model (left/right legs)
 * - Business Match Tiers → Match Reward + Monthly Salary
 * - Corporate Royalty Tiers → Royalty %
 * - Monsoon Bonanza Milestones
 */
import { useEffect, useState } from 'react'
import { Trophy, ShieldCheck, Star, Clock, CheckCircle2, Lock, Users, DollarSign, Crown, Gift } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { PageHeader, Panel, Spinner, Badge } from '../../components/member/ui'
import IncomeReportPage from './IncomeReportPage'

export default function RewardIncome() {
  const [perf, setPerf] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPerf = async () => {
    try {
      const { data } = await api.get('/member/performance')
      setPerf(data)
    } catch (err) {
      toast.error('Failed to load performance stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPerf() }, [])

  if (loading) return <Spinner />

  const fmt  = (n) => `$${(+n || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  const fmtN = (n) => (+n || 0).toLocaleString()
  const { binary, team_size, match_progress, royalty_progress, monsoon_progress, awarded_tiers } = perf || {}

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-lg)' }}>
      <PageHeader
        title="Business Performance & Rewards"
        subtitle="Binary match, royalty tiers, and monsoon milestones"
      />

      {/* Binary Business Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--gap-md)' }}>
        <Panel style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(124,58,237,0.05))', border: '1px solid var(--border-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} style={{ color: 'var(--cyan)' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>Total Matched</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{fmt(binary?.matched)}</h3>
            </div>
          </div>
        </Panel>

        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--purple-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={24} style={{ color: 'var(--purple)' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>Team Members</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{fmtN(team_size)}</h3>
            </div>
          </div>
        </Panel>

        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--green-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} style={{ color: 'var(--green)' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>Left Leg</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{fmt(binary?.left)}</h3>
            </div>
          </div>
        </Panel>

        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} style={{ color: '#f97316' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase' }}>Right Leg</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{fmt(binary?.right)}</h3>
            </div>
          </div>
        </Panel>
      </div>

      {/* Business Match Reward Tiers */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Trophy size={20} style={{ color: 'var(--orange)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Business Match Reward Tiers</h3>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginLeft: 'auto' }}>2× min(left, right) matched</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>MATCH TARGET</th>
                <th>ONE-TIME REWARD</th>
                <th>MONTHLY SALARY</th>
                <th>PROGRESS</th>
                <th style={{ textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {match_progress?.slice().reverse().map((tier, i) => {
                const awarded = awarded_tiers?.find(a => a.tier_match === tier.match)
                return (
                  <tr key={i} style={{ opacity: tier.achieved ? 1 : 0.65 }}>
                    <td style={{ fontWeight: 700 }}>{fmt(tier.match)}</td>
                    <td style={{ fontWeight: 800, color: 'var(--cyan)' }}>{fmt(tier.reward)}</td>
                    <td style={{ fontWeight: 700, color: 'var(--purple)' }}>{fmt(tier.salary)}/mo</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                          <div style={{ width: `${tier.progress_pct}%`, height: '100%', borderRadius: 4, background: tier.achieved ? 'var(--green)' : 'var(--cyan)' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', minWidth: 36 }}>{tier.progress_pct}%</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {tier.achieved
                        ? <span style={{ color: 'var(--green)', fontSize: '0.75rem', fontWeight: 800 }}>ACHIEVED {awarded ? `(Salary: ${awarded.salaries_paid}mo paid)` : ''}</span>
                        : <span style={{ color: 'var(--text-faint)', fontSize: '0.75rem' }}>LOCKED</span>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Corporate Royalty Tiers */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Crown size={20} style={{ color: 'var(--cyan)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Corporate Royalty Tiers</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {royalty_progress?.map((tier, i) => (
            <div key={i} style={{
              padding: '1rem', borderRadius: 12,
              background: tier.achieved ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${tier.achieved ? 'var(--green)' : 'var(--border)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)' }}>{fmt(tier.business)}</span>
                {tier.achieved
                  ? <CheckCircle2 size={18} style={{ color: 'var(--green)' }} />
                  : <Lock size={16} style={{ color: 'var(--text-faint)' }} />
                }
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: 900, color: tier.achieved ? 'var(--green)' : 'var(--cyan)' }}>
                {tier.percent}% Royalty
              </p>
              <div style={{ marginTop: '0.75rem', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                <div style={{ width: `${tier.progress_pct}%`, height: '100%', borderRadius: 4, background: tier.achieved ? 'var(--green)' : 'var(--cyan)' }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>{tier.progress_pct}% of target</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Monsoon Bonanza Milestones */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Gift size={20} style={{ color: '#818cf8' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Monsoon Bonanza Milestones</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {monsoon_progress?.map((tier, i) => (
            <div key={i} style={{
              padding: '1rem', borderRadius: 12,
              background: tier.achieved ? 'rgba(129,140,248,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${tier.achieved ? '#818cf8' : 'var(--border)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-faint)' }}>{tier.teamSize} Members</span>
                {tier.achieved ? <CheckCircle2 size={16} style={{ color: '#818cf8' }} /> : <Lock size={14} style={{ color: 'var(--text-faint)' }} />}
              </div>
              <p style={{ fontSize: '1.125rem', fontWeight: 900, color: tier.achieved ? '#818cf8' : 'var(--text-muted)' }}>{fmt(tier.bonus)}</p>
              <div style={{ marginTop: '0.625rem', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                <div style={{ width: `${tier.progress_pct}%`, height: '100%', borderRadius: 4, background: '#818cf8' }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.375rem' }}>{fmtN(0)} / {fmtN(tier.teamSize)} · {tier.progress_pct}%</p>
            </div>
          ))}
        </div>
      </Panel>

      <IncomeReportPage
        type="match_reward"
        title="Match Reward History"
        subtitle="One-time rewards earned from binary business matching"
        icon={Trophy}
      />
    </div>
  )
}
