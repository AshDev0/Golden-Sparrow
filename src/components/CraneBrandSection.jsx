
 import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
const CraneBrandSection = () => {
  const exclusiveBrands = [
    { id: 1, src: "./images/socma.png", alt: "SOCMA" },
    { id: 2, src: "./images/hengwang_1.png", alt: "Hengwang" },
    { id: 3, src: "./images/sany_1.png", alt: "SANY" },
  ];
  const partnerBrands = [
    { id: 1, src: "./images/heli_1.png", alt: "Heli" },
    { id: 2, src: "./images/toyota_1.png", alt: "Toyota" },
    { id: 3, src: "./images/komatsu_1.png", alt: "Komatsu" },
    { id: 4, src: "./images/cat.png", alt: "CAT" },
    { id: 5, src: "./images/crown.png", alt: "Crown" },
  ];

  // Duplicate brands for smoother infinite loop
  const extendedPartnerBrands = [...partnerBrands, ...partnerBrands];

  // Swiper configuration
  const swiperConfig = {
    modules: [Autoplay],
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: false,
    loopAdditionalSlides: 1,
    centeredSlides: false,
    allowTouchMove: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1500,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };

  // Brand card component for reusability
  const BrandCard = ({ brand, isExclusive = false }) => (
    <div className="brand-card-container">
      <div className="brand-card">
        <img
          src={brand.src}
          alt={brand.alt}
          className="brand-logo"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <>
      <section className="crane-brands-section">
        <div className="container">
          {/* Header */}
          <header className="section-header">
            <h2 className="section-title">
              Your <span className="font-bold">Trusted</span> Crane Brands
            </h2>
            <p className="section-subtitle">
              We bring you the complete range of our exclusive, along with other reliable and well honored brands.
            </p>
          </header>

          {/* Main Content */}
          <div className="brands-content">
            {/* Exclusive Brands */}
            <div className="block sm:hidden brand-label exclusive-label">
                <span className="font-medium">Exclusive</span> Crane Brands
              </div>
            <div className="exclusive-brands">
              <div className="exclusive-brands-grid">
                {exclusiveBrands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} isExclusive={true} />
                ))}
              </div>
              <div className="hidden sm:block brand-label exclusive-label">
                <span className="font-medium">Exclusive</span> Crane Brands
              </div>
            </div>

            {/* Partner Brands Slider */}
            <div className="partner-brands">
              <div className="partner-brands-container">
                <div className="block sm:hidden brand-label">
                  Other partnered brands
                </div>
                <Swiper {...swiperConfig} className="partner-brands-slider">
                  {extendedPartnerBrands.map((brand, index) => (
                    <SwiperSlide key={`${brand.id}-${index}`}>
                      <BrandCard brand={brand} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="hidden lg:block brand-label partner-label">
                  Other partnered brands
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .crane-brands-section {
          padding: 2rem 0;
          overflow: hidden;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: normal;
          margin-bottom: 1rem;
          color: #1a1a1a;
          line-height: 1.2;
        }

        .section-subtitle {
          font-size: clamp(0.875rem, 2vw, 1rem);
          font-weight: 600;
          color: #4b5563;
          max-width: 650px;
        }

        .brands-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .exclusive-brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          justify-items: center;
          margin-bottom: 2rem;
          margin: auto;
        }

        .partner-brands-container {
          position: relative;
          padding-bottom: 3rem;
        }

        .brand-card-container {
          width: 100%;
          max-width: 240px;
        }

        .brand-card {
          position: relative;
          width: 100%;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0px 40.53px 86.24px 0px #C396021F;
          border: 1.57px solid;
          border-image-source: conic-gradient(
            from 167.85deg at 75.81% -16.57%, 
            #EEBC70 -21.72deg, 
            #E3A455 26.25deg, 
            #FFEBC4 156.58deg, 
            #D0A068 261.59deg, 
            #EEBC70 338.28deg, 
            #E3A455 386.25deg
          );
          border-image-slice: 1;
          border-radius: 8px;
        }

        .brand-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: brightness(1.1) contrast(1.1);
        }

        .brand-label {
          font-size: clamp(0.875rem, 2vw, 1rem);
          position: relative;
        }

        /* Exclusive label - left aligned with line after */
        .exclusive-label {
          text-align: left;
          margin-top: 1rem;
        }

        .exclusive-label::after {
          content: '';
          position: absolute;
          left: 17%;
          top: 70%;
          width: 140px;
          height: 1px;
          background: #000;
          transform: translateY(-70%);
        }

        /* Partner label - right aligned with line before */
        .partner-label {
          text-align: right;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          margin-top: 2rem;
        }

        .partner-label::before {
          content: '';
          position: absolute;
          right: 17%;
          top: 70%;
          width: 140px;
          height: 1px;
          background: #000;
          transform: translateY(-70%);
        }

        .partner-brands-slider {
          padding: 1rem 0 2rem 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .brand-label {
            padding: 0 8rem;
          }

          .exclusive-label::after,
          .partner-label::before {
            width: 100px;
          }
        }

        @media (max-width: 768px) {
          .crane-brands-section {
            padding: 1.5rem 0;
          }

          .brands-content {
            gap: 2rem;
          }

          .exclusive-brands-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .brand-card {
            height: 120px;
            padding: 1rem;
          }

          .section-header {
            margin-bottom: 2rem;
          }

          .brand-label {
            padding: 0;
            text-align: center;
          }

          .exclusive-label::after,
          .partner-label::before {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .brand-label {
            padding: 0;
          }

          .exclusive-label::after,
          .partner-label::before {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .exclusive-brands-grid {
            grid-template-columns: 1fr;
            max-width: 280px;
            margin: 0 auto 1.5rem;
          }

          .brand-label {
            padding: 0;
            font-size: 0.875rem;
          }

          .exclusive-label::after,
          .partner-label::before {
            display: none;
          }
        }

        /* Large screens optimization */
        @media (min-width: 1280px) {
          .section-header {
            text-align: left;
          }

          .exclusive-brands-grid {
            grid-template-columns: repeat(3, 1fr);
            max-width: 800px;
          }


          .exclusive-label::after,
          .partner-label::before {
            width: 160px;
          }
        }
      `}</style>
    </>
  );
};

export default CraneBrandSection;