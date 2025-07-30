import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import Divider from "../../../components/ui/Divider/Divider.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import { about1, about2, classesScheduleBanner, flowerIcon } from "../../../shared/utils/assets.js";
const About = () => {
  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="mx-auto mb-8 w-fit text-center" data-aos="fade-up">
            <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium leading-none">
              welcome <span className="font-fraunces italic">to</span>
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
          <div className="mt-10 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14" data-aos="fade-up" data-aos-delay="400">
            {/* Card Gambar 1 - Landscape */}
            <div className="flex-1 h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-md" data-aos="fade-right" data-aos-delay="500">
              <img
                src={about1}
                alt="Pilates class in session with an instructor"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Card Gambar 2 - Square */}
            <div className="w-full md:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-md" data-aos="fade-left" data-aos-delay="600">
              <img
                src={about2}
                alt="Woman using a Pilates ring for exercise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Divider />

      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Card Image */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-md" data-aos="fade-right">
              <img
                src={about1}
                alt="Oblix Pilates studio"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
              <h2 className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-raleway font-medium mb-2">
                Why Choose Oblix Pilates
              </h2>
              <p className="text-tertiary text-2xl sm:text-3xl md:text-4xl font-fraunces italic mb-8">
                For Better You?
              </p>

              <div className="space-y-6">
                {/* Personal Growth Space */}
                <div className="flex gap-4 items-center" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex-shrink-0 w-12 h-12 mt-1">
                    <img
                      src={flowerIcon}
                      alt="Flower icon"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-tertiary text-lg font-raleway font-semibold">
                      Personal Growth Space
                    </h3>
                    <p className="text-tertiary text-sm sm:text-base font-raleway leading-relaxed">
                      Whether you're here to improve posture, build strength, or
                      simply find a mindful escape—Oblix is your space to grow.
                    </p>
                  </div>
                </div>

                {/* Better Movement, Better You */}
                <div className="flex gap-4 items-center" data-aos="fade-up" data-aos-delay="400">
                  <div className="flex-shrink-0 w-12 h-12 mt-1">
                    <img
                      src={flowerIcon}
                      alt="Flower icon"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-tertiary text-lg font-raleway font-semibold">
                      Better Movement, Better You
                    </h3>
                    <p className="text-tertiary text-sm sm:text-base font-raleway leading-relaxed">
                      We believe that intentional movement leads to a stronger,
                      healthier, and more balanced version of you.
                    </p>
                  </div>
                </div>

                {/* Mindful Every Step */}
                <div className="flex gap-4 items-center" data-aos="fade-up" data-aos-delay="500">
                  <div className="flex-shrink-0 w-12 h-12 mt-1">
                    <img
                      src={flowerIcon}
                      alt="Flower icon"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-tertiary text-lg font-raleway font-semibold">
                      Mindful Every Step
                    </h3>
                    <p className="text-tertiary text-sm sm:text-base font-raleway leading-relaxed">
                      Every stretch, every breath, and every rep is designed to
                      bring you closer to the best version of yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative py-8 sm:py-12"></div>











          <div className="w-full h-40 sm:h-48 md:h-64 lg:h-72 relative rounded-3xl sm:rounded-3xl overflow-hidden" data-aos="fade-up" data-aos-delay="600">
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

export default About;
