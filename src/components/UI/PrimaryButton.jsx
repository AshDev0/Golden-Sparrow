// import React from 'react';

// const PrimaryButton = ({ 
//   children, 
//   onClick, 
//   disabled = false, 
//   type = 'button',
//   icon: Icon,
//   className = '',
//   size = 'default',
//   ...props 
// }) => {
//   const sizeClasses = {
//     small: 'px-4 py-2 text-sm',
//     default: 'px-8 py-4',
//     large: 'px-10 py-5 text-lg'
//   };

//   const baseClasses = `
//     bg-black font-semibold 
//     hover:text-white
//     transition-all duration-300 
//     inline-flex items-center justify-center text-center
//     disabled:opacity-50 disabled:cursor-not-allowed
//     disabled:hover:bg-black disabled:hover:text-[#C7793B]
//     shadow-sm hover:shadow-md
//     focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
//   `.trim().replace(/\s+/g, ' ');

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseClasses} ${sizeClasses[size]} ${className} primaryBtn`}
//       {...props}
//     >
//       {Icon && <Icon className="w-4 h-4 mr-2 text-transparent 
//           bg-[conic-gradient(from_167.85deg_at_75.81%_-16.57%,#EEBC70_-21.72deg,#E3A455_26.25deg,#FFEBC4_156.58deg,#D0A068_261.59deg,#EEBC70_338.28deg,#E3A455_386.25deg)] 
//           bg-clip-text border-image-slice:1" />}
//       {children}
//     </button>
//   );
// };

// export default PrimaryButton;


import React from "react";
const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  size = "default",
  ...props
}) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    default: "px-8 py-4",
    large: "px-10 py-5 text-lg",
  };
 
  const baseClasses = `
    bg-black font-semibold
    hover:text-white
    transition-all duration-300
    inline-flex items-center justify-center text-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:bg-black disabled:hover:text-[#C7793B]
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
  `
    .trim()
    .replace(/\s+/g, " ");
 
  return (
<button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${className} primaryBtn`}
      {...props}
>
      {/* {Icon && (
        <div className="relative mr-2">
          <svg className="absolute inset-0 w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="btnGradient" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#EEBC70" />
                <stop offset="30%" stopColor="#E3A455" />
                <stop offset="70%" stopColor="#FFEBC4" />
                <stop offset="100%" stopColor="#D0A068" />
              </linearGradient>
            </defs>
          </svg>
          <Icon 
            className="w-5 h-5 relative z-10" 
            style={{
              fill: 'url(#btnGradient)',
              stroke: 'url(#btnGradient)',
              color: '#EEBC70'
            }}
          />
        </div>
      )} */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.6 482.6" width="16" height="16">
<defs>
<radialGradient id="conicGradient" gradientUnits="userSpaceOnUse" cx="278" cy="241" r="300">
<stop offset="0%" stop-color="#EEBC70"/>
<stop offset="20%" stop-color="#E3A455"/>
<stop offset="45%" stop-color="#FFEBC4"/>
<stop offset="70%" stop-color="#D0A068"/>
<stop offset="85%" stop-color="#EEBC70"/>
<stop offset="100%" stop-color="#E3A455"/>
</radialGradient>
</defs>
 
  <g>
<path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z" 

          fill="url(#conicGradient)"/>
</g>
</svg>
      {children}
</button>
  );
};
 
export default PrimaryButton;