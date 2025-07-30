import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";
import ClassCard from "../../../components/ui/Card/ClassCard.jsx";
import Divider from "../../../components/ui/Divider/Divider.jsx";
import { flower2Icon } from "../../../shared/utils/assets.js"; 

import ImageSlider from "../../../components/ui/ImageSlider/ImageSlider.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import { scheduleData } from "../../../data/scheduleData";
import { classes1, classes2, classes3, classesScheduleBanner } from "../../../shared/utils/assets.js";
import TestimonialCard from "../../../components/ui/Card/TestimonialCard.jsx";
import { usePublicTestimonials, usePublicTrainers, usePublicBanners, usePublicGalleries } from "../../Admin/Website/api/useWebsite";
import Loading from "../../../components/ui/Loading";

// Komponen slider gambar dengan auto-scroll dan drag-to-scroll
const DraggableAutoScrollSlider = ({ images, autoScrollSpeed = 1 }) => {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [hoveredTrainerIndex, setHoveredTrainerIndex] = useState(null);

  const handleTrainerCardClick = (index) => {
    setHoveredTrainerIndex((prev) => (prev === index ? null : index));
  };
  // Auto-scroll effect
  useEffect(() => {
    if (!sliderRef.current) return;
    let frameId;
    let lastTimestamp = null;
    const scroll = (timestamp) => {
      if (isUserInteracting) {
        frameId = requestAnimationFrame(scroll);
        return;
      }
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += autoScrollSpeed * (elapsed / 16); // speed factor
        // Looping: jika sudah hampir di ujung, reset ke awal
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth - 1
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };
    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [isUserInteracting, autoScrollSpeed]);

  // Drag-to-scroll handlers
  const onMouseDown = (e) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // drag speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };

  // Touch events
  const onTouchStart = (e) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };

  return (
    <div
      ref={sliderRef}
      className="flex gap-2 sm:gap-4 items-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-full px-2 cursor-grab select-none"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          className={`rounded-[40px] flex-shrink-0 object-cover ${
            idx % 2 === 0 
              ? 'w-72 h-[438px]' // Index genap - ukuran tinggi
              : 'w-72 h-96' // Index ganjil - ukuran pendek
          }`}
          src={img.src}
          alt={img.alt}
          draggable={false}
          style={{ 
            userSelect: 'none', 
            WebkitUserDrag: 'none', 
            WebkitUserSelect: 'none', 
            msUserSelect: 'none',
            objectPosition: 'center top' // Center gambar secara horizontal
          }}
        />
      ))}
      {/* Duplikasi untuk looping mulus */}
      {images.map((img, idx) => (
        <img
          key={images.length + idx}
          className={`rounded-[40px] flex-shrink-0 object-cover ${
            idx % 2 === 0 
              ? 'w-72 h-[438px]' // Index genap - ukuran tinggi
              : 'w-72 h-96' // Index ganjil - ukuran pendek
          }`}
          src={img.src}
          alt={img.alt}
          draggable={false}
          style={{ 
            userSelect: 'none', 
            WebkitUserDrag: 'none', 
            WebkitUserSelect: 'none', 
            msUserSelect: 'none',
            objectPosition: 'center top' // Center gambar secara horizontal
          }}
        />
      ))}
    </div>
  );
};


