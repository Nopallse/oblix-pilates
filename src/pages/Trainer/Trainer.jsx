import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout/PublicLayout";

const Trainer = () => {
  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Instructor & Founder",
      specialty: "Classical Pilates & Rehabilitation",
      experience: "10+ years",
      certification: "Comprehensive Pilates Certification, PMA-CPT",
      bio: "Sarah founded Oblix Pilates after a decade of teaching in premier studios across the country. Her teaching style combines classical techniques with modern movement science.",
      schedule: ["Mon 6am-12pm", "Wed 6am-12pm", "Fri 6am-12pm"],
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Instructor",
      specialty: "Athletic Conditioning & Posture Correction",
      experience: "8 years",
      certification: "STOTT PILATES® Certified, ACE Personal Trainer",
      bio: "With a background in sports medicine, Michael specializes in working with athletes and clients recovering from injuries. His classes focus on building functional strength and mobility.",
      schedule: ["Mon 3pm-9pm", "Thu 6am-12pm", "Sat 8am-2pm"],
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Pilates Instructor",
      specialty: "Prenatal & Postnatal Pilates",
      experience: "5 years",
      certification: "Balanced Body Certified, Pre/Postnatal Specialist",
      bio: "Aisha's gentle yet effective approach makes her classes popular with new mothers and clients seeking a mindful movement practice. She specializes in prenatal and postnatal care.",
      schedule: ["Tue 9am-3pm", "Thu 3pm-9pm", "Sat 3pm-7pm"],
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Pilates & Movement Instructor",
      specialty: "Contemporary Pilates & Functional Movement",
      experience: "6 years",
      certification: "BASI Pilates Certified, FRC Mobility Specialist",
      bio: "David blends traditional Pilates with contemporary movement methodologies. His energetic teaching style challenges clients while maintaining proper form and alignment.",
      schedule: ["Tue 6am-12pm", "Wed 3pm-9pm", "Sun 9am-3pm"],
    },
  ];

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-fraunces font-bold mb-2 text-secondary">
            Our Trainers
          </h1>
          <p className="text-lg text-gray-600 mb-10 font-montserrat">
            Meet the expert instructors who will guide you on your Pilates
            journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="bg-gray-200 md:w-1/3 h-64 md:h-auto flex items-center justify-center">
                  [Trainer Photo]
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-fraunces font-semibold text-secondary">
                    {trainer.name}
                  </h2>
                  <p className="text-primary font-montserrat font-medium mb-2">
                    {trainer.role}
                  </p>

                  <div className="mb-4">
                    <p className="text-gray-700 font-montserrat mb-4">
                      {trainer.bio}
                    </p>

                    <div className="text-sm text-gray-600 font-montserrat">
                      <p>
                        <span className="font-medium">Specialty:</span>{" "}
                        {trainer.specialty}
                      </p>
                      <p>
                        <span className="font-medium">Experience:</span>{" "}
                        {trainer.experience}
                      </p>
                      <p>
                        <span className="font-medium">Certification:</span>{" "}
                        {trainer.certification}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-fraunces font-medium text-secondary mb-2">
                      Teaching Schedule
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {trainer.schedule.map((day, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm font-montserrat"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-fraunces font-semibold mb-4 text-secondary">
              Book a Session with Our Trainers
            </h2>
            <p className="text-gray-700 font-montserrat mb-6">
              Ready to start your Pilates journey with one of our expert
              instructors? Book a private session or join one of our group
              classes today.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-opacity-80 text-white rounded-full px-6 py-3 transition-colors font-montserrat font-medium">
                Book a Private Session
              </button>
              <button className="bg-secondary hover:bg-opacity-80 text-white rounded-full px-6 py-3 transition-colors font-montserrat font-medium">
                View Class Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Trainer;
