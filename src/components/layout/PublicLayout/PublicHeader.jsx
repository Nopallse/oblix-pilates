import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { logoSekunder } from "../../../utils/assets";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Get current URL information
  const location = useLocation();
  const pathname = location.pathname;

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
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

  // Function to determine active menu class
  const getNavLinkClass = (path) => {
    const baseClasses = "transition-colors font-montserrat";
    const activeClasses = "text-primary font-medium";
    const inactiveClasses = "text-white hover:text-primary";

    if (path === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    } else if (path !== "/" && pathname.startsWith(path)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${inactiveClasses}`;
  };

  // Mobile menu link class
  const getMobileNavLinkClass = (path) => {
    const baseClasses = "block py-4 px-6 text-lg transition-all duration-200 font-montserrat";
    const activeClasses = "text-primary font-semibold bg-primary/10 border-l-4 border-primary";
    const inactiveClasses = "text-white hover:text-primary hover:bg-white/10";

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
        className={`bg-secondary text-white sticky top-0 z-50 ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logoSekunder}
                alt="Oblix Pilates"
                className="h-6 sm:h-6"
              />
            </Link>
          </div>

          <div className="flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden lg:block mr-6">
              <ul className="flex space-x-6 font-montserrat text-sm">
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
          <div className="w-8"></div>

          {/* Action Buttons */}
            <div className="hidden sm:flex space-x-3">
              <Button
                to="/book-trial"
                variant="primary"
                size="small"
              >
                Book a Trial
              </Button>
              <Button
                to="#"
                variant="outline-white"
                size="small"
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 hover:bg-white/10"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
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
                  className="w-6 h-6"
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
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-secondary shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="flex items-center justify-center p-6 border-b border-gray-600">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logoSekunder}
                alt="Oblix Pilates"
                className="h-8"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2">
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
          <div className="p-6 border-t border-gray-600 space-y-3">
            <Button
              to="/book-trial"
              variant="primary"
              size="medium"
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
            >
              Book a Trial
            </Button>
            <Button
              to="#"
              variant="outline"
              size="medium"
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
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
