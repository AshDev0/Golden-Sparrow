// /**
//  * NavBar Component - Fixed Layout Shifting Issues
//  * Optimized for smooth animations without layout shifts
//  */

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, ChevronDown, Package, Phone, Headphones } from "lucide-react";
// import CategoryPopup from "./CategoryPopup";

// export default function NavBar() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Helper function to determine if a navigation item is active
//   const isActiveNavItem = (path, taxonomy, filters = {}) => {
//     const searchParams = new URLSearchParams(location.search);
//     const currentPath = location.pathname;
    
//     // Check if we're on the products page with matching taxonomy
//     if (path === '/products' && currentPath === '/products') {
//       const currentTaxonomy = searchParams.get('taxonomy');
//       if (currentTaxonomy !== taxonomy) return false;
      
//       // Check filters match
//       for (const [key, value] of Object.entries(filters)) {
//         const currentValue = searchParams.get(key);
//         if (Array.isArray(value)) {
//           const currentValues = currentValue ? currentValue.split(',') : [];
//           if (!value.every(v => currentValues.includes(v))) return false;
//         } else if (currentValue !== value) {
//           return false;
//         }
//       }
//       return true;
//     }
    
//     return currentPath === path;
//   };

//   // Fixed: Helper function to get nav button classes without font weight changes
//   const getNavButtonClasses = (path, taxonomy, filters = {}) => {
//     const isActive = isActiveNavItem(path, taxonomy, filters);
//     return `nav-link px-4 py-2 text-white transition-all duration-300 relative font-medium ${
//       isActive 
//         ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]' 
//         : 'hover:text-opacity-100'
//     }`;
//   };

//   // Fixed: Helper function for Link classes without font weight changes  
//   const getLinkClasses = (path) => {
//     const isActive = location.pathname === path;
//     return `block px-4 py-2 text-white transition-all duration-300 font-medium ${
//       isActive 
//         ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""] relative' 
//         : 'hover:text-opacity-80'
//     }`;
//   };

//   // Fixed: Mobile link classes
//   const getMobileLinkClasses = (path) => {
//     const isActive = location.pathname === path;
//     return `block px-3 py-2 text-white transition-all duration-300 font-medium ${
//       isActive ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
//     }`;
//   };

