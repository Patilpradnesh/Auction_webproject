import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/SignIn");
  };

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  if (!isAdmin) {
    navLinks.push({ name: "Contact", path: "/Contact" });
    navLinks.push({ name: "Help", path: "/help" });
  }

  if (isAuthenticated) {
    if (isAdmin) {
      navLinks.push({ name: "Admin Panel", path: "/admin" });
    } else {
      navLinks.push({ name: "Dashboard", path: "/Dashboard" });
    }
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm py-1 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-slate-900">
              Auction<span className="text-blue-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === link.path ? "text-blue-600" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section (Tools & Auth) */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Search Toggle */}
            <button className="text-slate-500 hover:text-primary transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notification Center */}
            {isAuthenticated && (
              <button className="text-slate-500 hover:text-primary transition-colors p-1 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Unread indicator */}
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger ring-2 ring-white"></span>
              </button>
            )}

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200"></div>

            {/* Auth Section */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  Welcome, <span className="font-semibold text-slate-900">{user.name || user.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-danger transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/SignIn"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover shadow-md transition-all hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 absolute w-full left-0 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 mt-2 border-t border-slate-100">
              {isAuthenticated && user ? (
                <div className="space-y-3 px-3">
                  <p className="text-sm text-slate-500">Logged in as {user.name || user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3 px-3">
                  <Link
                    to="/SignIn"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2.5 text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/SignUp"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2.5 text-white bg-blue-600 rounded-lg shadow-md"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;