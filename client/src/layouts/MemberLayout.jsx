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
  { label: 'Profile Settings', items: [
    { to: '/dashboard/profile',      icon: User,        label: 'My Account'       },
    { to: '/dashboard/wallet-setup', icon: Settings,    label: 'Payout Wallets'   },
    { to: '/dashboard/kyc',          icon: ShieldCheck, label: 'ID Verification'  },
  ]},
  { label: 'Funds & Wallets', items: [
    { to: '/dashboard/topup',          icon: Wallet,      label: 'Deposit Funds'   },
    { to: '/dashboard/topup/history',  icon: DollarSign,  label: 'Deposit Logs'    },
    { to: '/dashboard/funds/history',  icon: HistoryIcon, label: 'Wallet Logs'     },
    { to: '/dashboard/funds/transfer', icon: Send,        label: 'Internal Send'   },
    { to: '/dashboard/funds/activate', icon: Zap,         label: 'Activate Member' },
  ]},
  { label: 'Market Trading', items: [
    { to: '/dashboard/trade',         icon: TrendingUp,   label: 'Start Trading'   },
    { to: '/dashboard/trade/history', icon: TrendingDown, label: 'Trading Logs'    },
  ]},
  { label: 'My Earnings', items: [
    { to: '/dashboard/income-wallet',    icon: DollarSign, label: 'Earning Wallet'   },
    { to: '/dashboard/earnings',         icon: Activity,   label: 'Income Summary'   },
    { to: '/dashboard/earnings/daily',   icon: TrendingUp, label: 'Daily Profits'    },
    { to: '/dashboard/earnings/direct',  icon: User,       label: 'Direct Bonus'     },
    { to: '/dashboard/earnings/level',   icon: Network,    label: 'Level Bonus'      },
    { to: '/dashboard/earnings/reward',  icon: Trophy,     label: 'Reward Bonus'     },
    { to: '/dashboard/earnings/royalty', icon: Award,      label: 'Royalty Bonus'    },
  ]},
  { label: 'My Team',    items: [{ to: '/dashboard/genealogy', icon: Network, label: 'Team Tree' }] },
  { label: 'Withdraw Funds', items: [
    { to: '/dashboard/withdraw',         icon: ArrowUpFromLine, label: 'Cash Out'        },
    { to: '/dashboard/withdraw/history', icon: DollarSign,      label: 'Cash Out Logs'   },
  ]},
  { label: 'Help & Support', items: [
    { to: '/dashboard/tickets',       icon: Ticket,    label: 'Support Chat'    },
    { to: '/dashboard/announcements', icon: Megaphone, label: 'Notice Board'    },
  ]},
]

