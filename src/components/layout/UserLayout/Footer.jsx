import React from "react";
import { Link } from "react-router-dom";
import { logoPrimer } from "../../../shared/utils/assets";

const PublicFooter = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        {/* Main footer content with improved mobile layout */}
        <div className="flex flex-col space-y-8 sm:space-y-10 lg:space-y-0 lg:flex-row lg:gap-8 xl:gap-12 2xl:gap-16">
          {/* Logo section - centered on mobile, left-aligned on desktop */}
          <div className="flex my-auto justify-center lg:justify-start lg:flex-shrink-0">
            <Link to="/" className="block">
              <img
                src={logoPrimer}
                alt="Oblix Pilates"
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 w-auto"
              />
            </Link>
          </div>

          {/* Content sections with improved mobile grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 xl:gap-12 2xl:gap-16 w-full">
            {/* Our Contact - full width on mobile, 6 columns on desktop */}
            <div className="flex flex-col space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-6">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-fraunces font-semibold mb-3 text-center sm:text-left">
                Our Contact
              </h3>
              {/* Contact content wrapper - centered container with left-aligned content */}
              <div className="flex justify-center sm:justify-center lg:justify-start">
                <div className="flex flex-col space-y-4 sm:space-y-5 text-start">
                  {/* Address */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <svg
                      width="18"
                      height="24"
                      viewBox="0 0 20 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 mt-1 w-4 h-5 sm:w-5 sm:h-6"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0023 13.1705C8.49923 13.1705 7.28179 11.953 7.28179 10.45C7.28179 8.94687 8.49923 7.72943 10.0023 7.72943C11.5054 7.72943 12.7229 8.94687 12.7229 10.45C12.7229 11.953 11.5054 13.1705 10.0023 13.1705ZM10.0023 0.629883C4.74354 0.629883 0.480469 4.89295 0.480469 10.1517C0.480469 15.4105 10.0023 27.8352 10.0023 27.8352C10.0023 27.8352 19.5242 15.4105 19.5242 10.1517C19.5242 4.89295 15.2611 0.629883 10.0023 0.629883Z"
                        fill="white"
                      />
                    </svg>
                    <div className="text-white font-montserrat text-xs sm:text-sm md:text-base text-start">
                      <p>Jl. Muara karang raya 293, Terraza 301,</p>
                      <p>Lantai 2, Jakarta, Indonesia 14450</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 sm:gap-4 text-white font-montserrat">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.6311 20.3341C21.9406 22.4322 19.2356 23.4786 17.3029 23.3041C14.6635 23.0655 11.7914 21.6656 9.61127 20.1237C6.40665 17.857 3.40484 14.3509 1.65565 10.6303C0.41943 8.00127 0.142067 4.76892 1.98073 2.37254C2.66073 1.48676 3.39589 1.01369 4.50088 0.958512C6.03385 0.883951 6.24859 1.76094 6.77498 3.12689C7.16717 4.14837 7.69058 5.19035 7.98286 6.24911C8.53014 8.22497 6.61691 8.30755 6.37534 9.92254C6.22472 10.941 7.45945 12.3069 8.01716 13.0331C9.11022 14.4557 10.424 15.6828 11.9062 16.6163C12.7547 17.1516 14.1252 18.1163 15.0974 17.5839C16.5946 16.7638 16.453 14.2393 18.5466 15.0937C19.6307 15.5351 20.6805 16.1721 21.7154 16.7298C23.3155 17.5903 23.241 18.482 22.6311 20.3341C23.0874 18.9502 22.1747 21.7179 22.6311 20.3341Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-xs sm:text-sm md:text-base">085883335533</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Pages - improved mobile layout */}
            <div className="sm:col-span-1 lg:col-span-3">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-fraunces font-semibold mb-4 sm:mb-5 text-center sm:text-left">
                Our Pages
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1 sm:gap-y-2 md:gap-y-3">
                <div className="text-center sm:text-left">
                  <Link
                    to="/"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    Home
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <Link
                    to="/about"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    About
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <Link
                    to="/classes"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    Classes
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <Link
                    to="/trainer"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    Trainer
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <Link
                    to="/contact"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    Contact
                  </Link>
                </div>
                <div className="text-center sm:text-left">
                  <Link
                    to="/blog"
                    className="text-white hover:text-primary transition-colors font-montserrat text-xs sm:text-sm md:text-base block py-1 sm:py-1.5"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Media - improved mobile layout */}
            <div className="sm:col-span-1 lg:col-span-3">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-fraunces font-semibold mb-4 sm:mb-5 text-center sm:text-left">
                Social Media
              </h3>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="bg-secondary rounded-full p-2 sm:p-2.5 md:p-3 hover:opacity-80 transition-opacity border border-white"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                  className="bg-secondary rounded-full p-2 sm:p-2.5 md:p-3 hover:opacity-80 transition-opacity border border-white"
                >
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-[#7B8FCB] bg-opacity-40 py-3 sm:py-4 md:py-5">
        <div className="w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 text-center">
          <p className="text-white font-montserrat text-[10px] sm:text-xs md:text-sm lg:text-base">
            &copy;2025 Oblix Pilates | Powered by Metro Software
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
