import React from "react";

const ClassCard = ({ image, title, className = "" }) => {
  return (
    <div className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-600/0 to-neutral-600/80 ${className}`}>
      <img
        src={image}
        alt={`${title} Class`}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <h3 className="text-white text-3xl font-medium font-['Raleway']">
          {title}
        </h3>
        <div className="bg-primary px-2 inline-block">
          <span className="text-white text-xl font-normal font-['Fraunces']">
            Class
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
