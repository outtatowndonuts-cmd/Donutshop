// ...existing code...
import { debugLog } from '../debug';


// ...existing code...

interface CheckoutPageProps {
  cart: { id: number; name: string; price: number; quantity: number }[];
  createOrder: (order: any) => Promise<any>;
	clearCart: () => void;
}

export default function CheckoutPage({ cart, createOrder, clearCart }: CheckoutPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  const validate = () => {
    if (!name.trim()) return 'Name is required.';
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) return 'Valid email is required.';
    if (!phone.trim() || !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) return 'Valid phone is required.';
    if (!address.trim()) return 'Address is required.';
    if (cart.length === 0) return 'Your cart is empty.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, address: true });
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await createOrder({
        customer: { name, email, phone, address },
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
      });
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || 'Order failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-soft-brown-dark mb-6">Thank you for your order!</h1>
        <p className="mb-8 text-soft-brown">You’ll receive a confirmation email soon.</p>
        <a href="/" className="inline-block mt-4 px-6 py-3 bg-soft-brown text-white rounded-full font-semibold hover:bg-soft-brown-dark transition-all">Return to Menu</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-soft-brown-dark mb-6">Checkout</h1>
      <form className="bg-white border border-pastel-pink rounded-2xl shadow p-8 text-soft-brown-dark space-y-6" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-bold mb-2">Contact & Delivery</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Name</label>
              <input id="name" className={`w-full rounded px-3 py-2 border${touched.name && !name ? ' border-red-400' : ''}`} value={name} onChange={e => setName(e.target.value)} onBlur={() => setTouched(t => ({ ...t, name: true }))} required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input id="email" type="email" className={`w-full rounded px-3 py-2 border${touched.email && (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) ? ' border-red-400' : ''}`} value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(t => ({ ...t, email: true }))} required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="phone">Phone</label>
              <input id="phone" type="tel" className={`w-full rounded px-3 py-2 border${touched.phone && (!phone || !/^\d{10,}$/.test(phone.replace(/\D/g, ''))) ? ' border-red-400' : ''}`} value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => setTouched(t => ({ ...t, phone: true }))} required />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="address">Address</label>
              <input id="address" className={`w-full rounded px-3 py-2 border${touched.address && !address ? ' border-red-400' : ''}`} value={address} onChange={e => setAddress(e.target.value)} onBlur={() => setTouched(t => ({ ...t, address: true }))} required />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <div className="bg-pastel-pink/10 rounded-xl p-4">
            {cart.length === 0 ? (
              <div className="text-soft-brown/60">Your cart is empty.</div>
            ) : (
              <ul className="mb-2 divide-y divide-pastel-pink">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-2"><span className="text-2xl">🍩</span> {item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-soft-brown text-white rounded-full font-semibold hover:bg-soft-brown-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={submitting || cart.length === 0}
        >
          {submitting && <span className="animate-spin mr-2">⏳</span>}
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
