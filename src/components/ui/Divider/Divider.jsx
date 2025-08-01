import React from "react";
import { flowerIcon } from "../../../shared/utils/assets";

const Divider = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-14 w-full">
        <div className="flex justify-center items-center relative">
          <div className="w-full border-t border-[#E6E6E6]"></div>
          <div className="absolute bg-white p-1">
            <img
              src={flowerIcon}
              className="w-6 h-6"
              alt="Divider icon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Divider;
