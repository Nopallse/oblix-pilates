import React, { useState } from "react";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import ClassCard from "../../../components/ui/Card/ClassCard.jsx";
import { classes1, classes2, classes3 } from "../../../shared/utils/assets.js";

const Classes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const classData = [
    { image: classes1, title: "Private" },
    { image: classes2, title: "Semi Private" },
    { image: classes3, title: "Group" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % classData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + classData.length) % classData.length);
  };

  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Our</span>
              <span className="font-fraunces italic">Classes</span>
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="block md:hidden" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {classData.map((classItem, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <ClassCard
                        image={classItem.image}
                        title={classItem.title}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {classData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Private Class */}
            <div data-aos="fade-up" data-aos-delay="200">
              <ClassCard
                image={classes1}
                title="Private"
              />
            </div>

            {/* Semi Private Class */}
            <div data-aos="fade-up" data-aos-delay="300">
              <ClassCard
                image={classes2}
                title="Semi Private"
              />
            </div>

            {/* Group Class */}
            <div data-aos="fade-up" data-aos-delay="400">
              <ClassCard
                image={classes3}
                title="Group"
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Classes;
