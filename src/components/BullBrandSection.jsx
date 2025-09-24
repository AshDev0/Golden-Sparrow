import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

const BrandSection = () => {
  // Sample brand logos data
  const brandLogos = [
    { id: 1, src: './images/heli_1.png', alt: 'Heli', name: 'Heli' },
    { id: 2, src: './images/socma.png', alt: 'Socma', name: 'Socma' },
    { id: 3, src: './images/toyota_1.png', alt: 'Toyota', name: 'Toyota' },
    { id: 4, src: './images/komatsu_1.png', alt: 'Komatsu', name: 'Komatsu' },
    { id: 5, src: './images/cat.png', alt: 'Caterpillar', name: 'Caterpillar' },
  ];

  const primaryLogo = {
    src: './images/hengwang.png',
    alt: 'UnForklift',
    name: 'UnForklift'
  };

  // Duplicate slides for better infinite scrolling
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  const swiperSettings = {
    modules: [Autoplay],
    spaceBetween: 16,
    slidesPerView: 1.2,
    centeredSlides: false,
    loop: true,
    loopAdditionalSlides: 2,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      reverseDirection: false,
    },
    speed: 2000,
    freeMode: false,
    allowTouchMove: true,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-8 lg:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal mb-4">
            You <span className="font-bold">Trusted</span> Bulldozer Brands
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            We bring you the complete range of our exclusive, along with other
            reliable and well honored brands.
          </p>
        </div>

        {/* Exclusive + Slider */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-center lg:items-stretch overflow-hidden">
          {/* Exclusive column */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex justify-center lg:border-r-2 lg:border-gray-200 lg:pr-6">
            <div className="relative w-full max-w-[280px] h-[140px] sm:max-w-[220px] lg:max-w-[240px] lg:h-[140px]">
              {/* Logo */}
              <p className="block sm:hidden left-txt text-sm lg:text-base text-center sm:text-left">
            <span className="font-medium">Exclusive</span> Bulldozer Brands
          </p>
              
              <div className="absolute w-[72%] h-[65%] left-[14%] top-[18%] z-10 mt-3 sm:mt-0"
              style={{
                        border: "1px solid",
                        borderImageSource:
                        "linear-gradient(266.93deg, #FFEBC4 -0.96%, #E3A455 99.76%)",
                        borderImageSlice: 1,
                        boxShadow: "0px 40.53px 86.24px 0px #C396021F",
                        borderRadius: "16px",
                        padding: "16px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                    }}>
                <img
                  src={primaryLogo.src}
                  alt={primaryLogo.alt}
                  className="object-contain w-full h-full z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
            </div>

          </div>
          
          {/* Other brands slider */}
          <div className="flex-grow w-full max-w-full overflow-hidden">
            <p className="other-text text-sm lg:text-base text-center sm:text-right">
              Other partnered brands
            </p>
            <Swiper
              {...swiperSettings}
              className="w-full h-[160px]"
            >
              {duplicatedLogos.map((logo, index) => (
                <SwiperSlide key={`${logo.id}-${index}`}>
                  <div className="w-full flex justify-center h-full">
                    <div className="relative w-full max-w-[280px] h-[140px] sm:max-w-[220px] lg:max-w-[240px] lg:h-[140px]">
                      {/* Logo */}
                      <div className="absolute w-[70%] h-[65%] left-[15%] top-[18%] z-10"
                      style={{
                              border: "1px solid",
                              borderImageSource:
                              "linear-gradient(266.93deg, #FFEBC4 -0.96%, #E3A455 99.76%)",
                              borderImageSlice: 1,
                              boxShadow: "0px 40.53px 86.24px 0px #C396021F",
                              borderRadius: "16px",
                              padding: "16px",
                              overflow: "hidden",
                              backgroundColor: "#fff",
                          }}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.backgroundColor = '#f3f4f6';
                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400 text-xs">Logo</div>';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>  
              ))}
            </Swiper>
          </div>
        </div>
        {/* Taglines */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 lg:mt-8 space-y-4 sm:space-y-0">
          <div className="flex items-end gap-2">
            <p className="exclusive-text hidden sm:block left-txt text-sm lg:text-base text-center sm:text-left">
              <span className="font-medium">Exclusive</span> Bulldozer Brands
            </p>
            {/* Horizontal line after exclusive text - Desktop only */}
            <div className="hidden lg:block w-16 h-px mb-1 bg-black"></div>
          </div>
          <div className="flex items-end gap-2">
            {/* Horizontal line before other text - Desktop only */}
            <div className="hidden lg:block w-[250px] h-px bg-black mb-1"></div>
            <p className="hidden lg:block other-text text-sm lg:text-base text-center sm:text-right">
              Other partnered brands
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