//   /**
//    * Helper function for navigation with filters
//    */
//   const navigateWithFilters = (taxonomy, filters = {}, label = "") => {
//     const params = new URLSearchParams();
//     params.set("taxonomy", taxonomy);
//     params.set("page", "1");

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== "") {
//         if (Array.isArray(value) && value.length > 0) {
//           params.set(key, value.join(","));
//         } else if (!Array.isArray(value)) {
//           params.set(key, String(value));
//         }
//       }
//     });

//     if (label) {
//       params.set("label", label);
//     }

//     navigate(`/products?${params.toString()}`);
//     setIsMobileMenuOpen(false);
//   };

//   // Handle category selection from popup
//   const handleCategorySelect = (selection) => {
//     setIsPopupOpen(false);
//   };

//   // Open popup on mouse enter
//   const handlePopupMouseEnter = () => {
//     setIsPopupOpen(true);
//   };

//   // Close popup function
//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   // Handle clicks outside the popup to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isPopupOpen && !event.target.closest("[data-popup-container]")) {
//         setIsPopupOpen(false);
//       }
//     };

//     const handleEscapeKey = (event) => {
//       if (event.key === "Escape" && isPopupOpen) {
//         setIsPopupOpen(false);
//       }
//     };

//     if (isPopupOpen) {
//       document.addEventListener("click", handleClickOutside, true);
//       document.addEventListener("keydown", handleEscapeKey);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside, true);
//       document.removeEventListener("keydown", handleEscapeKey);
//     };
//   }, [isPopupOpen]);

//   // Predefined navigation configurations
//   const navigationItems = {
//     forRent: {
//       label: "For Rent",
//       taxonomy: "equipment-rent",
//       filters: {},
//     },
//     newForSale: {
//       label: "New For Sale",
//       taxonomy: "equipment-buy",
//       filters: { pa_condition: ["new"] },
//     },
//     usedForSale: {
//       label: "Used For Sale",
//       taxonomy: "equipment-buy",
//       filters: { pa_condition: ["used", "like-new"] },
//     },
//   };

//   // Brand navigation configurations
//   const brandItems = [
//     {
//       label: "JCB",
//       taxonomy: "equipment-buy",
//       filters: { pa_brand: ["jcb"] },
//     },
//     {
//       label: "Komatsu",
//       taxonomy: "equipment-buy",
//       filters: { pa_brand: ["komatsu"] },
//     },
//     {
//       label: "Caterpillar",
//       taxonomy: "equipment-buy",
//       filters: { pa_brand: ["caterpillar"] },
//     },
//   ];

//   return (
//     <>
//       <nav className="navbar bg-[#1A1A1A] sticky top-0 z-40 shadow-nav">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo/Brand - Fixed transforms */}
//             <div className="flex items-center flex-shrink-0">
//               <Link to="/" className="flex items-center space-x-2">
//                 <img
//                   src="/images/new_header_logo.png"
//                   alt="Golden Sparrow"
//                   className="h-16 w-auto max-w-none object-contain"
//                   style={{ 
//                     willChange: 'auto',
//                     backfaceVisibility: 'hidden',
//                     transform: 'translateZ(0)'
//                   }}
//                   loading="eager"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                     e.target.nextSibling.style.display = "flex";
//                   }}
//                 />
//                 <div className="hidden items-center space-x-2">
//                   <Package className="w-8 h-8 text-accent-600" />
//                   <span className="font-bold text-xl text-neutral-800">
//                     Golden Sparrow
//                   </span>
//                 </div>
//               </Link>
//             </div>

//             {/* Fixed: Desktop Navigation - Removed conflicting transforms */}
//             <div className="hidden md:flex items-center space-x-1">
//               {/* All Products Dropdown - Fixed positioning */}
//               <div
//                 onMouseEnter={handlePopupMouseEnter}
//                 className="relative flex items-center gap-1"
//                 data-popup-container
//               >
//                 <img className="w-4 h-4" src="/images/streamline-sharp_buttons-all-solid.png" alt="All Products Icon" />
//                 <button
//                   onClick={() => navigate('/products')}
//                   className={`nav-link pl-1 px-4 py-2 flex items-center gap-2 text-white font-medium transition-all duration-300 relative ${
//                     location.pathname === '/products'
//                       ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
//                       : 'hover:text-opacity-100'
//                   }`}
//                 >
//                   All Products
//                 </button>
//                 <img className="w-0.5 h-8" src="/images/line.png" alt="Divider" />
//               </div>

//               {/* Navigation Items - Fixed classes */}
//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.forRent.taxonomy,
//                     navigationItems.forRent.filters
//                   )
//                 }
//                 className={getNavButtonClasses('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters)}
//               >
//                 {navigationItems.forRent.label}
//               </button>

//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.newForSale.taxonomy,
//                     navigationItems.newForSale.filters
//                   )
//                 }
//                 className={getNavButtonClasses('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters)}
//               >
//                 {navigationItems.newForSale.label}
//               </button>

//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.usedForSale.taxonomy,
//                     navigationItems.usedForSale.filters
//                   )
//                 }
//                 className={getNavButtonClasses('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters)}
//               >
//                 {navigationItems.usedForSale.label}
//               </button>

//               {/* Fixed: Brands Dropdown - Better positioning and performance */}
//               <div className="relative">
//                 <div className="group">
//                   <button className="nav-link px-4 py-2 flex items-center gap-1 text-white font-medium ">
//                     Brands
//                     {/* <ChevronDown
//                       style={{fill:"#fff"}}
//                       className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 will-change-transform"
//                     /> */}
//                   </button>
//                   {/* Fixed: Dropdown with proper positioning and no layout shift */}
//                   <div 
//                     className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#fff] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
//                     style={{ 
//                       willChange: 'opacity, visibility',
//                       backfaceVisibility: 'hidden',
//                       transform: 'translateZ(0)'
//                     }}
//                   >
//                     <div className="py-1">
//                       {brandItems.map((brand, index) => (
//                         <button
//                           key={index}
//                           onClick={() =>
//                             navigateWithFilters(
//                               brand.taxonomy,
//                               brand.filters,
//                               `${brand.label} Equipment`
//                             )
//                           }
//                           className="block w-full text-left px-4 py-2 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
//                         >
//                           {brand.label}
//                         </button>
//                       ))}
//                       <div className="border-t border-[#C7793B] border-opacity-20 mt-1 pt-1">
//                         <button
//                           onClick={() => navigate("/products?taxonomy=equipment-buy")}
//                           className="block w-full text-left px-4 py-2 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
//                         >
//                           View All Brands →
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Fixed: More Dropdown */}
//               <div className="relative">
//                 <div className="group">
//                   <button className="nav-link px-4 py-2 flex items-center gap-1 text-white font-medium ">
//                     More
//                     {/* <ChevronDown
//                       style={{fill:"#fff"}}
//                       className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 will-change-transform"
//                     /> */}
//                   </button>
//                   <div 
//                     className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#fff] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
//                     style={{ 
//                       willChange: 'opacity, visibility',
//                       backfaceVisibility: 'hidden',
//                       transform: 'translateZ(0)'
//                     }}
//                   >
//                     <div className="py-1">
//                       <Link
//                         to="/attachments"
//                         className={getLinkClasses('/attachments')}
//                       >
//                         Attachments
//                       </Link>
//                       <Link
//                         to="/parts"
//                         className={getLinkClasses('/parts')}
//                       >
//                         Spare Parts
//                       </Link>
//                       <Link
//                         to="/services"
//                         className={getLinkClasses('/services')}
//                       >
//                         Services
//                       </Link>
//                       <Link
//                         to="/blog"
//                         className={getLinkClasses('/blog')}
//                       >
//                         Blogs
//                       </Link>
//                       <Link
//                         to="/about-us"
//                         className={getLinkClasses('/about')}
//                       >
//                         About Us
//                       </Link>
//                       <Link
//                         to="/contact"
//                         className={getLinkClasses('/contact')}
//                       >
//                         Contact
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Phone Contact & Mobile Menu - Combined for proper spacing */}
//             <div className="flex items-center gap-2">
//               {/* Full phone number on larger screens */}
//               <button className="gradient-btn" onClick={() => {window.location.href = 'tel:+971542320624'}}>
//             <div className="gradient-btn-content">
//             <Phone className="w-4 h-4 mr-0 md:mr-2" />
//             <span className="hidden md:flex">
//             +971 54 232 0624
//             </span>
//             </div>
//           </button>
//               {/* <a 
//                 href="tel:+971542320624" 
//                 className="telPhone hidden lg:flex items-center font-semibold text-[#F5F1E6] py-2 px-4 transition-all duration-300"
//                 title="Call us now"
//                 style={{border: '3px solid', borderImageSource: 'linear-gradient(159.21deg, #FFD200 11.19%, #F7971E 101.23%)', borderImageSlice: '1', borderRadius:'6px', WebkitBackgroundClip: 'border-box'}}
//               >
                
