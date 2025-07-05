import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import ClassCard from "../../../components/ui/Card/ClassCard.jsx";
import { classes1, classes2, classes3 } from "../../../utils/assets";

const Classes = () => {
  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Our</span>
              <span className="font-fraunces italic">Classes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Private Class */}
            <ClassCard
              image={classes1}
              title="Private"
            />

            {/* Semi Private Class */}
            <ClassCard
              image={classes2}
              title="Semi Private"
            />

            {/* Group Class */}
            <ClassCard
              image={classes3}
              title="Group"
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Classes;
