import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check current path
  const path = location.pathname;

  // Logo click handler: navigate home (or dashboard)
  const handleLogoClick = () => {
    if (path === "/login" || path === "/register") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo always visible, clickable */}
      <h1
        className="cursor-pointer text-2xl font-bold text-blue-600"
        onClick={handleLogoClick}
      >
        ServiceHub
      </h1>

      {/* Show nav ONLY on dashboard or main app pages */}
      {path === "/" && (
         
         <>
          <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-blue-500">How it Works</a>
          <a href="#services" className="hover:text-blue-500">Services</a>
          <a href="#marketplace" className="hover:text-blue-500">Marketplace</a>
          <a href="#register" className="hover:text-blue-500">Join Us</a>
        </nav>
        <div className="flex gap-3">
          <Link to={"/register"} className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
          <Link to={"/login"} className="cursor-pointer border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">Login</Link>
        </div>
        </>
      )}
    </header>
  );
}
