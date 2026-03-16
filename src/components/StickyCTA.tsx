import React from 'react';
import { motion } from 'framer-motion';
import { useCurrency } from '../hooks/useCurrency';
interface StickyCTAProps {
  onOpenModal: () => void;
}
export function StickyCTA({ onOpenModal }: StickyCTAProps) {
  const { config, isBDT } = useCurrency();
  return (
    <motion.div
      initial={{
        y: 100
      }}
      animate={{
        y: 0
      }}
      transition={{
        delay: 1,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1E293B]/95 backdrop-blur-lg ring-1 ring-[#334155] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] px-4 py-4 pb-safe">
      
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-slate-400 text-xs uppercase tracking-wider">
            Total Price
          </span>
          <span
            className={`text-2xl font-bold text-white ${isBDT ? 'font-bengali' : ''}`}>
            
            {config.price}
          </span>
        </div>
        <button
          onClick={onOpenModal}
          className="flex-1 bg-accent hover:bg-accent/90 text-[#0F172A] font-bold py-3 px-4 rounded-xl transition-all active:scale-95 text-center">
          
          Get Access Now
        </button>
      </div>
    </motion.div>);

}