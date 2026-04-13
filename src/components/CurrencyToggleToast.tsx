import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, CheckIcon, SearchIcon, GlobeIcon } from 'lucide-react';
import {
  useCurrency,
  Currency,
  CURRENCY_CONFIG,
  ALL_CURRENCIES,
  FEATURED_CURRENCIES,
  POPULAR_CURRENCIES,
  detectCurrencyByIP } from
'../hooks/useCurrency';
type ToastMode = 'mismatch' | 'confirm' | null;
export function CurrencyToggleToast() {
  const { currency, setCurrency, hasSelected, config } = useCurrency();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mode, setMode] = useState<ToastMode>(null);
  const [detectedCurrency, setDetectedCurrency] = useState<Currency | null>(
    null
  );
  // Dropdown state for "Change Currency" in confirm mode
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const currencyRef = useRef(currency);
  useEffect(() => {
    currencyRef.current = currency;
  }, [currency]);
  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node))
      {
        setDropdownOpen(false);
        setSearch('');
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handler);
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);
  useEffect(() => {
    if (!hasSelected || dismissed) return;
    if (sessionStorage.getItem('leadhub-toggle-dismissed')) return;
    let mounted = true;
    const timer = setTimeout(async () => {
      const detected = await detectCurrencyByIP();
      if (!mounted) return;
      const currentCurrency = currencyRef.current;
      if (detected && detected !== currentCurrency) {
        // IP detected, currency mismatch
        setDetectedCurrency(detected);
        setMode('mismatch');
        setShow(true);
      } else if (!detected) {
        // All APIs failed → show confirmation toast
        setMode('confirm');
        setShow(true);
      }
      // If IP matches session currency → no toast needed
    }, 5000);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [hasSelected, dismissed]);
  // Auto-hide if user manually switches to the detected currency
  useEffect(() => {
    if (
    detectedCurrency &&
    currency === detectedCurrency &&
    show &&
    mode === 'mismatch')
    {
      setShow(false);
      setDismissed(true);
    }
  }, [currency, detectedCurrency, show, mode]);
  const handleDismiss = () => {
    sessionStorage.setItem('leadhub-toggle-dismissed', 'true');
    setShow(false);
    setDismissed(true);
  };
  const handleSwitchLocal = () => {
    if (!detectedCurrency) return;
    setCurrency(detectedCurrency);
    handleDismiss();
  };
  const handleDropdownSelect = (c: Currency) => {
    setCurrency(c);
    setDropdownOpen(false);
    setSearch('');
    handleDismiss();
  };
  const localConfig = detectedCurrency ?
  CURRENCY_CONFIG[detectedCurrency] :
  null;
  // Dropdown groups
  const grouped = [
  {
    label: 'Featured',
    items: FEATURED_CURRENCIES
  },
  {
    label: 'Popular',
    items: POPULAR_CURRENCIES
  },
  {
    label: 'All Currencies',
    items: ALL_CURRENCIES.filter(
      (c) =>
      !FEATURED_CURRENCIES.includes(c) && !POPULAR_CURRENCIES.includes(c)
    )
  }];

  const filteredGroups = search ?
  [
  {
    label: 'Results',
    items: ALL_CURRENCIES.filter((c) => {
      const cfg = CURRENCY_CONFIG[c];
      const q = search.toLowerCase();
      return (
        c.toLowerCase().includes(q) || cfg.name.toLowerCase().includes(q));

    })
  }] :

  grouped;
  return (
    <AnimatePresence>
      {show &&
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }}
        transition={{
          type: 'spring',
          damping: 22,
          stiffness: 280
        }}
        className="fixed bottom-5 left-4 right-4 z-[90] mx-auto w-auto max-w-[360px] md:left-1/2 md:right-auto md:w-[calc(100%-2rem)] md:-translate-x-1/2">
        
          <div className="relative overflow-hidden bg-[#1E293B]/80 backdrop-blur-[15px] border border-slate-700/50 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* === MISMATCH MODE === */}
            {mode === 'mismatch' && localConfig &&
          <>
                <p className="text-[12px] text-[#94A3B8] text-center mb-3 font-medium">
                  Switching to local payment?
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                onClick={handleSwitchLocal}
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 bg-[#0F172A]/80 hover:bg-[#0F172A] border border-accent rounded-xl py-2.5 px-3 transition-colors">
                
                    <span className="flex items-center gap-1.5">
                      <span className="text-base leading-none">
                        {localConfig.flag}
                      </span>
                      <span className="min-w-0 truncate text-[13px] font-bold text-white">
                        {localConfig.symbol} {detectedCurrency}
                      </span>
                    </span>
                  </button>
                  <button
                onClick={handleDismiss}
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 bg-transparent border border-slate-700/60 hover:border-slate-600 rounded-xl py-2.5 px-3 transition-colors">
                
                    <span className="text-base leading-none">
                      {config.flag}
                    </span>
                    <span className="min-w-0 truncate text-[13px] font-medium text-slate-400">
                      {config.symbol} {currency}
                    </span>
                  </button>
                </div>
              </>
          }

            {/* === CONFIRM MODE (IP detection failed) === */}
            {mode === 'confirm' &&
          <>
                <p className="text-[12px] text-[#94A3B8] text-center mb-3 font-medium">
                  Pricing is set to "
                  <span className="text-white font-semibold">{currency}</span>".
                  Is that okay?
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {/* Yes, Perfect */}
                  <button
                onClick={handleDismiss}
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 bg-[#0F172A]/80 hover:bg-[#0F172A] border border-accent rounded-xl py-2.5 px-3 transition-colors">
                
                    <span className="text-[13px] font-bold text-white">
                      Yes, Perfect
                    </span>
                  </button>

                  {/* Change Currency dropdown */}
                  <div className="relative flex-1 min-w-0" ref={dropdownRef}>
                    <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-full min-w-0 flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 transition-colors border ${dropdownOpen ? 'bg-[#0F172A]/80 border-accent' : 'bg-transparent border-slate-700/60 hover:border-slate-600'}`}>
                  
                      <GlobeIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate text-[12px] font-medium text-slate-400">
                        Change
                      </span>
                      <ChevronDownIcon
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  
                    </button>

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {dropdownOpen &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 4,
                      scale: 0.98
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      y: 4,
                      scale: 0.98
                    }}
                    transition={{
                      duration: 0.15
                    }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-[#0F172A]/95 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50">
                    
                          {/* Search */}
                          <div className="px-2.5 pt-2.5 pb-1">
                            <div className="flex items-center gap-1.5 bg-[#1E293B] ring-1 ring-slate-700/50 rounded-lg px-2.5 py-1.5">
                              <SearchIcon className="w-3 h-3 text-slate-500" />
                              <input
                          ref={searchInputRef}
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search..."
                          className="bg-transparent text-[11px] text-white placeholder-slate-500 outline-none w-full" />
                        
                            </div>
                          </div>

                          <div className="max-h-[220px] overflow-y-auto px-1 pb-1 custom-scrollbar">
                            {filteredGroups.map((group) =>
                      <div key={group.label}>
                                {!search &&
                        <p className="text-[9px] uppercase tracking-widest text-slate-500 px-2.5 pt-2 pb-1 font-semibold">
                                    {group.label}
                                  </p>
                        }
                                {group.items.map((c) => {
                          const cfg = CURRENCY_CONFIG[c];
                          const isActive = c === currency;
                          return (
                            <button
                              key={c}
                              onClick={() => handleDropdownSelect(c)}
                              className={`flex items-center justify-between w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${isActive ? 'text-white font-semibold bg-white/5' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}>
                              
                                      <span className="flex items-center gap-1.5">
                                        <span className="text-sm">
                                          {cfg.flag}
                                        </span>
                                        <span>{c}</span>
                                        <span className="text-[10px] text-slate-600">
                                          ({cfg.symbol})
                                        </span>
                                      </span>
                                      {isActive &&
                              <CheckIcon className="w-3 h-3 text-accent" />
                              }
                                    </button>);

                        })}
                              </div>
                      )}
                          </div>
                        </motion.div>
                  }
                    </AnimatePresence>
                  </div>
                </div>
              </>
          }
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
