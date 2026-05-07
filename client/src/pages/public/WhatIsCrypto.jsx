import { Activity, ShieldCheck, TrendingUp, Cpu, Zap, Globe, Coins, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function WhatIsCrypto() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 0 5rem', 
        background: 'radial-gradient(circle at top right, rgba(13,148,136,0.05), transparent), radial-gradient(circle at bottom left, rgba(59,130,246,0.05), transparent)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', marginBottom: '2rem',
              background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)',
              borderRadius: 9999, color: 'var(--primary)',
              fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              <Globe size={14} /> Future of Finance
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, 
              color: 'var(--text-main)', lineHeight: 1.1, 
              fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.04em', margin: '0 0 1.5rem'
            }}>
              What is <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cryptocurrency?</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Understand the digital revolution that is decentralizing the global financial landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { 
                icon: ShieldCheck, 
                title: 'Decentralized Control', 
                text: 'Unlike traditional currency, crypto operates on a peer-to-peer network, removing the need for central banks or middlemen.',
                color: '#0d9488'
              },
              { 
                icon: Cpu, 
                title: 'Blockchain Technology', 
                text: 'A distributed ledger that records every transaction across thousands of computers, making it nearly impossible to alter or hack.',
                color: '#3b82f6'
              },
              { 
                icon: Zap, 
                title: 'Instant Settlement', 
                text: 'Move value across borders in seconds, 24/7/365, without waiting for bank clearance or traditional business hours.',
                color: '#f59e0b'
              }
            ].map((item, i) => (
              <div key={i} style={{
                padding: '2.5rem', background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 24, transition: 'transform 0.3s ease'
              }}>
                <div style={{ 
                  width: 54, height: 54, background: `${item.color}15`, 
                  borderRadius: 14, display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', marginBottom: '1.5rem', color: item.color 
                }}>
                  <item.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-sub)', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Paradigm Shift */}
      <section style={{ padding: '7rem 0', background: '#fcfdfe', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>The Paradigm Shift</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-sub)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Cryptocurrency is more than just digital money. It is an entirely new infrastructure for trust. It allows for smart contracts, decentralized apps, and a level of transparency that was never possible in traditional finance.
              </p>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  'Immutable Transaction Records',
                  'Universal Access (Banking the Unbanked)',
                  'Limited Supply (Inflation Protection)',
                  'Programmable Value'
                ].map((point, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(13,148,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRight size={14} color="#0d9488" />
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                padding: '3rem', background: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: 40, boxShadow: '0 32px 64px rgba(0,0,0,0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                  <div style={{ width: 54, height: 54, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(245,158,11,0.2)' }}>
                    <Coins size={26} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.375rem', fontWeight: 900, color: 'var(--text-main)' }}>Digital Gold</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 600 }}>Decentralized Store of Value</p>
                  </div>
                </div>
                <div style={{ height: '220px', background: '#f8fafc', borderRadius: 20, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', gap: '0.75rem', border: '1px solid #f1f5f9' }}>
                  {[40, 60, 45, 70, 90, 85, 100].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: '#0d9488', borderRadius: '6px 6px 2px 2px', opacity: 0.2 + (i * 0.12) }} />
                  ))}
                </div>
                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Institutional Adoption Curve
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>Ready to start your journey?</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-sub)', marginBottom: '2.5rem' }}>Join thousands of traders on the most advanced platform.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Get Started Now</Link>
            <Link to="/login" className="btn-secondary" style={{ padding: '1rem 2.5rem' }}>Login to Dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
