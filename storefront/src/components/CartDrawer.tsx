import { ShoppingBag, X, Donut, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuantityControl from './QuantityControl';
import type { CartItem } from '../App';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, newQty: number) => void;
}

export default function CartDrawer({ open, onClose, cart, removeFromCart, updateCartQty }: CartDrawerProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'hidden'}`}
      aria-labelledby="cart-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity opacity-100"
        onClick={onClose}
      ></div>
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-warm-cream/30">
          <h2 id="cart-title" className="text-xl font-bold text-soft-brown-dark flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </h2>
          <button className="p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Close cart" onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-warm-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <Donut className="w-12 h-12 text-soft-brown/30" />
              </div>
              <p className="text-soft-brown text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-1">Add some delicious donuts!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-stone-100 pb-4 last:border-b-0 last:pb-0">
                <div>
                  <div className="font-bold text-soft-brown-dark">{item.name}</div>
                  <div className="text-soft-brown text-sm">${item.price.toFixed(2)}</div>
                  <QuantityControl item={item} onChange={updateCartQty} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold text-soft-brown-dark">${(item.price * item.quantity).toFixed(2)}</div>
                  <button className="p-2 hover:bg-warm-cream rounded-full" aria-label="Remove" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="w-4 h-4 text-soft-brown-dark" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Footer */}
        <div className="border-t border-stone-100 px-6 py-4 bg-warm-cream/20 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-soft-brown-dark">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className={`block w-full py-4 bg-soft-brown text-white rounded-full font-semibold text-center hover:bg-soft-brown-dark transition-all min-h-[56px] shadow-lg shadow-soft-brown/20${cart.length === 0 ? ' opacity-50 pointer-events-none' : ''}`}
            onClick={onClose}
          >
            Proceed to Checkout
          </Link>
          <button className="block w-full py-3 text-soft-brown font-medium hover:text-soft-brown-dark transition-colors text-center" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
