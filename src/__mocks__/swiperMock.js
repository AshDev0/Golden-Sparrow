import React from 'react';

// Mock Swiper components
export const Swiper = ({ children, ...props }) => (
  <div data-testid="swiper-mock" {...props}>
    {children}
  </div>
);

export const SwiperSlide = ({ children, ...props }) => (
  <div data-testid="swiper-slide-mock" {...props}>
    {children}
  </div>
);

// Mock Swiper modules
export const Autoplay = {};
export const Navigation = {};
export const Pagination = {};

// Default export for swiper/react
export default Swiper;