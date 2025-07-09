import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Hide footer on /admin route
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">Library Website</h2>
          <p className="text-sm">Your gateway to knowledge and imagination.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-white">Contact Us</h3>
          <p className="text-sm">Email: support@library.com</p>
          <p className="text-sm">Phone: +91-9876543210</p>
          <p className="text-sm">Location: Pune, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-white">Follow Us</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
            <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Library Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;