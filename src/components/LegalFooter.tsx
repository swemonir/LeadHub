import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronDownIcon } from 'lucide-react';
type ModalType = 'privacy' | 'terms' | null;
const PRIVACY_TEXT = `Privacy Policy — LeadHub

Last Updated: March 2026

1. Data Collection:
We collect your Name, Email, and Phone Number solely to process payments and provide database access.

2. Usage:
Your information is used only for:
• Payment verification and receipt delivery
• Sending Google Drive access links
• Providing customer support

3. Data Security:
We do not sell or share your personal information with any third parties. All data is stored securely on encrypted servers.

4. Payment Safety:
All transactions are processed through the official bKash Merchant Gateway. We do not store your financial credentials.

5. Contact:
For any privacy-related queries, please reach out to our support team.`;
const TERMS_TEXT = `Terms & Conditions — LeadHub

Last Updated: March 2026

1. Service Description:
LeadHub provides a verified leads database. Upon successful payment, you receive instant access via Google Drive.

2. Pricing:
• Current Price: ৳1,490 (One-time payment)
• Payment accepted via bKash Merchant Payment
• No recurring monthly or annual fees

3. Compliance & Source:
All data is curated from Public Directories, Surveys, and Opt-in sources in a GDPR/CCPA-compliant manner.

4. Usage Restrictions:
• Data is for legal marketing purposes only
• Bulk spamming is strictly prohibited
• Reselling or redistributing the LeadHub database is forbidden

5. Refund Policy:
Due to the nature of digital products, all sales are final. No refunds after access is granted.

6. Legal Disclaimer:
LeadHub is not responsible for any misuse of data. Users must comply with local laws (CAN-SPAM, GDPR) before starting marketing campaigns. LeadHub aims for high accuracy but does not guarantee 100% data validity.`;
const SUPPORT_MAILTO = `mailto:support@leadhub.xyz?subject=${encodeURIComponent('Inquiry: LeadHub Database Access')}&body=${encodeURIComponent('Hi LeadHub Team,\n\nI have a question regarding...')}`;
export function LegalFooter() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      {/* Dropdown Trigger */}
      <div
        className="relative z-40 md:fixed md:bottom-6 md:left-6"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}>
        
        <AnimatePresence>
          {dropdownOpen &&
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
            className="absolute bottom-full left-0 mb-2 min-w-[180px] bg-[#1E293B]/90 backdrop-blur-md border border-[#334155] rounded-lg shadow-xl overflow-hidden">
            
              <button
              onClick={() => {
                setActiveModal('privacy');
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2.5 text-[12px] text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
              
                Privacy Policy
              </button>
              <button
              onClick={() => {
                setActiveModal('terms');
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2.5 text-[12px] text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
              
                Terms &amp; Conditions
              </button>
              <a
              href={SUPPORT_MAILTO}
              onClick={() => setDropdownOpen(false)}
              className="block w-full text-left px-4 py-2.5 text-[12px] text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors border-t border-[#334155]/50">
              
                Support
              </a>
            </motion.div>
          }
        </AnimatePresence>

        <button
          className="flex items-center space-x-1 text-[11px] text-[#94A3B8] hover:text-white transition-colors select-none"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}>
          
          <span>Legal &amp; Support</span>
          <ChevronDownIcon
            className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          
        </button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal &&
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 10
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10
            }}
            transition={{
              duration: 0.2
            }}
            className="relative w-full max-w-sm bg-[#1E293B] ring-1 ring-[#334155] rounded-xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
            
              <div className="flex items-center justify-between px-5 py-3 bg-[#0F172A]/50 ring-1 ring-[#334155]">
                <h3 className="text-sm font-semibold text-white">
                  {activeModal === 'privacy' ?
                'Privacy Policy' :
                'Terms & Conditions'}
                </h3>
                <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white transition-colors">
                
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto px-5 py-4 flex-1">
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeModal === 'privacy' ? PRIVACY_TEXT : TERMS_TEXT}
                </p>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </>);

}