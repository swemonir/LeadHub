import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExternalLinkIcon, DownloadIcon } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
interface SuccessPageProps {
  details: {
    name: string;
    email: string;
    paymentId: string;
  };
}
export function SuccessPage({ details }: SuccessPageProps) {
  const [countdown, setCountdown] = useState(5);
  const { config, isBDT } = useCurrency();
  const driveUrl =
  'https://drive.google.com/drive/folders/1sCwxkGdQg608gJhv_zq03IlZ5OEdLMXH?usp=sharing';
  useEffect(() => {
    if (countdown <= 0) {
      window.open(driveUrl, '_blank');
      return;
    }
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0F172A]">
      
      <div className="w-full max-w-md bg-[#1E293B] ring-1 ring-[#334155] rounded-2xl p-5 md:p-7 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-[#22C55E]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              delay: 0.2
            }}
            className="w-14 h-14 bg-[#22C55E]/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-[#22C55E]/50">
            
            <CheckCircleIcon className="w-7 h-7 text-[#22C55E]" />
          </motion.div>

          <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
            Payment Successful!
          </h1>
          <p className="text-base text-slate-300 mb-5">
            Your payment has been completed successfully.
          </p>

          <div className="w-full bg-[#0F172A] ring-1 ring-[#334155] rounded-lg p-4 mb-5 text-left space-y-2.5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 ring-b ring-[#334155]">
              Receipt Details
            </h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Name</span>
              <span className="text-white font-medium">{details.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Email</span>
              <span className="text-white font-medium text-xs">
                {details.email}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Payment ID</span>
              <span className="text-white font-mono text-xs">
                {details.paymentId}
              </span>
            </div>
            <div
              className="flex justify-between items-center pt-2"
              style={{
                borderTop: '1px solid rgba(51,65,85,0.5)'
              }}>
              
              <span className="text-slate-400 text-sm">Amount Paid</span>
              <span
                className={`text-[#FACC15] font-bold text-base ${isBDT ? 'font-bengali' : ''}`}>
                
                {config.price}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-5 w-full">
            <div className="flex items-start space-x-2 text-left bg-[#22C55E]/10 ring-1 ring-[#22C55E]/20 rounded-lg p-3">
              <DownloadIcon className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300">
                A confirmation email with your Google Drive access link has been
                sent to <strong className="text-white">{details.email}</strong>.
              </p>
            </div>
            <p className="text-[10px] text-slate-500">
              Your details have been securely logged to our records.
            </p>
          </div>

          <div className="w-full space-y-3">
            <p className="text-[#22C55E] text-sm font-medium animate-pulse">
              Redirecting to Google Drive in {countdown} seconds...
            </p>
            <button
              onClick={() => window.open(driveUrl, '_blank')}
              className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 text-sm">
              
              <span>Access Google Drive Now</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}