import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
    const baseClasses = "block py-2 px-4 text-base transition-colors";
    const activeClasses = "text-primary font-medium";
    const inactiveClasses = "text-white hover:text-primary";

    if (path === "/" && pathname === "/") {
      return `${baseClasses} ${activeClasses}`;
    } else if (path !== "/" && pathname.startsWith(path)) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <header
      className={`bg-secondary text-white sticky top-0 z-50 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container max-w-6xl mx-auto py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/src/assets/logos/logo_sekunder.png"
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
                    <Link to="/faq" className={getNavLinkClass("/faq")}>
                        FAQ
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
            <Link
              to="/book-trial"
              className="bg-primary hover:bg-opacity-80 text-white rounded-full px-4 py-1 transition-colors flex items-center justify-center font-montserrat font-medium text-sm min-w-[120px]"
            >
              Book a Trial
            </Link>
            <Link
              to="/login"
              className="border border-primary text-white hover:bg-primary hover:text-white rounded-full px-4 py-1 transition-colors flex items-center justify-center font-montserrat font-medium text-sm min-w-[120px]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <nav>
              <ul className="font-montserrat">
                <li className="border-b border-gray-700">
                  <Link to="/" className={getMobileNavLinkClass("/")}>
                    Home
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link to="/about" className={getMobileNavLinkClass("/about")}>
                    About
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link
                    to="/classes"
                    className={getMobileNavLinkClass("/classes")}
                  >
                    Classes
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link
                    to="/trainer"
                    className={getMobileNavLinkClass("/trainer")}
                  >
                    Trainer
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link to="/faq" className={getMobileNavLinkClass("/faq")}>
                    FAQ
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link
                    to="/contact"
                    className={getMobileNavLinkClass("/contact")}
                  >
                    Contact
                  </Link>
                </li>
                <li className="border-b border-gray-700">
                  <Link to="/blog" className={getMobileNavLinkClass("/blog")}>
                    Blog
                  </Link>
                </li>
              </ul>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col sm:hidden space-y-2 mt-4 pb-2">
                <Link
                  to="/book-trial"
                  className="bg-primary hover:bg-opacity-80 text-white rounded-full px-4 py-2 transition-colors flex items-center justify-center font-montserrat font-medium text-sm"
                >
                  Book a Trial
                </Link>
                <Link
                  to="/login"
                  className="border border-primary text-white hover:bg-primary hover:text-white rounded-full px-4 py-2 transition-colors flex items-center justify-center font-montserrat font-medium text-sm"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
