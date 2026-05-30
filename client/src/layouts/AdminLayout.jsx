import { useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, CreditCard, ArrowUpFromLine, ShieldCheck,
  Ticket, Megaphone, Settings, FileBarChart, LogOut, Menu,
  TrendingUp, ChevronRight, Shield, Activity, Network, Bell, X,
} from 'lucide-react'
import useAdminStore from '../store/useAdminStore'

const NAV_GROUPS = [
  {
    label: null,
    items: [{ to: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true }]
  },
  {
    label: 'User Management',
    items: [
      { to: '/admin/members',     icon: Users,           label: 'Members'        },
      { to: '/admin/kyc',         icon: ShieldCheck,     label: 'KYC Verification'},
    ]
  },
  {
    label: 'Finance',
    items: [
      { to: '/admin/deposits',    icon: CreditCard,      label: 'Deposits'       },
      { to: '/admin/withdrawals', icon: ArrowUpFromLine, label: 'Withdrawals'    },
      { to: '/admin/income-reports', icon: Activity,     label: 'Income Audit'   },
    ]
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/tickets',      icon: Ticket,         label: 'Support Tickets'},
      { to: '/admin/announcements',icon: Megaphone,      label: 'Broadcasts'     },
      { to: '/admin/genealogy',    icon: Network,        label: 'Network Tree'   },
    ]
  },
  {
    label: 'System',
    items: [
      { to: '/admin/reports',  icon: FileBarChart, label: 'Export Hub'      },
      { to: '/admin/settings', icon: Settings,     label: 'Configuration'   },
    ]
  },
]

function Sidebar({ onClose = () => {} }) {
  const { admin, logout } = useAdminStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(180deg, #020617 0%, #0b1120 60%, #0f172a 100%)' }}>
      {/* Logo */}
      <div style={{ padding: '1.5rem 1.5rem 1.125rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/admin" onClick={onClose} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 0.875rem',
            background: '#ffffff',
            borderRadius: 14,
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          }}>
            <img
              src="/bitlance-logo.png"
              alt="BitLance"
              style={{ height: 36, width: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ fontSize: '0.55rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', marginLeft: 2, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Shield size={8} style={{ color: '#f97316' }} />
            <span style={{ color: '#f97316' }}>Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Admin Profile Card */}
      <div style={{ padding: '1rem 1.25rem 0.75rem' }}>
        <div style={{
          padding: '0.875rem 1rem', borderRadius: 14,
          background: 'rgba(249,115,22,0.06)',
          border: '1px solid rgba(249,115,22,0.12)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #f97316, #dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem', fontWeight: 900, color: '#fff',
            boxShadow: '0 4px 12px rgba(249,115,22,0.35)',
          }}>
            {admin?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {admin?.name || 'Administrator'}
            </p>
            <p style={{ fontSize: '0.6rem', color: '#f97316', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>
              {admin?.role || 'Superuser'} ·{' '}
              <span style={{ color: '#10b981' }}>● Online</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.875rem' }} className="custom-scrollbar">
        {NAV_GROUPS.map(({ label, items }) => (
          <div key={label || '_top'} style={{ marginBottom: '0.5rem' }}>
            {label && (
              <p style={{
                fontSize: '0.6rem', fontWeight: 900, color: '#64748b',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                padding: '0.625rem 0.625rem 0.25rem',
                margin: 0,
              }}>
                {label}
              </p>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
              {items.map(({ to, icon: Icon, label: itemLabel, exact }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={exact}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 10,
                      color: isActive ? '#fff' : '#cbd5e1',
                      background: isActive ? 'rgba(249,115,22,0.2)' : 'transparent',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      border: isActive ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent',
                    })}
                    onMouseEnter={e => {
                      if (!e.currentTarget.style.background.includes('rgba(249')) {
                        e.currentTarget.style.color = '#fff'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!e.currentTarget.style.background.includes('rgba(249')) {
                        e.currentTarget.style.color = '#cbd5e1'
                        e.currentTarget.style.background = ''
                      }
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                    <span>{itemLabel}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.625rem 0.875rem', border: 'none', borderRadius: 10, cursor: 'pointer',
            background: 'transparent', color: '#94a3b8',
            fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569' }}
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin } = useAdminStore()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname.replace('/admin', '').split('/').filter(Boolean)
    if (!path.length) return 'System Overview'
    const map = {
      members: 'Member Directory', deposits: 'Deposit Management', withdrawals: 'Withdrawal Queue',
      kyc: 'KYC Verification', tickets: 'Support Center', announcements: 'System Broadcasts',
      settings: 'Configuration', reports: 'Export Hub', 'income-reports': 'Income Audit',
      genealogy: 'Network Tree',
    }
    return map[path[0]] || path[0].replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#060b17' }}>

      {/* Desktop Sidebar */}
      <aside style={{
        width: 260, flexShrink: 0, position: 'fixed',
        top: 0, bottom: 0, left: 0, zIndex: 30,
        borderRight: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
        display: 'none',
      }} id="admin-desktop-sidebar">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} className="fade-in">
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 260,
            borderRight: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '8px 0 40px rgba(0,0,0,0.4)',
          }} className="animate-slide-in-left">
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
              <button onClick={() => setSidebarOpen(false)} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, color: '#94a3b8', cursor: 'pointer', padding: '0.4rem',
                display: 'flex',
              }}>
                <X size={16} />
              </button>
            </div>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} id="admin-main-area">

        {/* Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 20,
          background: 'rgba(6,11,23,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '0 1.75rem', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              id="admin-hamburger"
              style={{
                width: 38, height: 38,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b',
              }}
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} id="admin-breadcrumb">
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.3rem 0.75rem',
                background: 'rgba(249,115,22,0.08)',
                border: '1px solid rgba(249,115,22,0.15)',
                borderRadius: 8,
              }}>
                <Shield size={11} style={{ color: '#f97316' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Admin</span>
              </div>
              <ChevronRight size={12} style={{ color: '#334155' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Header Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Live Indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.35rem 0.875rem',
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.15)',
              borderRadius: 8,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)', animation: 'admin-pulse 2s infinite' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live</span>
            </div>

            {/* Admin Identity */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, padding: '0.375rem 0.875rem 0.375rem 0.5rem',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #f97316, #dc2626)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 900, color: '#fff',
              }}>
                {admin?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <span id="admin-email-display" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                {admin?.email}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '2.25rem', overflowX: 'hidden', background: '#060b17' }} id="admin-page-main">
          <div className="fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #admin-desktop-sidebar { display: block !important; }
          #admin-main-area { margin-left: 260px; }
          #admin-hamburger { display: none !important; }
        }
        @media (max-width: 1023px) {
          #admin-breadcrumb { display: flex; }
          #admin-page-main { padding: 1.25rem !important; }
          #admin-email-display { display: none !important; }
        }
        @keyframes admin-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
