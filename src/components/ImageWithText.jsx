import React from "react";

const ImageWithText = ({ 
  title, 
  description, 
  button, 
  backgroundImage, 
  onButtonClick,
  className = "",
  minHeight = "screen",
  content,
  contentPosition = "left", // left, right, center, full
  gradientDirection = "to left", // gradient angle
  gradientColors = {
    start: "rgba(0, 0, 0, 0)",
    middle: "rgba(0, 0, 0, 0.6)", 
    end: "#000000"
  },
  gradientStops = ["0.25%", "35.28%", "50.45%"],
  backgroundPosition = "center",
  textAlign = "auto", // auto, left, center, right
  overlayOpacity = 0, // 0 to disable overlay
}) => {
  // Generate gradient based on props
  const gradientString = `linear-gradient(${gradientDirection}, ${gradientColors.start} ${gradientStops[0]}, ${gradientColors.middle} ${gradientStops[1]}, ${gradientColors.end} ${gradientStops[2]})`;
  
  const backgroundStyles = {
    backgroundImage: `${gradientString}, url(${backgroundImage})`,
    backgroundSize: "130%",
    backgroundPosition: "100% 45%",
    backgroundRepeat: "no-repeat",
  };

  // Content positioning classes
  const getContentClasses = () => {
    switch (contentPosition) {
      case "right":
        return "relative z-10 h-full flex items-center";
      case "center":
        return "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-12 h-full flex items-center justify-center";
      case "full":
        return "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-12 h-full flex items-center justify-center";
      case "left":
      default:
        return "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-12 h-full flex items-center justify-start";
    }
  };

  // Text alignment classes
  const getTextAlignClasses = () => {
    if (textAlign !== "auto") {
      return `text-${textAlign}`;
    }
    
    switch (contentPosition) {
      case "right":
        return "text-left";
      case "center":
      case "full":
        return "text-center";
      case "left":
      default:
        return "text-left";
    }
  };

  return (
    <section
      className={`relative w-full bg-cover bg-no-repeat ${className}`}
      style={backgroundStyles}
      role="banner"
      aria-label="Hero section"
    >
      {contentPosition === "right" ? (
        <>
          {/* Right-side gradient overlay (mirror of HeroSection's left gradient) */}
          <div
            className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full flex items-center"
            
          ></div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full flex items-center justify-end">
            <div className="max-w-max">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-normal text-white leading-normal mb-6">
                {title}
              </h1>
              
              {/* Description */}
              {description && (
                <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">
                  {description}
                </p>
              )}

              {/* Custom Content */}
              {content && (
                <div className="text-white mb-8">
                  {content}
                </div>
              )}
              
              {/* Button */}
              {button && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onButtonClick}
                    className="inline-flex items-center justify-center bg-[#FFC501] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md hover:bg-yellow-500 focus:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label={typeof button === 'string' ? button : 'Call to action button'}
                    style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}
                  >
                    {button}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Left-side white gradient (mirror of HeroSection's right gradient) */}
          {/* <div
            className="absolute inset-y-0 left-0 w-0 sm:w-[10%] h-full pointer-events-none"
            style={{
              background:
                "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
            }}
          ></div> */}
        </>
      ) : (
        /* Original content container for other positions */
        <div className={getContentClasses()}>
          <div className={`${getTextAlignClasses()} space-y-6 sm:space-y-8 max-w-max`}>
          {/* Title */}
          <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
            {title}
          </h1>
          
          {/* Description */}
          {description && (
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed opacity-90">
              {description}
            </p>
          )}

          {/* Custom Content */}
          {content && (
            <div className="text-white">
              {content}
            </div>
          )}
          
          {/* Button */}
          {button && (
            <div className="">
              <button
                onClick={onButtonClick}
                className="inline-flex items-center justify-center bg-[#FFC501] text-black font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 rounded-md hover:bg-yellow-500 focus:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label={typeof button === 'string' ? button : 'Call to action button'}
              >
                {button}
              </button>
            </div>
          )}
          </div>
        </div>
      )}
      
      
      {/* Optional overlay for better text readability */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-black pointer-events-none" 
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </section>
  );
};

export default ImageWithText;
