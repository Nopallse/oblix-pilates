import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { logoSekunder } from "../../../shared/utils/assets";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mendapatkan informasi URL saat ini
  const location = useLocation();
  const pathname = location.pathname;

  // Handle event scroll untuk styling header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Tutup menu mobile saat route berubah
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Cegah scroll body saat menu terbuka
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Fungsi untuk menentukan class menu aktif (desktop)
  const getNavLinkClass = (path) => {
    const baseClasses = "transition-colors font-montserrat";
    const activeClasses = "text-white font-extrabold";
    const inactiveClasses = "text-white font-normal";

    if (path === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    } else if (path !== "/" && pathname.startsWith(path)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${inactiveClasses}`;
  };

  // Fungsi untuk menentukan class menu aktif (mobile)
  const getMobileNavLinkClass = (path) => {
    const baseClasses = "block py-4 px-6 text-lg transition-all duration-200 font-montserrat";
    const activeClasses = "text-white font-extrabold bg-white/10 border-l-4 border-white";
    const inactiveClasses = "text-white font-normal";

    if (path === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    } else if (path !== "/" && pathname.startsWith(path)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <>
      <header
        className={`bg-primary text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-xl backdrop-blur-sm bg-primary/95" : "shadow-sm"
        }`}
      >
        <div className="w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-3 sm:py-4 md:py-5 lg:py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="block">
              <img
                src={logoSekunder}
                alt="Oblix Pilates"
                className="h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden lg:block mr-6 xl:mr-8 2xl:mr-10">
              <ul className="flex space-x-4 lg:space-x-5 xl:space-x-6 2xl:space-x-8 font-montserrat text-sm lg:text-base">
                <li>
                  <Link to="/" className={getNavLinkClass("/")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={getNavLinkClass("/about")}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/classes" className={getNavLinkClass("/classes")}>
                    Classes
                  </Link>
                </li>
                <li>
                  <Link to="/trainer" className={getNavLinkClass("/trainer")}>
                    Trainer
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={getNavLinkClass("/contact")}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={getNavLinkClass("/blog")}>
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex space-x-2 md:space-x-3 lg:space-x-4">
              <Button
                to="/book-trial"
                variant="outline-white"
                size="small"
                className="text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
              >
                Book a Trial
              </Button>
              <Button
                to="/login"
                variant="filled-white"
                size="small"
                className="text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2"
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-3 sm:ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 hover:bg-white/10"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Side Navigation Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 sm:w-72 md:w-80 max-w-[85vw] bg-secondary shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="flex items-center justify-center p-4 sm:p-6 border-b border-gray-600">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logoSekunder}
                alt="Oblix Pilates"
                className="h-7 sm:h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 sm:py-6">
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={getMobileNavLinkClass("/")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={getMobileNavLinkClass("/about")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/classes" 
                  className={getMobileNavLinkClass("/classes")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link 
                  to="/trainer" 
                  className={getMobileNavLinkClass("/trainer")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trainer
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={getMobileNavLinkClass("/contact")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className={getMobileNavLinkClass("/blog")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="p-4 sm:p-6 border-t border-gray-600 space-y-3">
            <Button
              to="/book-trial"
              variant="primary"
              size="medium"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-sm sm:text-base"
            >
              Book a Trial
            </Button>
            <Button
              to="/login"
              variant="filled-white"
              size="medium"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-sm sm:text-base"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicHeader;
