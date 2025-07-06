import React from "react";

const HeroSection = ({ title1, title2, image, className = "", variant = "default", subtitle = "Class" }) => {
  return (
    <div className={`relative w-full h-48 sm:h-56 md:h-64 ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${image}')`
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(272deg, rgba(82, 82, 81, 0) -58.44%, #525251 82.16%)"
        }}
      />

      {/* Centered Text */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        {variant === "classCard" ? (
          <div className="text-center">
            <h3 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-['Raleway'] leading-tight">
              {title1}
            </h3>
            <div className="bg-primary px-2 sm:px-4 py-1 sm:py-2 inline-block mt-1 sm:mt-2">
              <span className="text-white italic text-lg sm:text-2xl md:text-4xl lg:text-5xl font-normal font-['Fraunces'] leading-tight">
                {subtitle}
              </span>
            </div>
          </div>
        ) : (
          <h1 className="text-white font-raleway font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-normal text-center">
            {title1} <span className="font-fraunces italic block sm:inline">{title2}</span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default HeroSection; 