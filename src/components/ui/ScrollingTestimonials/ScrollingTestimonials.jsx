import React from "react";
import TestimonialCard from "../Card/TestimonialCard";

const ScrollingTestimonials = ({ testimonials }) => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <div className="w-full relative overflow-hidden group">
      <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-stretch py-4 testimonial-slider">
        {duplicatedTestimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="w-[260px] sm:w-[280px] md:w-[320px] lg:w-[400px] xl:w-[450px] flex-shrink-0"
          >
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