import { useState, useEffect } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, User, Wallet, TrendingUp, Network, DollarSign,
  ArrowUpFromLine, Ticket, LogOut, TrendingDown, Menu, X,
  Bell, Settings, ShieldCheck, ShieldAlert, Megaphone, ChevronDown,
  Activity, Trophy, Award, Send, Zap, History as HistoryIcon,
} from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import UrgentAnnouncementPopup from '../components/member/UrgentAnnouncementPopup'
import api from '../lib/api'

const NAV_GROUPS = [
  { label: null, items: [{ to: '/dashboard', icon: LayoutDashboard, label: 'Overview' }] },
  { label: 'My Profile', items: [
    { to: '/dashboard/profile',      icon: User,        label: 'My Account'        },
    { to: '/dashboard/wallet-setup', icon: Settings,    label: 'Withdrawal Wallets' },
    { to: '/dashboard/kyc',          icon: ShieldCheck, label: 'ID Verification'   },
  ]},
  { label: 'Funds & Deposits', items: [
    { to: '/dashboard/topup',          icon: Wallet,      label: 'Add Funds'         },
    { to: '/dashboard/topup/history',  icon: DollarSign,  label: 'Deposit History'   },
    { to: '/dashboard/funds/history',  icon: HistoryIcon, label: 'Wallet History'    },
    { to: '/dashboard/funds/transfer', icon: Send,        label: 'Send to Member'    },
    { to: '/dashboard/funds/activate', icon: Zap,         label: 'Activate Member'   },
  ]},
  { label: 'Trading', items: [
    { to: '/dashboard/trade',         icon: TrendingUp,   label: 'Start Investing'  },
    { to: '/dashboard/trade/history', icon: TrendingDown, label: 'Investment History'},
  ]},
  { label: 'My Earnings', items: [
    { to: '/dashboard/income-wallet',    icon: DollarSign, label: 'Earnings Wallet'  },
    { to: '/dashboard/earnings',         icon: Activity,   label: 'Earnings Summary' },
    { to: '/dashboard/earnings/daily',   icon: TrendingUp, label: 'Daily Profits'    },
    { to: '/dashboard/earnings/direct',  icon: User,       label: 'Referral Bonus'   },
    { to: '/dashboard/earnings/level',   icon: Network,    label: 'Team Bonus'       },
    { to: '/dashboard/earnings/reward',  icon: Trophy,     label: 'Reward Bonus'     },
    { to: '/dashboard/earnings/royalty', icon: Award,      label: 'Royalty Bonus'    },
  ]},
  { label: 'My Team',       items: [{ to: '/dashboard/genealogy', icon: Network,         label: 'My Network Tree' }] },
  { label: 'Withdraw',      items: [
    { to: '/dashboard/withdraw',         icon: ArrowUpFromLine, label: 'Withdraw Funds'  },
    { to: '/dashboard/withdraw/history', icon: DollarSign,      label: 'Withdrawal History' },
  ]},
  { label: 'Help',          items: [
    { to: '/dashboard/tickets',       icon: Ticket,    label: 'Support & Help'   },
    { to: '/dashboard/announcements', icon: Megaphone, label: 'Announcements'    },
  ]},
]

const PAGE_TITLES = {
  dashboard:       'Dashboard',
  profile:         'My Account',
  'wallet-setup':  'Withdrawal Wallets',
  kyc:             'ID Verification',
  topup:           'Add Funds',
  history:         'History',
  trade:           'Start Investing',
  'income-wallet': 'Earnings Wallet',
  earnings:        'Earnings Summary',
  genealogy:       'My Network',
  withdraw:        'Withdraw Funds',
  tickets:         'Support & Help',
  announcements:   'Announcements',
  daily:           'Daily Profits',
  direct:          'Referral Bonus',
  level:           'Team Bonus',
  reward:          'Reward Bonus',
  royalty:         'Royalty Bonus',
  transfer:        'Send to Member',
  activate:        'Activate Member',
  funds:           'Funds',
}

