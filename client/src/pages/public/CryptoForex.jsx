import { Activity, TrendingUp, BarChart3, Repeat, Zap, Layers, ArrowUpRight, Globe, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function CryptoForex() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: '#ffffff' }}>
      {/* Hero */}
      <section style={{ 
        padding: '10rem 0 6rem', 
        background: 'linear-gradient(135deg, rgba(13,148,136,0.03) 0%, rgba(59,130,246,0.03) 100%)',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1.25rem', marginBottom: '2rem',
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 9999, color: '#3b82f6',
                fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'
              }}>
                <Repeat size={14} /> Hybrid Markets
              </div>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, 
                color: 'var(--text-main)', lineHeight: 1.1, 
                fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em', margin: '0 0 1.5rem'
              }}>
                Where <span style={{ color: '#0d9488' }}>Crypto</span> Meets <span style={{ color: '#3b82f6' }}>Forex</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                Leverage the volatility of cryptocurrencies with the liquidity of traditional Forex markets in one unified platform.
              </p>
              <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Start Trading Hybrid</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                background: '#fff', padding: '2rem', borderRadius: 32, 
                border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>LIVE_TRADING_VIEW</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <Activity size={18} color="#0d9488" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 800 }}>BTC/USD</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>$82,450.00</div>
                    <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 700 }}>+2.45%</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <Globe size={18} color="#3b82f6" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 800 }}>EUR/USD</span>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>$1.08542</div>
                    <div style={{ fontSize: '0.875rem', color: '#ef4444', fontWeight: 700 }}>-0.12%</div>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', height: 100, background: 'rgba(13,148,136,0.05)', borderRadius: 16, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                  <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', stroke: '#0d9488', strokeWidth: 3, fill: 'none' }}>
                    <path d="M0,80 Q50,70 100,85 T200,60 T300,40 T400,20" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>Bridging the Gap</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-sub)', maxWidth: '700px', margin: '0 auto' }}>GlobalFX provides the tools to navigate both high-volatility crypto assets and high-liquidity currency pairs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div style={{ padding: '3rem', background: '#f8fafc', borderRadius: 32, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 60, height: 60, background: '#0d948815', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#0d9488' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Cryptocurrency Trading</h3>
              <ul style={{ display: 'grid', gap: '1rem', listStyle: 'none', padding: 0 }}>
                {[
                  '24/7 Market Availability',
                  'Exponential Growth Potential',
                  'Direct Wallet Settlements',
                  'Decentralized Assets'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--text-sub)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0d9488' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '3rem', background: '#f8fafc', borderRadius: 32, border: '1px solid #e2e8f0' }}>
              <div style={{ width: 60, height: 60, background: '#3b82f615', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: '#3b82f6' }}>
                <Globe size={32} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Traditional Forex</h3>
              <ul style={{ display: 'grid', gap: '1rem', listStyle: 'none', padding: 0 }}>
                {[
                  'Deep Market Liquidity',
                  'Stable Economic Indicators',
                  'Institutional Backing',
                  'Global Macro Dynamics'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--text-sub)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section style={{ padding: '7rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ background: '#ffffff', borderRadius: 40, padding: '5rem', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { icon: Zap, title: 'Speed', text: 'Sub-millisecond execution' },
                { icon: Layers, title: 'Leverage', text: 'Up to 1:100 on hybrid pairs' },
                { icon: BarChart3, title: 'Analytics', text: 'Real-time neural signals' },
                { icon: ShieldCheck, title: 'Security', text: 'Multi-sig asset storage' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 20 }}>
                  <item.icon size={24} style={{ color: '#0d9488', marginBottom: '1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 800 }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', fontFamily: 'Outfit, sans-serif' }}>Unified Performance</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: '2rem' }}>
                Why choose between stability and growth? Our platform allows you to hedge crypto positions with Forex pairs or use stablecoins to fund your high-leverage currency trades. One account, total market access.
              </p>
              <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>
                View All Available Pairs <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
