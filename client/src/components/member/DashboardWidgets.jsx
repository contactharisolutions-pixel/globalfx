import React, { useEffect, useRef, memo } from 'react'

// --- Advanced Real-Time Chart ---
export const ForexLiveGraph = memo(({ symbol = "BITSTAMP:BTCUSD" }) => {
  const container = useRef()

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''
      const widgetDiv = document.createElement('div')
      widgetDiv.className = 'tradingview-widget-container__widget'
      widgetDiv.style.height = '100%'
      widgetDiv.style.width = '100%'
      container.current.appendChild(widgetDiv)

      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "backgroundColor": "#ffffff",
        "gridColor": "#f1f5f9",
        "support_host": "https://www.tradingview.com"
      })
      container.current.appendChild(script)
    }
  }, [symbol])

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "500px", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  )
})

// --- Capital Hub (Ticker Widget) ---
export const CapitalHubTicker = memo(() => {
  const container = useRef()

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
      script.type = "text/javascript"
      script.async = true
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
          { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "light",
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "en"
      })
      container.current.appendChild(script)
    }
  }, [])

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  )
})
