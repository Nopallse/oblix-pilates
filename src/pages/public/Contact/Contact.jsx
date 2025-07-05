import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import { locationIcon, phoneIcon, instagramIcon, tiktokIcon, banner1 } from "../../../utils/assets";
import Divider from "../../../components/ui/Divider/Divider";
const Contact = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const faqItems = [
    {
      id: 1,
      question: "What is Pilates?",
      answer: "Pilates is a form of low-impact exercise that aims to strengthen muscles while improving postural alignment and flexibility. The method was developed by Joseph Pilates in the early 20th century and focuses on controlled movements, breathing techniques, and core strength."
    },
    {
      id: 2,
      question: "Is Pilates suitable for beginners?",
      answer: "Absolutely! Pilates is adaptable for all fitness levels, including complete beginners. Our instructors will guide you through proper form and technique, offering modifications as needed."
    },
    {
      id: 3,
      question: "What's the difference between mat and reformer Pilates?",
      answer: "Mat Pilates involves exercises on the floor using body weight, while reformer Pilates uses equipment with springs and pulleys. Both focus on core principles."
    },
    {
      id: 4,
      question: "How often should I do Pilates to see results?",
      answer: "We recommend 2-3 times per week. Many clients notice improvements after just a few sessions."
    },
    {
      id: 5,
      question: "What should I wear to a Pilates class?",
      answer: "Wear comfortable, form-fitting clothes. Pilates is usually done barefoot or with grip socks."
    },
    {
      id: 6,
      question: "Do I need to bring anything to class?",
      answer: "Just a water bottle! We provide all equipment, but feel free to bring your own mat."
    },
    {
      id: 7,
      question: "How is Pilates different from yoga?",
      answer: "Pilates focuses more on core strength and posture, while yoga includes more flexibility and meditation."
    },
    {
      id: 8,
      question: "Can Pilates help with my back pain?",
      answer: "Yes! Pilates helps strengthen your core and improve posture, which can relieve back pain."
    },
    {
      id: 9,
      question: "What is your cancellation policy?",
      answer: "Cancel at least 24 hours in advance to avoid a full session charge."
    },
    {
      id: 10,
      question: "Do you offer private sessions?",
      answer: "Yes, we offer 55-minute private sessions. You can book online or contact us."
    }
  ];

  return (
    <PublicLayout>
      <HeroSection
        title1="Our"
        title2="Contact"
        image={banner1}
      />

      {/* Contact Content Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1119258977196!2d106.77262797400556!3d-6.115631959971208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d92dd470c6b%3A0x7ab25a3f65b43f5a!2sOBLIX%20PILATES!5e0!3m2!1sid!2sid!4v1751674956325!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OBLIX PILATES Location"
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Location */}
              <div>
                <h3 className="text-3xl font-raleway font-medium text-tertiary mb-6">
                  Location
                </h3>
                <div className="flex items-start space-x-4">
                  <img src={locationIcon} alt="Location" className="w-4 h-5 mt-1" />
                  <div className="flex-1">
                    <p className="text-tertiary text-sm leading-relaxed">
                      Jl. Muara karang raya 293, Terraza 301, Lantai 2, Jakarta, Indonesia 14450
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-3xl font-raleway font-medium text-tertiary mb-6">
                  Contact
                </h3>
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center space-x-4">
                    <img src={phoneIcon} alt="Phone" className="w-4 h-4" />
                    <div>
                      <p className="text-tertiary text-sm ">085883335533</p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center space-x-4">
                    <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                    <div>
                      <p className="text-tertiary text-sm">@oblixpilates</p>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="flex items-center space-x-4">
                    <img src={tiktokIcon} alt="TikTok" className="w-4 h-4" />
                    <div>
                      <p className="text-tertiary text-sm ">@oblixpilates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
        <div className="relative mx-auto mb-8 w-fit text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Frequently Asked</span>
              <span className="font-fraunces italic">Quetions</span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg overflow-hidden transition-all duration-300 relative ${openItems[item.id]
                    ? "bg-gray-200"
                    : "bg-primary"
                  } ${!openItems[item.id] ? "min-h-[80px]" : ""}`}
              >
                {/* Border kiri lurus */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${openItems[item.id] ? "bg-primary" : "bg-gray-200"
                  }`}></div>

                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-8 text-left flex items-center gap-4 transition-colors ${openItems[item.id]
                      ? "text-secondary"
                      : "text-white hover:bg-primary/90"
                    }`}
                >
                  {/* Icon panah di kiri */}
                  <svg
                    className={`w-5 h-5 transform transition-transform flex-shrink-0 ${openItems[item.id] ? "rotate-90" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>

                  {/* Pertanyaan */}
                  <span className="text-lg font-raleway font-bold flex-1">{item.question}</span>
                </button>
                {openItems[item.id] && (
                  <div className="px-6 pb-4 ml-9">
                    <p className="text-primary font-montserrat">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>



    </PublicLayout>
  );
};

export default Contact;
