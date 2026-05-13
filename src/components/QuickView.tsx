/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, Shield, Zap, Info } from 'lucide-react';
import { Product } from '../data';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function QuickView({ product, isOpen, onClose, onAddToCart }: QuickViewProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
          />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface border border-zinc-800 w-full max-w-4xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row pointer-events-auto max-h-[90vh]"
            >
              <div className="relative w-full md:w-1/2 bg-zinc-900 aspect-square md:aspect-auto">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={onClose}
                  className="absolute top-6 left-6 md:hidden p-2 bg-black/50 backdrop-blur-md rounded-full text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
                <div className="hidden md:flex justify-end mb-4">
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest border border-brand/20">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest border border-zinc-700">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="text-4xl font-black tracking-tighter text-white mb-2 leading-none uppercase italic">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(product.rating) ? "fill-brand text-brand" : "text-zinc-700"} 
                    />
                  ))}
                  <span className="text-[10px] font-bold text-zinc-500 ml-2 uppercase tracking-widest">
                    {product.rating} / 5.0 Rating
                  </span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">
                  {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                    <Shield className="text-brand" size={18} />
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                      <div className="text-white mb-1">1 Year Warranty</div>
                      Original Product
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
                    <Zap className="text-brand fill-brand" size={18} />
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                      <div className="text-white mb-1">Fast Delivery</div>
                      24h Dispatch
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Price</span>
                    <div className="text-3xl font-mono font-bold text-brand tracking-tighter">
                      {product.price} <span className="text-xs">AED</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="px-8 py-4 bg-brand text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Add to Cart
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
