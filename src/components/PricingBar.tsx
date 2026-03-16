import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useCurrency } from '../hooks/useCurrency';
import {
  LockIcon,
  ShieldCheckIcon,
  InfinityIcon,
  HeadphonesIcon } from
'lucide-react';
interface PricingBarProps {
  onOpenModal: () => void;
}
const TRUST_BADGES = [
{
  icon: LockIcon,
  title: 'Secure Merchant Payment',
  desc: 'Your details are 100% safe.'
},
{
  icon: ShieldCheckIcon,
  title: 'Verified USA Data',
  desc: 'Curated & clean leads.'
},
{
  icon: InfinityIcon,
  title: 'Instant Access & Updates',
  desc: 'One-time pay, lifetime value.'
},
{
  icon: HeadphonesIcon,
  title: 'Dedicated Support',
  desc: "We're here to help."
}];

export function PricingBar({ onOpenModal }: PricingBarProps) {
  const { hours, minutes, seconds } = useCountdown(23 * 3600 + 59 * 60 + 59);
  const { config, isBDT } = useCurrency();
  const currentPrice = config.price;
  const originalPrice = config.originalPrice;
  const gatewayLabel = config.gatewayLabel;
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-24 md:pb-32 relative z-10 space-y-5">
      {/* Main Pricing Card */}
      <div className="bg-[#1E293B] ring-1 ring-[#334155] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/40">
        {/* Left: Pricing */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">
            Limited Offer
          </span>
          <div className="flex items-baseline space-x-3">
            <span
              className={`text-4xl font-bold text-white ${isBDT ? 'font-bengali' : ''}`}>
              
              {currentPrice}
            </span>
            <span
              className={`text-xl text-slate-500 line-through ${isBDT ? 'font-bengali' : ''}`}>
              
              {originalPrice}
            </span>
          </div>
        </div>

        {/* Center: Countdown */}
        <div className="flex flex-col items-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider mb-2">
            Offer Ends In
          </span>
          <div className="flex items-center space-x-2 font-mono text-2xl font-bold text-[#FACC15] bg-[#0F172A] px-4 py-2 rounded-lg ring-1 ring-[#334155]">
            <span>{hours}</span>
            <span className="text-slate-500 animate-pulse">:</span>
            <span>{minutes}</span>
            <span className="text-slate-500 animate-pulse">:</span>
            <span>{seconds}</span>
          </div>
        </div>

        {/* Right: CTA */}
        <button
          onClick={onOpenModal}
          className="w-full md:w-auto bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#0F172A] font-bold text-lg px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#FACC15]/20">
          
          Get Access Now
          <span className="block text-xs font-medium opacity-80 mt-0.5">
            {gatewayLabel}
          </span>
        </button>
      </div>

      {/* Trust Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TRUST_BADGES.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="bg-[#1E293B] rounded-xl px-4 py-3.5 flex flex-col items-center text-center ring-1 ring-[#334155]/60">
              
              <Icon className="w-5 h-5 text-[#FACC15] mb-2" strokeWidth={1.5} />
              <span className="text-[12px] font-semibold text-slate-300 leading-tight mb-0.5">
                {badge.title}
              </span>
              <span className="text-[11px] text-[#94A3B8] leading-tight">
                {badge.desc}
              </span>
            </div>);

        })}
      </div>
    </div>);

}