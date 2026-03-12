import { useState } from 'react';

// Dummy data for now
const products = [
  // { id: 1, name: 'Classic Glazed', ... }
];

export default function ProductGrid({ category }: { category: string }) {
  // Filter logic will go here
  return (
    <div id="productGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {/* Products will be rendered here */}
      <div className="col-span-full text-center text-soft-brown/60">No products yet.</div>
    </div>
  );
}
