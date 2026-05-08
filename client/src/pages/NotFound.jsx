import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 text-center max-w-2xl">
        <div className="relative inline-block mb-12">
           <div className="text-[180px] lg:text-[240px] font-black leading-none text-slate-100 select-none">404</div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <h1 className="text-4xl lg:text-6xl font-black text-text-main tracking-tight">Page Not Found</h1>
           </div>
        </div>
        
        <p className="text-xl text-text-sub font-medium leading-relaxed mb-12 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Please return to our homepage or go back to the previous page.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link to="/" className="btn-primary !px-10 !py-4 w-full sm:w-auto">
              <Home size={20} /> Go to Homepage
           </Link>
           <button onClick={() => window.history.back()} className="btn-secondary !px-10 !py-4 w-full sm:w-auto">
              <ArrowLeft size={20} /> Go Back
           </button>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-center gap-4 opacity-40 grayscale">
           <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Binance_logo.svg" alt="Binance" className="h-6" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin" className="h-6" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" alt="Ethereum" className="h-6" />
        </div>
      </div>
    </div>
  )
}
