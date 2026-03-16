import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, Loader2Icon, CreditCardIcon } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (details: {
    name: string;
    email: string;
    paymentId: string;
  }) => void;
}
type Step = 'form' | 'processing';
export function PaymentModal({
  isOpen,
  onClose,
  onSuccess
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>('form');
  const { config, isBDT } = useCurrency();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    }
  }, [isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (isBDT && !formData.phone) return;
    setStep('processing');
    const prefix = isBDT ? 'BK' : '2CO';
    setTimeout(() => {
      const mockPaymentId = `${prefix}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      onSuccess({
        name: formData.name,
        email: formData.email,
        paymentId: mockPaymentId
      });
    }, 3000);
  };
  if (!isOpen) return null;
  const priceLabel = config.price;
  const gatewayName = config.gateway;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={step === 'form' ? onClose : undefined}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        

        {/* Modal Card */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          className="relative w-full max-w-md bg-[#1E293B] ring-1 ring-[#334155] rounded-2xl shadow-2xl overflow-hidden">
          
          {step === 'form' &&
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            
              <XIcon className="w-6 h-6" />
            </button>
          }

          <div className="p-8">
            {step === 'form' ?
            <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Complete Purchase
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Enter your details to proceed to {gatewayName} payment
                    gateway.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                    }
                    className="w-full bg-[#0F172A] ring-1 ring-[#334155] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-accent transition-shadow"
                    placeholder="John Doe" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                    }
                    className="w-full bg-[#0F172A] ring-1 ring-[#334155] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-accent transition-shadow"
                    placeholder="john@example.com" />
                  
                  </div>

                  {isBDT ?
                <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        bKash Account Number
                      </label>
                      <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    })
                    }
                    className="w-full bg-[#0F172A] ring-1 ring-[#334155] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-accent transition-shadow"
                    placeholder="01XXXXXXXXX" />
                  
                    </div> :

                <div className="bg-[#0F172A]/50 ring-1 ring-[#334155] rounded-lg px-4 py-3 flex items-center space-x-3">
                      <CreditCardIcon className="w-5 h-5 text-slate-500 shrink-0" />
                      <p className="text-xs text-slate-400">
                        You'll be redirected to 2Checkout (Verifone) secure
                        checkout to complete your card payment.
                      </p>
                    </div>
                }

                  <div className="pt-4">
                    <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-[#0F172A] font-bold text-lg px-6 py-4 rounded-xl transition-all active:scale-95 flex justify-center items-center space-x-2">
                    
                      <span>Proceed to Payment</span>
                      <span
                      className={`font-bold ${isBDT ? 'font-bengali' : ''}`}>
                      
                        {priceLabel}
                      </span>
                    </button>
                  </div>
                </form>
              </> :

            <div className="py-12 flex flex-col items-center text-center space-y-6">
                {isBDT ?
              <div className="w-20 h-20 bg-[#E2136E] rounded-full flex items-center justify-center ring-4 ring-[#E2136E]/20 mb-4">
                    <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-white fill-current">
                  
                      <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                  
                    </svg>
                  </div> :

              <div className="w-20 h-20 bg-[#3B82F6] rounded-full flex items-center justify-center ring-4 ring-[#3B82F6]/20 mb-4">
                    <CreditCardIcon className="w-10 h-10 text-white" />
                  </div>
              }
                <Loader2Icon className="w-8 h-8 text-accent animate-spin" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Redirecting to {gatewayName}...
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Please do not close this window.
                  </p>
                </div>
              </div>
            }
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

}