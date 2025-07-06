import React from "react";
import { Link } from "react-router-dom";

const ClassCard = ({ image, title, className = "" }) => {
  // Convert title to URL-friendly format
  const getClassType = (title) => {
    const typeMap = {
      "Private": "private",
      "Semi Private": "semi-private",
      "Group": "group"
    };
    return typeMap[title] || "private";
  };

  const classType = getClassType(title);

  return (
    <Link 
      to={`/classes/${classType}`}
      className={`block transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-600/0 to-neutral-600/80 cursor-pointer">
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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
    </Link>
  );
};

export default ClassCard;
