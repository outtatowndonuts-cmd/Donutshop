import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import TrackingPage from './pages/TrackingPage';
import CheckoutPage from './pages/CheckoutPage';
import { createOrder } from './api';


import { useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    console.debug('addToCart called with:', product);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQty = (id: string, newQty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cream text-gray-800 font-sans antialiased">
        <Navbar onCartOpen={() => setCartOpen(true)} cart={cart} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} removeFromCart={removeFromCart} updateCartQty={updateCartQty} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} updateCartQty={updateCartQty} />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} createOrder={createOrder} clearCart={() => setCart([])} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
