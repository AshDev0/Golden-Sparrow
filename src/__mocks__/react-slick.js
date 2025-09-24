// Mock for react-slick to prevent test failures
import React from 'react';

const Slider = ({ children, ...props }) => {
  return (
    <div data-testid="slider-mock" {...props}>
      {children}
    </div>
  );
};

export default Slider;