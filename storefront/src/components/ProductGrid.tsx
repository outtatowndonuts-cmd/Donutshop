
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';

interface ProductGridProps {
  addToCart: (product: { id: string; name: string; price: number }) => void;
}

export default function ProductGrid({ addToCart }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(data => {
        // JSON:API: data.data is the array of products
        setProducts(Array.isArray(data?.data) ? data.data : []);
        setError(null);
      })
      .catch(e => {
        setProducts([]); // Always set to array on error
        setError(e.message || 'Failed to load products');
      })
      .finally(() => setLoading(false));
  }, []);

  // Bypass filtering for now; show all products
  const filtered = products;

  return (
    <div id="productGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {loading ? (
        <div className="col-span-full text-center text-soft-brown/60">Loading products...</div>
      ) : error ? (
        <div className="col-span-full text-center text-red-500">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="col-span-full text-center text-soft-brown/60">No products found.</div>
      ) : (
        filtered.map((product: any) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-pastel-pink rounded-full mb-4 flex items-center justify-center">
              {/* Placeholder for image */}
              <span className="text-4xl">🍩</span>
            </div>
            <h3 className="text-lg font-bold text-soft-brown-dark mb-1">{product.attributes?.name}</h3>
            <p className="text-soft-brown text-sm mb-2 text-center">{product.attributes?.description}</p>
            <div className="font-bold text-soft-brown-dark mb-4">${product.attributes?.price ? Number(product.attributes.price).toFixed(2) : 'N/A'}</div>
            <button
              className="px-6 py-2 bg-soft-brown text-white rounded-full font-semibold hover:bg-soft-brown-dark transition-all"
              onClick={() => addToCart({ id: product.id, name: product.attributes?.name, price: Number(product.attributes?.price) })}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
}
