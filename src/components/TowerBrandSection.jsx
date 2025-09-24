// BrandSection.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TowerBrandSection = () => {
  const logos = [
    { id: 1, src: "./images/soc.png", alt: "heli" },
    { id: 2, src: "./images/soc.png", alt: "socma" },
    { id: 3, src: "./images/soc.png", alt: "toyota" },
    { id: 4, src: "./images/soc.png", alt: "komatsu" },
    { id: 5, src: "./images/soc.png", alt: "cat" },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-8 lg:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal mb-4">
            You <span className="font-bold">Trusted</span> Lighting Tower Brand
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            We bring you the complete range of our exclusive, along with other
            reliable and well honored brands.
          </p>
        </div>

        {/* Exclusive + Slider */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-center justify-center overflow-x-hidden">
  {/* Left Side (Image) */}
  <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col justify-center lg:justify-center">
    <img
      src="./images/univ_logo.png"
      alt="univ"
      className="object-contain max-w-full h-auto"
    />
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-end gap-2">
          <p className="text-sm lg:text-base text-center sm:text-left mt-4">
            <span className="font-medium">Exclusive</span> Lighting Tower Brand
          </p>
          <div className="hidden lg:block w-16 h-px mb-1 bg-black"></div>
          </div>
        </div>
    
  </div>

  {/* Right Side (Content) */}
  <div className="text-center lg:text-left">
    <p className="left-txt text-sm lg:text-base mb-8">
      UNIV Lighting Towers combine{" "}
      <span className="font-bold">rugged design<br/>with powerful illumination.</span>
    </p>

    <p className="left-txt text-sm lg:text-base">
      It is <span className="font-bold">trusted worldwide</span> for delivering dependable<br/>quality for construction, oil & gas, and industrial sites.
    </p>
  </div>
</div>


        {/* Taglines */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-end gap-4">
          <p className="text-sm lg:text-base text-center sm:text-left mt-4">
            <span className="font-medium">Exclusive</span> Lighting Tower Brand
          </p>
          <div className="hidden lg:block w-16 h-px mb-1 bg-black"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TowerBrandSection;
