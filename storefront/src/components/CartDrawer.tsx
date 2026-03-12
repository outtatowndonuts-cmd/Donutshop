import { ShoppingBag, X, Donut } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          {/* Empty State */}
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-warm-cream rounded-full flex items-center justify-center mx-auto mb-4">
              <Donut className="w-12 h-12 text-soft-brown/30" />
            </div>
            <p className="text-soft-brown text-lg">Your cart is empty</p>
            <p className="text-gray-500 text-sm mt-1">Add some delicious donuts!</p>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-stone-100 px-6 py-4 bg-warm-cream/20 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-soft-brown-dark">
            <span>Total</span>
            <span>$0.00</span>
          </div>
          <a
            href="/checkout"
            className="block w-full py-4 bg-soft-brown text-white rounded-full font-semibold text-center hover:bg-soft-brown-dark transition-all min-h-[56px] shadow-lg shadow-soft-brown/20 opacity-50 pointer-events-none"
          >
            Proceed to Checkout
          </a>
          <button className="block w-full py-3 text-soft-brown font-medium hover:text-soft-brown-dark transition-colors text-center" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
