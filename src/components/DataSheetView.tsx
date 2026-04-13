import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeIcon } from 'lucide-react';
const CORE_LEADS = [
{
  category: 'High-Ticket Founders & C-Suite',
  count: '100,000'
},
{
  category: 'Medical & Healthcare Professionals',
  count: '240,000'
},
{
  category: 'Senior Sales Executives',
  count: '145,000'
},
{
  category: 'Legal Firms & Attorney Database',
  count: '92,753'
},
{
  category: 'Premium Real Estate Agents & Brokers',
  count: '57,746'
},
{
  category: 'Ad-Agencies & Marketing Firms',
  count: '52,000'
},
{
  category: 'Creative Agencies & Strategists',
  count: '49,700'
},
{
  category: 'Top-Tier Corporate Organizations',
  count: '35,000'
},
{
  category: 'Tech & IT Solution Providers',
  count: '17,480'
},
{
  category: 'Expert Coaches & Consultants',
  count: '15,000'
},
{
  category: 'SaaS & Software Development Firms',
  count: '12,000'
},
{
  category: 'Licensed Insurance Agents & Firms',
  count: '1,700'
}];

const HIGH_VOLUME = [
{
  label: 'B2B Multi-Source Network',
  count: '9,939,088',
  short: '9.9M+'
},
{
  label: 'Verified Consumer Warm Leads',
  count: '8,458,726',
  short: '8.4M+'
}];

export function DataSheetView() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -10
      }}
      transition={{
        duration: 0.3
      }}
      className="mt-8 w-full space-y-4">
      
      {/* Section 1: Core Categorized Leads */}
      <div className="overflow-hidden rounded-xl ring-1 ring-[#334155] bg-[#0F172A]/50">
        <div className="bg-[#1E293B] px-6 py-3 flex justify-between items-center ring-1 ring-[#334155]">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            High-Value Segments
          </span>
          <span className="font-mono text-sm text-accent font-bold">
            810,747
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase text-slate-500 bg-[#0F172A]/80">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 font-medium text-right">
                  Count
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]/40">
              {CORE_LEADS.map((row, idx) =>
              <tr
                key={idx}
                className="hover:bg-[#1E293B]/40 transition-colors">
                
                  <td className="px-6 py-3 font-medium text-white">
                    {row.category}
                  </td>
                  <td className="px-6 py-3 font-mono text-accent text-right">
                    {row.count}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: High-Volume Database */}
      <div className="overflow-hidden rounded-xl ring-1 ring-[#334155] bg-[#0F172A]/50">
        <div className="bg-[#1E293B] px-6 py-3 ring-1 ring-[#334155]">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Massive Growth Database
          </span>
        </div>
        <div className="divide-y divide-[#334155]/40">
          {HIGH_VOLUME.map((item, idx) =>
          <div
            key={idx}
            className="px-6 py-4 flex items-center justify-between hover:bg-[#1E293B]/40 transition-colors">
            
              <div className="flex flex-col">
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-xs text-slate-500 font-mono mt-0.5">
                  {item.count} records
                </span>
              </div>
              <span className="font-mono text-lg text-accent font-bold">
                {item.short}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Region & Verification */}
      <div className="overflow-hidden rounded-xl ring-1 ring-[#334155] bg-[#0F172A]/50">
        <div className="bg-[#1E293B] px-6 py-3 ring-1 ring-[#334155]">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Region & Verification
          </span>
        </div>
        <div className="divide-y divide-[#334155]/40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GlobeIcon className="w-4 h-4 text-slate-500" />
              <span className="text-white font-medium">Target Region</span>
            </div>
            <span className="text-sm font-semibold text-white bg-[#1E293B] px-3 py-1 rounded-full ring-1 ring-[#334155]">
              🇺🇸 100% USA
            </span>
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="w-4 h-4 text-[#22C55E]" />
              <span className="text-white font-medium">
                Verification Status
              </span>
            </div>
            <span className="text-sm font-semibold text-[#22C55E]">
              Fully Verified & Opt-in
            </span>
          </div>
        </div>
      </div>

      {/* Grand Total Footer */}
      <div className="bg-[#1E293B] px-6 py-4 rounded-xl ring-1 ring-[#334155] flex justify-between items-center">
        <span className="text-sm text-slate-400 font-semibold">
          Total Verified Records
        </span>
        <span className="font-mono text-xl text-white font-bold">
          19,208,561<span className="text-accent">+</span>
        </span>
      </div>
    </motion.div>);

}