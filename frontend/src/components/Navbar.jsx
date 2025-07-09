import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-800 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-xl sm:text-2xl font-bold transition-colors duration-300">Library Website</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-base sm:text-lg transition-all duration-300">
          <li>
            <Link to="/" className="hover:text-gray-400 transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400 transition-colors duration-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400 transition-colors duration-300">Contact Us</Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 transition duration-300">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 text-base bg-white border-t border-gray-200">
          <li>
            <Link to="/" onClick={toggleMenu} className="hover:text-gray-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu} className="hover:text-gray-400 transition">About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu} className="hover:text-gray-400 transition">Contact Us</Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="hover:text-gray-400 transition"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;