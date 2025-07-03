import React, { useState, useEffect } from "react";

const ImageSlider = ({ images, autoSlideInterval = 5000 }) => {
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

  return (
    <div
      className="mx-auto mb-10 relative overflow-hidden rounded-lg"
      style={{ aspectRatio: "1758/556" }}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out"
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
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${
              index === currentSlide ? "bg-opacity-80" : "bg-opacity-50"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slider Navigation Arrows */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
