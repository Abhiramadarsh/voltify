/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative px-8 pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full mb-6 w-fit">
            <Zap size={12} className="text-brand fill-brand" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Future Tech Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
            UPGRADE YOUR<br />
            <span className="text-brand">LIFESTYLE.</span>
          </h1>
          
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mb-8 font-medium leading-relaxed">
            Voltify brings you premium phone accessories, RGB lighting, and gaming workspace essentials. High-performance gear at accessible AED prices.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onShopNow}
              className="px-6 py-3 bg-brand text-black font-bold rounded-full hover:bg-white transition-all text-xs uppercase tracking-widest flex items-center gap-2 group cursor-pointer"
            >
              Start Shopping
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onShopNow}
              className="hidden sm:flex items-center -space-x-3 group cursor-pointer"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0C] bg-zinc-800 flex items-center justify-center overflow-hidden group-hover:border-brand transition-colors">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="px-3 flex items-center text-[10px] font-bold text-zinc-500 uppercase tracking-tighter group-hover:text-white transition-colors">
                +2k HAPPY USERS
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand blur-[150px] opacity-10 -z-10" />
    </section>
  );
}
