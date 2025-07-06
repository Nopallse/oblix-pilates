import React, { useState } from "react";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import Button from "../../../components/ui/Button/Button";
import Divider from "../../../components/ui/Divider/Divider";

const BookTrial = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    experience: "beginner",
    goals: "",
    healthConditions: "",
    howDidYouHear: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          experience: "beginner",
          goals: "",
          healthConditions: "",
          howDidYouHear: ""
        });
      }, 3000);
    }, 2000);
  };

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const experienceLevels = [
    { value: "beginner", label: "Beginner - Never done Pilates before" },
    { value: "intermediate", label: "Intermediate - Some Pilates experience" },
    { value: "advanced", label: "Advanced - Regular Pilates practice" }
  ];

  const hearAboutUs = [
    "Social Media (Instagram/TikTok)",
    "Google Search",
    "Friend/Family Recommendation",
    "Walk-in",
    "Other"
  ];

  const packageData = [
    {
      paket: "Single Session / Drop In",
      harga: "150K",
      benefit: ["4 Group Classes", "2x Private 1 on 1 (45')"]
    },
    {
      paket: "Monthly Package",
      harga: "500K",
      benefit: ["8 Group Classes", "1x Private 1 on 1 (45')"]
    },
    {
      paket: "Quarterly Package",
      harga: "1.2M",
      benefit: ["24 Group Classes", "3x Private 1 on 1 (45')"]
    },
    {
      paket: "Annual Package",
      harga: "4M",
      benefit: ["Unlimited Group Classes", "12x Private 1 on 1 (45')"]
    }
  ];

  if (submitSuccess) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in our trial class. We'll contact you within 24 hours to confirm your booking.
            </p>
            <Button to="/" variant="primary" size="medium">
              Return to Home
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>

      {/* Package Cards Section */}
      <section className="py-8 sm:py-12 bg-white relative">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
        <div className="mx-auto mb-8 w-fit text-center">
            <h2 className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
            Wanna book a <span className="font-fraunces italic">Trial</span>
            </h2>
            <div className="mt-2 ml-0 sm:ml-4 transform -rotate-2">
              <span className="bg-primary text-white text-xl sm:text-2xl md:text-[28px] font-raleway font-medium leading-none px-4 py-1 inline-block">
                Oblix Pilates
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 justify-items-center">
            {packageData.map((pkg, index) => (
              <div key={index} className="w-full md:w-64 h-96 relative">
                <div className="w-full md:w-64 h-96 left-0 top-0 absolute bg-neutral-700 rounded-[2rem] md:rounded-3xl" />
                <div className="absolute inset-0 p-4 flex flex-col mt-10">
                  <div className="text-center">
                    <h3 className="text-xl md:text-base font-semibold text-white mb-8 font-raleway">{pkg.paket}</h3>
                    <div className="text-7xl md:text-5xl font-bold text-white mb-8 font-raleway">
                      {pkg.harga}
                    </div>
                    <ul className="space-y-2 text-lg md:text-sm text-white font-raleway">
                      {pkg.benefit.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-center">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Flower SVG Decoration */}
                <div data-svg-wrapper className=" bottom-[0] absolute">
                  <svg width="100" height="100" viewBox="0 0 174 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7429 81.3646C16.0423 78.6753 13.6658 76.2056 11.3973 73.6262C6.10416 67.5342 1.72922 60.9484 -1.1334 53.3197C-5.50835 41.6847 -3.45591 31.0375 3.67364 21.2136C6.96835 16.7133 10.8032 12.7069 15.5562 9.74321C26.1965 3.04758 36.9448 3.15734 47.4771 9.63345C57.6313 15.89 64.5988 25.0554 69.2978 36.0318C69.6219 36.8002 70 37.5685 70.324 38.3369C70.9722 38.0076 71.0262 37.4588 71.1882 36.9648C75.1311 27.1958 80.6403 18.4146 87.8778 10.8957C93.117 5.4624 99.2743 1.29134 106.998 0.248582C112.561 -0.464888 117.962 0.413228 123.255 2.16946C129.953 4.36475 136.056 7.82234 140.971 12.9813C145.94 18.1951 148.533 24.6163 149.019 31.8608C150.045 45.6911 144.644 57.2713 136.65 67.9184C134.706 70.4979 132.492 72.8578 130.223 75.1629C129.899 75.4922 129.251 75.7666 129.575 76.3703C129.791 76.8093 130.385 76.6447 130.817 76.6447C138.757 76.8094 146.372 78.5656 153.61 81.9683C164.736 87.237 171.596 96.073 173.486 108.367C175.809 123.679 170.192 135.808 157.931 144.808C154.15 147.607 149.613 148.54 145.13 149.144C134.22 150.571 123.688 149.144 113.641 144.315C112.939 143.985 112.291 143.546 111.589 143.217C110.941 142.942 110.455 142.284 109.482 142.394C109.861 144.15 110.185 145.851 110.509 147.607C112.237 157.102 111.967 166.487 109.32 175.817C106.62 185.421 100.247 191.623 91.4966 195.465C84.043 198.703 76.2113 199.636 68.1096 198.593C57.5233 197.276 50.8798 190.8 46.4509 181.47C42.508 173.073 41.1577 164.127 41.6438 154.852C41.8059 152.053 42.292 149.309 42.6701 146.565C42.7241 146.071 43.1562 145.522 42.6161 145.193C42.184 144.918 41.8059 145.412 41.4278 145.632C35.6486 149.144 29.5452 151.724 23.0638 153.535C16.6364 155.291 10.101 156.059 3.40358 155.236C-2.59172 154.523 -7.45277 151.504 -11.6657 147.278C-17.607 141.296 -21.8199 134.271 -24.0344 126.039C-26.3028 117.642 -24.4664 109.958 -19.6594 103.043C-11.1796 90.8043 0.973049 84.6575 15.0701 81.9134C16.1503 81.6939 17.2306 81.5841 18.7429 81.3646Z" fill="white"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button Section */}
        <div className="text-center mt-8">
          <a
            href={`https://wa.me/6285883335533?text=${encodeURIComponent(
              "Halo Oblix Pilates! Saya ingin booking Trial Class. Boleh dibantu info jadwal dan ketersediaannya? Terima kasih!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="primary" 
              size="medium"
            >
              Book a Trial
            </Button>
          </a>
        </div>
        
      </section>
    </PublicLayout>
  );
};

export default BookTrial; 