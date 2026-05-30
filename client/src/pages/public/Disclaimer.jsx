import LegalPage from '../../components/public/LegalPage'
import { ShieldAlert } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-10 group">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-6 bg-primary rounded-full transition-transform group-hover:scale-y-125" />
      <h2 className="text-xl font-black text-text-main tracking-tight uppercase text-xs tracking-widest">{title}</h2>
    </div>
    <div className="text-text-sub font-medium leading-relaxed pl-4.5 border-l border-slate-100 space-y-4">
      {children}
    </div>
  </div>
)

export default function Disclaimer() {
  return (
    <LegalPage title="Risk Disclaimer">
      <div className="bg-warning/10 border border-warning/20 rounded-2xl p-6 mb-12 flex items-start gap-4">
         <ShieldAlert className="text-warning flex-shrink-0" size={24} />
         <p className="text-sm font-bold text-warning-700 leading-relaxed italic">
            ⚠️ IMPORTANT: Please read this disclaimer in its entirety before deploying any capital. All trading involves substantial risk of loss.
         </p>
      </div>

      <Section title="1. Investment Risk">
        <p>All forms of investment, including Crypto and Forex trading, carry substantial risk of loss. Past performance is not indicative of future results. You may lose some or all of your invested capital.</p>
      </Section>
      <Section title="2. No Guaranteed Returns">
        <p>While BitLance strives to deliver consistent returns through professional trading, no returns are guaranteed. Market conditions can result in periods of reduced or no profit distribution.</p>
      </Section>
      <Section title="3. Not Financial Advice">
        <p>Nothing on this platform constitutes financial, investment, legal, or tax advice. You should consult with a qualified financial advisor before making investment decisions.</p>
      </Section>
      <Section title="4. Cryptocurrency Risks">
        <p>Cryptocurrency markets are highly volatile and unregulated in many jurisdictions. Exchange rates and market conditions can change rapidly and unpredictably.</p>
      </Section>
      <Section title="5. Regulatory Compliance">
        <p>It is your responsibility to ensure that your participation in this platform complies with the laws and regulations of your country of residence. BitLance does not guarantee availability or legality of its services in all jurisdictions.</p>
      </Section>
      <Section title="6. Only Risk Capital">
        <p>We strongly recommend only investing funds you can afford to lose. Never invest money needed for essential living expenses, emergency funds, or borrowed capital.</p>
      </Section>
    </LegalPage>
  )
}
