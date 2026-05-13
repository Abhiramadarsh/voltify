/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: 'home' | 'about') => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0C] border-t border-zinc-900 px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold text-center md:text-left">
          © 2025 VOLTIFY TECH ACCESSORIES TRADING LLC
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <button onClick={() => onPageChange('about')} className="hover:text-brand transition-colors uppercase">Our Story</button>
          <a href="#" className="hover:text-brand transition-colors">SUPPORT: 800-VOLTIFY</a>
          <a href="#" className="hover:text-brand transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
