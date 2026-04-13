import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { DatabaseIcon, InfinityIcon, ZapIcon } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
export function WhyLeadHub() {
  const { isBDT } = useCurrency();
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-100px'
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* Feature 1: Unmatched Scale */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            opacity: 1,
            scale: 1.02
          }}
          className="flex flex-col items-center text-center space-y-4 opacity-50 transition-all duration-300 cursor-default group">
          
          <div className="p-4 rounded-2xl bg-[#1E293B] ring-1 ring-[#334155] group-hover:ring-accent/50 transition-all duration-300">
            <DatabaseIcon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">Unmatched Scale</h3>
          {isBDT ?
          <p className="font-bengali text-slate-400 leading-relaxed">
              ১৯ মিলিয়ন+ নির্ভুল লিড, যা আপনার সেলস টিমকে দিবে সুপারপাওয়ার।
            </p> :

          <p className="text-slate-400 leading-relaxed">
              19M+ Verified Leads to supercharge your sales pipeline.
            </p>
          }
        </motion.div>

        {/* Feature 2: True Lifetime */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            opacity: 1,
            scale: 1.02
          }}
          className="flex flex-col items-center text-center space-y-4 opacity-50 transition-all duration-300 cursor-default group">
          
          <div className="p-4 rounded-2xl bg-[#1E293B] ring-1 ring-[#334155] group-hover:ring-accent/50 transition-all duration-300">
            <InfinityIcon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">True Lifetime</h3>
          {isBDT ?
          <p className="font-bengali text-slate-400 leading-relaxed">
              কোনো মাসিক চার্জ নেই। একবার কিনুন, আজীবন ফ্রেশ ডাটা আপডেট পান।
            </p> :

          <p className="text-slate-400 leading-relaxed">
              No recurring fees. One-time investment, lifetime updates.
            </p>
          }
        </motion.div>

        {/* Feature 3: Automated Access */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            opacity: 1,
            scale: 1.02
          }}
          className="flex flex-col items-center text-center space-y-4 opacity-50 transition-all duration-300 cursor-default group">
          
          <div className="p-4 rounded-2xl bg-[#1E293B] ring-1 ring-[#334155] group-hover:ring-accent/50 transition-all duration-300">
            <ZapIcon className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">Automated Access</h3>
          {isBDT ?
          <p className="font-bengali text-slate-400 leading-relaxed">
              পেমেন্ট সাকসেসফুল হওয়া মাত্রই আপনার ড্রাইভ এক্সেস রেডি।
            </p> :

          <p className="text-slate-400 leading-relaxed">
              Instant Google Drive access upon successful checkout.
            </p>
          }
        </motion.div>
      </motion.div>
    </div>);

}