import { useEffect, useRef } from 'react'
import { Activity, TrendingUp, BarChart2, Maximize2, Globe } from 'lucide-react'

function TradingViewTicker() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'BITSTAMP:BTCUSD',  title: 'Bitcoin'   },
        { proName: 'BITSTAMP:ETHUSD',  title: 'Ethereum'  },
        { proName: 'FX_IDC:EURUSD',    title: 'EUR/USD'   },
        { proName: 'OANDA:XAUUSD',     title: 'Gold'      },
        { proName: 'BINANCE:SOLUSDT',  title: 'Solana'    },
        { proName: 'FOREXCOM:SPX500',  title: 'S&P 500'   },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'light',
      locale: 'en',
    })
    ref.current.appendChild(script)
  }, [])

  return (
    <div
      className="tradingview-widget-container"
      ref={ref}
      style={{ width: '100%', borderTop: '1px solid #e2e8f0' }}
    >
      <div className="tradingview-widget-container__widget" />
    </div>
  )
}

function TradingViewChart() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    widgetDiv.style.height = 'calc(100% - 32px)'
    widgetDiv.style.width = '100%'
    ref.current.appendChild(widgetDiv)

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'BINANCE:BTCUSDT',
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      backgroundColor: '#ffffff',
      gridColor: 'rgba(241,245,249,1)',
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      support_host: 'https://www.tradingview.com',
    })
    ref.current.appendChild(script)
  }, [])

  return (
    <div
      className="tradingview-widget-container"
      ref={ref}
      style={{ height: '600px', width: '100%' }}
    >
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
    </div>
  )
}

export default function LiveMarketSection() {
  return (
    <section id="markets" style={{ padding: '6rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)', clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)', opacity: 0.5, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'flex-end', marginBottom: '4rem' }} id="markets-header">
          <div style={{ maxWidth: 640 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 1rem', marginBottom: '1.5rem',
              background: '#f0fdfa', border: '1.5px solid rgba(13,148,136,0.2)',
              borderRadius: 9999, color: '#0d9488',
              fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              <Activity size={14} style={{ animation: 'pulse-live 2s infinite' }} /> Live Market Feed
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900,
              color: '#0f172a', lineHeight: 1.15,
              fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', margin: 0,
            }}>
              Professional Market <br />
              <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Analysis & Tracking
              </span>
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: 1.8, margin: '1.25rem 0 0', fontWeight: 500 }}>
              Stay ahead of the curve with real-time data from global exchanges. We use these same tools to manage your investments and ensure consistent daily returns.
            </p>
          </div>

          {/* Side Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 240 }} id="markets-stats">
            {[
              { icon: TrendingUp, label: '99.9% Accuracy',  sub: 'Live Data Feed',   color: '#0d9488', bg: '#f0fdfa' },
              { icon: Globe,      label: '2.0% Daily',      sub: 'Consistent Profit', color: '#3b82f6', bg: '#eff6ff' },
            ].map(({ icon: Icon, label, sub, color, bg }) => (
              <div key={label} style={{
                padding: '1.125rem 1.25rem', background: '#ffffff',
                borderRadius: 20, border: '1.5px solid #e2e8f0',
                display: 'flex', alignItems: 'center', gap: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              }}>
                <div style={{ width: 44, height: 44, background: bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${color}20` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#0f172a', margin: 0 }}>{label}</p>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Card */}
        <div style={{
          background: '#ffffff', border: '1.5px solid #e2e8f0',
          borderRadius: 32, boxShadow: '0 32px 80px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          {/* Header Bar */}
          <div style={{
            padding: '1rem 1.5rem', background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['#fca5a5', '#fde68a', '#86efac'].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Live Terminal — Global Markets
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 10px rgba(16,185,129,0.7)', animation: 'pulse-live 2s infinite' }} />
                Server Online
              </span>
              <Maximize2 size={16} style={{ color: '#94a3b8', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Chart Area */}
          <div style={{ background: '#ffffff', height: 600 }}>
             <TradingViewChart />
          </div>

          {/* Ticker Tape */}
          <TradingViewTicker />
        </div>
      </div>

      <style>{`
        @keyframes pulse-live { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } }
        @media (max-width: 1023px) { #markets-header { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #markets-stats  { display: none !important; } }
      `}</style>
    </section>
  )
}
