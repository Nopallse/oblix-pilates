import React from "react";
import TestimonialCard from "../Card/TestimonialCard";

const ScrollingTestimonials = ({ testimonials }) => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div className="w-full relative overflow-hidden group">

      <div className="flex gap-8 sm:gap-12 items-stretch py-4 animate-slider-scroll group-hover:pause">
        {duplicatedTestimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="w-[280px] sm:w-[320px] md:w-[450px] flex-shrink-0"
            style={{ 
              // Adjust animation speed with animation-duration in the style
               animation: "slider-scroll 5s linear infinite"
            }}
          >
            {/* Wrapper ini juga perlu h-full agar bisa meneruskan tinggi */}
            <div className="transform hover:scale-105 transition-transform duration-300 h-full">
              <TestimonialCard {...testimonial} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTestimonials;