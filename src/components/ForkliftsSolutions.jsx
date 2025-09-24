import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const ForkliftsSolutions = () => {
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
  }, [])

  const solutionsData = [
    {
      id: 1,
      image: "/images/forklifts_warehousing.webp",
      alt: "Forklifts for Warehousing Solutions",
      title: "Warehousing & Storage",
      description: "Streamline operations with ease"
    },
    {
      id: 2,
      image: "/images/forklifts_truck_loading.webp",
      alt: "Forklifts for Truck Loading Solutions",
      title: "Truck Loading-Unloading",
      description: "Boost productivity at every dock"
    },
    {
      id: 3,
      image: "/images/forklifts_construtions.webp",
      alt: "Forklifts for Construction Solutions",
      title: "Construction Sites",
      description: "Handle heavy lifting in tough environments"
    },
    {
      id: 4,
      image: "/images/forklifts_dockyards.webp",
      alt: "Forklifts for Dockyard Solutions",
      title: "Dockyards & Ports",
      description: "Built to perform in high-demand logistics"
    },
    {
      id: 5,
      image: "/images/forklifts_manufacturing.webp",
      alt: "Forklifts for Manufacturing Solutions",
      title: "Manufacturing Lines",
      description: "Keep your production moving smoothly"
    }
  ]

  const SolutionCard = ({ solution }) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
      <img
        className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
        src={solution.image}
        alt={solution.alt}
      />
      <div className='absolute bottom-0 left-0 right-0 p-4 z-10' style={{ background: 'linear-gradient(to top, #1A1A1A 0%, rgba(26, 26, 26, 0.8) 50%, transparent 100%)' }}>
        <h3 className="text-white text-lg md:text-2xl font-semibold drop-shadow-lg break-words">
          {solution.title}
        </h3>
        <p className="mt-1 text-white text-sm md:text-lg font-medium drop-shadow-lg break-words">
          {solution.description}
        </p>
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
          {solutionsData.map((solution) => (
            <SwiperSlide key={solution.id}>
              <SolutionCard solution={solution} />
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
    <div className="space-y-4">
      {/* First row - 3 columns on desktop, 1 on mobile, 2 on tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <SolutionCard solution={solutionsData[0]} />
        <SolutionCard solution={solutionsData[1]} />
        <div className="sm:col-span-2 lg:col-span-1">
          <SolutionCard solution={solutionsData[2]} />
        </div>
      </div>

      {/* Second row - 2 columns responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SolutionCard solution={solutionsData[3]} />
        <SolutionCard solution={solutionsData[4]} />
      </div>
    </div>
  )
}

export default ForkliftsSolutions