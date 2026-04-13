import React, { useState } from 'react';
import { CurrencyProvider } from './hooks/useCurrency';
import { HeroCard } from './components/HeroCard';
import { WhyLeadHub } from './components/WhyLeadHub';
import { PricingBar } from './components/PricingBar';
import { StickyCTA } from './components/StickyCTA';
import { PaymentModal } from './components/PaymentModal';
import { BDTPaymentNoticeModal } from './components/BDTPaymentNoticeModal';
import { SuccessPage } from './components/SuccessPage';
import { LegalFooter } from './components/LegalFooter';
import { CurrencyModal } from './components/CurrencyModal';
import { CurrencySwitcher } from './components/CurrencySwitcher';
import { CurrencyToggleToast } from './components/CurrencyToggleToast';
import { useCurrency } from './hooks/useCurrency';
type ViewState = 'landing' | 'success';

function AppContent() {
  const { isBDT, setCurrency, setHasSelected } = useCurrency();
  const [view, setView] = useState<ViewState>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBDTNoticeOpen, setIsBDTNoticeOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    name: string;
    email: string;
    paymentId: string;
  } | null>(null);

  const handleOpenCheckout = () => {
    if (isBDT) {
      setIsModalOpen(true);
      return;
    }

    setIsBDTNoticeOpen(true);
  };

  const handleConfirmBDTPayment = () => {
    setCurrency('BDT');
    setHasSelected(true);
    setIsBDTNoticeOpen(false);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = (details: {
    name: string;
    email: string;
    paymentId: string;
  }) => {
    setPaymentDetails(details);
    setIsModalOpen(false);
    setView('success');
  };
  if (view === 'success' && paymentDetails) {
    return <SuccessPage details={paymentDetails} />;
  }
  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-[#F8FAFC] font-sans selection:bg-accent/30 selection:text-accent overflow-x-hidden">
      {/* Subtle background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative flex flex-col items-center">
        <HeroCard />
        <WhyLeadHub />
        <PricingBar onOpenModal={handleOpenCheckout} />
      </main>

      {/* Mobile: inline footer row above sticky CTA. Desktop: each component is fixed-positioned */}
      <div className="flex justify-between items-start px-4 pt-4 pb-24 md:pb-0 md:block">
        <LegalFooter />
        <CurrencySwitcher />
      </div>

      <StickyCTA onOpenModal={handleOpenCheckout} />

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess} />

      <BDTPaymentNoticeModal
        isOpen={isBDTNoticeOpen}
        onClose={() => setIsBDTNoticeOpen(false)}
        onConfirm={handleConfirmBDTPayment}
      />

      <CurrencyModal />
      <CurrencyToggleToast />
    </div>
  );
}

export function App() {
  return (
    <CurrencyProvider>
      <AppContent />
    </CurrencyProvider>
  );
}
