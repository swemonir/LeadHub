import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { DataSheetView } from "./DataSheetView";
import { useCurrency } from "../hooks/useCurrency";
export function HeroCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isBDT } = useCurrency();
  const goToLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.open(
      "https://drive.google.com/drive/folders/1HdZz-GxrBCiYFz66lrTf0CKZTq1oidTY?usp=sharing",
      "_blank",
    );
  };
  return (
    <motion.div
      layout
      className="w-full max-w-4xl mx-auto mt-12 md:mt-24 px-4 relative z-10"
    >
      <motion.div
        layout
        className="bg-white/5 backdrop-blur-xl ring-1 ring-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          layout
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 bg-[#1E293B]/80 ring-1 ring-[#334155] rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
            <span className="text-success text-sm font-medium tracking-wide">
              Live Database: Just Updated
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent pb-2">
            19M+ Verified Leads
          </h1>

          {/* Subheading — dynamic based on currency */}
          {isBDT ? (
            <p className="font-bengali text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
              আপনার ব্যবসার জন্য বিশ্বের সেরা ডাটাবেস এক্সেস নিন।
            </p>
          ) : (
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
              Access the World's Most Powerful B2B Database.
            </p>
          )}
          <button
            type="button"
            onClick={goToLink}
            className="bg-[#1E293B] hover:bg-[#243247] text-white font-bold py-3 px-6 rounded-xl ring-1 ring-[#334155] transition-all active:scale-95"
          >
            View Demo
          </button>
          {/* Expand Hint */}
          <motion.div
            layout
            className="pt-4 flex flex-col items-center text-slate-500 group-hover:text-slate-300 transition-colors"
          >
            <span className="text-sm mb-2">
              {isExpanded ? "Close preview" : "Click to explore data"}
            </span>
            <motion.div
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ChevronDownIcon className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>{isExpanded && <DataSheetView />}</AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
