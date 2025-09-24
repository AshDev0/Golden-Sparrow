/**
 * LoadingSpinner Component
 * 
 * A reusable loading indicator component with different sizes and styles
 */

import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  fullScreen = false,
  message = 'Loading...' 
}) => {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-accent-600',
    white: 'border-white',
    gray: 'border-neutral-600'
  };

  // Base spinner element
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`
          border-neutral-200 rounded-full animate-spin
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
        style={{
          borderTopColor: 'currentColor',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent'
        }}
      />
      {message && (
        <p className="mt-2 text-sm text-neutral-600">{message}</p>
      )}
    </div>
  );

  // If fullScreen, wrap in a full-screen container
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;