function SidebarContent({ onClose = () => {} }) {
  const { user, logout } = useAuthStore()
  const [openGroup, setOpenGroup] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)' }}>
      {/* Logo */}
      <div style={{ padding: '1.75rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <img src="/src/assets/images/logo.png" alt="GlobalFX Logo" style={{ height: 44, width: 'auto', alignSelf: 'flex-start' }} />
        <div style={{ fontSize: '0.55rem', fontWeight: 800, color: '#0d9488', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4, marginLeft: 2 }}>TERMINAL v2.4</div>
      </div>

      {/* User Card */}
      <div style={{ padding: '0 1.25rem 1.25rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.125rem', fontWeight: 900, color: '#fff',
            boxShadow: '0 4px 12px rgba(13,148,136,0.3)',
          }}>
            {user?.name?.[0]?.toUpperCase() || 'M'}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Investor'}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: user?.status === 'active' ? '#10b981' : '#ef4444', boxShadow: `0 0 8px ${user?.status === 'active' ? 'rgba(16,185,129,0.6)' : 'rgba(239,68,68,0.6)'}` }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{user?.user_id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.25rem 0.875rem' }} className="custom-scrollbar">
        {NAV_GROUPS.map(({ label, items }) => {
          const isOpen = openGroup === label
          return (
            <div key={label || '_top'} style={{ marginBottom: '0.25rem' }}>
              {label && (
                <button
                  onClick={() => setOpenGroup(isOpen ? null : label)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.625rem 1rem', border: 'none', cursor: 'pointer',
                    background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
                    color: isOpen ? '#fff' : '#cbd5e1',
                    fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em',
                    borderRadius: 10, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = '#cbd5e1' }}
                >
                  <span>{label}</span>
                  <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
              )}
              <div style={{ display: (!label || isOpen) ? 'block' : 'none', paddingLeft: label ? '0.25rem' : '0' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.125rem', marginTop: label ? '0.125rem' : 0 }}>
                  {items.map(({ to, icon: Icon, label: itemLabel }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end={to === '/dashboard' || to === '/dashboard/earnings'}
                        onClick={onClose}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        style={({ isActive }) => ({
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.625rem 1rem', borderRadius: 10,
                          color: isActive ? '#fff' : '#cbd5e1',
                          textDecoration: 'none', fontSize: '0.8125rem', fontWeight: isActive ? 800 : 600,
                          transition: 'all 0.2s',
                        })}
                      >
                        <Icon size={17} strokeWidth={2.5} />
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

      {/* Logout */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', border: 'none', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', color: '#64748b',
            fontSize: '0.875rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#ef4444' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}
        >
          <LogOut size={17} strokeWidth={2.5} />
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
    const path = location.pathname.split('/').filter(Boolean)
    if (path.length === 1) return 'Terminal Overview'
    const last = path[path.length - 1]
    const map = {
      profile: 'Personal Profile', 'wallet-setup': 'Security Assets', kyc: 'Verification',
      topup: 'Capitalize Account', history: 'Transaction History', trade: 'Active Trading',
      'income-wallet': 'Profit Center', earnings: 'Yield Reports', genealogy: 'Alliance Network',
      withdraw: 'Asset Exit', tickets: 'Client Support', announcements: 'System Updates',
      daily: 'Daily Trading Profit', direct: 'Direct Referral Bonus', level: 'Team Level Bonus',
      reward: 'Performance Rewards', royalty: 'Monthly Royalty',
      transfer: 'Wallet Transfer', activate: 'ID Activation',
    }
    return map[last] || last.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      <UrgentAnnouncementPopup />

      {isImpersonating && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: 'linear-gradient(90deg, #f97316, #ef4444)', color: '#fff',
          padding: '0.625rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
          fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.03em',
          boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
        }}>
          <ShieldAlert size={16} />
          <span>IMPERSONATING: {user?.name?.toUpperCase()} ({user?.user_id})</span>
          <button onClick={() => {
            const adminSession = localStorage.getItem('nvx_admin_backup_session')
            if (adminSession) localStorage.setItem('nvx_admin_session', adminSession)
            localStorage.removeItem('nvx_token'); localStorage.removeItem('nvx_refresh')
            localStorage.removeItem('nvx_user'); localStorage.removeItem('nvx_admin_backup_session')
            localStorage.removeItem('nvx_impersonator')
            window.location.href = '/admin/members'
          }} style={{ background: '#fff', color: '#f97316', border: 'none', padding: '0.3rem 0.875rem', borderRadius: 8, fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}>
            EXIT TO ADMIN
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside style={{
        width: 280, flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 30,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
      }} id="desktop-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} className="fade-in">
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 280,
            boxShadow: '8px 0 40px rgba(0,0,0,0.25)',
          }} className="animate-slide-in-left">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} id="main-content-area">
        {/* Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 20,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 2rem', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 0 var(--border-subtle), 0 4px 16px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              id="mobile-hamburger"
              style={{
                width: 40, height: 40, background: '#f8fafc', border: '1.5px solid var(--border-subtle)',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-sub)',
              }}
            >
              <Menu size={20} />
            </button>

            <div id="breadcrumb-area">
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, fontFamily: 'Outfit, sans-serif', lineHeight: 1, marginBottom: 3 }}>
                {getPageTitle()}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>System Online</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <Link to="/dashboard/announcements" style={{
              position: 'relative', width: 40, height: 40,
              background: '#f8fafc', border: '1.5px solid var(--border-subtle)',
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-sub)', textDecoration: 'none', transition: 'background 0.2s',
            }}>
              <Bell size={18} />
              {announcementCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  minWidth: 20, height: 20, borderRadius: '50%',
                  background: '#ef4444', color: '#fff',
                  fontSize: '0.65rem', fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #f8fafc',
                }}>
                  {announcementCount > 9 ? '9+' : announcementCount}
                </span>
              )}
            </Link>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              background: '#f8fafc', border: '1.5px solid var(--border-subtle)',
              borderRadius: 12, padding: '0.375rem 0.875rem 0.375rem 0.5rem',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 900, color: '#fff',
              }}>
                {user?.name?.[0]?.toUpperCase() || 'M'}
              </div>
              <span id="header-userid" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-sub)', fontFamily: 'JetBrains Mono, monospace' }}>
                {user?.user_id}
              </span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '2.5rem', overflowX: 'hidden' }} id="page-main">
          <div className="fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #desktop-sidebar { display: block !important; }
          #main-content-area { margin-left: 280px; }
          #mobile-hamburger { display: none !important; }
        }
        @media (max-width: 1023px) {
          #desktop-sidebar { display: none !important; }
          #breadcrumb-area { display: block; }
          #page-main { padding: 1.25rem !important; }
        }
        @media (max-width: 640px) {
          #header-userid { display: none !important; }
        }
      `}</style>
    </div>
  )
}
