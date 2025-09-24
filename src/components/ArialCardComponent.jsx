import React, {useState, useEffect, useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
 
const ColumnCard = ({ title, description, image }) => {
  return (
    <div
      className="relative rounded-xl overflow-hidden w-full h-64 md:h-[450px] md:flex-1 md:min-w-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
     
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <h3 className="text-white text-lg md:text-2xl font-bold mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
 
export default function ArialCardComponent() {
  const [isMobile, setIsMobile] = useState(false)
        const [activeSlide, setActiveSlide] = useState(0)
        const [timeLeft, setTimeLeft] = useState(3000)
        const [progress, setProgress] = useState(0)
        const swiperRef = useRef(null)
      
        useEffect(() => {
          const checkMobile = () => {
            setIsMobile(window.innerWidth < 640) // sm breakpoint
          }
      
          checkMobile()
          window.addEventListener('resize', checkMobile)
      
          return () => window.removeEventListener('resize', checkMobile)
        }, []);
  const columns = [
    {
      title: "Indoor Maintenance & Repairs",
      description: "Safely reach ceilings, lighting, and HVAC systems in malls, warehouses, and offices.",
      image: "/images/arial_component_1.webp",
    },
    {
      title: "Outdoor Construction & Building",
      description: "Navigate around obstacles and reach difficult angles with height precision.",
      image: "/images/arial_component_2.webp",
    },
    {
      title: "High-Reach Installations",
      description: "Ideal for long vertical reach and work across large facades and tall structures.",
      image: "/images/arial_component_3.webp",
    },
  ];

  const SolutionCard = ({title, description, image}) => (
      <div className="relative aspect-[4/3] overflow-hidden rounded-md">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-bold">{title}</h3>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    )
  if (isMobile) {
      return (
        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination]}
            spaceBetween={12}
            slidesPerView={1.1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
              el: '.solutions-custom-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
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
            className="rounded-md"
          >
            {columns.map((solution, index) => (
              <SwiperSlide key={index}>
                <SolutionCard
                  title={solution.title}
                  description={solution.description}
                  image={solution.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
  
          {/* Custom Progress Dots */}
          <div className="sm:hidden solutions-custom-pagination flex justify-center mt-4"></div>
  
          {/* Synchronized Animation Styles */}
          <style jsx>{`
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
            @media (max-width: 640px) {
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
        </div>
      )
    }
 
  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {columns.map((column, index) => (
          <ColumnCard
            key={index}
            title={column.title}
            description={column.description}
            image={column.image}
          />
        ))}
      </div>
    </div>
  );
}