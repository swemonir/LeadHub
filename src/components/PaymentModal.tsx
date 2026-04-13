import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, Loader2Icon, CreditCardIcon } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
import { sendLeadToGoogleSheets } from '../lib/googleSheets';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (details: {
    name: string;
    email: string;
    paymentId: string;
  }) => void;
}
type Step = 1 | 2 | 3;
const BKASH_PAYMENT_NUMBER = '01844909222';
export function PaymentModal({
  isOpen,
  onClose,
  onSuccess
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>(1);
  const { config } = useCurrency();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    senderNumber: '',
    transactionId: '',
    paymentMethod: 'bKash',
    otherMethod: ''
  });
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        name: '',
        email: '',
        senderNumber: '',
        transactionId: '',
        paymentMethod: 'bKash',
        otherMethod: ''
      });
      setSubmitError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);
  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!formData.senderNumber) return;
    setSubmitError('');
    setStep(2);
  };
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.transactionId) return;
    setSubmitError('');
    setIsSubmitting(true);
    setStep(3);
    try {
      await sendLeadToGoogleSheets({
        name: formData.name,
        email: formData.email,
        senderNumber: formData.senderNumber,
        transactionId: formData.transactionId,
        paymentMethod: formData.paymentMethod,
        paymentNumber: BKASH_PAYMENT_NUMBER,
        price: config.price
      });
      onSuccess({
        name: formData.name,
        email: formData.email,
        paymentId: formData.transactionId
      });
    } catch (error) {
      setStep(2);
      setSubmitError(error instanceof Error ? error.message : 'Could not submit your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  const priceLabel = config.price;
  const gatewayName = 'bKash';
  const isProcessing = step === 3 && isSubmitting;
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
          onClick={step !== 3 ? onClose : undefined}
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
          
          {step !== 3 &&
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            
              <XIcon className="w-6 h-6" />
            </button>
          }

          <div className="p-8">
            {step === 1 ?
            <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Complete Purchase
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Enter your details to continue with manual {gatewayName} payment.
                  </p>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-accent" />
                  <div className="h-2 flex-1 rounded-full bg-[#334155]" />
                  <div className="h-2 flex-1 rounded-full bg-[#334155]" />
                </div>

                <form onSubmit={handleStepOneSubmit} className="space-y-4">
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

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Sender Number
                    </label>
                    <input
                    type="tel"
                    required
                    value={formData.senderNumber}
                    onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderNumber: e.target.value
                    })
                    }
                    className="w-full bg-[#0F172A] ring-1 ring-[#334155] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-accent transition-shadow"
                    placeholder="01XXXXXXXXX" />
                  
                  </div>

                  {submitError ?
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {submitError}
                    </div> :
                null}

                  <div className="pt-4">
                    <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-[#0F172A] font-bold text-lg px-6 py-4 rounded-xl transition-all active:scale-95 flex justify-center items-center space-x-2">
                    
                      <span>Continue</span>
                      <span className="font-bold font-bengali">{priceLabel}</span>
                    </button>
                  </div>
                </form>
              </> : step === 2 ?
            <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Payment Details
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Send money to the number below, then submit your transaction details.
                  </p>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-accent" />
                  <div className="h-2 flex-1 rounded-full bg-accent" />
                  <div className="h-2 flex-1 rounded-full bg-[#334155]" />
                </div>

                <div className="mb-5 rounded-xl bg-[#0F172A] ring-1 ring-[#334155] p-4 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">Send Money Number</p>
                      <p className="text-2xl font-bold text-white">{BKASH_PAYMENT_NUMBER}</p>
                    </div>
                    <div className="rounded-full bg-[#E2136E]/15 px-3 py-1 text-sm font-semibold text-[#F472B6]">
                      bKash
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#1E293B] px-4 py-3 text-sm text-slate-300">
                    <p>Method: <span className="font-semibold text-white">Send Money</span></p>
                    <p>Amount: <span className="font-semibold text-white">{priceLabel}</span></p>
                    <p>After payment, enter your Transaction ID below.</p>
                  </div>
                </div>

                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-[#E2136E] px-3 py-3 text-sm font-semibold text-white ring-1 ring-[#E2136E]">
                        bKash
                      </button>
                      <button
                        type="button"
                        disabled
                        className="rounded-lg bg-[#0F172A] px-3 py-3 text-sm text-slate-500 ring-1 ring-[#334155] cursor-not-allowed">
                        Nagad
                      </button>
                      <button
                        type="button"
                        disabled
                        className="rounded-lg bg-[#0F172A] px-3 py-3 text-sm text-slate-500 ring-1 ring-[#334155] cursor-not-allowed">
                        Other
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Nagad and other payment methods are under development.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.transactionId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transactionId: e.target.value
                        })
                      }
                      className="w-full bg-[#0F172A] ring-1 ring-[#334155] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-accent transition-shadow"
                      placeholder="Enter your bKash transaction ID" />
                  </div>

                  {submitError ?
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {submitError}
                    </div> :
                    null}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-xl bg-[#0F172A] px-6 py-4 text-sm font-bold text-slate-200 ring-1 ring-[#334155] transition-all hover:bg-[#162033]">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-accent hover:bg-accent/90 text-[#0F172A] font-bold text-lg px-6 py-4 rounded-xl transition-all active:scale-95 flex justify-center items-center space-x-2">
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                    </button>
                  </div>
                </form>
              </> :
            <div className="py-12 flex flex-col items-center text-center space-y-6">
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
                  </div>
                <Loader2Icon className="w-8 h-8 text-accent animate-spin" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isProcessing ? 'Submitting Your Request...' : 'Submission Complete'}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {isProcessing ? 'Saving your payment details. Please do not close this window.' : 'Your payment details have been recorded.'}
                  </p>
                </div>
              </div>
            }
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

}
