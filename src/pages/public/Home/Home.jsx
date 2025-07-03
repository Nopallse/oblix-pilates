import React from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../../../components/layout";
import { TrainerCard, ClassCard, Divider, ImageSlider, ScrollingTestimonials } from "../../../components/ui";
import { testimonialData } from "../../../data/testimonialData";

const Home = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="py-6 bg-white">
        <div className="con</section>tainer mx-auto px-14 py-8 max-w-6xl">
          <div className="relative w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary font-medium font-['Raleway'] leading-relaxed">
                  Wake Up, Work Out,
                  <br className="hidden sm:block" />
                  <span className="font-['Fraunces'] font-normal italic block mt-2">
                    Look Hot!
                  </span>
                </h1>
              </div>

              {/* Simple Horizontal Divider */}
              <div className="hidden lg:block h-0.5 bg-secondary flex-grow"></div>

              {/* Right Side */}
              <div className="flex flex-col items-start lg:items-start">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-600 font-normal font-['Raleway'] leading-tight mb-4">
                  Oblix for Better You
                </h2>
                <button className="bg-primary hover:bg-slate-500 transition-colors text-white text-base sm:text-lg md:text-xl font-semibold font-['Montserrat'] rounded-full py-1.5 px-12 ">
                  Join Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Banner Section */}
      <section className="bg-white">
        <div className="container mx-auto flex justify-between items-center max-w-6xl">
          <ImageSlider 
            images={[
              { src: "/src/assets/images/banners/banner1.png", alt: "Oblix Pilates" },
              { src: "/src/assets/images/banners/banner2.png", alt: "Oblix Pilates" },
              { src: "/src/assets/images/banners/banner1.png", alt: "Oblix Pilates" }
            ]}
            autoSlideInterval={5000}
          />
        </div>
      </section>

      <Divider iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/vAvFA2dgZX/gu21oaww_expires_30_days.png" />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mx-auto mb-8 w-fit">
            <h2 className="text-secondary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
              Get to Know
            </h2>
            <div className="mt-2 ml-4 transform -rotate-2">
              <span className="bg-primary text-white text-xl sm:text-2xl md:text-[28px] font-raleway font-medium leading-none px-4 py-1 ">
                Oblix Pilates
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-neutral-600 text-sm font-raleway">
              From better posture to a stronger core and a calmer mind, Pilates
              at Oblix helps you move smarter and feel stronger. More than a
              workout—it's your reset, your recharge, your time.
            </p>
          </div>
        </div>
      </section>

      {/* Image container with horizontal scroll, pola selang-seling persegi dan persegi panjang vertikal, auto-scroll, recycle */}    
      <section className="py-6 bg-white">
        <div className="container mx-auto">
          <div className="w-full h-72 md:h-80 lg:h-96 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent via-transparent to-white/25 z-10 pointer-events-none"></div>
            {/* Image slider */}
            <div className="absolute inset-0 flex gap-4 items-center slider-auto-scroll">
              {/* Gambar 1: Persegi (sedikit lebih tinggi) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 1"
              />
              {/* Gambar 2: Persegi panjang vertikal (tidak terlalu panjang) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 2"
              />
              {/* Gambar 3: Persegi (sedikit lebih tinggi) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 3"
              />
              {/* Gambar 4: Persegi panjang vertikal (tidak terlalu panjang) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 4"
              />
              {/* Gambar 5: Persegi (sedikit lebih tinggi) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 5"
              />
              {/* Gambar 6: Persegi panjang vertikal (tidak terlalu panjang) */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 6"
              />
              {/* Duplikasi untuk looping mulus */}
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 1"
              />
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 2"
              />
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 3"
              />
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 4"
              />
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item3.png"
                alt="Pilates 5"
              />
              <img
                className="w-48 rounded-lg flex-shrink-0"
                src="/src/assets/images/item2.png"
                alt="Pilates 6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <Divider iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/vAvFA2dgZX/gu21oaww_expires_30_days.png" />

      {/* Our Classes Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-14 max-w-6xl">
          <div className="relative w-40 sm:w-56 md:w-72 lg:w-[240px] h-16 sm:h-20 md:h-24 lg:h-[100px] mx-auto">
            <div className="absolute left-0 top-0 flex flex-row items-center h-full text-[#525251] text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium leading-none">
              <span className="font-raleway">Our&nbsp;</span>
              <span className="font-fraunces italic text-5xl">Classes</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Private Class */}
            <ClassCard
              image="/src/assets/images/classes/classes1.png"
              title="Private"
            />

            {/* Semi Private Class */}
            <ClassCard
              image="/src/assets/images/classes/classes2.png"
              title="Semi Private"
            />

            {/* Group Class */}
            <ClassCard
              image="/src/assets/images/classes/classes3.png"
              title="Group"
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      <Divider iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/vAvFA2dgZX/gu21oaww_expires_30_days.png" />

      {/* Our Classes Section with side-by-side layout */}
      <section className="py-6 bg-white">
        <div className="container mx-auto  max-w-6xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="lg:w-1/3">
              <div className="flex flex-row items-center text-[#525251] text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium leading-none">
                <span className="font-raleway">Meet our&nbsp;</span>
                <span className="font-fraunces italic text-5xl">Trainers</span>
              </div>
            </div>

            <div className="lg:w-1/3 text-end">
              <div className="text-neutral-600 text-sm font-normal font-['Raleway']">
                Our certified trainers are the best at what they do—skilled,
                supportive, and ready to help you move better and feel stronger
                in every session.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section*/}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-primary py-16 flex flex-col items-center justify-center text-center rounded-3xl">
            <h2 className="text-4xl text-white font-raleway mb-4">
              What They <span className="font-fraunces italic">Say About</span>
            </h2>

            <div className="transform -rotate-2">
              <span className="bg-white text-3xl font-raleway text-primary px-4 py-1">
                Oblix Pilates
              </span>
            </div>
            
            {/* Scrolling Testimonials */}
            <div className="mt-10 w-full mx-auto">
              <ScrollingTestimonials testimonials={testimonialData} />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-6 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative">
          <div className="bg-primary min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center text-center rounded-3xl px-4 pt-12 pb-32">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-raleway mb-4">
              What They <span className="font-fraunces italic">Say About</span>
            </h2>

            <div className="transform -rotate-2">
              <span className="bg-white text-xl sm:text-2xl md:text-3xl font-raleway text-primary px-4 py-1">
                Oblix Pilates
              </span>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 mt-[-220px] sm:mt-[-280px] md:mt-[-350px] lg:mt-[-420px] z-10 px-4">
          <div className="overflow-x-auto">
            <div className="flex gap-4 sm:gap-6 md:gap-8 w-max">
              <ScrollingTestimonials testimonials={testimonialData} />
            </div>
          </div>
        </div>
      </section> */}


      {/* Divider Section */}
      <Divider iconSrc="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/vAvFA2dgZX/gu21oaww_expires_30_days.png" />
      
    </PublicLayout>
  );
};

export default Home;
