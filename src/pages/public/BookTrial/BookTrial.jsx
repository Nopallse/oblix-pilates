import React, { useState } from "react";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import Button from "../../../components/ui/Button/Button";
import Divider from "../../../components/ui/Divider/Divider";
import { useTrialPackages } from "../../User/MyPackage/api";
import Loading from "../../../components/ui/Loading/Loading";

const BookTrial = () => {
  // Use trial packages from API
  const { trialPackages, loading, error, loadTrialPackages } = useTrialPackages();
  
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

  // Use API data only
  const packageData = trialPackages;

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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <h2 className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
            Wanna book a <span className="font-fraunces italic">Trial</span>
            </h2>
            <div className="mt-2 ml-0 sm:ml-4 transform -rotate-2">
              <span className="bg-primary text-white text-xl sm:text-2xl md:text-[28px] font-raleway font-medium leading-none px-4 py-1 inline-block">
                Oblix Pilates
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <Loading />
              <p className="text-gray-600 mt-4">Memuat data trial package...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
                <Button 
                  variant="secondary" 
                  onClick={loadTrialPackages}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Package Cards Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {packageData.map((pkg, index) => (
                <div
                  key={pkg.id || index}
                  className="relative flex flex-col bg-neutral-700 rounded-2xl md:rounded-3xl shadow-lg overflow-hidden w-full max-w-xs mx-auto min-h-[370px] transition-transform duration-200 hover:scale-105"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-1 flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-4 font-raleway text-center">
                        {pkg.paket}
                      </h3>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-4 font-raleway text-center">
                        {pkg.harga}
                      </div>
                      <ul className="space-y-2 text-base md:text-sm text-white font-raleway mb-6">
                        {pkg.benefit.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-center">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button
                        as="a"
                        href="/buy-package"
                        variant="primary"
                        size="medium"
                        className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm text-center"
                      >
                        Book Trial
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        
      </section>
    </PublicLayout>
  );
};

export default BookTrial; 