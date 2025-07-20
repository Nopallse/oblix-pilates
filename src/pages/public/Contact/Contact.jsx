import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import { locationIcon, phoneIcon, instagramIcon, tiktokIcon, banner1 } from "../../../shared/utils/assets";
import Divider from "../../../components/ui/Divider/Divider";
import { usePublicFaqs } from "../../Admin/Website/api/useWebsite";
import Loading from "../../../components/ui/Loading";

const Contact = () => {
  const [openItems, setOpenItems] = useState({});
  const { faqs, loading, error } = usePublicFaqs();

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <PublicLayout>
      <HeroSection
        title1="Our"
        title2="Contact"
        image={banner1}
      />

      {/* Contact Content Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden" data-aos="fade-right">
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
            <div className="space-y-8" data-aos="fade-left" data-aos-delay="200">
              {/* Location */}
              <div data-aos="fade-up" data-aos-delay="300">
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
              <div data-aos="fade-up" data-aos-delay="400">
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
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
        <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Frequently Asked</span>
              <span className="font-fraunces italic">Questions</span>
            </div>
          </div>
          <div className="mx-auto space-y-4 mb-12" data-aos="fade-up" data-aos-delay="200">
            {loading ? (
              <Loading />
            ) : error ? (
              <p className="text-center text-red-500">Error loading FAQs: {error}</p>
            ) : faqs.length === 0 ? (
              <p className="text-center text-gray-500">No FAQs available.</p>
            ) : (
              faqs.map((item) => (
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
                    <span className="text-lg font-raleway font-bold flex-1">{item.title}</span>
                  </button>
                  {openItems[item.id] && (
                    <div className="px-6 pb-4 ml-9">
                      <p className="text-primary font-montserrat">{item.content}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </section>



    </PublicLayout>
  );
};

export default Contact;
