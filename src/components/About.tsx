/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Shield, Zap, Globe, Users, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-40 pb-20 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Our Story</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              DEFINING<br />
              <span className="text-brand underline decoration-black underline-offset-8">PREMIUM.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl mb-10 font-medium leading-relaxed">
              Founded in 2024, Voltify emerged from a simple observation: tech enthusiasts deserve gear that looks as good as it performs, without the "luxury" price tag.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-surface border border-zinc-800 px-6 py-4 rounded-2xl">
                <Shield className="text-brand" size={24} />
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-tighter">Verified Quality</div>
                  <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Global Standards</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface border border-zinc-800 px-6 py-4 rounded-2xl">
                <Zap className="text-brand fill-brand" size={24} />
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-tighter">Fast Inov</div>
                  <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Cutting Edge</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-brand rounded-[3rem] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1170&auto=format&fit=crop" 
                alt="Tech Team" 
                className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="text-white text-3xl font-black tracking-tighter uppercase mb-2">Dubai Based. Global Vision.</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">Crafting the future of retail</div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-brand/20 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-brand/10 rounded-full" />
          </motion.div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem]">
            <h3 className="text-4xl font-black tracking-tighter text-white mb-6">THE MISSION<span className="text-brand">.</span></h3>
            <p className="text-zinc-400 font-medium leading-relaxed">
              We're here to bridge the gap between expensive flagship brands and unreliable generics. Every Voltify product is tested for durability, performance, and style.
            </p>
          </div>
          <div className="bg-brand rounded-[2.5rem] p-10 flex flex-col justify-between">
            <Globe className="text-black" size={32} />
            <div>
              <div className="text-6xl font-black text-black tracking-tighter">12+</div>
              <div className="text-black/60 text-[10px] font-bold uppercase tracking-widest">Countries Reached</div>
            </div>
          </div>
          <div className="bg-surface border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col justify-between">
            <Users className="text-brand" size={32} />
            <div>
              <div className="text-6xl font-black text-white tracking-tighter">50K</div>
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Active Community</div>
            </div>
          </div>
        </div>

        {/* Action Call */}
        <div className="bg-white rounded-[3rem] p-16 text-center group cursor-pointer overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 uppercase leading-none">
              Ready to upgrade<br />your setup?
            </h2>
            <button className="px-10 py-5 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-brand hover:text-black transition-all flex items-center gap-4 mx-auto">
              Browse Collection
              <ArrowRight size={18} />
            </button>
          </div>
          {/* Animated decorative layer */}
          <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
}
