import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as LucideSearch, Phone } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const MobileBannerSection = () => {
  const navigate = useNavigate()

  return (
    <section className="block md:hidden">
      <div className="mobile-banner">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          speed={2000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="banner-image-swiper"
        >
          {[
            "/images/frame_1_1.webp",
            "/images/frame_3_1.webp",
      "/images/frame_4_1.webp",
      "/images/frame_5_1.webp"
          ].map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <div
                className="banner-image"
                style={{ backgroundImage: `url('${imageSrc}')` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="banner-content">
            <h1 className="text-lg sm:text-xl font-semibold text-white mb-1 leading-tight">
              Power Your Project
              <br />
              with the Right Machine
            </h1>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed mb-1">
              Golden Sparrow delivers reliable equipment backed by field experts.
            </p>
            <div className="flex flex-col gap-2 sm:gap-3">
              <button
                className="secondary-gradient-btn"
                onClick={() => navigate("/products?taxonomy=equipment-buy")}
              >
                <div className="secondary-gradient-btn-content">
                  <LucideSearch className="w-4 h-4 mr-2" />
                  <span>Browse Inventory</span>
                </div>
              </button>
              <button
                className="gradient-btn"
                onClick={() => {window.location.href = 'tel:+971542320624'}}
              >
                <div className="gradient-btn-content">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Enquire Now</span>
                </div>
              </button>
            </div>
          </div>
      </div>
      <style>
      {`
      .mobile-banner {
        position: relative;
      }

      .banner-image-swiper {
        height: 60vh;
        min-height: 300px;
        max-height: 500px;
        width: 100%;
        position: relative;
      }

      .banner-image {
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        position: relative;
      }

      .banner-content{
        position: absolute;
        top: 50%;
        left: 4%;
        transform: translateY(-50%);
        padding: 10px;
        width: 55%;
        max-width: 270px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

        @media screen and (max-width: 640px) {
        .banner-image-swiper {
          height: 50vh;
          min-height: 280px;
          max-height: 400px;
        }
        }

      /* Responsive adjustments for smaller devices */
      @media screen and (max-width: 480px) {
        .banner-image-swiper {
          height: 40vh;
          min-height: 250px;
          max-height: 350px;
        }
        .banner-content {
          width: 62%;
          max-width: 280px;
          left: 3%;
          padding: 8px;
        }
      }

      @media screen and (max-width: 375px) {
        .banner-image-swiper {
          height: 35vh;
          min-height: 220px;
          max-height: 300px;
        }
        .banner-content {
          width: 55%;
          max-width: 300px;
          left: 2.5%;
          padding: 6px;
        }
      }

      @media screen and (max-width: 320px) {
        .banner-image-swiper {
          height: 32vh;
          min-height: 200px;
          max-height: 280px;
        }
        .banner-content {
          width: 60%;
          max-width: 320px;
          left: 2%;
          padding: 5px;
        }
      }

      /* Responsive button adjustments */
      @media screen and (max-width: 375px) {
        .mobile-banner .gradient-btn-content,
        .mobile-banner .secondary-gradient-btn-content {
          padding: 6px 12px;
          font-size: 14px;
          min-height: 36px;
        }

        .mobile-banner .gradient-btn-content svg,
        .mobile-banner .secondary-gradient-btn-content svg {
          width: 14px;
          height: 14px;
        }
      }

      @media screen and (max-width: 320px) {
        .mobile-banner .gradient-btn-content,
        .mobile-banner .secondary-gradient-btn-content {
          padding: 5px 10px;
          font-size: 13px;
          min-height: 32px;
        }

        .mobile-banner .gradient-btn-content svg,
        .mobile-banner .secondary-gradient-btn-content svg {
          width: 12px;
          height: 12px;
        }

        .mobile-banner .flex.flex-col {
          gap: 6px;
        }
      }

      /* Additional text responsive adjustments */
      @media screen and (max-width: 280px) {
        .banner-content h1 {
          font-size: 16px;
          line-height: 1.2;
        }

        .banner-content p {
          font-size: 11px;
          line-height: 1.3;
        }
      }

      /* Swiper specific styles */
      .banner-image-swiper .swiper-slide {
        height: 100%;
      }

      .banner-image-swiper .swiper-wrapper {
        height: 100%;
      }

      /* Hide swiper navigation on mobile as per design */
      .banner-image-swiper .swiper-button-next,
      .banner-image-swiper .swiper-button-prev {
        display: none;
      }
      `}
    </style>
    </section>
    
  )
}

export default MobileBannerSection