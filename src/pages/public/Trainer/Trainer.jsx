import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";

const Trainer = () => {

 

  return (
    <PublicLayout>

      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Meet out</span>
              <span className="font-fraunces italic">Trainers</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Trainer Cards */}
            <TrainerCard
              image="/src/assets/images/trainers/trainer1.png"
              name="Coach Name"
              description="Deskripsi Coach"
              bio="Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer2.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer3.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer3.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer1.png"
              name="Coach Name"
              description="Deskripsi Coach"
              bio="Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer2.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer3.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image="/src/assets/images/trainers/trainer3.png"
              name="Coach Name"
              description="Deskripsi Coach"
            />
          </div>
        </div>
      </section>

      
    </PublicLayout>
  );
};

export default Trainer;
