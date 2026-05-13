/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, Search, X, User as UserIcon, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onPageChange: (page: 'home' | 'about') => void;
  currentPage: 'home' | 'about';
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  user, 
  onOpenAuth,
  onPageChange,
  currentPage,
  onSearch,
  onCategoryChange
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleNavClick = (page: 'home' | 'about', sectionId?: string, category?: string) => {
    onPageChange(page);
    if (category) {
      onCategoryChange(category);
    }
    setIsMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-end justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => handleNavClick('home')}>
          <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase mb-1 block leading-none">Voltify Essentials</span>
          <div className="text-3xl font-black tracking-tighter text-white leading-none">
            VOLTIFY<span className="text-brand">.</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">
          <button 
            onClick={() => handleNavClick('home', 'shop', 'all')} 
            className={`transition-colors ${currentPage === 'home' ? 'text-brand' : 'hover:text-white'}`}
          >
            Store
          </button>
          <button 
            onClick={() => handleNavClick('about')} 
            className={`transition-colors ${currentPage === 'about' ? 'text-brand' : 'hover:text-white'}`}
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('home', 'shop', 'gaming')} 
            className="hover:text-white transition-colors"
          >
            Gaming
          </button>
          <button 
            onClick={() => handleNavClick('home', 'shop', 'led')} 
            className="hover:text-white transition-colors"
          >
            Lighting
          </button>
        </div>

        <div className="flex items-center gap-4 mb-1">
          <div className="relative hidden sm:flex items-center text-zinc-400">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  autoFocus
                  placeholder="SEARCH PRODUCTS..."
                  className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1 text-[10px] font-bold tracking-widest focus:outline-none focus:border-brand mr-2"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => {
                const newState = !isSearchOpen;
                setIsSearchOpen(newState);
                if (!newState) {
                  setSearchQuery('');
                  onSearch('');
                }
              }}
              className="p-2 hover:text-white transition-colors"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>

          <div className="h-8 w-px bg-zinc-800 mx-2 hidden sm:block" />
          
          <button onClick={onOpenCart} className="relative group cursor-pointer focus:outline-none">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${cartCount > 0 ? 'bg-brand text-black scale-105 shadow-lg shadow-brand/20' : 'bg-zinc-800 text-zinc-400'}`}>
              {cartCount.toString().padStart(2, '0')}
            </div>
            <ShoppingCart className="hidden group-hover:block absolute -top-2 -right-2 text-brand" size={12} />
          </button>

          <div className="h-8 w-px bg-zinc-800 mx-2 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-4 group relative">
              <div className="hidden sm:flex flex-col items-end text-right">
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#0A0A0C] border-b border-white/10 p-6 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            <button onClick={() => handleNavClick('home', 'shop')} className="text-2xl font-black text-white italic text-left uppercase tracking-tighter">The Store</button>
            <button onClick={() => handleNavClick('about')} className="text-2xl font-black text-white italic text-left uppercase tracking-tighter">About Us</button>
            <button onClick={() => handleNavClick('home', 'shop')} className="text-2xl font-black text-white italic text-left uppercase tracking-tighter">Gaming Gear</button>
            <div className="h-px bg-zinc-800 w-full" />
            <div className="flex items-center gap-4 text-zinc-500 font-bold text-xs uppercase tracking-widest">
              <span>AED</span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>English</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