//                 <Phone className="w-4 h-4 mr-2" />
//                 +971 54 232 0624
//               </a> */}
              
//               {/* Phone icon only on medium and smaller screens */}
//               {/* <a 
//                 href="tel:+971542320624" 
//                 className="lg:hidden flex items-center text-[#fff] py-2 px-3"
//                 title="Call +971 54 232 0624"
//                 style={{border: '3px solid', borderImageSource: 'linear-gradient(159.21deg, #FFD200 11.19%, #F7971E 101.23%)', borderImageSlice: '1', borderRadius:'6px'}}
//               >
//                 <Phone className="w-4 h-4" />
//               </a> */}

//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden p-2 rounded-md hover:bg-[#FFD200] hover:bg-opacity-20 text-[#FFD200] transition-colors duration-200"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-8 h-8" />
//                 ) : (
//                   <Menu className="w-8 h-8" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Fixed: Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-[#1A1A1A] border-t border-[#FFD200]">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <button
//                 onClick={() => {
//                   setIsPopupOpen(true);
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className={getMobileLinkClasses('/products-popup')}
//               >
//                 All Products
//               </button>

//               <Link
//                 to="/categories"
//                 className={getMobileLinkClasses('/categories')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Categories
//               </Link>

//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.forRent.taxonomy,
//                     navigationItems.forRent.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 text-white transition-all duration-300 font-medium ${
//                   isActiveNavItem('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
//                 }`}
//               >
//                 {navigationItems.forRent.label}
//               </button>

