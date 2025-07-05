import React from "react";

const HeroSection = ({ title1, title2, image, className = "" }) => {
  return (
    <div className={`relative w-full h-64 ${className}`}>
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
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <h1 className="text-white font-raleway font-medium text-5xl leading-none tracking-normal">
          {title1} <span className="font-fraunces italic">{title2}</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection; 