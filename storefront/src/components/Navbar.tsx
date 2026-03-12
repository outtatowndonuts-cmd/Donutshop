import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, Donut } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Menu' },
  { to: '/builder', label: 'Build a Box' },
  { to: '/tracking', label: 'Track Order' },
];

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-pastel-pink rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Donut className="w-6 h-6 text-soft-brown-dark" />
            </div>
            <span className="text-xl font-bold text-soft-brown-dark tracking-tight">Outta Town</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-soft-brown hover:text-soft-brown-dark font-medium transition-colors${isActive ? ' underline' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Cart Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 rounded-full hover:bg-warm-cream transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-pink"
              aria-label="Open cart"
              onClick={onCartOpen}
            >
              <ShoppingBag className="w-6 h-6 text-soft-brown-dark" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink text-soft-brown-dark text-xs font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-warm-cream transition-colors"
              aria-label="Open menu"
              onClick={() => setMobileOpen(m => !m)}
            >
              <Menu className="w-6 h-6 text-soft-brown-dark" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium text-soft-brown hover:bg-warm-cream${isActive ? ' underline' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
