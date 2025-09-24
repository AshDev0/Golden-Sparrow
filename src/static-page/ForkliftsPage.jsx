import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import SliderSection from "../components/ImageSlider";
import ForkliftsEnquiryForm from "../components/ForkliftsEnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import BannerSection from "../components/BannerSection";
import BrandSection from "../components/BrandSection";
import { Phone } from "lucide-react";
import ForkliftsSolutions from "../components/ForkliftsSolutions";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import UnDieselSection from "../components/UnDieselForklifts";
const ForkliftsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* Forklift Page Banner Section  */}
      <section
        className="hero-section relative w-full bg-no-repeat"
        role="banner"
        aria-label="Hero section"
      >
        <div
          className="absolute inset-0 w-full sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[60%] h-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 h-full flex items-center">
          <div className="max-w-none sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white mb-4 sm:mb-6 leading-tight">
              Elevate Your Operations with 
              <br className="hidden sm:block" />
              <span className="font-semibold">
                 {' '}Brand-New Diesel & Electric 
                <br className="hidden sm:block" />
                {' '}Forklifts
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-6 sm:mb-8 leading-relaxed max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
              Golden Sparrow proudly offers a premium range of powerful Diesel &
              Electric Forklifts — available in 2 Ton, 7 Ton, 10 Ton all the way
              up to 52 Ton capacities.
            </p>

            <div className="inline-flex sm:flex flex-col sm:flex-row gap-4">
              <button
                className="gradient-btn"
                onClick={() => {
                  window.location.href = "tel:+971542320624";
                }}
              >
                <div className="gradient-btn-content">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="">Enquire Now</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* CSS Scoped to this component */}
        <style jsx>{`
          .hero-section {
            background-image: url("./images/frame_2_1.webp");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }

          @media (max-width: 640px) {
            .hero-section {
              background-position: center right;
            }
          }

          @media (min-width: 1920px) {
            .hero-section {
              background-size: cover;
              background-position: center center;
            }
          }
        `}</style>
      </section>
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandSection />
        </div>
        </section> */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Content */}
            <div className="flex flex-col gap-4 sm:text-center md:text-left md:max-w-xl">
              <h2 className="font-normal text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                <span className="font-semibold">Forklifts</span> You Can Rely On
              </h2>
              <p className="text-base leading-relaxed">
                Elevated access, compact design, and exceptional control — all
                in one fleet.
              </p>
              <p className="text-base leading-relaxed">
                Carefully chosen by Golden Sparrow for tasks that demand safe,
                smart, and stable elevation.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div
                className="w-full max-w-md bg-white p-2"
                style={{
                  border: "1.57px solid",
                  borderImageSource:
                    "conic-gradient(from 167.85deg at 75.81% -16.57%, #EEBC70 -21.72deg, #E3A455 26.25deg, #FFEBC4 156.58deg, #D0A068 261.59deg, #EEBC70 338.28deg, #E3A455 386.25deg)",
                  boxShadow: "0px 40.53px 86.24px 0px #C396021F",
                }}
              >
                <img
                  src="./images/unforklift.png"
                  alt="sany"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Versatile Solution Section */}
      {/* <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2">Versatile <span className="font-bold">Forklift</span> Solutions</h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-6">for Every Industry</h3>
        <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">No matter your sector, Golden Sparrow has the right equipment to get the job done efficiently and reliably:</p>
      </div>
          <SliderSection/>
        </div>
      </section> */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2">
              Versatile <span className="font-bold">Forklift</span> Solutions
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-6">
              for Every Industry
            </h3>
            <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">
              No matter your sector, Golden Sparrow has the right equipment to
              get the job done efficiently and reliably:
            </p>
          </div>
          <ForkliftsSolutions />
        </div>
      </section>

      {/* <ImageWithText
        contentPosition="right"
        textAlign="left"
        // style={{backgroundImage:"linear-gradient(to left: rgba(0,0,0,0) 0.25%, rgba(0 0 0 / 8%) 49%, rgba(0 0 0 ) 63%), url('/images/.forklifts_diesel_forklifts.webp')"}}
        // gradientDirection="270deg"
        // gradientStops={["0.25%", "35.03%", "83.49%"]}
        // gradientColors={{
        //   start: "rgba(0, 0, 0, 0)",
        //   middle: "rgba(0, 0, 0, 0.5)",
        //   end: "rgba(0, 0, 0, 0.83)",
        // }}
        title={
          <>
            Diesel Forklifts
            <br />
            That Work as Hard as You Do
          </>
        }
        description={
          <>
            Built to thrive in demanding environments — from<br/>warehouses to
            construction and e-commerce logistics.
          </>
        }
        button={<>Request a quote</>}
        backgroundImage="/images/forklifts_diesel_forklifts.webp"
        minHeight="screen"
        content={
          <>
            <ul className="flex flex-col gap-2 mb-6">
              <li>
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <LucideArrowRight className="w-4 text-black" />
                  </span>
                  <span className="font-semibold">Handles Heavy Loads:</span>
                </p>
                <p className="pl-8">Lift up to 50 tons with confidence</p>
              </li>

              <li>
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <LucideArrowRight className="w-4 text-black" />
                  </span>
                  <span className="font-semibold">Boosts Efficiency:</span>
                </p>
                <p  className="pl-8">Overcome bottlenecks with unmatched versatility</p>
              </li>
              <li>
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <LucideArrowRight className="w-4 text-black" />
                  </span>
                  <span className="font-semibold">Maximizes Uptime:</span>
                </p>
                <p  className="pl-8">Rugged, reliable, and cost-effective performance</p>
              </li>
            </ul>
            <span className="font-semibold text-2xl">
              Durable. Powerful. Built for business.
            </span>
          </>
        }
      /> */}

      {/* <BannerSection /> */}
      {/* Forklift banner section for desktop */}
      <section
        className="hidden sm:block fork-hero-section relative w-full bg-no-repeat py-12"
        role="banner"
        aria-label="Hero section"
      >
        <div
          className="absolute inset-0 w-full sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[60%] h-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-24 h-full flex items-center">
          <div className="max-w-max">
            <h2 className="text-2xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
              UN Diesel Forklifts
            </h2>
            <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">
              From warehouses to
              <br />
              construction and logistics.
            </p>

            <ul className="flex flex-col gap-2 mb-6">
              <li className="text-white">
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-4 text-black"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                  <span className="font-semibold">Lift Up to 50 Tons</span>
                </p>
              </li>

              <li className="text-white">
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-4 text-black"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                  <span className="font-semibold">
                    Trusted in 70+ countries
                  </span>
                </p>
              </li>

              <li className="text-white">
                <p className="flex items-center gap-2 mb-1">
                  <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-4 text-black"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                  <span className="font-semibold">
                    Fuel Efficient low running cost
                  </span>
                </p>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href="tel:+971542320624"
                className="quoteNowBtn inline-flex items-center justify-center text-black font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Call to action button"
                style={{}}
              >
                Get Quote Now
              </a>
            </div>
          </div>
        </div>
        <style jsx>{`
          .fork-hero-section {
            background-image: url("./images/forklift_banner_new.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
          }

          .quoteNowBtn {
            background: linear-gradient(
              159.21deg,
              #ffd200 11.19%,
              #f7971e 101.23%
            );
            outline: none;
            border: none;
          }

          .quoteNowBtn:hover,
          .quoteNowBtn:active {
            background: linear-gradient(
              159.21deg,
              #f7971e 11.19%,
              #ffd200 101.23%
            );
          }

          @media (max-width: 640px) {
            .fork-hero-section {
              background-position: center right;
            }
          }

          @media (min-width: 1920px) {
            .fork-hero-section {
              background-size: cover;
              background-position: right;
            }
          }
        `}</style>
      </section>

      {/* Forklift banner section for mobile */}
      <UnDieselSection />


      <div
        className="py-16 bg-neutral-50"
        style={{ boxShadow: "0px -11px 50px 2px #0000001C" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ForkliftsEnquiryForm
            title={
              <>
                Need the
                <br />
                <span className="font-semibold">Right Forklifts</span>
              </>
            }
            content={
              <>
                <p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
                  Get expert advice, quick quotes, and the best deals — all in
                  one place.
                </p>
                <p className="text-base lg:text-lg text-white">
                  Enquire now and let{" "}
                  <span className="font-semibold">Golden Sparrow</span>
                  <br className="hidden sm:block" />
                  {' '}lift your business higher.
                </p>
              </>
            }
            backgroundImage="./images/EnquiryForm.jpg"
          />
        </div>
      </div>
      <EnquiryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
export default ForkliftsPage;
