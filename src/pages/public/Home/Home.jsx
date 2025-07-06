import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import TrainerCard from "../../../components/ui/Card/TrainerCard.jsx";
import ClassCard from "../../../components/ui/Card/ClassCard.jsx";
import Divider from "../../../components/ui/Divider/Divider.jsx";
import ImageSlider from "../../../components/ui/ImageSlider/ImageSlider.jsx";
import ScrollingTestimonials from "../../../components/ui/ScrollingTestimonials/ScrollingTestimonials.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import { testimonialData } from "../../../data/testimonialData";
import { scheduleData } from "../../../data/scheduleData";
import { banner1, banner2, item2, item3, classes1, classes2, classes3, classesScheduleBanner, trainer1, trainer2, trainer3 } from "../../../utils/assets";
import TestimonialCard from "../../../components/ui/Card/TestimonialCard.jsx";

// Komponen slider gambar dengan auto-scroll dan drag-to-scroll
const DraggableAutoScrollSlider = ({ images, autoScrollSpeed = 1 }) => {
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
          className="w-32 sm:w-40 md:w-48 rounded-lg flex-shrink-0"
          src={img.src}
          alt={img.alt}
          draggable={false}
          style={{ userSelect: 'none', WebkitUserDrag: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
        />
      ))}
      {/* Duplikasi untuk looping mulus */}
      {images.map((img, idx) => (
        <img
          key={images.length + idx}
          className="w-32 sm:w-40 md:w-48 rounded-lg flex-shrink-0"
          src={img.src}
          alt={img.alt}
          draggable={false}
          style={{ userSelect: 'none', WebkitUserDrag: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
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
            text={testimonial.text}
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
            text={testimonial.text}
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTrainerSlide, setCurrentTrainerSlide] = useState(0);
  
  const classData = [
    { image: classes1, title: "Private" },
    { image: classes2, title: "Semi Private" },
    { image: classes3, title: "Group" }
  ];

  const trainerData = [
    { image: trainer1, name: "Coach Name", description: "Deskripsi Coach", bio: "Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session." },
    { image: trainer2, name: "Coach Name", description: "Deskripsi Coach" },
    { image: trainer3, name: "Coach Name", description: "Deskripsi Coach" },
    { image: trainer3, name: "Coach Name", description: "Deskripsi Coach" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % classData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + classData.length) % classData.length);
  };

  const nextTrainerSlide = () => {
    setCurrentTrainerSlide((prev) => (prev + 1) % trainerData.length);
  };

  const prevTrainerSlide = () => {
    setCurrentTrainerSlide((prev) => (prev - 1 + trainerData.length) % trainerData.length);
  };
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="container max-w-5xl mx-auto px-4 py-4 md:py-6">
          <div className="mx-auto max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {/* Kiri */}
            <div className="flex flex-col text-center md:text-left items-center md:items-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-raleway text-primary">
                Wake Up, Work Out,
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl italic font-fraunces mt-2 text-primary">
                Look Hot!
              </p>
            </div>

            {/* Divider Mobile */}
            <div className="block md:hidden w-32 h-[2px] bg-gray-600 my-6"></div>
            {/* Divider Desktop */}
            <div className="hidden md:block w-32 h-[2px] bg-gray-600"></div>

            {/* Kanan */}
            <div className="flex flex-col text-center md:text-right items-center md:items-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-tertiary font-raleway">
                Oblix for Better You
              </h2>
              <div className="mt-2 text-white">
                <Button to="/classes" variant="primary" size="medium">
                  Join Now!
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <ImageSlider
            images={[
              {
                src: banner1,
                alt: "Oblix Pilates",
              },
              {
                src: banner2,
                alt: "Oblix Pilates",
              },
              {
                src: banner1,
                alt: "Oblix Pilates",
              },
            ]}
            autoSlideInterval={5000}
          />
        </div>
      </section>

      <Divider />

      {/* About Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="mx-auto mb-8 w-fit text-center">
            <h2 className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
              Get to <span className="font-fraunces italic">Know</span>
            </h2>
            <div className="mt-2 ml-0 sm:ml-4 transform -rotate-2">
              <span className="bg-primary text-white text-xl sm:text-2xl md:text-[28px] font-raleway font-medium leading-none px-4 py-1 inline-block">
                Oblix Pilates
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center px-4">
            <p className="text-tertiary text-sm sm:text-base font-raleway leading-relaxed">
              From better posture to a stronger core and a calmer mind, Pilates
              at Oblix helps you move smarter and feel stronger. More than a
              workout—it's your reset, your recharge, your time.
            </p>
          </div>
        </div>
      </section>

      {/* Image container with horizontal scroll, pola selang-seling persegi dan persegi panjang vertikal, auto-scroll, recycle */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="container w-full mx-auto py-4 md:py-6 flex justify-between items-center">
          <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 relative overflow-hidden rounded-lg">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent via-transparent to-white/25 z-10 pointer-events-none"></div>
            {/* Image slider - draggable and auto-scroll */}
            <DraggableAutoScrollSlider
              images={[
                { src: item3, alt: "Pilates 1" },
                { src: item2, alt: "Pilates 2" },
                { src: item3, alt: "Pilates 3" },
                { src: item2, alt: "Pilates 4" },
                { src: item3, alt: "Pilates 5" },
                { src: item2, alt: "Pilates 6" },
              ]}
              autoScrollSpeed={1.2}
            />
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <Divider />

      {/* Our Classes Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-tertiary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
              <span className="font-raleway">Our</span>
              <span className="font-fraunces italic">Classes</span>
            </div>
          </div>

          <div className="block md:hidden">
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
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Private Class */}
            <ClassCard
              image={classes1}
              title="Private"
            />

            {/* Semi Private Class */}
            <ClassCard
              image={classes2}
              title="Semi Private"
            />

            {/* Group Class */}
            <ClassCard
              image={classes3}
              title="Group"
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* Meet our Trainers Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-tertiary text-2xl sm:text-3xl md:text-4xl font-medium leading-none">
                <span className="font-raleway">Meet our</span>
                <span className="font-fraunces italic">Trainers</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-right">
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
      <section className="py-6 sm:py-8 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          {/* Mobile Slider */}
          <div className="block lg:hidden">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentTrainerSlide * 100}%)` }}
                >
                  {trainerData.map((trainer, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <TrainerCard
                        image={trainer.image}
                        name={trainer.name}
                        description={trainer.description}
                        bio={trainer.bio}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevTrainerSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Previous trainer slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextTrainerSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Next trainer slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {trainerData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTrainerSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentTrainerSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to trainer slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Trainer Cards */}
            <TrainerCard
              image={trainer1}
              name="Coach Name"
              description="Deskripsi Coach"
              bio="Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."
            />
            <TrainerCard
              image={trainer2}
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image={trainer3}
              name="Coach Name"
              description="Deskripsi Coach"
            />
            <TrainerCard
              image={trainer3}
              name="Coach Name"
              description="Deskripsi Coach"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white relative overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="bg-primary py-6 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center text-center rounded-xl sm:rounded-2xl lg:rounded-3xl relative">
            {/* Judul */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-raleway mb-3 sm:mb-4">
              What They <span className="font-fraunces italic">Say About</span>
            </h2>

            {/* Brand */}
            <div className="transform -rotate-2 mb-6 sm:mb-8 lg:mb-10">
              <span className="bg-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-raleway text-primary px-3 sm:px-4 py-1 rounded inline-block">
                Oblix Pilates
              </span>
            </div>

            {/* Testimonial */}
            <div className="w-full mt-2 sm:mt-4 md:mt-6 lg:mt-8">
              <DraggableTestimonialSlider
                testimonials={testimonialData}
                autoScrollSpeed={0.8}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <Divider />

      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="relative mx-auto mb-8 w-fit text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-tertiary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-none">
              <span className="font-raleway">Classes</span>
              <span className="font-fraunces italic">Schedule</span>
            </div>
          </div>

          <div className="w-full max-w-4xl mx-auto relative space-y-10">
            {scheduleData.map((daySchedule, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold font-raleway text-tertiary mb-4">
                  {daySchedule.day}
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  {daySchedule.classes.map((classItem) => {
                    // Split time for mobile display
                    const timeParts = classItem.time.split(' - ');
                    const startTime = timeParts[0];
                    const endTime = timeParts[1];
                    
                    return (
                      <div
                        key={classItem.id}
                        className="w-full bg-neutral-50 rounded-2xl sm:rounded-3xl py-2 sm:p-6 overflow-hidden"
                      >
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
                          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-normal font-raleway text-tertiary">
                            {/* Desktop: Show full time range */}
                            <span className="hidden sm:block">
                              {classItem.time}
                            </span>
                            {/* Mobile: Show time in separate lines */}
                            <div className="sm:hidden flex flex-col items-center justify-center">
                              <div>{startTime}</div>
                              <div className="text-xs text-neutral-400">-</div>
                              <div>{endTime}</div>
                            </div>
                          </div>
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-raleway text-tertiary">
                            {classItem.className}
                          </span>
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-normal font-raleway text-neutral-500">
                            {classItem.coach}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full relative py-8 sm:py-12"></div>
          <div className="w-full h-40 sm:h-48 md:h-64 lg:h-72 relative rounded-3xl sm:rounded-3xl overflow-hidden">
            <img
              src={classesScheduleBanner}
              alt="Schedule Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute left-6 sm:left-20 md:left-28 top-1/2 transform -translate-y-1/2 z-10">
              <svg
                className="w-16 h-16 sm:w-48 sm:h-48 md:w-56 md:h-56 opacity-80"
                viewBox="0 0 366 372"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M95.7547 243.971C88.7643 243.63 82.4858 243.188 76.2194 242.464C61.5078 240.676 47.4398 237.084 34.1496 230.21C13.8675 219.736 3.56131 202.699 1.18805 180.535C0.13992 170.347 0.435835 160.167 3.26653 150.278C9.52821 128.057 24.3126 114.978 46.6376 110.843C68.1771 106.873 88.9532 110.79 108.866 119.967C110.254 120.616 111.715 121.198 113.102 121.846C113.58 120.599 112.978 119.785 112.591 118.912C105.942 100.745 102.644 81.9969 103.255 62.8418C103.708 48.9887 106.967 35.7259 116.211 24.7991C122.915 16.9801 131.357 11.5297 140.733 7.40896C152.563 2.15841 165.136 -0.640521 178.184 0.341769C191.374 1.33239 202.81 6.89341 212.388 16.1689C230.808 33.7558 237.698 56.186 239.907 80.5354C240.431 86.444 240.317 92.3858 240.062 98.3193C240.026 99.167 239.48 100.339 240.665 100.763C241.5 101.095 242.107 100.14 242.696 99.6078C253.72 90.0607 266.261 83.0817 280.313 78.812C301.962 72.2996 322.185 75.9006 339.892 90.3295C361.902 108.341 369.173 131.785 363.54 159.141C361.832 167.609 356.796 174.465 351.429 180.805C338.315 196.177 322.204 207.194 302.568 212.976C301.206 213.391 299.782 213.59 298.42 214.006C297.199 214.429 295.726 214.13 294.536 215.476C297.213 217.404 299.748 219.324 302.351 221.319C316.392 232.133 327.574 245.256 335.449 261.229C343.589 277.643 342.535 293.939 335.337 309.944C329.164 323.53 319.638 334.441 307.312 342.99C291.263 354.224 274.238 353.573 256.719 346.308C241.011 339.716 228.161 329.185 217.409 315.945C214.185 311.931 211.47 307.593 208.608 303.387C208.074 302.648 207.987 301.368 206.846 301.584C205.919 301.742 206.012 302.880 205.767 303.645C202.213 315.544 197.069 326.572 190.464 337.017C183.865 347.321 175.904 356.411 165.762 363.531C156.713 369.938 146.373 371.806 135.43 371.231C119.97 370.39 105.583 366 92.4328 357.505C79.0068 348.853 72.0535 336.12 70.0947 320.78C66.5898 293.663 75.5882 270.329 91.4243 249.239C92.6264 247.611 93.9636 246.132 95.7547 243.971Z"
                  fill="url(#paint0_linear_74_419)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_74_419"
                    x1="71.6121"
                    y1="64.4558"
                    x2="316.523"
                    y2="335.68"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#7B8FCB" />
                    <stop offset="1" stopColor="#ADBFF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute left-1/2 md:left-96 transform -translate-x-1/2 top-1/2 transform -translate-y-1/2 z-10">
              <div className="text-white flex flex-col items-center gap-4 sm:gap-6">
                <div className="text-center md:text-start">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium font-raleway leading-tight block">
                    Book your
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-fraunces leading-tight">
                    Session Now
                  </span>
                </div>
                <div className="sm:hidden">
                  <a
                    href={`https://wa.me/6285883335533?text=${encodeURIComponent(
                      "Halo Oblix Pilates! Saya ingin booking Class/Session (paket Private/Semi Priavate/Group). Boleh minta harga dan slot tersedia? Terima kasih!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button as="span" variant="primary" size="medium">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute right-6 sm:right-20 md:right-28 top-1/2 transform -translate-y-1/2 z-10">
              <a
                href={`https://wa.me/6285883335533?text=${encodeURIComponent(
                  "Halo Oblix Pilates! Saya ingin booking Class/Session (paket Private/Semi Priavate/Group). Boleh minta harga dan slot tersedia? Terima kasih!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex"
              >
                <Button as="span" variant="primary" size="large">
                  Click Here
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
