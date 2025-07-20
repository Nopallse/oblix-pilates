import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";
import { usePublicTrainers } from "../../Admin/Website/api/useWebsite";

const Trainer = () => {
  const { trainers, loading, error } = usePublicTrainers()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(1)

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

  // Get items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 1 // SSR fallback
    
    if (window.innerWidth >= 1024) return 4 // lg: 4 cols
    if (window.innerWidth >= 768) return 2  // md: 2 cols
    return 1 // mobile: 1 col
  }

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide()
      if (newItemsPerSlide !== itemsPerSlide) {
        setItemsPerSlide(newItemsPerSlide)
        setCurrentSlide(0) // Reset to first slide when screen size changes
      }
    }

    // Set initial items per slide
    setItemsPerSlide(getItemsPerSlide())

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [itemsPerSlide])

  // Navigation functions
  const nextSlide = () => {
    if (trainers.length === 0) return
    const maxSlides = Math.ceil(trainers.length / itemsPerSlide)
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    if (trainers.length === 0) return
    const maxSlides = Math.ceil(trainers.length / itemsPerSlide)
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  // Calculate current items to show
  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide
    return trainers.slice(startIndex, startIndex + itemsPerSlide)
  }

  // Calculate total slides
  const getTotalSlides = () => {
    if (trainers.length === 0) return 0
    return Math.ceil(trainers.length / itemsPerSlide)
  }

  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
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

          {/* Trainers Slider */}
          {!loading && !error && trainers.length > 0 && (
            <div className="relative">
              {/* Slider Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* Generate slides based on items per slide */}
                  {Array.from({ length: getTotalSlides() }, (_, slideIndex) => {
                    const startIndex = slideIndex * itemsPerSlide
                    const slideItems = trainers.slice(startIndex, startIndex + itemsPerSlide)
                    
                    return (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                          {slideItems.map((trainer, index) => {
                            const actualIndex = startIndex + index
                            
                            // Debug: Log trainer data
                            console.log(`Trainer ${actualIndex + 1} data:`, {
                              id: trainer.id,
                              title: trainer.title,
                              description: trainer.description,
                              picture: trainer.picture,
                              instagram: trainer.instagram,
                              tiktok: trainer.tiktok,
                              hasSocialMedia: !!(trainer.instagram || trainer.tiktok)
                            })
                            
                            return (
                              <div key={trainer.id || actualIndex} data-aos="fade-up" data-aos-delay={200 + (index * 100)}>
                                <TrainerCard
                                  image={getImageUrl(trainer.picture)}
                                  name={trainer.title || 'Trainer Name'}
                                  description={trainer.description || 'Deskripsi Coach'}
                                  bio={trainer.description || 'Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session.'}
                                  instagram={trainer.instagram}
                                  tiktok={trainer.tiktok}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              {getTotalSlides() > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                    aria-label="Previous slide"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                    aria-label="Next slide"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Dots Indicator */}
              {getTotalSlides() > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: getTotalSlides() }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
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
