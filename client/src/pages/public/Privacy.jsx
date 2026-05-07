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

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-12">
         <p className="text-sm font-bold text-primary flex items-center gap-2 italic">
            Your data is handled with institutional-grade security and transparency.
         </p>
      </div>

      <Section title="1. Information We Collect">
        <p>We collect information you provide during registration (name, email, phone number) and information generated through your use of the platform (transaction records, IP address, device data).</p>
      </Section>
      <Section title="2. How We Use Your Information">
        <p>Your data is used to operate your account, process transactions, send notifications, provide customer support, and comply with legal obligations.</p>
      </Section>
      <Section title="3. Data Sharing">
        <p>We do not sell or rent your personal data to third parties. Data may be shared with service providers essential to platform operations under strict confidentiality agreements.</p>
      </Section>
      <Section title="4. Data Security">
        <p>All sensitive data is encrypted using industry-standard protocols. Wallet addresses and passwords are hashed and never stored in plain text.</p>
      </Section>
      <Section title="5. Cookies">
        <p>We use cookies to maintain your session and improve platform performance. You may disable cookies in your browser but this may affect platform functionality.</p>
      </Section>
      <Section title="6. Your Rights">
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at{' '}
          <a href="mailto:support@globalfx.vip" className="text-primary font-bold hover:underline">support@globalfx.vip</a>.
        </p>
      </Section>
      <Section title="7. Contact">
        <p>For privacy-related inquiries, email us at{' '}
          <a href="mailto:support@globalfx.vip" className="text-primary font-bold hover:underline">support@globalfx.vip</a>.
        </p>
      </Section>
    </LegalPage>
  )
}