// Komponen slider testimonial dengan auto-scroll dan drag-to-scroll
const DraggableTestimonialSlider = ({ testimonials, autoScrollSpeed = 0.8 }) => {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!sliderRef.current) return;
    let frameId;
    let lastTimestamp = null;
    const scroll = (timestamp) => {
      if (isUserInteracting) {
        frameId = requestAnimationFrame(scroll);
        return;
      }
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += autoScrollSpeed * (elapsed / 16); // speed factor
        // Looping: jika sudah hampir di ujung, reset ke awal
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth - 1
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };
    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [isUserInteracting, autoScrollSpeed]);

  // Drag-to-scroll handlers
  const onMouseDown = (e) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // drag speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };

  // Touch events
  const onTouchStart = (e) => {
    isDragging.current = true;
    setIsUserInteracting(true);
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    setIsUserInteracting(false);
  };

  return (
    <div
      ref={sliderRef}
      className="flex gap-4 sm:gap-6 items-stretch overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent h-full px-4 cursor-grab select-none"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      {testimonials.map((testimonial, idx) => (
        <div key={idx} className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] flex-shrink-0">
          <TestimonialCard
            text={testimonial.content}
            name={testimonial.name}
            age={testimonial.age}
            image={testimonial.image}
            rating={testimonial.rating}
          />
        </div>
      ))}
      {/* Duplikasi untuk looping mulus */}
      {testimonials.map((testimonial, idx) => (
        <div key={testimonials.length + idx} className="w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] flex-shrink-0">
          <TestimonialCard
            text={testimonial.content}
            name={testimonial.name}
            age={testimonial.age}
            image={testimonial.image}
            rating={testimonial.rating}
          />
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = usePublicTestimonials();
  const { trainers, loading: trainersLoading, error: trainersError } = usePublicTrainers();
  const { banners, loading: bannersLoading, error: bannersError } = usePublicBanners();
  const { galleries, loading: galleriesLoading, error: galleriesError } = usePublicGalleries();
  
  // Trainer slider state
  const [currentTrainerSlide, setCurrentTrainerSlide] = useState(0)
  const [trainerItemsPerSlide, setTrainerItemsPerSlide] = useState(1)
  
  // Class slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
  
  // Helper function to construct banner image URL
  const getBannerImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'
    return `${baseURL}/uploads/banners/${imagePath}`
  }
  
  // Helper function to construct gallery image URL
  const getGalleryImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'
    return `${baseURL}/uploads/galleries/${imagePath}`
  }
  
  const classData = [
    { image: classes1, title: "Private" },
    { image: classes2, title: "Semi Private" },
    { image: classes3, title: "Group" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % classData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + classData.length) % classData.length);
  };

  // Trainer slider functions
  const getTrainerItemsPerSlide = () => {
    if (typeof window === 'undefined') return 1 // SSR fallback
    
    if (window.innerWidth >= 1024) return 4 // lg: 4 cols
    if (window.innerWidth >= 768) return 2  // md: 2 cols
    return 1 // mobile: 1 col
  }

  const nextTrainerSlide = () => {
    if (trainers.length === 0) return
    const maxSlides = Math.ceil(trainers.length / trainerItemsPerSlide)
    setCurrentTrainerSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevTrainerSlide = () => {
    if (trainers.length === 0) return
    const maxSlides = Math.ceil(trainers.length / trainerItemsPerSlide)
    setCurrentTrainerSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  const getTrainerTotalSlides = () => {
    if (trainers.length === 0) return 0
    return Math.ceil(trainers.length / trainerItemsPerSlide)
  }

  // Handle responsive behavior for trainer slider
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getTrainerItemsPerSlide()
      if (newItemsPerSlide !== trainerItemsPerSlide) {
        setTrainerItemsPerSlide(newItemsPerSlide)
        setCurrentTrainerSlide(0) // Reset to first slide when screen size changes
      }
    }

    // Set initial items per slide
    setTrainerItemsPerSlide(getTrainerItemsPerSlide())

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [trainerItemsPerSlide])
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="mx-auto max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {/* Kiri */}
            <div className="flex flex-col text-center md:text-left items-center md:items-start" data-aos="fade-right" data-aos-delay="100">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-raleway text-primary">
                Wake Up, Work Out,
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl italic font-fraunces mt-2 text-primary">
                Look Hot!
              </p>
            </div>

            {/* Divider Mobile */}
            <div className="block md:hidden w-32 h-[2px] bg-gray-600 my-6" data-aos="fade-in" data-aos-delay="200"></div>
            {/* Divider Desktop */}
            <div className="hidden md:block w-32 h-[2px] bg-gray-600" data-aos="fade-in" data-aos-delay="200"></div>

                  <div className="flex flex-col text-center md:text-right items-center md:items-start" data-aos="fade-left" data-aos-delay="300">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-tertiary font-raleway">
                    Oblix for Better You
                    </h2>
                    <div className="mt-2 text-white">
                    <a
                      href={`https://wa.me/6285883335533?text=${encodeURIComponent(
                      "Halo Oblix Pilates! Saya ingin booking Class/Session (paket Private/Semi Priavate/Group). Boleh minta harga dan slot tersedia? Terima kasih!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button as="span" variant="primary" size="medium">
                      Join Now!
                      </Button>
                    </a>
                    </div>
                  </div>
                  </div>
                </div>

                <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6" data-aos="fade-up" data-aos-delay="400">
                  {bannersLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loading />
                    </div>
                  ) : bannersError ? (
                    <div className="text-center py-12">
                      <p className="text-red-500 text-lg">Error loading banners: {bannersError}</p>
                      <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
                    </div>
                  ) : banners.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No banners available at the moment.</p>
                      <p className="text-gray-400 mt-2">Please check back later.</p>
                    </div>
                  ) : (
                  <ImageSlider
                      images={banners.map(banner => ({
                        src: getBannerImageUrl(banner.picture),
                        alt: banner.title || "Oblix Pilates",
                      }))}
                  autoSlideInterval={5000}
                  />
                  )}
                </div>
                </section>

                <Divider />

                {/* About Section */}
      <div className="relative w-full">
        <section className="py-8 sm:py-12 bg-white">
          <div className="w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
            <div className="mx-auto mb-8 w-fit text-center" data-aos="fade-up">
              <h2 className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
                Get to <span className="font-fraunces italic">Know</span>
              </h2>
              <div className="mt-2 ml-0 sm:ml-4 transform -rotate-2">
                <span className="bg-primary text-white text-xl sm:text-2xl md:text-[28px] font-raleway font-medium leading-none px-4 py-1 inline-block">
                  Oblix Pilates
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center px-4" data-aos="fade-up" data-aos-delay="200">
              <p className="text-tertiary text-sm sm:text-base font-raleway leading-relaxed">
                From better posture to a stronger core and a calmer mind, Pilates
                at Oblix helps you move smarter and feel stronger. More than a
                workout—it's your reset, your recharge, your time.
              </p>
            </div>
          </div>
        </section>

        {/* Image container with horizontal scroll, pola selang-seling persegi dan persegi panjang vertikal, auto-scroll, recycle */}
        <section className="py-6 sm:py-8 bg-white w-full" data-aos="fade-up">
          <div className="mx-auto py-4 md:py-6 flex justify-between items-center w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div className="relative overflow-hidden rounded-lg w-full">
              {/* Gradient overlay (samping) */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 12.5%, rgba(255,255,255,0) 87.5%, rgba(255,255,255,1) 100%)",
                }}
              ></div>
              {/* Image slider - draggable and auto-scroll */}
              {galleriesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loading />
                </div>
              ) : galleriesError ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <p className="text-red-500 text-lg">Error loading gallery: {galleriesError}</p>
                    <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
                  </div>
                </div>
              ) : galleries.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">No gallery images available.</p>
                    <p className="text-gray-400 mt-2">Please check back later.</p>
                  </div>
                </div>
              ) : (
                <DraggableAutoScrollSlider
                  images={galleries.map(gallery => ({
                    src: getGalleryImageUrl(gallery.picture),
                    alt: gallery.title || "Pilates Gallery",
                  }))}
                  autoScrollSpeed={1.2}
                />
              )}
            </div>
          </div>
        </section>
        {/* Gradient overlay bawah */}
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "120px",
            zIndex: 20,
            background: "linear-gradient(180deg, rgba(123, 143, 203, 0) 25.16%, rgba(123, 143, 203, 0.4) 115.33%)"
          }}
        />
      </div>


     

      {/* Our Classes Section */}
      <section className="py-8 sm:py-12 bg-primary">
      <div className="w-full flex justify-center my-8">
        <img src={flower2Icon} alt="" className="h-8 w-auto opacity-70" />
      </div>
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-white text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Our</span>
              <span className="font-fraunces italic">Classes</span>
            </div>
          </div>

          <div className="block md:hidden" data-aos="fade-up" data-aos-delay="200">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {classData.map((classItem, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <ClassCard
                        image={classItem.image}
                        title={classItem.title}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {classData.map((_, index) => (
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
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Private Class */}
            <div data-aos="fade-up" data-aos-delay="200">
              <ClassCard
                image={classes1}
                title="Private"
              />
            </div>

            {/* Semi Private Class */}
            <div data-aos="fade-up" data-aos-delay="300">
              <ClassCard
                image={classes2}
                title="Semi Private"
              />
            </div>

            {/* Group Class */}
            <div data-aos="fade-up" data-aos-delay="400">
              <ClassCard
                image={classes3}
                title="Group"
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Meet our Trainers Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-tertiary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
                <span className="font-raleway">Meet our</span>
                <span className="font-fraunces italic">Trainers</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-right" data-aos="fade-left" data-aos-delay="200">
              <div className="text-tertiary text-sm sm:text-base font-normal font-raleway leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto">
                Our certified trainers are the best at what they do—skilled,
                supportive, and ready to help you move better and feel stronger
                in every session.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Meet our</span>
              <span className="font-fraunces italic">Trainers</span>
            </div>
          </div>

          {/* Loading State */}
          {trainersLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Loading trainers...</p>
            </div>
          )}

          {/* Error State */}
          {trainersError && (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p>Failed to load trainers</p>
                <p className="text-sm text-gray-500 mt-2">{trainersError}</p>
              </div>
            </div>
          )}

          {/* Trainers Slider */}
          {!trainersLoading && !trainersError && trainers.length > 0 && (
            <div className="relative">
              {/* Slider Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTrainerSlide * 100}%)` }}
                >
                  {/* Generate slides based on items per slide */}
                  {Array.from({ length: getTrainerTotalSlides() }, (_, slideIndex) => {
                    const startIndex = slideIndex * trainerItemsPerSlide
                    const slideItems = trainers.slice(startIndex, startIndex + trainerItemsPerSlide)
                    
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
              {getTrainerTotalSlides() > 1 && (
                <>
              <button
                onClick={prevTrainerSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                    aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextTrainerSlide}
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
              {getTrainerTotalSlides() > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: getTrainerTotalSlides() }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTrainerSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTrainerSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                      aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!trainersLoading && !trainersError && trainers.length === 0 && (
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

      <Divider />
      {/* Testimonial Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white relative overflow-hidden" data-aos="fade-up">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="bg-primary py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center text-center rounded-xl sm:rounded-2xl lg:rounded-3xl relative">
            {/* Judul */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-raleway mb-3 sm:mb-4" data-aos="fade-up">
              What They <span className="font-fraunces italic">Say About</span>
            </h2>

            {/* Brand */}
            <div className="transform -rotate-2 mb-6 sm:mb-8 lg:mb-10" data-aos="fade-up" data-aos-delay="200">
              <span className="bg-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-raleway text-primary px-3 sm:px-4 py-1 rounded inline-block">
                Oblix Pilates
              </span>
            </div>

            {/* Testimonial */}
            <div className="w-full mt-2 sm:mt-4 md:mt-6 lg:mt-8" data-aos="fade-up" data-aos-delay="400">
              {testimonialsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loading />
                </div>
              ) : testimonialsError ? (
                <div className="text-center py-12">
                  <p className="text-white/80 text-lg">Error loading testimonials: {testimonialsError}</p>
                  <p className="text-white/60 mt-2">Please try refreshing the page.</p>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/80 text-lg">No testimonials available at the moment.</p>
                  <p className="text-white/60 mt-2">Please check back later.</p>
                </div>
              ) : (
              <DraggableTestimonialSlider
                  testimonials={testimonials}
                autoScrollSpeed={0.8}
              />
              )}
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default Home;
