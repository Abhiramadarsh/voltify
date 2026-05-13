/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingCart, Menu, Search, X, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  user: User | null;
  onOpenAuth: () => void;
}

export default function Navbar({ cartCount, onOpenCart, user, onOpenAuth }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase mb-1 block leading-none">Voltify Essentials</span>
          <a href="/" className="text-3xl font-black tracking-tighter text-white leading-none">
            VOLTIFY<span className="text-brand">.</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">
          <a href="#shop" className="hover:text-white transition-colors">Store</a>
          <a href="#shop" className="hover:text-white transition-colors">Gaming</a>
          <a href="#shop" className="hover:text-white transition-colors">Lighting</a>
          <a href="#shop" className="hover:text-white transition-colors">Accessories</a>
        </div>

        <div className="flex items-center gap-4 mb-1">
          <div className="hidden sm:block px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400">
            AED | EN
          </div>
          
          <button onClick={onOpenCart} className="relative group cursor-pointer focus:outline-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${cartCount > 0 ? 'bg-brand text-black scale-105 shadow-lg shadow-brand/20' : 'bg-zinc-800 text-zinc-400'}`}>
              {cartCount.toString().padStart(2, '0')}
            </div>
            <ShoppingCart className="hidden group-hover:block absolute -top-2 -right-2 text-brand" size={12} />
          </button>

          <div className="h-8 w-px bg-zinc-800 mx-2 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-4 group relative">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-white leading-tight">
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
                <button onClick={handleLogout} className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-brand transition-colors flex items-center gap-1">
                  Logout <LogOut size={10} />
                </button>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface border border-zinc-800 overflow-hidden flex items-center justify-center group-hover:border-brand transition-colors cursor-pointer">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="text-zinc-500" size={20} />
                )}
              </div>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-brand transition-all active:scale-95"
            >
              Sign In
            </button>
          )}
          
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          <a href="#" className="text-lg font-medium text-white">Shop All</a>
          <a href="#" className="text-lg font-medium text-white">New Arrivals</a>
          <a href="#" className="text-lg font-medium text-white">Best Sellers</a>
          <a href="#" className="text-lg font-medium text-white">Deals</a>
        </motion.div>
      )}
    </nav>
  );
}
