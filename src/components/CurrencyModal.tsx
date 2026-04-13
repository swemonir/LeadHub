import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  CheckIcon,
  SearchIcon,
  ArrowRightIcon,
  XIcon } from
'lucide-react';
import {
  useCurrency,
  Currency,
  CURRENCY_CONFIG,
  ALL_CURRENCIES,
  FEATURED_CURRENCIES,
  POPULAR_CURRENCIES,
  detectCurrencyByIP } from
'../hooks/useCurrency';
export function CurrencyModal() {
  const { hasSelected, setCurrency, setHasSelected } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [detectedCurrency, setDetectedCurrency] = useState<Currency | null>(
    null
  );
  const [isDetecting, setIsDetecting] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // IP-based currency detection (Cloudflare primary, cached per session)
  useEffect(() => {
    if (hasSelected) return;
    let mounted = true;
    const detect = async () => {
      const detected = await detectCurrencyByIP();
      if (!mounted) return;
      if (detected) {
        setDetectedCurrency(detected);
        setSelectedCurrency(detected);
      } else {
        setSelectedCurrency('USD');
      }
      setIsDetecting(false);
    };
    detect();
    return () => {
      mounted = false;
    };
  }, [hasSelected]);
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
  const handleConfirm = () => {
    if (!selectedCurrency) return;
    setCurrency(selectedCurrency);
    setHasSelected(true);
  };
  const handleSkip = () => {
    setCurrency(selectedCurrency || 'USD');
    setHasSelected(true);
  };
  // Grouped currencies for dropdown
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
  const currentConfig = selectedCurrency ?
  CURRENCY_CONFIG[selectedCurrency] :
  null;
  return (
    <AnimatePresence>
      {!hasSelected &&
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
          className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-md" />
        

          {/* Modal */}
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 20
          }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 320
          }}
          className="relative w-full max-w-[380px] bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700/50 overflow-visible">
          
            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-b-full" />

            {/* Close / Skip button */}
            <button
            onClick={handleSkip}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-700 border border-slate-700/50 transition-colors group"
            aria-label="Skip currency selection">
            
              <XIcon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            <div className="px-6 pt-8 pb-6">
              {/* Headline */}
              <h2 className="text-xl font-bold text-white text-center mb-6 tracking-tight">
                Select Currency
              </h2>

              {/* Currency Dropdown */}
              <div className="relative mb-5" ref={dropdownRef}>
                <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={isDetecting}
                className={`w-full flex items-center justify-between bg-[#0F172A] rounded-xl px-4 py-3.5 transition-all focus:outline-none disabled:opacity-50 border ${selectedCurrency && detectedCurrency && selectedCurrency === detectedCurrency ? 'border-accent ring-1 ring-accent/30' : 'border-slate-700/60 hover:border-slate-600'}`}>
                
                  {isDetecting ?
                <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-700 animate-pulse" />
                      <div className="flex flex-col items-start gap-1">
                        <div className="w-20 h-3.5 bg-slate-700 rounded animate-pulse" />
                        <div className="w-28 h-2.5 bg-slate-800 rounded animate-pulse" />
                      </div>
                    </div> :
                currentConfig ?
                <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">
                        {currentConfig.flag}
                      </span>
                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-white">
                            {selectedCurrency}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({currentConfig.symbol})
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 leading-tight">
                          {currentConfig.name}
                        </span>
                      </div>
                    </div> :

                <span className="text-sm text-slate-400">
                      Choose a currency
                    </span>
                }
                  <ChevronDownIcon
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {dropdownOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -4,
                    scale: 0.98
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                    scale: 0.98
                  }}
                  transition={{
                    duration: 0.15
                  }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0F172A] border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50">
                  
                      {/* Search */}
                      <div className="px-3 pt-3 pb-1.5">
                        <div className="flex items-center gap-2 bg-[#1E293B] ring-1 ring-slate-700/50 rounded-lg px-3 py-2">
                          <SearchIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <input
                        ref={searchInputRef}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search currency..."
                        className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-full" />
                      
                        </div>
                      </div>

                      {/* Currency List */}
                      <div className="max-h-[240px] overflow-y-auto px-1.5 pb-1.5 custom-scrollbar">
                        {filteredGroups.map((group) =>
                    <div key={group.label}>
                            {!search &&
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 px-3 pt-2.5 pb-1 font-semibold">
                                {group.label}
                              </p>
                      }
                            {group.items.length === 0 &&
                      <p className="text-xs text-slate-500 text-center py-4">
                                No results
                              </p>
                      }
                            {group.items.map((c) => {
                        const cfg = CURRENCY_CONFIG[c];
                        const isActive = c === selectedCurrency;
                        return (
                          <button
                            key={c}
                            onClick={() => {
                              setSelectedCurrency(c);
                              setDropdownOpen(false);
                              setSearch('');
                            }}
                            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${isActive ? 'bg-accent/10 text-white font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                            
                                  <span className="flex items-center gap-2">
                                    <span className="text-base leading-none">
                                      {cfg.flag}
                                    </span>
                                    <span>{c}</span>
                                    <span className="text-[10px] text-slate-500">
                                      ({cfg.symbol})
                                    </span>
                                  </span>
                                  {isActive &&
                            <CheckIcon className="w-3.5 h-3.5 text-accent" />
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

              {/* CTA Button */}
              <motion.button
              onClick={handleConfirm}
              disabled={!selectedCurrency || isDetecting}
              whileTap={{
                scale: 0.97
              }}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-yellow-400 text-[#0F172A] font-bold text-sm py-3.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent/20">
              
                <span>Continue</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>

              {/* Helper Text */}
              <p className="text-[11px] text-slate-500 text-center mt-4 leading-relaxed px-2">
                Not seeing your currency? Choose USD. We support all major
                international cards with automatic conversion.
              </p>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}