function SidebarContent({ onClose = () => {} }) {
  const { user, logout } = useAuthStore()
  const [openGroup, setOpenGroup] = useState(null)
  const location = useLocation()

  // Auto-open the group containing the active route
  useEffect(() => {
    for (const group of NAV_GROUPS) {
      if (group.label && group.items.some(item => location.pathname.startsWith(item.to))) {
        setOpenGroup(group.label)
        break
      }
    }
  }, [location.pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(180deg, #0a0f1e 0%, #111827 100%)' }}>

      {/* Logo */}
      <div style={{ padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 0.875rem',
          background: '#ffffff',
          borderRadius: 14,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}>
          <img
            src="/bitlance-logo.png"
            alt="BitLance"
            style={{ height: 36, width: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* User Card */}
      <div style={{ padding: '1rem 1.25rem 0.75rem' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          padding: '0.875rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.875rem',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.0625rem', fontWeight: 900, color: '#fff',
            boxShadow: '0 4px 12px rgba(13,148,136,0.35)',
          }}>
            {user?.name?.[0]?.toUpperCase() || 'M'}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: '0.875rem', fontWeight: 800, color: '#ffffff',
              margin: 0, marginBottom: 4,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name || 'Member'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: user?.status === 'active' ? '#10b981' : '#ef4444',
                boxShadow: `0 0 8px ${user?.status === 'active' ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)'}`,
              }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.user_id}
              </span>
              <span style={{
                fontSize: '0.55rem', fontWeight: 800,
                color: user?.status === 'active' ? '#10b981' : '#ef4444',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {user?.status || 'inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.875rem' }} className="custom-scrollbar">
        {NAV_GROUPS.map(({ label, items }) => {
          const isOpen = openGroup === label
          return (
            <div key={label || '_top'} style={{ marginBottom: '0.125rem' }}>
              {label && (
                <button
                  onClick={() => setOpenGroup(isOpen ? null : label)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.5rem 0.875rem', border: 'none', cursor: 'pointer',
                    background: 'transparent',
                    color: isOpen ? '#cbd5e1' : '#475569',
                    fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
                    borderRadius: 8, transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8' }}
                  onMouseLeave={e => { e.currentTarget.style.color = isOpen ? '#cbd5e1' : '#475569' }}
                >
                  <span>{label}</span>
                  <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.6 }} />
                </button>
              )}
              <div style={{ display: (!label || isOpen) ? 'block' : 'none', paddingLeft: label ? '0.125rem' : '0' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.0625rem', marginTop: label ? '0.0625rem' : 0 }}>
                  {items.map(({ to, icon: Icon, label: itemLabel }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end={to === '/dashboard' || to === '/dashboard/earnings'}
                        onClick={onClose}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.5625rem 0.875rem', borderRadius: 10,
                          color: isActive ? '#ffffff' : '#94a3b8',
                          textDecoration: 'none', fontSize: '0.8125rem', fontWeight: isActive ? 700 : 500,
                          transition: 'all 0.18s',
                        })}
                      >
                        <Icon size={16} strokeWidth={isActive => isActive ? 2.5 : 2} />
                        <span>{itemLabel}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.625rem 0.875rem', border: 'none', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', color: '#475569',
            fontSize: '0.8125rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#ef4444' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569' }}
        >
          <LogOut size={16} strokeWidth={2.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [announcementCount, setAnnouncementCount] = useState(0)
  const { user } = useAuthStore()
  const isImpersonating = localStorage.getItem('nvx_impersonator') === 'true'
  const location = useLocation()

  useEffect(() => {
    api.get('/announcements')
      .then(({ data }) => {
        const dismissed = JSON.parse(localStorage.getItem('nvx_dismissed_announcements') || '[]')
        setAnnouncementCount((data.announcements || []).filter(a => !dismissed.includes(a.id)).length)
      })
      .catch(() => {})
  }, [])

  const getPageTitle = () => {
    const parts = location.pathname.split('/').filter(Boolean)
    if (parts.length === 1) return 'Dashboard'
    const last = parts[parts.length - 1]
    return PAGE_TITLES[last] || last.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      <UrgentAnnouncementPopup />

      {/* Impersonation Banner */}
      {isImpersonating && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: 'linear-gradient(90deg, #f97316, #ef4444)', color: '#fff',
          padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
          fontSize: '0.75rem', fontWeight: 800,
          boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
        }}>
          <ShieldAlert size={14} />
          <span>VIEWING AS: {user?.name?.toUpperCase()} ({user?.user_id})</span>
          <button onClick={() => {
            const adminSession = localStorage.getItem('nvx_admin_backup_session')
            if (adminSession) localStorage.setItem('nvx_admin_session', adminSession)
            localStorage.removeItem('nvx_token'); localStorage.removeItem('nvx_refresh')
            localStorage.removeItem('nvx_user'); localStorage.removeItem('nvx_admin_backup_session')
            localStorage.removeItem('nvx_impersonator')
            window.location.href = '/admin/members'
          }} style={{ background: '#fff', color: '#f97316', border: 'none', padding: '0.25rem 0.75rem', borderRadius: 8, fontSize: '0.6875rem', fontWeight: 900, cursor: 'pointer' }}>
            Back to Admin
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside style={{
        width: 260, flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30,
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.15)',
      }} id="desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} className="fade-in">
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 260,
            boxShadow: '8px 0 40px rgba(0,0,0,0.3)',
          }} className="animate-slide-in-left">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} id="main-content-area">

        {/* Top Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 20,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 2rem', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 0 #e2e8f0, 0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              id="mobile-hamburger"
              style={{
                width: 38, height: 38, background: '#f8fafc',
                border: '1.5px solid #e2e8f0', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#cbd5e1' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0' }}
            >
              <Menu size={18} />
            </button>

            <div id="breadcrumb-area">
              <h2 style={{
                fontSize: '1rem', fontWeight: 800, color: '#0f172a',
                margin: 0, fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginBottom: 3,
              }}>
                {getPageTitle()}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px rgba(16,185,129,0.6)',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Live
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Notifications */}
            <Link to="/dashboard/announcements" style={{
              position: 'relative', width: 38, height: 38,
              background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b', textDecoration: 'none', transition: 'all 0.15s',
            }}>
              <Bell size={17} />
              {announcementCount > 0 && (
                <span style={{
                  position: 'absolute', top: -5, right: -5,
                  minWidth: 18, height: 18, borderRadius: '50%',
                  background: '#ef4444', color: '#fff',
                  fontSize: '0.625rem', fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #f8fafc',
                }}>
                  {announcementCount > 9 ? '9+' : announcementCount}
                </span>
              )}
            </Link>

            {/* User Chip */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              background: '#f8fafc', border: '1.5px solid #e2e8f0',
              borderRadius: 12, padding: '0.3rem 0.875rem 0.3rem 0.375rem',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 900, color: '#fff',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'M'}
              </div>
              <span id="header-userid" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.user_id}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowX: 'hidden', maxWidth: '1400px', width: '100%' }} id="page-main">
          <div className="fade-in-up">
            <Outlet />
          </div>
        </main>

        {/* Footer note */}
        <div style={{
          padding: '1rem 2.5rem',
          borderTop: '1px solid #f1f5f9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }} id="layout-footer">
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
            © 2026 BitLance. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
            Member ID: <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#64748b' }}>{user?.user_id}</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.4); }
        }
        @media (min-width: 1024px) {
          #desktop-sidebar { display: block !important; }
          #main-content-area { margin-left: 260px; }
          #mobile-hamburger { display: none !important; }
        }
        @media (max-width: 1023px) {
          #desktop-sidebar { display: none !important; }
          #breadcrumb-area { display: block; }
          #page-main { padding: 1.25rem !important; }
          #layout-footer { display: none !important; }
        }
        @media (max-width: 640px) {
          #header-userid { display: none !important; }
        }
      `}</style>
    </div>
  )
}
