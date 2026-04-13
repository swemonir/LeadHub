import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, CheckIcon, SearchIcon } from 'lucide-react';
import {
  useCurrency,
  CURRENCY_CONFIG,
  ALL_CURRENCIES,
  FEATURED_CURRENCIES,
  POPULAR_CURRENCIES,
  Currency } from
'../hooks/useCurrency';
export function CurrencySwitcher() {
  const { currency, setCurrency, hasSelected, config } = useCurrency();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    if (open) {
      document.addEventListener('mousedown', handler);
      setTimeout(() => searchRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);
  if (!hasSelected) return null;
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
    <div className="relative z-40 md:fixed md:bottom-6 md:right-6" ref={ref}>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0,
            y: 4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 4
          }}
          transition={{
            duration: 0.18,
            ease: 'easeOut'
          }}
          className="absolute bottom-full right-0 mb-2 w-[200px] bg-[#1E293B]/95 backdrop-blur-md border border-[#334155] rounded-lg shadow-xl overflow-hidden">
          
            {/* Search */}
            <div className="px-2.5 pt-2.5 pb-1">
              <div className="flex items-center gap-1.5 bg-[#0F172A] ring-1 ring-[#334155] rounded-md px-2 py-1.5">
                <SearchIcon className="w-3 h-3 text-slate-500" />
                <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-[11px] text-white placeholder-slate-500 outline-none w-full" />
              
              </div>
            </div>

            <div className="max-h-[260px] overflow-y-auto px-1 pb-1 custom-scrollbar">
              {filteredGroups.map((group) =>
            <div key={group.label}>
                  {!search &&
              <p className="text-[9px] uppercase tracking-widest text-slate-500 px-2.5 pt-2 pb-1">
                      {group.label}
                    </p>
              }
                  {group.items.map((c) => {
                const itemConfig = CURRENCY_CONFIG[c];
                const isActive = c === currency;
                return (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setOpen(false);
                      setSearch('');
                    }}
                    className={`flex items-center justify-between w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${isActive ? 'text-white font-semibold bg-white/5' : 'text-[#94A3B8] hover:text-white hover:bg-white/5'}`}>
                    
                        <span className="flex items-center gap-1.5">
                          <span className="text-sm">{itemConfig.flag}</span>
                          <span>{c}</span>
                          <span className="text-[10px] text-slate-600">
                            ({itemConfig.symbol})
                          </span>
                        </span>
                        {isActive &&
                    <CheckIcon className="w-3 h-3 text-[#FACC15]" />
                    }
                      </button>);

              })}
                </div>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 text-[11px] text-[#94A3B8] hover:text-white transition-colors select-none bg-[#1E293B]/60 backdrop-blur-sm ring-1 ring-[#334155]/60 rounded-full px-3 py-1.5">
        
        <span>
          {config.flag} {config.label}
        </span>
        <ChevronDownIcon
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        
      </button>
    </div>);

}