//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.newForSale.taxonomy,
//                     navigationItems.newForSale.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 text-white transition-all duration-300 font-medium ${
//                   isActiveNavItem('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
//                 }`}
//               >
//                 {navigationItems.newForSale.label}
//               </button>

//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.usedForSale.taxonomy,
//                     navigationItems.usedForSale.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 text-white transition-all duration-300 font-medium ${
//                   isActiveNavItem('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
//                 }`}
//               >
//                 {navigationItems.usedForSale.label}
//               </button>

//               <Link
//                 to="/attachments"
//                 className={getMobileLinkClasses('/attachments')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Attachments
//               </Link>

//               <Link
//                 to="/parts"
//                 className={getMobileLinkClasses('/parts')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Parts
//               </Link>

//               <Link
//                 to="/services"
//                 className={getMobileLinkClasses('/services')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Services
//               </Link>

//               <Link
//                 to="/blog"
//                 className={getMobileLinkClasses('/blog')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Blog
//               </Link>

//               <Link
//                 to="/about"
//                 className={getMobileLinkClasses('/about')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 About
//               </Link>

//               <Link
//                 to="/contact"
//                 className={getMobileLinkClasses('/contact')}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}


//         <style>{`
//         /* Add these styles to prevent layout shifts and improve performance */
// .will-change-transform {
//   will-change: transform;
// }

// .will-change-opacity {
//   will-change: opacity;
// }

// /* Ensure smooth transitions for gradients */
// .text-gradient-golden {
//   background-size: 100% 100%;
//   -webkit-background-clip: text;
//   background-clip: text;
// }

// /* Improve dropdown shadows */
// .shadow-elegant {
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
// }

// /* Prevent text selection on navigation items */
// .nav-item {
//   user-select: none;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
// }
        
        
        
//         `}</style>
//       </nav>

//       {/* Category Popup */}
//       <CategoryPopup
//         isOpen={isPopupOpen}
//         onClose={handleClosePopup}
//         onSelectCategory={handleCategorySelect}
//       />
//     </>
//   );
// }

