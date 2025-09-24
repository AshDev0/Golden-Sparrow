import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
const VersatileSolutionsSection = ({
  title,
  subtitle,
  description,
  categories
}) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const handleCategoryClick = useCallback((index) => {
    setActiveCategory(index);
  }, []);
  const handleKeyDown = useCallback((event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveCategory(index);
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveCategory(prev => prev === 0 ? categories.length - 1 : prev - 1);
  }, [categories.length]);

  const goToNext = useCallback(() => {
    setActiveCategory(prev => prev === categories.length - 1 ? 0 : prev + 1);
  }, [categories.length]);
  // Error handling for empty categories
  if (!categories || categories.length === 0) {
    return null;
  }
  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 lg:mb-12">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">{title}</h2>
        <h3 className="text-3xl lg:text-5xl font-normal text-gray-900 mb-6">{subtitle}</h3>
        <p className="text-black text-lg lg:text-xl font-semibold max-w-6xl">{description}</p>
      </div>
      {/* Mobile View - Single Category with Navigation */}
      <div className="md:hidden relative">
        {/* Category Display */}
        <div className="relative h-64 sm:h-80 rounded-sm shadow-md overflow-hidden">
          <img
            src={categories[activeCategory].image}
            alt={categories[activeCategory].title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.display = 'flex';
              e.target.style.alignItems = 'center';
              e.target.style.justifyContent = 'center';
              e.target.innerHTML = '<span style="color: #6b7280; font-size: 14px;">Image not found</span>';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Text Content */}
          <div className="absolute inset-0 flex items-end justify-start p-4">
            <div className="w-full animate-slideUpFadeIn">
              <h5 className="text-white font-semibold text-xl mb-2">
                {categories[activeCategory].title}
              </h5>
              {categories[activeCategory].description && (
                <p className="text-white/90 text-sm leading-relaxed animate-slideUpFadeIn" 
                   style={{animationDelay: '0.2s'}}>
                  {categories[activeCategory].description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
          aria-label="Previous category"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
          aria-label="Next category"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === activeCategory ? 'bg-gray-900' : 'bg-gray-300'
              }`}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View - Original Layout */}
      <div className="hidden md:flex justify-between items-center" role="tablist" aria-label="Category selection">
        {/* Categories */}
        <div className="flex w-full h-full gap-2">
          {categories.map((category, index) => {
            const isActive = activeCategory === index;
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-500 ${
                  isActive ? 'w-1/2' : 'flex-1'
                }`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${index}`}
                tabIndex={0}
                onClick={() => handleCategoryClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                      e.target.style.display = 'flex';
                      e.target.style.alignItems = 'center';
                      e.target.style.justifyContent = 'center';
                      e.target.innerHTML = '<span style="color: #6b7280; font-size: 14px;">Image not found</span>';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  {/* Text Content */}
                  <div className={`absolute inset-0 flex p-4 ${
                    isActive ? 'items-end justify-start' : 'items-center justify-center'
                  }`}>
                    <div className={`transition-all duration-500 ${
                      isActive ? 'transform-none text-left' : 'transform -rotate-90 text-center origin-center'
                    } ${isActive ? 'w-full' : 'min-w-0 flex-shrink-0'}`}>
                      <h5 className={`text-white font-semibold ${
                        isActive ? 'text-xl sm:text-6xl mb-2' : 'text-sm sm:text-base lg:text-2xl'
                      } ${isActive ? 'whitespace-normal' : 'whitespace-nowrap'} transition-all duration-500 ${
                        isActive ? 'animate-slideUpFadeIn' : ''
                      }`}
                      style={!isActive ? { 
                        writingMode: '', 
                        textOrientation: 'mixed',
                        transform: 'none',
                        maxHeight: '200px',
                        overflow: 'visible'
                      } : {}}>
                        {category.title}
                      </h5>
                      {category.description && isActive && (
                        <p className="text-white/90 text-xs sm:text-sm xl:text-3xl leading-relaxed max-w-xs animate-slideUpFadeIn" 
                           style={{animationDelay: '0.2s'}}>
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Default props
VersatileSolutionsSection.defaultProps = {
  categories: []
};

// Prop types validation
VersatileSolutionsSection.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  )
};

export default VersatileSolutionsSection;
