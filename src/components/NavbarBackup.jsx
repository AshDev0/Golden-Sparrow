// /**
//  * NavBar Component - Updated with Clean Navigation Approach
//  * Features flexible navigation with filters support
//  */

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Menu, X, ChevronDown, Package, Phone } from "lucide-react";
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

//   // Helper function to get nav button classes with active state
//   const getNavButtonClasses = (path, taxonomy, filters = {}) => {
//     const isActive = isActiveNavItem(path, taxonomy, filters);
//     return `px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-colors duration-300 relative ${
//       isActive ? 'font-bold' : 'font-normal hover:font-medium'
//     }`;
//   };

//   /**
//    * Helper function for navigation with filters
//    * @param {string} taxonomy - The main taxonomy (equipment-buy or equipment-rent)
//    * @param {object} filters - Additional filters like pa_condition, pa_brand, etc.
//    * @param {string} label - Optional label for display purposes
//    */
//   const navigateWithFilters = (taxonomy, filters = {}, label = "") => {
//     const params = new URLSearchParams();

//     // Always set the taxonomy first (this effectively clears other taxonomy-specific filters)
//     params.set("taxonomy", taxonomy);

//     // Reset page to 1 for new navigation
//     params.set("page", "1");

//     // Add any additional filters
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== "") {
//         if (Array.isArray(value) && value.length > 0) {
//           // Handle arrays - join with comma
//           params.set(key, value.join(","));
//         } else if (!Array.isArray(value)) {
//           // Handle single values
//           params.set(key, String(value));
//         }
//       }
//     });

//     // Add label if provided
//     if (label) {
//       params.set("label", label);
//     }

//     // Navigate and close mobile menu
//     navigate(`/products?${params.toString()}`);
//     setIsMobileMenuOpen(false);
//   };

//   // Handle category selection from popup
//   const handleCategorySelect = (selection) => {
//     // The CategoryPopup component already handles navigation
//     setIsPopupOpen(false); // Close popup when category is selected
//   };

//   // Open popup on mouse enter (no mouse leave closing)
//   const handlePopupMouseEnter = () => {
//     setIsPopupOpen(true);
//   };

//   // Close popup function for close button and outside clicks
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
//       // Add listeners when popup is open
//       document.addEventListener("click", handleClickOutside, true);
//       document.addEventListener("keydown", handleEscapeKey);
//     }

//     return () => {
//       // Clean up listeners
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
//       <nav
//   className="bg-[#1A1A1A] sticky top-0 z-40 shadow-nav"
// >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo/Brand */}
//             <div className="flex items-center flex-shrink-0">
//               <Link to="/" className="flex items-center space-x-2">
//                 <img
//                   src="/images/header_logo.svg"
//                   alt="Golden Sparrow"
//                   className="h-16 w-auto max-w-none object-contain"
//                   style={{ 
//                     WebkitBackfaceVisibility: 'hidden',
//                     backfaceVisibility: 'hidden',
//                     WebkitTransform: 'translateZ(0)',
//                     transform: 'translateZ(0)'
//                   }}
//                   loading="eager"
//                   onError={(e) => {
//                     // Fallback to text logo if image fails to load
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

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1" style={{ WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
//               <div
//                 onMouseEnter={handlePopupMouseEnter}
//                 className="relative"
//                 data-popup-container
//               >
//                 <button className="px-4 py-2 flex items-center gap-2 bg-golden-gradient bg-clip-text text-gradient-golden font-normal hover:font-medium transition-all duration-300">
                  
//                   All Products
//                   <ChevronDown
//                     style={{fill:"#C7793B"}}
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       isPopupOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               </div>

//               {/* Categories Link */}
//               {/* <Link
//                 to="/categories"
//                 className="px-4 py-2 rounded-lg text-neutral-700 hover:text-black transition-colors"
//               >
//                 Categories
//               </Link> */}

//               {/* For Rent - Clean navigation */}
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

//               {/* New For Sale */}
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

//               {/* Used For Sale - With multiple condition filters */}
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

//               {/* Categories Link */}
//               {/* <Link
//                 to="/categories?taxonomy=equipment-buy"
//                 className="px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
//               >
//                 Categories
//               </Link> */}

//               {/* Brands Dropdown */}
//               <div className="relative group">
//                 <button className="px-4 py-2 rounded-lg flex items-center gap-1 bg-golden-gradient bg-clip-text text-gradient-golden font-normal hover:font-medium transition-all duration-300">
//                   Brands
//                   <ChevronDown
//                     style={{fill:"#C7793B"}}
//                     className={`w-4 h-4 transition-transform duration-200`}
//                   />
//                 </button>
//                 <div 
//                   className="absolute top-full left-0 mt-1 w-48 bg-[#1A1A1A] shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
//                   style={{ 
//                     WebkitBackfaceVisibility: 'hidden',
//                     backfaceVisibility: 'hidden',
//                     WebkitTransform: 'translateZ(0)',
//                     transform: 'translateZ(0)'
//                   }}
//                 >
//                   {brandItems.map((brand, index) => (
//                     <button
//                       key={index}
//                       onClick={() =>
//                         navigateWithFilters(
//                           brand.taxonomy,
//                           brand.filters,
//                           `${brand.label} Equipment`
//                         )
//                       }
//                       className="block w-full text-left px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden font-normal hover:font-medium transition-all duration-300"
//                     >
//                       {brand.label}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => navigate("/products?taxonomy=equipment-buy")}
//                     className="block w-full text-left px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:font-semibold transition-all duration-300 border-t border-[#C7793B]"
//                   >
//                     View All Brands →
//                   </button>
//                 </div>
//               </div>

//               {/* More Dropdown */}
//               <div className="relative group">
//                 <button className="px-4 py-2 flex items-center gap-1 bg-golden-gradient bg-clip-text text-gradient-golden font-normal hover:font-medium transition-all duration-300">
//                   More
//                   <ChevronDown
//                     style={{fill:"#C7793B"}}
//                     className={`w-4 h-4 transition-transform duration-200`}
//                   />
//                 </button>
//                 <div 
//                   className="absolute top-full right-0 mt-1 w-48 bg-[#1A1A1A] shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
//                   style={{ 
//                     WebkitBackfaceVisibility: 'hidden',
//                     backfaceVisibility: 'hidden',
//                     WebkitTransform: 'translateZ(0)',
//                     transform: 'translateZ(0)'
//                   }}
//                 >
//                   <Link
//                     to="/attachments"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/attachments' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     Attachments
//                   </Link>
//                   <Link
//                     to="/parts"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/parts' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     Spare Parts
//                   </Link>
//                   <Link
//                     to="/services"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/services' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     Services
//                   </Link>
//                   <Link
//                     to="/blog"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/blog' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     Blog
//                   </Link>
//                   <Link
//                     to="/about"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/about' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     About Us
//                   </Link>
//                   <Link
//                     to="/contact"
//                     className={`block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                       location.pathname === '/contact' ? 'font-bold' : 'font-normal hover:font-medium'
//                     }`}
//                   >
//                     Contact
//                   </Link>
//                 </div>
//               </div>
//             </div>
            
//             {/* Phone Contact - Responsive Display */}
//             <div className="flex items-center">
//               {/* Full phone number on larger screens */}
//               <a 
//                 href="tel:+971542320624" 
//                 className="telPhone hidden lg:flex items-center font-semibold text-[#F5F1E6] border border-[#C7793B] rounded py-2 px-4 transition-colors duration-300"
//                 title="Call us now"
//               >
//                 <Phone className="w-4 h-4 mr-2" />
//                 +971 54 232 0624
//               </a>
              
//               {/* Phone icon only on medium and smaller screens */}
//               <a 
//                 href="tel:+971542320624" 
//                 className=" lg:hidden flex items-center text-[#F5F1E6] border border-[#C7793B] rounded py-2 px-3 transition-colors duration-300"
//                 title="Call +971 54 232 0624"
                
//               >
//                 <Phone className="w-4 h-4" />
//               </a>
//             </div>

//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="p-2 rounded-md hover:bg-[#C7793B]-100 text-[#C7793B] transition-colors"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-[#1A1A1A] border-t border-[#C7793B]">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <button
//                 onClick={() => {
//                   setIsPopupOpen(true);
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden font-normal hover:font-medium transition-all duration-300"
//               >
//                 All Products
//               </button>

//               <Link
//                 to="/categories"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/categories' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Categories
//               </Link>

//               {/* For Rent - Mobile */}
//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.forRent.taxonomy,
//                     navigationItems.forRent.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   isActiveNavItem('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters) ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//               >
//                 {navigationItems.forRent.label}
//               </button>

//               {/* New For Sale - Mobile */}
//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.newForSale.taxonomy,
//                     navigationItems.newForSale.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   isActiveNavItem('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters) ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//               >
//                 {navigationItems.newForSale.label}
//               </button>

//               {/* Used For Sale - Mobile */}
//               <button
//                 onClick={() =>
//                   navigateWithFilters(
//                     navigationItems.usedForSale.taxonomy,
//                     navigationItems.usedForSale.filters
//                   )
//                 }
//                 className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   isActiveNavItem('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters) ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//               >
//                 {navigationItems.usedForSale.label}
//               </button>

//               <Link
//                 to="/attachments"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/attachments' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Attachments
//               </Link>

//               <Link
//                 to="/categories?taxonomy=equipment-buy"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/categories' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Categories
//               </Link>

//               <Link
//                 to="/brands"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/brands' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Brands
//               </Link>

//               <Link
//                 to="/parts"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/parts' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Parts
//               </Link>

//               <Link
//                 to="/services"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/services' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Services
//               </Link>

//               <Link
//                 to="/blog"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/blog' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Blog
//               </Link>

//               <Link
//                 to="/about"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/about' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 About
//               </Link>

//               <Link
//                 to="/contact"
//                 className={`block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 ${
//                   location.pathname === '/contact' ? 'font-bold' : 'font-normal hover:font-medium'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}
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
// New Code Here

/**
 * NavBar Component - Fixed Layout Shifting Issues
 * Optimized for smooth animations without layout shifts
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Package, Phone } from "lucide-react";
import CategoryPopup from "./CategoryPopup";

export default function NavBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
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
    return `px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 relative font-medium ${
      isActive 
        ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#C7793B] after:to-[#D4A574] after:content-[""]' 
        : 'hover:text-opacity-80'
    }`;
  };

  // Fixed: Helper function for Link classes without font weight changes  
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 font-medium ${
      isActive 
        ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#C7793B] after:to-[#D4A574] after:content-[""] relative' 
        : 'hover:text-opacity-80'
    }`;
  };

  // Fixed: Mobile link classes
  const getMobileLinkClasses = (path) => {
    const isActive = location.pathname === path;
    return `block px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 font-medium ${
      isActive ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
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
    setIsMobileMenuOpen(false);
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

  return (
    <>
      <nav className="bg-[#1A1A1A] sticky top-0 z-40 shadow-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/Brand - Fixed transforms */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/images/header_logo.svg"
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

            {/* Fixed: Desktop Navigation - Removed conflicting transforms */}
            <div className="hidden md:flex items-center space-x-1">
              {/* All Products Dropdown - Fixed positioning */}
              <div
                onMouseEnter={handlePopupMouseEnter}
                className="relative"
                data-popup-container
              >
                <button className="px-4 py-2 flex items-center gap-2 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:text-opacity-80 transition-all duration-300">
                  All Products
                  <ChevronDown
                    style={{fill:"#C7793B"}}
                    className={`w-4 h-4 transition-transform duration-200 will-change-transform ${
                      isPopupOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
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
                {navigationItems.forRent.label}
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
                {navigationItems.newForSale.label}
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
                {navigationItems.usedForSale.label}
              </button>

              {/* Fixed: Brands Dropdown - Better positioning and performance */}
              <div className="relative">
                <div className="group">
                  <button className="px-4 py-2 flex items-center gap-1 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:text-opacity-80 transition-all duration-300">
                    Brands
                    <ChevronDown
                      style={{fill:"#C7793B"}}
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 will-change-transform"
                    />
                  </button>
                  {/* Fixed: Dropdown with proper positioning and no layout shift */}
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#C7793B] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
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
                          className="block w-full text-left px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
                        >
                          {brand.label}
                        </button>
                      ))}
                      <div className="border-t border-[#C7793B] border-opacity-20 mt-1 pt-1">
                        <button
                          onClick={() => navigate("/products?taxonomy=equipment-buy")}
                          className="block w-full text-left px-4 py-2 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:bg-[#2A2A2A] transition-colors duration-200"
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
                  <button className="px-4 py-2 flex items-center gap-1 bg-golden-gradient bg-clip-text text-gradient-golden font-medium hover:text-opacity-80 transition-all duration-300">
                    More
                    <ChevronDown
                      style={{fill:"#C7793B"}}
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 will-change-transform"
                    />
                  </button>
                  <div 
                    className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] shadow-lg border border-[#C7793B] border-opacity-20 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
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
            
            {/* Phone Contact & Mobile Menu - Combined for proper spacing */}
            <div className="flex items-center gap-2">
              {/* Full phone number on larger screens */}
              <a 
                href="tel:+971542320624" 
                className="telPhone hidden lg:flex items-center font-semibold text-[#F5F1E6] border border-[#C7793B] rounded py-2 px-4 hover:bg-[#C7793B] hover:bg-opacity-10 transition-all duration-300"
                title="Call us now"
              >
                <Phone className="w-4 h-4 mr-2" />
                +971 54 232 0624
              </a>
              
              {/* Phone icon only on medium and smaller screens */}
              <a 
                href="tel:+971542320624" 
                className="lg:hidden flex items-center text-[#F5F1E6] border border-[#C7793B] rounded py-2 px-3 hover:bg-[#C7793B] hover:bg-opacity-10 transition-all duration-300"
                title="Call +971 54 232 0624"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-[#C7793B] hover:bg-opacity-20 text-[#C7793B] transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Fixed: Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1A1A1A] border-t border-[#C7793B]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setIsPopupOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={getMobileLinkClasses('/products-popup')}
              >
                All Products
              </button>

              <Link
                to="/categories"
                className={getMobileLinkClasses('/categories')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.forRent.taxonomy,
                    navigationItems.forRent.filters
                  )
                }
                className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 font-medium ${
                  isActiveNavItem('/products', navigationItems.forRent.taxonomy, navigationItems.forRent.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
                }`}
              >
                {navigationItems.forRent.label}
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.newForSale.taxonomy,
                    navigationItems.newForSale.filters
                  )
                }
                className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 font-medium ${
                  isActiveNavItem('/products', navigationItems.newForSale.taxonomy, navigationItems.newForSale.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
                }`}
              >
                {navigationItems.newForSale.label}
              </button>

              <button
                onClick={() =>
                  navigateWithFilters(
                    navigationItems.usedForSale.taxonomy,
                    navigationItems.usedForSale.filters
                  )
                }
                className={`block w-full text-left px-3 py-2 bg-golden-gradient bg-clip-text text-gradient-golden transition-all duration-300 font-medium ${
                  isActiveNavItem('/products', navigationItems.usedForSale.taxonomy, navigationItems.usedForSale.filters) ? 'bg-[#2A2A2A] border-l-2 border-[#C7793B]' : 'hover:bg-[#2A2A2A]'
                }`}
              >
                {navigationItems.usedForSale.label}
              </button>

              <Link
                to="/attachments"
                className={getMobileLinkClasses('/attachments')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Attachments
              </Link>

              <Link
                to="/parts"
                className={getMobileLinkClasses('/parts')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Parts
              </Link>

              <Link
                to="/services"
                className={getMobileLinkClasses('/services')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>

              <Link
                to="/blog"
                className={getMobileLinkClasses('/blog')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                to="/about"
                className={getMobileLinkClasses('/about')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={getMobileLinkClasses('/contact')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}


        <style>{`
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





