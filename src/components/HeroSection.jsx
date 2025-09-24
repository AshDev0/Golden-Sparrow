import React from "react";
import PrimaryButton from "./UI/PrimaryButton";

const HeroSection = ({ 
  title, 
  description, 
  button, 
  backgroundImage, 
  onButtonClick,
  className = "",
  minHeight = "screen" 
}) => {
  return (
    <section
      className={`
        relative w-full bg-cover bg-no-repeat
         
        ${className}
      `}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPositionY:"65%",
        backgroundPositionX:"70%"

      }}
      role="banner"
      aria-label="Hero section"
    >
      
      <div
        className="absolute inset-y-0 w-full md:w-[70%] h-full flex items-center"
        style={{background: "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 56.44%, rgba(0, 0, 0, 0) 100%)"
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 h-full flex items-center">
        <div className="max-w-max">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-normal text-white mb-6" style={{lineHeight:"60px"}}>
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-white font-semibold mb-8">
              {description}
            </p>
          )}
          
          {/* Button */}
          {button && (
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton
                onClick={onButtonClick}
                style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}
              >
                {button}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
