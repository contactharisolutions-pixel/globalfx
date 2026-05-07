import { useEffect, useRef } from 'react'
import { Activity, TrendingUp, Cpu, Maximize2 } from 'lucide-react'

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
    // Clear previous content on re-render
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
      timezone: 'Asia/Kolkata',
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
      style={{ height: '600px !important', minHeight: '600px !important', maxHeight: '600px !important', width: '100%' }}
    >
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
    </div>
  )
}

export default function LiveMarketSection() {
  return (
    <section id="markets" style={{ padding: '5rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Dot-grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }} id="markets-header">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem', marginBottom: '1.25rem',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 9999, color: '#059669',
              fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              <Activity size={13} style={{ animation: 'pulse 2s infinite' }} /> Live Market Feed
            </div>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900,
              color: 'var(--text-main)', lineHeight: 1.15,
              fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', margin: 0,
            }}>
              Institutional Grade <br />
              <span style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Charting & Data
              </span>
            </h2>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-sub)', lineHeight: 1.75, margin: '1rem 0 0', maxWidth: '36rem' }}>
              Our proprietary neural network analyzes global markets in real-time. Use the same tools as our AI agents to track performance and market trends.
            </p>
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', minWidth: 200 }} id="markets-stats">
            {[
              { icon: TrendingUp, label: '99.9% Uptime',    sub: 'Real-time Feed',    bg: 'rgba(13,148,136,0.08)',  color: '#0d9488' },
              { icon: Cpu,        label: 'AI Optimized',    sub: 'Neural Execution',  bg: 'rgba(59,130,246,0.08)', color: '#3b82f6' },
            ].map(({ icon: Icon, label, sub, bg, color }) => (
              <div key={label} style={{
                padding: '1rem 1.25rem', background: '#f8fafc',
                borderRadius: 20, border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ width: 38, height: 38, background: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 900, fontSize: '0.875rem', color: 'var(--text-main)', margin: 0 }}>{label}</p>
                  <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Card */}
        <div style={{
          background: '#ffffff', border: '1.5px solid #e2e8f0',
          borderRadius: 32, boxShadow: '0 24px 64px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>
          {/* Terminal header bar */}
          <div style={{
            padding: '0.875rem 1.5rem', background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['#fca5a5', '#fde68a', '#86efac'].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Terminal v2.4 — BTC/USDT
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.7rem', fontWeight: 800, color: '#10b981' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }} />
                WebSocket Connected
              </span>
              <Maximize2 size={15} style={{ color: '#94a3b8', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Chart */}
          <TradingViewChart />

          {/* Ticker */}
          <TradingViewTicker />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @media (max-width: 1023px) { #markets-header { grid-template-columns: 1fr !important; } }
        @media (max-width: 639px)  { #markets-stats  { display: none !important; } }
      `}</style>
    </section>
  )
}
