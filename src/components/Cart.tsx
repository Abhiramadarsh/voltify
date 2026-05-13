/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../data';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (index: number) => void;
}

export default function Cart({ isOpen, onClose, items, onRemove }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert('Thank you for your order! Checkout process initiated for ' + total + ' AED.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface border-l border-zinc-800 z-[70] flex flex-col"
          >
            <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand" />
                <h2 className="text-2xl font-black tracking-tighter uppercase">Your Bag</h2>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-1">
                  {items.length} Items
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={48} className="mb-4 text-zinc-700" />
                  <p className="text-zinc-500 font-medium">Your bag is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-brand text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${item.id}-${index}`} 
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-zinc-800">
                      <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-white group-hover:text-brand transition-colors line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(index)}
                          className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{item.category}</span>
                        <span className="font-mono font-bold text-brand">{item.price} AED</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-zinc-800 bg-black/40">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-mono font-bold text-white">{total} AED</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-brand text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Secure Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-tighter">
                  Tax and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
