import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";
import { trainer1, trainer2, trainer3 } from "../../../shared/utils/assets.js";

const Trainer = () => {

 

  return (
    <PublicLayout>

      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Meet out</span>
              <span className="font-fraunces italic">Trainers</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Trainer Cards */}
            <div data-aos="fade-up" data-aos-delay="200">
              <TrainerCard
                image={trainer1}
                name="Coach Name"
                description="Deskripsi Coach"
                bio="Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <TrainerCard
                image={trainer2}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <TrainerCard
                image={trainer3}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <TrainerCard
                image={trainer3}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="600">
              <TrainerCard
                image={trainer1}
                name="Coach Name"
                description="Deskripsi Coach"
                bio="Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="700">
              <TrainerCard
                image={trainer2}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="800">
              <TrainerCard
                image={trainer3}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="900">
              <TrainerCard
                image={trainer3}
                name="Coach Name"
                description="Deskripsi Coach"
              />
            </div>
          </div>
        </div>
      </section>

      
    </PublicLayout>
  );
};

export default Trainer;
