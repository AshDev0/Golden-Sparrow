import React from 'react';

const SecondaryButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  icon: Icon,
  className = '',
  size = 'default',
  ...props 
}) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    default: 'px-8 py-4',
    large: 'px-10 py-5 text-lg'
  };

  const baseClasses = `
    text-white font-semibold 
    hover:text-white
    transition-all duration-300 
    border-2 border-[#FFFFFF]
    inline-flex items-center justify-center text-center
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:bg-transparent disabled:hover:text-white
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default SecondaryButton;