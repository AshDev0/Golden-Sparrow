import React, { useState, useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import ExBrandSection from '../components/ExBrandSection';
import ExCardComponent from "../components/ExCardComponent";
import { Phone } from "lucide-react";
const ExcavatorPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
    {/* Hero Section For Excavator */}
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
            <span className="font-medium">Dig. Break. Build.</span>
            <br className="hidden sm:block" />
            {' '}Reliable Excavators for Every
            <br className="hidden md:block" />
            {' '}Challenge
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-6 sm:mb-8 leading-relaxed max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            Shortlisted excavators that deliver powerful digging, breaking, and lifting — built for rough terrain and tight timelines.
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
          background-image: url('./images/excavator_banner.jpg');
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


     <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2"><span className="font-bold">Dig Deeper. Lift Smarter. Anywhere.</span><br/>Choose Your Excavator, Conquer Any Terrain
      </h2>
              <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">From tight city streets to rugged job sites — choose the frame that fits your terrain and timeline.</p>
            </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center justify-center">
                <div className="flex justify-center">
                    <img src="./images/wheel_loader.png" alt="Wheel Excavator" className="max-w-full h-auto" />
                </div>
                <div className="flex justify-center">
                    <img src="./images/Crawler_Excavator.png" alt="Crawler Excavator" className="max-w-full h-auto" />
                </div>
              </div>
      
              </div>
            </section>           




      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExBrandSection />
        </div>
        </section>
      <section className="pb-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2"><span className="font-bold">Proven Excavator Performance</span><br/>For Serious Digging, Lifting & Earthmoving Work
      </h2>
              <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">From tight urban jobs to tough off-road sites, Golden Sparrow's excavators are made to dig deep, work smart, and last long. Wherever you need power and precision — we've got the machine for it:</p>
            </div>
              
              <ExCardComponent />
      
              </div>
            </section>

      {/* Banner Section */}
      <section className="forklift-bnrx py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-max">
          <h2 className="text-2xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
            <span className="font-bold">Excavators.</span> Work Smarter.<br/>Push Further. Dig Deeper.
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">Built to Handle the Rough Stuff<br/><span className="font-normal">We supply excavators built to handle tough digging, lifting,<br/>and shaping tasks with power and precision.</span></p>
 
<ul className="flex flex-col gap-2 mb-6">
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Powerful Break-In Force</span>
          </p>
          <p className="pl-8">Cuts through rock, soil, and rubble without slowing down.</p>
         </li>
 
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Fast Attachment Switches</span>
          </p>
          <p className="pl-8">From buckets to breakers, swap tools easily for any job.</p>
        </li>
</ul>
 
<span className="font-semibold text-white mb-4">Ready when you are. Let’s break ground.</span>
 
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
        url('./images/ex_banner_2.webp');
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
}

@media screen and (max-width:768px){
.forklift-bnrx {
        background:
            linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)),
            url('./images/ex_banner_2.webp');
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
      <EnquiryForm title={<>Need the <span className="font-semibold">Right<br className="hidden sm:block"/>{" "}Excavator?</span></>} content={<><p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
            Get expert advice, quick quotes, and the best deals — all in one
            place.
          </p>
          <p className="text-base lg:text-lg text-white">
            Enquire now and let{" "}
            <span className="font-semibold">Golden Sparrow</span>
            <br className="hidden sm:block"/>
            {" "}lift your business higher.
          </p></>}
          backgroundImage="./images/ex_form.jpg" />
      </div>
      </div>

      {/* Enquiry Popup */}
      <EnquiryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
export default ExcavatorPage;
