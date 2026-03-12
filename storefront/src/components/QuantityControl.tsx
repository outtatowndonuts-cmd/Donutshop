
import { Minus, Plus } from 'lucide-react';
import type { CartItem } from '../App';

interface QuantityControlProps {
  item: CartItem;
  onChange: (id: string, newQty: number) => void;
}

export default function QuantityControl({ item, onChange }: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1 rounded-full bg-warm-cream hover:bg-pastel-pink transition-colors"
        onClick={() => onChange(item.id, Math.max(1, item.quantity - 1))}
        aria-label="Decrease quantity"
        disabled={item.quantity <= 1}
      >
        <Minus className="w-4 h-4 text-soft-brown-dark" />
      </button>
      <span className="px-2 font-bold text-soft-brown-dark">{item.quantity}</span>
      <button
        className="p-1 rounded-full bg-warm-cream hover:bg-pastel-pink transition-colors"
        onClick={() => onChange(item.id, item.quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-soft-brown-dark" />
      </button>
    </div>
  );
}
