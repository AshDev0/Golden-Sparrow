import React, { useState, useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import SkidBrandSection from '../components/SkidBrandSection';
import SkidSteerSlider from '../components/SkidSteerSlider';
import { Phone } from "lucide-react";
const SkidSteerPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
    {/* Hero Section For SkidSteer */}
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
            Unmatched Power in a
            <br className="hidden sm:block" />
            {' '}Compact Frame with
            <br className="hidden md:block" />
            <span className="font-medium">{' '}Skid Steer Loaders</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-6 sm:mb-8 leading-relaxed max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            Golden Sparrow delivers top-tier Skid Steer Loaders engineered for performance, agility, and versatility. Perfect for tight spaces and rugged UAE job sites.
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
          background-image: url('./images/skid_steer_banner.webp');
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        @media (max-width: 640px) {
          .hero-section {
            background-position: center center;
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkidBrandSection />
        </div>
        </section>
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2">Versatile <span className="font-bold">Skid Steer</span> Solutions
</h2>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-6">for Every Industry</h3>
        <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">No matter your sector, skid steers adapt to the job — delivering efficiency, productivity, and reliability.</p>
      </div>
          
          <SkidSteerSlider />        

        </div>
      </section>

      {/* Banner Section */}
      <section className="forklift-bnrx py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-max">
          <h2 className="text-2xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
            <span className="font-bold">Skid Steer Loaders</span><br/>That Work as Hard as You Do
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">Built to thrive in demanding environments — from<br/>construction to landscaping and agriculture.</p>
 
<ul className="flex flex-col gap-2 mb-6">
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Handles Heavy Loads:</span>
          </p>
 
          <p className="pl-8">Lift and transport with rugged confidence.</p>
 
        </li>
 
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Compact Agility:</span>
          </p>
          <p className="pl-8">Navigate tight areas without losing power.</p>
        </li>
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Maximizes Efficiency</span>
          </p>
          <p className="pl-8">Multi-purpose attachments for any job.</p>
        </li>
</ul>
 
<span className="font-semibold text-white mb-4">Durable. Versatile. Built for Results.</span>
 
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
        url('./images/skitsteer_banner.webp');
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
}

@media screen and (max-width:768px){
.forklift-bnrx {
        background:
            linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)),
            url('./images/skitsteer_banner.webp');
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
      <EnquiryForm title={<>Need the <span className="font-semibold">Right<br className="hidden sm:block"/>{" "}Skid Steer Loader?</span></>} content={<><p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
            Get expert advice, quick quotes, and the best deals — all in one
            place.
          </p>
          <p className="text-base lg:text-lg text-white">
            Enquire now and let{" "}
            <span className="font-semibold">Golden Sparrow</span>
            <br className="hidden sm:block"/>
            {" "}lift your business higher.
          </p></>}
          backgroundImage="./images/EnquiryForm.jpg" />
      </div>
      </div>

      {/* Enquiry Popup */}
      <EnquiryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
export default SkidSteerPage;
