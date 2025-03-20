"use client"; // If using Next.js 13+ with App Router
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#001F3F] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white font-bold text-2xl transition-all duration-300 hover:text-indigo-400 hover:scale-105">
              QuickCast
            </span>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-200 hover:text-indigo-400 font-medium">Home</Link>
            <Link href="/features" className="text-gray-200 hover:text-indigo-400 font-medium">Features</Link>
            <Link href="/how-it-works" className="text-gray-200 hover:text-indigo-400 font-medium">How It Works</Link>
            <Link href="/about" className="text-gray-200 hover:text-indigo-400 font-medium">About</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-indigo-300 hover:text-indigo-500 font-medium">Login</Link>
            <Link href="/signup" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium">Sign Up</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-gray-500 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#001F3F]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-700">Home</Link>
            <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-700">Features</Link>
            <Link href="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-700">How It Works</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-indigo-400 hover:bg-gray-800">About</Link>
            <div className="pt-4 pb-3 border-t border-gray-600">
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-indigo-500">Login</Link>
              <Link href="/signup" className="block px-3 py-2 mt-1 rounded-md text-base font-medium bg-indigo-500 text-white hover:bg-indigo-600">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
