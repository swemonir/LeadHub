import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BDTPaymentNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function BDTPaymentNoticeModal({
  isOpen,
  onClose,
  onConfirm
}: BDTPaymentNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#1E293B] ring-1 ring-[#334155] shadow-2xl"
        >
          <div className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Payment Notice
            </h2>
            <p className="mb-8 text-sm text-slate-400">
              Now you can pay in BDT.
            </p>

            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-xl bg-accent px-6 py-4 text-lg font-bold text-[#0F172A] transition-all active:scale-95 hover:bg-accent/90"
            >
              OK
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
