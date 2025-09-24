import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const UnDieselSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4000);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="sm:hidden px-4 py-8 sm:py-16 w-full relative flex flex-col">
      {/* Header Content - Top */}
      <div className="relative z-10 mb-6 sm:mb-8 sm:text-left">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-1 sm:mb-4">
          UN Diesel Forklifts
        </h3>
        <p className="text-base sm:text-lg text-[#1A1A1A] max-w-md">
          From warehouses to construction and logistics.
        </p>
      </div>

      {/* Image Slider */}
      <div className="relative mb-6 sm:mb-8 h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          speed={1000} // Reduced for smoother transitions
          navigation={{
            nextEl: '.hero-swiper-button-next',
            prevEl: '.hero-swiper-button-prev',
          }}
          pagination={{
            el: '.un-custom-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.realIndex);
            setProgress(0); // Reset progress on slide change
          }}
          onAutoplayTimeLeft={(s, time, progress) => {
            setTimeLeft(time);
            setProgress(1 - progress); // Calculate progress (0 to 1)
          }}
          className="w-full h-full hero-slider"
        >
          {[
            "/images/un_diesel_1.png",
            "/images/un_diesel_2.png",
            "/images/un_diesel_3.png",
            "/images/un_diesel_4.png"
          ].map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <img 
                src={imageSrc} 
                alt={`UN Diesel Forklift ${index + 1}`} 
                className="w-full h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation Buttons */}
        {/* <div className="hero-swiper-button-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-3 cursor-pointer transition-all duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="hero-swiper-button-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-3 cursor-pointer transition-all duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div> */}
      </div>

      {/* CTA Button */}
      <div className="mb-6 sm:mb-8 flex justify-center sm:justify-start">
        <a 
          href="tel:+971542320624"
          className="inline-flex items-center justify-center text-white bg-[#1A1A1A] font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none"
          aria-label="Get quote for UN Diesel Forklifts"
          style={{boxShadow: '0px 6px 12px 0px #00000026'}}
        >
          Request a quote
        </a>
      </div>

      {/* Features List */}
      <div className="py-8 sm:py-12">
        <ul className="space-y-4 sm:space-y-6">
          <li className="text-black">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="bg-[#2A2A2A] rounded-full w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-semibold text-lg sm:text-xl mb-2">Handles Heavy Loads</p>
                <p className="text-sm sm:text-base">Lift up to 50 tons with confidence</p>
              </div>
            </div>
          </li>

          <li className="text-black">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="bg-[#2A2A2A] rounded-full w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-semibold text-lg sm:text-xl mb-2">Boosts Efficiency</p>
                <p className="text-sm sm:text-base">Overcome bottlenecks with unmatched versatility</p>
              </div>
            </div>
          </li>

          <li className="text-black">
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="bg-[#2A2A2A] rounded-full w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-semibold text-lg sm:text-xl mb-2">Maximizes Uptime</p>
                <p className="text-sm sm:text-base">Rugged, reliable, and cost-effective performance</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Bottom Tagline & Pagination */}
      <div className="mt-auto">
        <p className="font-semibold text-black text-lg sm:text-xl py-4 text-center sm:text-left">
          Durable. Powerful. Built for business.
        </p>
        {/* Custom Animated Pagination Dots */}
        <div className="un-custom-pagination flex justify-center sm:hidden sm:justify-start"></div>
      </div>

      {/* Synchronized Animation Styles */}
      <style jsx>{`
        /* Hide swiper navigation on mobile as per design */
        .hero-swiper-button-prev,
        .hero-swiper-button-next {
          display: none;
        }

        /* Custom pagination bullet styles */
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(26, 26, 26, 0.25) !important;
          border-radius: 50% !important;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          margin: 0 4px !important;
          opacity: 1 !important;
          position: relative !important;
          overflow: hidden !important;
          cursor: pointer !important;
          border: none !important;
          outline: none !important;
          transform: scale(1) !important;
        }

        /* Active bullet - smooth capsule transformation */
        .swiper-pagination-bullet-active {
          width: 28px !important;
          height: 8px !important;
          border-radius: 12px !important;
          background: #151310 !important;
          
          transform: scale(1) !important;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        /* Smooth hover effects */
        .swiper-pagination-bullet:hover:not(.swiper-pagination-bullet-active) {
          background: #151310 !important;
          transform: scale(1.15) !important;
        }

        /* Synchronized progress fill animation */
        .swiper-pagination-bullet-active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: ${progress * 100}%;
          background: #201C18 !important;
          border-radius: inherit;
          transition: width 0.1s ease-out !important;
          z-index: 1;
        }

        /* Smooth shimmer effect */
        .swiper-pagination-bullet-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%
          );
          border-radius: inherit;
          animation: smoothShimmer 2s ease-in-out infinite;
          z-index: 2;
        }

        @keyframes smoothShimmer {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Enhanced focus styles for accessibility */
        .swiper-pagination-bullet:focus {
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.3) !important;
          outline: none !important;
        }

        /* Responsive adjustments with smooth scaling */
        @media (min-width: 640px) {
          .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            margin: 0 6px !important;
          }
          
          .swiper-pagination-bullet-active {
            width: 36px !important;
            height: 12px !important;
            border-radius: 18px !important;
          }

          /* Show navigation buttons on larger screens */
          .hero-swiper-button-prev,
          .hero-swiper-button-next {
            display: block;
          }
        }

        /* Performance optimizations */
        .swiper-pagination-bullet,
        .swiper-pagination-bullet-active,
        .swiper-pagination-bullet::before,
        .swiper-pagination-bullet::after {
          will-change: transform, width, background-color, opacity !important;
          backface-visibility: hidden !important;
        }

        /* Smooth state transitions */
        .swiper-pagination-bullet:not(.swiper-pagination-bullet-active)::before {
          width: 0% !important;
          transition: width 0.3s ease-out !important;
        }

        /* Custom easing for ultra-smooth animations */
        .swiper-pagination-bullet,
        .swiper-pagination-bullet-active {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
      `}</style>
    </section>
  );
};

export default UnDieselSection;