import React from "react";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";
import { usePublicTrainers } from "../../Admin/Website/api/useWebsite";

const Trainer = () => {
  const { trainers, loading, error } = usePublicTrainers()

  // Debug: Log hook data
  console.log('usePublicTrainers hook data:', {
    trainersCount: trainers?.length || 0,
    loading,
    error,
    trainers: trainers?.slice(0, 2) // Log first 2 trainers for debugging
  })

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'
    return `${baseURL}/uploads/trainers/${imagePath}`
  }

  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Meet our</span>
              <span className="font-fraunces italic">Trainers</span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Loading trainers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p>Failed to load trainers</p>
                <p className="text-sm text-gray-500 mt-2">{error}</p>
              </div>
            </div>
          )}

          {/* Trainers Grid */}
          {!loading && !error && trainers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {trainers.map((trainer, index) => (
                <div key={trainer.id || index} data-aos="fade-up" data-aos-delay={200 + (index * 100)}>
                  <TrainerCard
                    image={getImageUrl(trainer.picture)}
                    name={trainer.title || 'Trainer Name'}
                    description={trainer.description || 'Deskripsi Coach'}
                    bio={trainer.description || 'Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session.'}
                    instagram={trainer.instagram}
                    tiktok={trainer.tiktok}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && trainers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-lg">No trainers available</p>
                <p className="text-sm mt-2">Check back later for our amazing trainers!</p>
            </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Trainer;
