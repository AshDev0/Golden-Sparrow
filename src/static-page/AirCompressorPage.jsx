import React, { useState, useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import AcCardComponent from "../components/Ac_cardComponent";
import { Phone } from "lucide-react";
const AirCompressorPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
    {/* Hero Section For Air Compressor Page */}
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
            <span className="font-medium">Power Your Projects</span> with
            <br className="hidden sm:block" />
            {' '}Heavy-Duty UNIV Air
            <br className="hidden md:block" />
            {' '}Compressors
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-6 sm:mb-8 leading-relaxed max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            Powerful diesel air compressors built for consistent, high-pressure performance in the toughest environments.
          </p>
          
          <div className="inline-flex sm:flex flex-col sm:flex-row gap-4">
                                    
                                    <button className="gradient-btn" onClick={() => {window.location.href = 'tel:+971542320624'}}>
                                                        <div className="gradient-btn-content">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        <span className="">
                                                        Enquire Now
                                                        </span>
                                                        </div>
                                                      </button>
                                  </div>
        </div>
      </div>

      {/* CSS Scoped to this component */}
      <style jsx>{`
        .hero-section {
          background-image: url('./images/ac_banner.webp');
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
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="text-center lg:text-left mb-8 lg:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal mb-4">
            You <span className="font-bold">Trusted</span> Air Compressor Brand
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            We bring you the complete range of UNIV Air Compressors — exclusively through Golden Sparrow
          </p>
        </div> */}

        {/* Exclusive + Slider */}
        {/* <div className="flex flex-col lg:flex-row gap-8 items-center  lg:items-center justify-center overflow-x-hidden"> */}
  {/* Left Side (Image) */}
  {/* <div className="w-full lg:w-[330px] flex-shrink-0 flex justify-center lg:justify-start">
    <img
      src="./images/univ_logo.png"
      alt="univ"
      className="object-contain max-w-full h-auto"
    />
  </div> */}

  {/* Right Side (Content) */}
  {/* <div className="flex-grow w-full text-center lg:text-left">
    <p className="left-txt text-sm lg:text-base mb-8">
      UNIV Air Compressors are engineered for<br/><span className="font-bold">durability and consistent</span> high-pressure output.
    </p>

    <p className="left-txt text-sm lg:text-base">
      It is <span className="font-bold">Trusted worldwide</span>, they deliver reliable, fuel-<br/>efficient performance across demanding job sites.
    </p>
  </div>
</div> */}
        {/* Taglines */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm lg:text-base text-center sm:text-left mt-4">
            <span className="font-medium">Exclusive</span> Air Compressor Brand
          </p>
        </div>
      </div>
    </div>
    </div>
    </section> */}

    <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center lg:text-left mb-8 lg:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal mb-4">
            You <span className="font-bold">Trusted</span> Air Compressor Brand
          </h2>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            We bring you the complete range of UNIV Air Compressors — exclusively through Golden Sparrow
          </p>
        </div>

        {/* Exclusive + Slider */}
        <div className="flex justify-center overflow-x-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl gap-8">
            
            {/* Left Side (Image) */}
            <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col justify-center">
              <img
                src="./images/univ_logo.png"
                alt="univ"
                className="object-contain max-w-full h-auto"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-end gap-2">
          <p className="text-sm lg:text-base text-center sm:text-left mt-4">
            <span className="font-medium">Exclusive</span> Air Compressor Brand
          </p>
          <div className="hidden lg:block w-16 h-px mb-1 bg-black"></div>
          </div>
        </div>
            </div>
            
            {/* Right Side (Content) */}
            <div className="text-center lg:text-left">
              <p className="text-sm lg:text-base mb-8">
                UNIV Air Compressors are engineered for<br />
                <span className="font-bold">durability and consistent</span> high-pressure output.
              </p>

              <p className="text-sm lg:text-base">
                It is <span className="font-bold">Trusted worldwide</span>, they deliver reliable, fuel-<br />
                efficient performance across demanding job sites.
              </p>
            </div>
          </div>
        </div>

        {/* Taglines */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-end gap-4">
          <p className="text-sm lg:text-base text-center sm:text-left mt-4">
            <span className="font-medium">Exclusive</span> Air Compressor Brand
          </p>
          <div className="hidden lg:block w-16 h-px mb-1 bg-black"></div>
          </div>
        </div>             */}
      </div>
    </div>
  </div>
</section>

      
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2">Versatile <span className="font-bold">Air Compressor</span>
</h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-6">Solutions for Every Industry</h3>
        <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">Air compressors designed to power tools, machinery, and operations across diverse industries.</p>
      </div>
        
        <AcCardComponent />

        </div>
      </section>

      {/* Banner Section */}
      <section className="forklift-bnrx py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-max">
          <h2 className="text-2xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
            <span className="font-bold">Air Compressor</span> that Work<br className="hidden sm:block"/>{" "}Doesn’t Stop Even at Night
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">From construction sites to oil fields - designed for<br/>maximum output, fuel efficiency, and long service life.</p>
 
<ul className="flex flex-col gap-2 mb-6">
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">High Pressure, High Performance</span>
          </p>
 
          <p className="pl-8">Deliver consistent compressed air in any conditions.</p>
 
        </li>
 
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Fuel Efficient</span>
          </p>
          <p className="pl-8">Advanced diesel engines reduce consumption and operating costs.</p>
        </li>
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Built for Harsh Environments</span>
          </p>
          <p className="pl-8">Performs reliably in heat, dust, and rugged UAE terrains.</p>
        </li>
</ul>
 
<span className="font-semibold text-white mb-4">Powerful. Reliable. Built for Results.</span>
 
<div className="flex flex-col sm:flex-row gap-4 mt-4">
  {/* <button onClick={handleOpenPopup} className="inline-flex items-center justify-center bg-[#FFC501] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md hover:bg-yellow-500 focus:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" aria-label="Call to action button" >Request a quote</button> */}
  <a href="tel:+971542320624" className="inline-flex items-center justify-center bg-[#FFC501] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md hover:bg-yellow-500 focus:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" aria-label="Call to action button" >Request a quote</a>
</div>
 </div>          
        </div>


        <style>{`
            .forklift-bnrx {
    padding: 3em 0;
    background:
        linear-gradient(270deg,
  #000000 21.25%,
  rgba(0, 0, 0, 0.734675) 40.03%,
  rgba(0, 0, 0, 0) 58.49%),
        url('./images/ac_banner_2.webp');
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
}

@media screen and (max-width:768px){
.forklift-bnrx {
        background:
            linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)),
            url('./images/ac_banner_2.webp');
        background-size: cover;
        background-position: 40% 0%;
    }
}
        
        `}</style>
      </section>

      


    {/* Enquiry Form  Section    */}
      <div className="py-16 bg-neutral-50" style={{boxShadow: '0px -11px 50px 2px #0000001C'
}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <EnquiryForm title={<>Need the <span className="font-semibold">Right<br className="hidden sm:block"/>{" "}Air Compressors?</span></>} content={<><p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
            Get expert advice, quick quotes, and the best deals — all in one
            place.
          </p>
          <p className="text-base lg:text-lg text-white">
            Enquire now and let{" "}
            <span className="font-semibold">Golden Sparrow</span>
            <br className="hidden sm:block"/>
            {" "}lift your business higher.
          </p></>}
          backgroundImage="./images/ac_form_img.webp" />
      </div>
      </div>

      {/* Enquiry Popup */}
      <EnquiryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
export default AirCompressorPage;
