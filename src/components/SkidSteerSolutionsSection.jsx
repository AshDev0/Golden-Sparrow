import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TRANS = { type: "tween", duration: 0.6, ease: "easeInOut" };
const SliderTab = ({ title, description, image, isOpen, onClick, isMobile }) => {
  return (
    <motion.div
      onClick={!isMobile ? onClick : undefined}
      animate={{ width: isMobile ? "100%" : isOpen ? 1029 : 130 }}
      transition={TRANS}
      initial={false}
      className={`relative rounded-xl cursor-pointer overflow-hidden ${
        isMobile ? "h-[260px]" : "h-[500px]"
      }`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minWidth: isMobile ? "100%" : 130,
      }}
    >
      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        initial={false}
        animate={{
          background: isOpen || isMobile
            ? "linear-gradient(180deg, rgba(0,0,0,0) 54.25%, rgba(0,0,0,0.9) 93.14%)"
            : "linear-gradient(180deg, rgba(0,0,0,0) -65.33%, rgba(0,0,0,0.9) 75.2%)",
        }}
        transition={TRANS}
      />

      {/* Content */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-end">
        <motion.div
          initial={false}
          animate={isOpen || isMobile ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{
            ...TRANS,
            delay: isOpen || isMobile ? 0.18 : 0,
          }}
          className="p-4 md:p-6 w-full"
        >
          <h3 className="text-white text-lg md:text-3xl font-semibold drop-shadow-lg break-words">
            {title}
          </h3>
          <p className="mt-1 text-white text-sm md:text-lg font-medium drop-shadow-lg break-words">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Vertical Title (desktop only) */}
      {!isMobile && (
        <motion.h3
          initial={false}
          animate={
            isOpen
              ? { rotate: -90, y: 120, opacity: 0 }
              : { rotate: -90, y: 0, opacity: 1 }
          }
          transition={{ ...TRANS, duration: 0.7 }}
          className="absolute left-20 bottom-10 origin-bottom-left z-30 pointer-events-none text-white text-xl font-semibold drop-shadow-lg whitespace-nowrap"
          style={{ transform: "rotate(-90deg)" }}
        >
          {title}
        </motion.h3>
      )}
    </motion.div>
  );
};

const SliderGradient = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    {
      title: "Landscaping Projects",
      description: "Ideal for grading, leveling, and site prep.",
      image: "/images/forklifts_warehousing.webp",
    },
    {
      title: "Construction Sites",
      description: "Move, dig, and load with compact power.",
      image: "/images/forklifts_truck_loading.webp",
    },
    {
      title: "Road & Infrastructure",
      description: "Handle asphalt, gravel, and groundwork with ease.",
      image: "/images/forklifts_construtions.webp",
    },
    {
      title: "Agriculture & Farming",
      description: "Boost efficiency in everyday farming operations.",
      image: "/images/forklifts_dockyards.webp",
    },
  ];

  return (
    <div
      className={`w-full ${
        isMobile ? "flex flex-col gap-4" : "flex flex-row gap-2 h-[500px]"
      }`}
    >
      {slides.map((s, i) => (
        <SliderTab
          key={i}
          {...s}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(i)}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};
const SkidSteerSolutionsSection = () => {
  return (
 <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-normal text-gray-900 mb-2">
            Versatile <span className="font-bold">Forklift Solutions</span>
          </h2>
          <h3 className="text-3xl lg:text-5xl font-normal text-gray-900 mb-6">
            for Every Industry
          </h3>
          <p className="text-black text-lg lg:text-xl font-semibold max-w-6xl">
            No matter your sector, Golden Sparrow has the right equipment to get the job done efficiently and reliably:
          </p>
        </div>
        <SliderGradient />
      </div>
    </section>
  );
};

export default SkidSteerSolutionsSection