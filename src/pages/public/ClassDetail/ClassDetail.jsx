import React from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection/HeroSection";
import Button from "../../../components/ui/Button/Button";
import { classes1, classes2, classes3, equipment } from "../../../shared/utils/assets";
import Divider from "../../../components/ui/Divider/Divider";

const ClassDetail = () => {
  const { classType } = useParams();

  // Equipment data with proper mapping
  const equipmentData = {
    barrel: {
      name: "Barrel",
      description:
        "A versatile piece of equipment for core strengthening and flexibility exercises.",
      svg: equipment.barrel,
    },
    caformer2in1: {
      name: "Cadillac/Trapeze Table",
      description:
        "Multi-functional equipment for comprehensive Pilates training and rehabilitation.",
      svg: equipment.caformer2in1,
    },
    wundaChair: {
      name: "Wunda Chair",
      description:
        "Compact equipment perfect for home use and targeted muscle training.",
      svg: equipment.wundaChair,
    },
    spineCorrector: {
      name: "Spine Corrector",
      description:
        "Specialized equipment for spinal alignment and posture improvement.",
      svg: equipment.spineCorrector,
    },
    reformer: {
      name: "Reformer",
      description:
        "The classic Pilates equipment for full-body conditioning and strength building.",
      svg: equipment.reformer,
    },
    tower: {
      name: "Tower",
      description:
        "Vertical equipment for standing and seated Pilates exercises.",
      svg: equipment.caformer2in1, // Using caformer2in1 as placeholder for tower
    },
  };

  // Class data based on type
  const getClassData = (type) => {
    const classData = {
      private: {
        title: "Private",
        subTitle: "Ready for a session that's fully about you?",
        image: classes1,
        content:
          "Experience a session that's all about you. In our 1-on-1 Private Class, you'll get personalized guidance, full attention from a certified trainer, and a program tailored to your goals—whether it's improving posture, building strength, or moving with more confidence. Each 45-minute session is designed to meet you where you are, and help you grow at your own pace.",
        equipment: ["caformer2in1", "barrel", "wundaChair", "spineCorrector"],
        otherProps: [
          "Magic Ring",
          "Soft Ball",
          "Flex Band",
          "Dumbell @0.5kg",
          "Dumbell @1kg",
          "Knee Pad",
          "Anti Slip",
          "Matras",
          "Toning Ball",
          "Slider Gliding",
        ],
      },
      "semi-private": {
        title: "Semi Private",
        subTitle: "Prefer moving in a small group?",
        image: classes2,
        content:
          "Our Semi-Private Session offers a more intimate class setting—perfect for those who want focused guidance without going fully solo. With a limited number of participants, you'll still get personalized attention from our certified trainer while enjoying the energy of moving together. Each 45-minute session is designed to support your goals, at your own pace, in good company.",
        equipment: ["reformer", "tower", "wundaChair", "spineCorrector"],
        otherProps: [
          "Magic Ring",
          "Soft Ball",
          "Flex Band",
          "Dumbell @0.5kg",
          "Dumbell @1kg",
          "Knee Pad",
          "Anti Slip",
          "Matras",
          "Toning Ball",
          "Slider Gliding",
        ],
      },
      group: {
        title: "Group",
        subTitle: "Love moving with others and feeding off good energy?",
        image: classes3,
        content:
          "Feel the energy, move as one. Our Group Class is the perfect way to stay motivated, connect with others, and have fun while working on your goals. With a small group of 6–8 members per session, you'll still get expert guidance from our certified trainer—without losing the joy of shared movement. Each 45-minute class is a mix of challenge, support, and good vibes all around.",
        equipment: ["reformer", "tower", "wundaChair"],
        otherProps: [
          "Magic Ring",
          "Soft Ball",
          "Flex Band",
          "Dumbell @0.5kg",
          "Dumbell @1kg",
          "Knee Pad",
          "Anti Slip",
          "Matras",
          "Toning Ball",
          "Slider Gliding",
        ],
      },
    };

    return classData[type] || classData.private;
  };

  const classData = getClassData(classType);

  return (
    <PublicLayout>
      <HeroSection
        title1={classData.title}
        title2="Class"
        image={classData.image}
        variant="classCard"
      />
      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* Hero Image for Mobile */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-600/0 to-neutral-600/80 mb-6">
              <img
                src={classData.image}
                alt={classData.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content for Mobile */}
            <div className="px-2">
              <h2 className="text-xl sm:text-2xl font-raleway font-medium text-tertiary mb-4 ">
                {classData.subTitle}
              </h2>
              <p className="text-tertiary text-sm sm:text-base leading-relaxed mb-6 ">
                {classData.content}
              </p>

              <p className="text-tertiary text-sm font-semibold leading-relaxed mb-6 ">
                Got questions? Our team's here to help—just reach out!
              </p>

              <div className="flex justify-center">
                <Button
                  as="a"
                  href={`https://wa.me/6285883335533?text=${encodeURIComponent(
                    `Halo Oblix Pilates! Saya ingin booking Class/Session (paket ${classData.title}). Boleh minta harga dan slot tersedia? Terima kasih!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="medium"
                  className="w-full max-w-xs px-8 font-semibold"
                >
                  Join Now!
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-600/0 to-neutral-600/80">
                <img
                  src={classData.image}
                  alt={classData.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 px-6 my-auto max-w-full">
              <div>
                <h2 className="text-3xl font-raleway font-medium text-tertiary mb-4">
                  {classData.subTitle}
                </h2>
                <p className="text-tertiary text-base leading-relaxed mb-4">
                  {classData.content}
                </p>
              </div>

              <p className="text-tertiary text-sm font-semibold leading-relaxed mb-4">
                Got questions? Our team's here to help—just reach out!
              </p>

              <div>
                <Button
                  as="a"
                  href={`https://wa.me/6285883335533?text=${encodeURIComponent(
                    `Halo Oblix Pilates! Saya ingin booking Class/Session (paket ${classData.title}). Boleh minta harga dan slot tersedia? Terima kasih!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="medium"
                  className="w-auto px-16 font-semibold"
                >
                  Join Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <div className="relative mx-auto mb-6 sm:mb-8 w-fit text-center px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-none">
          <span className="font-raleway">{classData.title} Class</span>
          <span className="font-fraunces italic">Equipment</span>
        </div>
      </div>

      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="flex flex-wrap justify-center gap-y-8 gap-x-8">
            {classData.equipment?.map((itemKey, index) => {
              const item = equipmentData[itemKey];
              if (!item) return null;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center mx-2 my-2"
                >
                  <img
                    src={item.svg}
                    alt={item.name}
                    className="w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Props Section */}
      <section className="pb-6 sm:pb-8 md:pb-12 bg-white">
        <div className="container max-w-2xl mx-auto pb-4 px-4 sm:px-6">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 font-raleway text-tertiary text-xs sm:text-sm">
              <span className="text-tertiary text-xs sm:text-sm font-semibold">
                Other Props:{" "}
              </span>
              {classData.otherProps?.map((prop, index) => (
                <span
                  key={index}
                  className="font-normal text-tertiary text-xs sm:text-sm font-medium "
                >
                  {prop}
                  {index < classData.otherProps.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ClassDetail;
