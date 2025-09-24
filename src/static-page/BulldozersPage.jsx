import React, { useState } from "react";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import BullBrandSection from '../components/BullBrandSection';
import BullCardComponent from "../components/BullCardComponent";
import { Phone } from "lucide-react";
const BulldozersPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* Hero Section For Bulldozer Page */}
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
            <span className="font-medium">Scoop. Load. Power Ahead.</span>
            <br className="hidden sm:block" />
            {' '}Reliable Wheel Loaders for
            <br className="hidden md:block" />
            {' '}Heavy Lifting Efficiency
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-6 sm:mb-8 leading-relaxed max-w-none sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            Golden Sparrow brings you high-capacity wheel loaders engineered to move material fast — with strength, stability, and control.
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
          background-image: url('./images/bulldozer_banner.webp');
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Content */}
            <div className="flex flex-col gap-4 sm:text-center md:text-left md:max-w-xl">
              <h2 className="font-normal text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                <span className="font-semibold">Bulldozer</span> You Can Rely On
              </h2>
              <p className="text-base leading-relaxed">
                Elevated access, thoughtful design, and exceptional control — all in one machine.
              </p>
              <p className="text-base leading-relaxed">
                Carefully chosen by Golden Sparrow for tasks that demand safe, smart, and stable elevation.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div
                className="w-full max-w-md bg-white p-2"
                style={{
                  // border: "1.57px solid",
                  // borderImageSource:
                  //   "conic-gradient(from 167.85deg at 75.81% -16.57%, #EEBC70 -21.72deg, #E3A455 26.25deg, #FFEBC4 156.58deg, #D0A068 261.59deg, #EEBC70 338.28deg, #E3A455 386.25deg)",
                  // boxShadow: "0px 40.53px 86.24px 0px #C396021F",
                }}
              >
                <img
                  src="./images/hengwang_static.png"
                  alt="hengwang"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-900 mb-2"><span className="font-bold">Heavy-Duty Bulldozer Performance</span><br/>Push Earth. Clear Paths. Shape the Land.
      </h2>
              <p className="text-black text-base sm:text-lg lg:text-xl font-semibold max-w-6xl">All-Terrain Cranes from Golden Sparrow are designed for high mobility, heavy lifting, and smooth operation — whether on rough terrain, highways, or tight urban sites</p>
            </div>
              
              <BullCardComponent />
      
              </div>
            </section>

      {/* Banner Section */}
      <section className="forklift-bnrx py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="max-w-max">
          <h2 className="text-2xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
            <span className="font-bold">Massive an reliable</span><br/>Bulldozers
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">High performance that delivers results</p>
 
<ul className="flex flex-col gap-2 mb-6">
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">High Torque Diesel Engines</span>
          </p>
         </li>
 
        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Grade Control Systems</span>
          </p>
        </li>

        <li className="text-white">
          <p className="flex items-center gap-2 mb-1">
            <span className="bg-[#FFC501] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 text-black">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
            <span className="font-semibold">Heavy-Duty Undercarriage</span>
          </p>
        </li>
</ul>
<div className="inline-flex flex-col sm:flex sm:flex-row gap-4 mt-4">
  {/* <button onClick={handleOpenPopup} className="inline-flex items-center justify-center bg-[#FFC501] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md hover:bg-yellow-500 focus:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" aria-label="Call to action button" >Request a quote</button> */}
  <a href="tel:+971542320624" className="quoteNowBtn inline-flex items-center justify-center text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" aria-label="Call to action button" >Get Quote Now</a>
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
        url('./images/bullDozer_banner_2.webp');
    background-size: cover;
    background-position: left;
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

@media screen and (max-width:768px){
.forklift-bnrx {
        background:
            linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.68)),
            url('./images/bullDozer_banner_2.webp');
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
      <EnquiryForm title={<>Need the<span className="font-semibold">{" "}Right<br className="hidden sm:block"/>{" "}Bull Dozer?</span></>} content={<><p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
            Get expert advice, quick quotes, and the best deals — all in one
            place.
          </p>
          <p className="text-base lg:text-lg text-white">
            Enquire now and let{" "}
            <span className="font-semibold">Golden Sparrow</span>
            <br className="hidden sm:block" />
            {" "}lift your business higher.
          </p></>}
          backgroundImage="./images/bullDozer_form.webp" />
      </div>
      </div>
      <EnquiryPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};
export default BulldozersPage;