/**
 * NavBar Component - Fixed Layout Shifting Issues + Horizontal Scrollable Mobile Menu
 * Optimized for smooth animations without layout shifts
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Package, Phone } from "lucide-react";
import CategoryPopup from "./CategoryPopup";

export default function NavBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Removed - no longer needed
  // const [hoverTimeout, setHoverTimeout] = useState(null); // Removed - no longer used
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to determine if a navigation item is active
  const isActiveNavItem = (path, taxonomy, filters = {}) => {
    const searchParams = new URLSearchParams(location.search);
    const currentPath = location.pathname;
    
    // Check if we're on the products page with matching taxonomy
    if (path === '/products' && currentPath === '/products') {
      const currentTaxonomy = searchParams.get('taxonomy');
      if (currentTaxonomy !== taxonomy) return false;
      
      // Check filters match
      for (const [key, value] of Object.entries(filters)) {
        const currentValue = searchParams.get(key);
        if (Array.isArray(value)) {
          const currentValues = currentValue ? currentValue.split(',') : [];
          if (!value.every(v => currentValues.includes(v))) return false;
        } else if (currentValue !== value) {
          return false;
        }
      }
      return true;
    }
    
    return currentPath === path;
  };

  // Fixed: Helper function to get nav button classes without font weight changes
  const getNavButtonClasses = (path, taxonomy, filters = {}) => {
    const isActive = isActiveNavItem(path, taxonomy, filters);
    return `nav-link px-4 py-2 text-white transition-all duration-300 relative font-medium ${
      isActive 
        ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]' 
        : 'hover:text-opacity-100'
    }`;
  };

  // Fixed: Helper function for Link classes without font weight changes  
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2 text-white transition-all duration-300 font-medium ${
      isActive 
        ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""] relative' 
        : 'hover:text-opacity-80'
    }`;
  };


  /**
   * Helper function for navigation with filters
   */
  const navigateWithFilters = (taxonomy, filters = {}, label = "") => {
    const params = new URLSearchParams();
    params.set("taxonomy", taxonomy);
    params.set("page", "1");

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(","));
        } else if (!Array.isArray(value)) {
          params.set(key, String(value));
        }
      }
    });

    if (label) {
      params.set("label", label);
    }

    navigate(`/products?${params.toString()}`);
    // setIsMobileMenuOpen(false); // Removed since mobile menu is always visible
  };

  // Handle category selection from popup
  const handleCategorySelect = (selection) => {
    setIsPopupOpen(false);
  };

  // Open popup on mouse enter
  const handlePopupMouseEnter = () => {
    setIsPopupOpen(true);
  };

  // Close popup function
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle clicks outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPopupOpen && !event.target.closest("[data-popup-container]")) {
        setIsPopupOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isPopupOpen]);

  // Predefined navigation configurations
  const navigationItems = {
    forRent: {
      label: "For Rent",
      taxonomy: "equipment-rent",
      filters: {},
    },
    newForSale: {
      label: "New For Sale",
      taxonomy: "equipment-buy",
      filters: { pa_condition: ["new"] },
    },
    usedForSale: {
      label: "Used For Sale",
      taxonomy: "equipment-buy",
      filters: { pa_condition: ["used", "like-new"] },
    },
  };

  // Brand navigation configurations
  const brandItems = [
    {
      label: "JCB",
      taxonomy: "equipment-buy",
      filters: { pa_brand: ["jcb"] },
    },
    {
      label: "Komatsu",
      taxonomy: "equipment-buy",
      filters: { pa_brand: ["komatsu"] },
    },
    {
      label: "Caterpillar",
      taxonomy: "equipment-buy",
      filters: { pa_brand: ["caterpillar"] },
    },
  ];

  // All mobile menu items for horizontal scrolling
  const allMobileMenuItems = [
    {
      label: "All",
      action: () => navigate('/products'),
      path: '/products',
      icon: "/images/streamline-sharp_buttons-all-solid.png",
      line: "/images/line.png"
    },
    {
      label: "Categories",
      action: () => navigate('/categories'),
      path: '/categories'
    },
    {
      label: navigationItems.forRent.label,
      action: () => navigateWithFilters(navigationItems.forRent.taxonomy, navigationItems.forRent.filters),
      path: '/products',
      taxonomy: navigationItems.forRent.taxonomy,
      filters: navigationItems.forRent.filters
    },
    {
      label: navigationItems.newForSale.label,
      action: () => navigateWithFilters(navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters),
      path: '/products',
      taxonomy: navigationItems.newForSale.taxonomy,
      filters: navigationItems.newForSale.filters
    },
    {
      label: navigationItems.usedForSale.label,
      action: () => navigateWithFilters(navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters),
      path: '/products',
      taxonomy: navigationItems.usedForSale.taxonomy,
      filters: navigationItems.usedForSale.filters
    },
    ...brandItems.map(brand => ({
      label: brand.label,
      action: () => navigateWithFilters(brand.taxonomy, brand.filters, `${brand.label} Equipment`),
      path: '/products',
      taxonomy: brand.taxonomy,
      filters: brand.filters
    })),
    {
      label: "Attachments",
      action: () => navigate('/attachments'),
      path: '/attachments'
    },
    {
      label: "Parts",
      action: () => navigate('/parts'),
      path: '/parts'
    },
    {
      label: "Services",
      action: () => navigate('/services'),
      path: '/services'
    },
    {
      label: "Blog",
      action: () => navigate('/blog'),
      path: '/blog'
    },
    {
      label: "About",
      action: () => navigate('/about'),
      path: '/about'
    },
    {
      label: "Contact",
      action: () => navigate('/contact'),
      path: '/contact'
    }
  ];

  return (
    <>
      <nav className="navbar bg-[#1A1A1A] sticky top-0 z-40 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand - Fixed transforms */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/images/new_header_logo.png"
                  alt="Golden Sparrow"
                  className="h-16 w-auto max-w-none object-contain"
                  style={{ 
                    willChange: 'auto',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden items-center space-x-2">
                  <Package className="w-8 h-8 text-accent-600" />
                  <span className="font-bold text-xl text-neutral-800">
                    Golden Sparrow
                  </span>
                </div>
              </Link>
            </div>

            {/* Fixed: Desktop Navigation - Responsive spacing and layout */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* All Products Dropdown - Fixed positioning */}
              <div
                onMouseEnter={handlePopupMouseEnter}
                className="relative flex items-center gap-1"
                data-popup-container
              >
                <img className="w-4 h-4" src="/images/streamline-sharp_buttons-all-solid.png" alt="All Products Icon" />
                <button
                  onClick={() => navigate('/products')}
                  className={`nav-link pl-1 px-4 py-2 flex items-center gap-2 text-white font-medium transition-all duration-300 relative ${
                    location.pathname === '/products'
                      ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                      : 'hover:text-opacity-100'
                  }`}
                >
                  <span>All Products</span>
                </button>
                <img className="w-0.5 h-8" src="/images/line.png" alt="Divider" />
              </div>

              {/* Navigation Items - Fixed classes */}
              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.forRent.taxonomy,
                    navigationItems.forRent.filters
                  )
                }
                className={getNavButtonClasses('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters)}
              >
                <span>{navigationItems.forRent.label}</span>
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.newForSale.taxonomy,
                    navigationItems.newForSale.filters
                  )
                }
                className={getNavButtonClasses('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters)}
              >
                <span>{navigationItems.newForSale.label}</span>
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.usedForSale.taxonomy,
                    navigationItems.usedForSale.filters
                  )
                }
                className={getNavButtonClasses('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters)}
              >
                <span>{navigationItems.usedForSale.label}</span>
              </button>

              {/* Fixed: Brands Dropdown - Better positioning and performance */}
              <div className="relative">
                <div className="group">
                  <button className="nav-link px-4 py-2 flex items-center gap-1 text-white font-medium ">
                    <span>Brands</span>
                  </button>
                  {/* Fixed: Dropdown with proper positioning and no layout shift */}
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#fff] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                    style={{ 
                      willChange: 'opacity, visibility',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div className="py-1">
                      {brandItems.map((brand, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            navigateWithFilters(
                              brand.taxonomy,
                              brand.filters,
                              `${brand.label} Equipment`
                            )
                          }
                          className="block w-full text-left px-4 py-2 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
                        >
                          {brand.label}
                        </button>
                      ))}
                      <div className="border-t border-[#C7793B] border-opacity-20 mt-1 pt-1">
                        <button
                          onClick={() => navigate("/products?taxonomy=equipment-buy")}
                          className="block w-full text-left px-4 py-2 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
                        >
                          View All Brands →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed: More Dropdown */}
              <div className="relative">
                <div className="group">
                  <button className="nav-link px-4 py-2 flex items-center gap-1 text-white font-medium ">
                    <span>More</span>
                  </button>
                  <div 
                    className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#fff] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                    style={{ 
                      willChange: 'opacity, visibility',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div className="py-1">
                      <Link
                        to="/attachments"
                        className={getLinkClasses('/attachments')}
                      >
                        Attachments
                      </Link>
                      <Link
                        to="/parts"
                        className={getLinkClasses('/parts')}
                      >
                        Spare Parts
                      </Link>
                      <Link
                        to="/services"
                        className={getLinkClasses('/services')}
                      >
                        Services
                      </Link>
                      <Link
                        to="/blog"
                        className={getLinkClasses('/blog')}
                      >
                        Blogs
                      </Link>
                      <Link
                        to="/about-us"
                        className={getLinkClasses('/about')}
                      >
                        About Us
                      </Link>
                      <Link
                        to="/contact"
                        className={getLinkClasses('/contact')}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Screen Navigation - Visible between md and lg breakpoints */}
            <div className="hidden md:hidden lg:hidden items-center space-x-1">
              {/* Compact All Products */}
              <div
                onMouseEnter={handlePopupMouseEnter}
                className="relative flex items-center gap-1"
                data-popup-container
              >
                <img className="w-4 h-4" src="/images/streamline-sharp_buttons-all-solid.png" alt="All Products Icon" />
                <button
                  onClick={() => navigate('/products')}
                  className={`nav-link pl-1 px-2 py-2 flex items-center gap-1 text-white font-medium transition-all duration-300 relative text-sm ${
                    location.pathname === '/products'
                      ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                      : 'hover:text-opacity-100'
                  }`}
                >
                  All
                </button>
              </div>

              {/* Compact Navigation Items */}
              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.forRent.taxonomy,
                    navigationItems.forRent.filters
                  )
                }
                className={`nav-link px-2 py-2 text-white transition-all duration-300 relative font-medium text-sm ${
                  isActiveNavItem('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters)
                    ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                    : 'hover:text-opacity-100'
                }`}
              >
                Rent
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.newForSale.taxonomy,
                    navigationItems.newForSale.filters
                  )
                }
                className={`nav-link px-2 py-2 text-white transition-all duration-300 relative font-medium text-sm ${
                  isActiveNavItem('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters)
                    ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                    : 'hover:text-opacity-100'
                }`}
              >
                New
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.usedForSale.taxonomy,
                    navigationItems.usedForSale.filters
                  )
                }
                className={`nav-link px-2 py-2 text-white transition-all duration-300 relative font-medium text-sm ${
                  isActiveNavItem('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters)
                    ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                    : 'hover:text-opacity-100'
                }`}
              >
                Used
              </button>

              {/* Compact More Dropdown */}
              <div className="relative">
                <div className="group">
                  <button className="nav-link px-2 py-2 flex items-center gap-1 text-white font-medium text-sm">
                    More
                  </button>
                  <div
                    className="absolute top-full right-0 mt-2 w-40 bg-[#1A1A1A] shadow-lg border border-[#fff] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                    style={{
                      willChange: 'opacity, visibility',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <div className="py-1">
                      {brandItems.map((brand, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            navigateWithFilters(
                              brand.taxonomy,
                              brand.filters,
                              `${brand.label} Equipment`
                            )
                          }
                          className="block w-full text-left px-3 py-1.5 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200 text-sm"
                        >
                          {brand.label}
                        </button>
                      ))}
                      <div className="border-t border-[#C7793B] border-opacity-20 mt-1 pt-1">
                        <Link
                          to="/attachments"
                          className="block px-3 py-1.5 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200 text-sm"
                        >
                          Attachments
                        </Link>
                        <Link
                          to="/services"
                          className="block px-3 py-1.5 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200 text-sm"
                        >
                          Services
                        </Link>
                        <Link
                          to="/contact"
                          className="block px-3 py-1.5 text-white font-medium hover:bg-[#2A2A2A] transition-colors duration-200 text-sm"
                        >
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Contact & Mobile Menu - Combined for proper spacing */}
            <div className="flex items-center gap-2">
              <button className="gradient-btn" onClick={() => {window.location.href = 'tel:+971542320624'}}>
                <div className="gradient-btn-content">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="hidden lg:flex">
                    +971 54 232 0624
                  </span>
                  <span className="flex sm:flex md:flex lg:hidden">
                    Call Now
                  </span>
                </div>
              </button>

              {/* Mobile menu button - Hidden since horizontal menu is always visible */}
              {/*
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-[#FFD200] hover:bg-opacity-20 text-[#FFD200] transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </button>
              */}
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Mobile Navigation - Always visible on mobile and tablets */}
        <div className="lg:hidden bg-[#1A1A1A] border-t border-[#FFD200] border-opacity-30">
          <div className="px-2 sm:px-4 py-2">
            {/* Horizontal Scrolling Container */}
            <div
              className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
              }}
            >
              {allMobileMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 relative ${
                    (isActiveNavItem(item.path, item.taxonomy, item.filters) || location.pathname === item.path)
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FFD200] after:to-[#F7971E] after:content-[""]'
                      : 'text-white hover:text-opacity-100 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-[#FFD200] hover:after:to-[#F7971E] hover:after:content-[""]'
                  }`}
                >
                  {item.icon && (
                    <img className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 inline" src={item.icon} alt={`${item.label} Icon`} />
                  )}
                  <span className="text-xs sm:text-sm">{item.label}</span>
                  {item.line && (
                    <img className="w-0.5 h-4 sm:h-5 ml-3 sm:ml-5 inline" src={item.line} alt="Divider" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          /* Hide scrollbar for horizontal scroll */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Add some scroll physics for better mobile experience */
          .scrollbar-hide {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }

          /* Responsive navbar container adjustments */
          @media (max-width: 1130px) and (min-width: 1057px) {
            .navbar .max-w-7xl {
              max-width: 100%;
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          /* Better responsive spacing for medium screens */
          @media (max-width: 1200px) and (min-width: 1057px) {
            .nav-link {
              padding-left: 0.75rem;
              padding-right: 0.75rem;
            }
          }

          /* Ensure mobile navigation items don't get too small */
          @media (max-width: 480px) {
            .scrollbar-hide button {
              min-width: fit-content;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
          }

          /* Add these styles to prevent layout shifts and improve performance */
          .will-change-transform {
            will-change: transform;
          }

          .will-change-opacity {
            will-change: opacity;
          }

          /* Ensure smooth transitions for gradients */
          .text-gradient-golden {
            background-size: 100% 100%;
            -webkit-background-clip: text;
            background-clip: text;
          }

          /* Improve dropdown shadows */
          .shadow-elegant {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          /* Prevent text selection on navigation items */
          .nav-item {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }

          /* Ensure proper text wrapping and overflow handling */
          .navbar button, .navbar a {
            text-overflow: ellipsis;
            overflow: hidden;
          }
            .nav-link span{
    position: relative;
    padding-bottom: 4px; /* Space for the underline */
    display: inline-block;
}
.nav-link span::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0px;
    width: 0;
    border-bottom: 2px solid transparent; /* Default transparent border */
    border-image-source: linear-gradient(159.21deg, #FFD200 11.19%, #F7971E 101.23%);
    border-image-slice: 1; /* Ensure the gradient is applied across the border */
    transition: width 0.3s ease-in-out;
}
.nav-link span:hover::after {
    width: 100%;
}
        `}</style>
      </nav>

      {/* Category Popup */}
      <CategoryPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSelectCategory={handleCategorySelect}
      />
    </>
  );
}
