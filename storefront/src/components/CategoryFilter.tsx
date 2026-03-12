import { useState } from 'react';

const categories = [
  { key: 'all', label: 'All Donuts' },
  { key: 'classic', label: 'Classics' },
  { key: 'filled', label: 'Filled' },
  { key: 'specialty', label: 'Specialty' },
];

export default function CategoryFilter({ selected, onSelect }: {
  selected: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Donut categories">
      {categories.map(cat => (
        <button
          key={cat.key}
          className={`category-btn px-6 py-3 rounded-full font-medium min-h-[48px] transition-all ${
            selected === cat.key
              ? 'bg-soft-brown text-white shadow-md'
              : 'bg-white text-soft-brown border border-stone-200 hover:bg-warm-cream'
          }`}
          data-category={cat.key}
          onClick={() => onSelect(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
