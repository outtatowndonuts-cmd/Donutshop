import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import CartDrawer from '../components/CartDrawer';
import type { CartItem } from '../App';

interface HomePageProps {
  cart: CartItem[];
  addToCart: (product: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, newQty: number) => void;
}

export default function HomePage({ cart, addToCart, removeFromCart, updateCartQty }: HomePageProps) {
  const [category, setCategory] = useState('all');

  return (
    <div>
      {/* HeroBanner */}
      <section className="relative bg-gradient-to-br from-warm-cream via-white to-pastel-pink/20 py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pastel-pink rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-light-chocolate rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-soft-brown-dark mb-4 leading-tight">
              Fresh Donuts, <br />
              <span className="text-pastel-pink-dark">Made with Love</span>
            </h1>
            <p className="text-lg md:text-xl text-soft-brown mb-8 leading-relaxed">
              Handcrafted daily with local ingredients. Build your custom box or choose from our artisan selection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#menu" className="inline-flex items-center justify-center px-8 py-4 bg-soft-brown text-white rounded-full font-semibold hover:bg-soft-brown-dark transition-all transform hover:scale-105 shadow-lg shadow-soft-brown/20 min-h-[56px]">
                Browse Menu
              </a>
              <a href="/builder" className="inline-flex items-center justify-center px-8 py-4 bg-white text-soft-brown-dark border-2 border-pastel-pink rounded-full font-semibold hover:bg-pastel-pink/10 transition-all min-h-[56px]">
                Build Custom Box
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <main id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter selected={category} onSelect={setCategory} />
        <ProductGrid category={category} addToCart={addToCart} />
      </main>
    </div>
  );
}
