import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, Plus, Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = location.pathname;

  const handleLogoClick = () => {
    if (path === "/login" || path === "/register") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={handleLogoClick}
          >
            ServiceHub
          </h1>

          {/* Show this nav only on root (landing) page */}
          {path === "/" && (
            <>
              <nav className="hidden md:flex space-x-6 ml-10">
                <a href="#features" className="hover:text-blue-500">How it Works</a>
                <a href="#services" className="hover:text-blue-500">Services</a>
                <a href="#marketplace" className="hover:text-blue-500">Marketplace</a>
                <a href="#register" className="hover:text-blue-500">Join Us</a>
              </nav>
              <div className="flex gap-3 ml-auto">
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
                <Link to="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">Login</Link>
              </div>
            </>
          )}

          {/* Show this nav only on /home or dashboard pages */}
          {path.startsWith("/home") && (
            <>
              
              {/* Profile + Mobile Menu Toggle */}
              <div className="flex items-center gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200">
                  <User className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
