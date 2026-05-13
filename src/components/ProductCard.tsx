/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, ShoppingCart, Plus, Check, Eye } from 'lucide-react';
import { Product } from '../data';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group bg-surface rounded-[2rem] border border-zinc-800 p-6 flex flex-col justify-between hover:border-brand transition-all duration-300 relative overflow-hidden h-full`}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-900">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button 
            onClick={() => onQuickView(product)}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-brand transition-all scale-90 group-hover:scale-100 duration-300 shadow-xl"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
        </div>

        {product.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-brand text-black text-[10px] font-bold uppercase tracking-wider">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
           <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{product.category}</span>
        </div>
        
        <h3 className="text-white font-bold text-xl mb-1 group-hover:text-brand transition-colors leading-tight">
          {product.name}
        </h3>
        
        <p className="text-zinc-500 text-xs mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="text-2xl font-mono font-bold text-brand tracking-tighter">
            {product.price} <span className="text-[10px] text-zinc-500 ml-1">AED</span>
          </div>
          
          <button 
            onClick={handleAdd}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${added ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-brand'}`}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
      
      {/* Subtle glow on hover */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
