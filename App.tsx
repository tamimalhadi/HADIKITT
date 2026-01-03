
import React, { useState, useMemo, useEffect } from 'react';
import { products } from './data';
import { View, Product, CheckoutData } from './types';

// --- Sub-components (Outside App for performance) ---

const Marquee: React.FC = () => (
  <div className="bg-blue-600 text-white py-1 overflow-hidden whitespace-nowrap">
    <div className="inline-block animate-marquee uppercase font-bold text-xs tracking-widest">
      FREE DELIVERY ON ALL GEAR • WORLDWIDE SHIPPING • NEW 25/26 KITS JUST DROPPED • SHOP THE LATEST TRENDS AT HADI KIT • FREE DELIVERY ON ALL GEAR • WORLDWIDE SHIPPING
    </div>
  </div>
);

const Header: React.FC<{ 
  onSearch: (q: string) => void, 
  onLogoClick: () => void 
}> = ({ onSearch, onLogoClick }) => (
  <header className="sticky top-0 z-50 glass px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
    <div 
      className="sporty-header text-2xl cursor-pointer hover:text-blue-500 transition-colors"
      onClick={onLogoClick}
    >
      HADI <span className="text-blue-600">KIT</span>
    </div>
    <div className="relative w-full md:w-96">
      <input 
        type="text" 
        placeholder="SEARCH FOR YOUR TEAM..." 
        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-2 outline-none focus:border-blue-600 transition-all text-sm uppercase italic font-bold"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  </header>
);

const ProductCard: React.FC<{ 
  product: Product, 
  onClick: (p: Product) => void 
}> = ({ product, onClick }) => (
  <div 
    className="group glass p-3 cursor-pointer hover:border-blue-600/50 transition-all duration-300 rounded-xl fade-in"
    onClick={() => onClick(product)}
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-zinc-900">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {product.badge && (
        <span className="absolute top-2 left-2 px-3 py-1 bg-blue-600 text-[10px] font-black uppercase italic tracking-tighter rounded-sm">
          {product.badge}
        </span>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="sporty-header text-sm line-clamp-1 group-hover:text-blue-500 transition-colors">
        {product.name}
      </h3>
      <p className="text-zinc-400 font-mono text-xs">{product.price} TK</p>
    </div>
  </div>
);

