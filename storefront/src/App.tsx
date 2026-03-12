import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';


import { useState } from 'react';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cream text-gray-800 font-sans antialiased">
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage cartOpen={cartOpen} setCartOpen={setCartOpen} />} />
            {/* Add more routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
