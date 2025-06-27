import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { User, Settings, LogOut, UserCircle, Bell, Heart, Calendar, HelpCircle } from 'lucide-react';
import Cookies from 'js-cookie';

export default function Header() 
{
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const path = location.pathname;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const userEmail = Cookies.get('email');
  const isLoggedIn = !!userEmail;

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile/${userEmail}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (isLoggedIn && !user) fetchUser();
  }, [isLoggedIn, userEmail]);

  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

  const handleProfileOption = (option) => {
    setIsProfileOpen(false);
    switch (option) {
      case 'profile': navigate('/profile'); break;
      case 'mybookings': navigate('/my-bookings'); break;
      case 'settings': navigate('/settings'); break;
      case 'notifications': navigate('/notifications'); break;
      case 'helpcentre': navigate('/help-centre'); break;
      case 'logout':
        Cookies.remove('token', { path: '/' });
        Cookies.remove('email', { path: '/' });
        Cookies.remove('role', { path: '/' });
        setUser(null);
        navigate('/login');
        break;
      default: break;
    }
  };

  const shouldShowProfile = isLoggedIn && !["/", "/login", "/register"].includes(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            ServiceHub
          </h1>

          {(path === "/" && Cookies.get("email") == undefined) && (
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

          {shouldShowProfile && (
            <div className="flex items-center gap-2 relative" ref={profileRef}>
              <button onClick={handleProfileClick} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200">
                <User className="h-6 w-6 text-gray-600" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button onClick={() => handleProfileOption('profile')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><UserCircle className="h-4 w-4" /> View Profile</button>
                    <button onClick={() => handleProfileOption('mybookings')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Calendar className="h-4 w-4" /> My Bookings</button>
                    <button onClick={() => handleProfileOption('settings')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Settings className="h-4 w-4" /> Settings</button>
                    <button onClick={() => handleProfileOption('notifications')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Bell className="h-4 w-4" /> Notifications</button>
                    <button onClick={() => handleProfileOption('helpcentre')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><HelpCircle className="h-4 w-4" /> Help Centre</button>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button onClick={() => handleProfileOption('logout')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" /> Logout</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
