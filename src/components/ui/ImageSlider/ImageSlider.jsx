import React, { useState, useEffect } from "react";

const ImageSlider = ({ 
  images, 
  autoSlideInterval = 5000, 
  className = "",
  showDots = true,
  showArrows = true,
  fullScreen = false
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, autoSlideInterval);
    
    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen 
    ? "relative overflow-hidden w-full h-full" 
    : "mx-auto mb-6 sm:mb-8 lg:mb-10 relative overflow-hidden rounded-3xl";

  // Image container classes based on fullScreen prop
  const imageContainerClasses = fullScreen
    ? "relative w-full h-full"
    : "relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[400px]";

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Responsive container with different aspect ratios */}
      <div className={imageContainerClasses}>
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              className="w-full h-full object-cover flex-shrink-0"
              alt={image.alt || "Slider image"}
            />
          ))}
        </div>

        {/* Slider Navigation Dots */}
        {showDots && (
          <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
            {images.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white transition-opacity duration-200 ${
                  index === currentSlide ? "bg-opacity-90" : "bg-opacity-50 hover:bg-opacity-70"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}

        {/* Slider Navigation Arrows - Hidden on mobile, visible on tablet+ */}
        {showArrows && (
          <>
            <button 
              className="hidden sm:block absolute top-1/2 left-2 lg:left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-1.5 lg:p-2 hover:bg-opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={goToPrevSlide}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                className="lg:w-4 lg:h-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>
            <button 
              className="hidden sm:block absolute top-1/2 right-2 lg:right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-1.5 lg:p-2 hover:bg-opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              onClick={goToNextSlide}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                className="lg:w-4 lg:h-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </>
        )}

        {/* Touch-friendly navigation for mobile - Invisible touch areas */}
        {!fullScreen && (
          <>
            <button 
              className="absolute left-0 top-0 w-1/4 h-full bg-transparent focus:outline-none"
              onClick={goToPrevSlide}
              aria-label="Previous slide"
            ></button>
            <button 
              className="absolute right-0 top-0 w-1/4 h-full bg-transparent focus:outline-none"
              onClick={goToNextSlide}
              aria-label="Next slide"
            ></button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