const ProductDetail: React.FC<{ 
  product: Product, 
  onBack: () => void, 
  onBuy: (size: string) => void 
}> = ({ product, onBack, onBuy }) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-zinc-400 hover:text-white transition-colors uppercase text-sm font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass rounded-2xl overflow-hidden aspect-[4/5]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="text-blue-600 font-black italic uppercase tracking-widest text-xs mb-2 block">Premium Collection</span>
            <h1 className="sporty-header text-4xl md:text-6xl mb-4">{product.name}</h1>
            <p className="text-3xl font-mono text-zinc-100">{product.price} TK</p>
          </div>

          <div className="space-y-4">
            <label className="uppercase text-xs font-black tracking-widest text-zinc-500">Select Size</label>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 flex items-center justify-center rounded-lg border font-black transition-all ${
                    selectedSize === size 
                    ? 'border-blue-600 bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/20' 
                    : 'border-white/10 text-zinc-400 hover:border-white/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={() => onBuy(selectedSize)}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white sporty-header text-xl tracking-widest rounded-xl transition-all active:scale-95 shadow-2xl shadow-blue-600/30"
            >
              Buy Now
            </button>
            <p className="text-center text-zinc-500 text-xs uppercase font-bold tracking-tighter">
              Secured Checkout • 2-4 Days Shipping in BD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout: React.FC<{ 
  product: Product, 
  size: string, 
  onBack: () => void, 
  onComplete: () => void 
}> = ({ product, size, onBack, onComplete }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 fade-in">
      <h2 className="sporty-header text-4xl mb-12 text-center">Checkout Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Summary */}
        <div className="glass p-8 rounded-2xl h-fit">
          <h3 className="uppercase font-black text-sm text-zinc-500 mb-6 tracking-widest border-b border-white/10 pb-2">Order Summary</h3>
          <div className="flex gap-4 mb-6">
            <img src={product.image} className="w-20 h-24 object-cover rounded-lg" alt="" />
            <div>
              <p className="sporty-header text-lg">{product.name}</p>
              <p className="text-zinc-400 text-sm">Size: <span className="text-blue-500 font-bold">{size}</span></p>
              <p className="text-white font-mono mt-1">{product.price} TK</p>
            </div>
          </div>
          <div className="space-y-2 border-t border-white/10 pt-4">
            <div className="flex justify-between text-zinc-400 text-sm uppercase font-bold">
              <span>Subtotal</span>
              <span>{product.price} TK</span>
            </div>
            <div className="flex justify-between text-green-500 text-sm uppercase font-bold">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-xl sporty-header pt-4">
              <span>Total</span>
              <span className="text-blue-500">{product.price} TK</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="uppercase text-[10px] font-black tracking-widest text-zinc-500 ml-2">Full Name</label>
            <input 
              required
              className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-600"
              placeholder="e.g. Cristiano Ronaldo"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="uppercase text-[10px] font-black tracking-widest text-zinc-500 ml-2">Phone Number</label>
            <input 
              required
              type="tel"
              className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-600 font-mono"
              placeholder="+880 1XXX-XXXXXX"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="uppercase text-[10px] font-black tracking-widest text-zinc-500 ml-2">Delivery Address</label>
            <textarea 
              required
              rows={3}
              className="w-full glass bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-600"
              placeholder="Full Street, House & City..."
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 py-4 border border-white/10 rounded-xl uppercase text-sm font-black hover:bg-white/5 transition-colors"
            >
              Back
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl sporty-header text-lg shadow-xl shadow-blue-600/20"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Success: React.FC = () => (
  <div className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center p-6 text-center">
    <div className="fade-in flex flex-col items-center">
      <div className="w-24 h-24 bg-green-500/10 border-4 border-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="sporty-header text-5xl mb-4">Order Confirmed</h2>
      <p className="text-zinc-400 max-w-sm uppercase text-sm font-bold tracking-widest leading-relaxed">
        Your gear is being prepared! Redirecting you to the home page in a few seconds...
      </p>
    </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering products based on search
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // Handle auto-return to home after success
  useEffect(() => {
    if (view === 'success') {
      const timer = setTimeout(() => {
        setView('home');
        setSelectedProduct(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className="min-h-screen pb-20">
      <Marquee />
      <Header 
        onSearch={setSearchQuery} 
        onLogoClick={() => { setView('home'); setSelectedProduct(null); }} 
      />

      <main>
        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="sporty-header text-5xl md:text-7xl">The <span className="text-blue-600">Gear</span></h2>
                <p className="text-zinc-500 uppercase font-black text-sm tracking-[0.3em] mt-2">Latest Season Arrivals</p>
              </div>
              <p className="text-zinc-400 text-sm max-w-xs font-medium italic opacity-60">
                Premium quality football kits engineered for the pitch and the street.
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onClick={(prod) => { setSelectedProduct(prod); setView('product'); }} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center glass rounded-3xl">
                <p className="sporty-header text-3xl opacity-20">No matching gear found</p>
              </div>
            )}
          </div>
        )}

        {view === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView('home')} 
            onBuy={(size) => { setSelectedSize(size); setView('checkout'); }}
          />
        )}

        {view === 'checkout' && selectedProduct && (
          <Checkout 
            product={selectedProduct} 
            size={selectedSize} 
            onBack={() => setView('product')} 
            onComplete={() => setView('success')}
          />
        )}

        {view === 'success' && <Success />}
      </main>

      <footer className="mt-20 px-6 py-12 border-t border-white/5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
        <div className="sporty-header text-xl">HADI <span className="text-blue-600">KIT</span></div>
        <div className="flex gap-8 uppercase text-[10px] font-black tracking-widest">
          <a href="#" className="hover:text-blue-600">Track Order</a>
          <a href="#" className="hover:text-blue-600">Terms</a>
          <a href="#" className="hover:text-blue-600">Shipping Policy</a>
          <a href="#" className="hover:text-blue-600">Contact Us</a>
        </div>
        <p className="text-[10px] font-mono">© 2025 HADI KIT PREMIUM. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;
