export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-soft-brown-dark mb-4">Outta Town Donuts</h3>
            <p className="text-soft-brown text-sm">Handcrafted donuts made fresh daily with love and local ingredients.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-soft-brown-dark mb-4">Pickup Locations</h3>
            <ul className="space-y-2 text-soft-brown text-sm">
              <li className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-pastel-pink rounded-full"></span> Farm Stand - Main St</li>
              <li className="flex items-center gap-2"><span className="inline-block w-4 h-4 bg-pastel-pink rounded-full"></span> Flea Market Booth - Saturdays</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-soft-brown-dark mb-4">Contact</h3>
            <p className="text-soft-brown text-sm">orders@outtatowndonuts.com</p>
            <p className="text-soft-brown text-sm">(555) 123-DONUT</p>
          </div>
        </div>
        <div className="border-t border-stone-100 mt-8 pt-8 text-center text-soft-brown/60 text-sm">
          © 2024 Outta Town Donuts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
