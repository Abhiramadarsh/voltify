/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Auth from './components/Auth';
import About from './components/About';
import QuickView from './components/QuickView';
import { PRODUCTS, Product } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAuthOpen(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const categories = ['all', 'phone', 'led', 'gaming', 'gadgets'];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    // Optional: Open cart briefly to show feedback
    // setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-brand/30">
      <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        onSearch={setSearchQuery}
        onCategoryChange={setActiveCategory}
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={handleRemoveFromCart}
      />

      <QuickView 
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <Auth 
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          // Force refresh user state to catch profile updates
          setUser(auth.currentUser ? { ...auth.currentUser } as any : null);
        }}
      />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onShopNow={() => {
              const el = document.getElementById('shop');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Shop Section */}
            <section className="max-w-7xl mx-auto px-8 py-24" id="shop">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <span className="text-brand text-[10px] font-bold tracking-[0.3em] uppercase mb-1 block">Our Collection</span>
                  <h2 className="text-5xl font-black tracking-tighter mb-6">
                    THE STORE<span className="text-brand">.</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          activeCategory === cat 
                            ? "bg-brand text-black" 
                            : "bg-surface text-zinc-500 hover:text-white border border-zinc-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    <SlidersHorizontal size={14} />
                    Sort By
                  </div>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-surface border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-full px-4 py-2 focus:outline-none focus:border-brand"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(350px,auto)]"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => {
                    // Determine Bento span logic for featured items when showing 'all'
                    const isFeatured = product.featured && activeCategory === 'all';
                    const spanClass = isFeatured 
                      ? (index % 4 === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2")
                      : "";

                    return (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        key={product.id} 
                        className={spanClass}
                      >
                        <ProductCard 
                          product={product} 
                          onAddToCart={handleAddToCart} 
                          onQuickView={(p) => {
                            setSelectedProduct(p);
                            setIsQuickViewOpen(true);
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="py-32 text-center">
                  <p className="text-zinc-500 text-xl font-medium italic">No products found in this category.</p>
                </div>
              )}
            </section>

            {/* Action Banner Bento Style */}
            <section className="max-w-7xl mx-auto px-8 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-brand rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 text-black group overflow-hidden relative">
                  <div className="flex-1 relative z-10">
                    <h3 className="text-4xl font-black leading-[0.9] uppercase mb-4 tracking-tighter">Fast Delivery Across UAE</h3>
                    <p className="text-black/60 text-sm font-medium">Orders over 250 AED get free 24-hour shipping to Dubai, Abu Dhabi & Sharjah.</p>
                  </div>
                  <div className="w-32 h-32 rounded-full border-4 border-black/10 flex items-center justify-center relative z-10">
                    <span className="font-black text-3xl">24H</span>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="bg-surface rounded-[2rem] border border-zinc-800 p-10 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-mono">Daily Spotlight</span>
                  <h3 className="text-2xl font-bold mb-1">VoltBuds Air</h3>
                  <span className="text-3xl font-mono font-bold text-brand">199 AED</span>
                </div>
              </div>
            </section>
          </>
        ) : (
          <About />
        )}
      </main>

      <Footer onPageChange={setCurrentPage} />
    </div>
  );
}

