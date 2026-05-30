import LegalPage from '../../components/public/LegalPage'

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

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-12">
         <p className="text-sm font-bold text-primary flex items-center gap-2 italic">
            Please review these terms carefully as they govern your relationship with BitLance.
         </p>
      </div>

      <Section title="1. Acceptance">
        <p>By registering an account on BitLance, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
      </Section>
      <Section title="2. Eligibility">
        <p>You must be 18 years or older to use BitLance. By registering, you confirm you meet this requirement and that your use is lawful in your jurisdiction.</p>
      </Section>
      <Section title="3. Account Responsibility">
        <p>You are responsible for maintaining the confidentiality of your login credentials and transaction PIN. BitLance is not liable for losses resulting from unauthorized account access.</p>
      </Section>
      <Section title="4. Deposits & Withdrawals">
        <p>Deposits must be made in USDT (BEP20). Withdrawal requests are processed within 24 hours subject to verification. A processing fee applies to all withdrawals.</p>
      </Section>
      <Section title="5. Referral Program">
        <p>Referral bonuses are earned when referred members activate investment packages. Fraudulent referral activity will result in account termination and forfeiture of all balances.</p>
      </Section>
      <Section title="6. Prohibited Activities">
        <p>Money laundering, fraud, market manipulation, and multi-accounting are strictly prohibited and will result in permanent account suspension.</p>
      </Section>
      <Section title="7. Termination">
        <p>BitLance reserves the right to terminate any account that violates these terms, with or without notice.</p>
      </Section>
      <Section title="8. Governing Law">
        <p>These terms are governed by applicable international financial regulations. Disputes shall be resolved through binding arbitration.</p>
      </Section>
    </LegalPage>
  )
}
