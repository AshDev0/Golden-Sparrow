import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

// Modern WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
  </svg>
);

// Modern Footer Component
function Footer() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "971542320624";
    const message = encodeURIComponent(
      "Hi! I'm interested in your industrial equipment. Could you please provide more information?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    // <footer className="bg-white text-black py-8 sm:py-20">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //       {/* Company Info */}
    //       <div className="flex items-center justify-between">
    //         {/* Logo/Brand */}
    //         <div className="flex items-center">
    //           <Link to="/" className="flex items-center space-x-2">
    //             <img
    //               src="/images/Golden_Sparrow_Logo.webp"
    //               alt="Golden Sparrow"
    //               className="w-auto object-contain max-w-[180px]"
    //               loading="eager"
    //               onError={(e) => {
    //                 // Fallback to text logo if image fails to load
    //                 e.target.style.display = "none";
    //                 e.target.nextSibling.style.display = "flex";
    //               }}
    //             />
    //             <div className="hidden items-center space-x-2">
    //               <span className="font-bold text-xl text-neutral-800">
    //                 Golden Sparrow
    //               </span>
    //             </div>
    //           </Link>
    //         </div>
    //         <p className="text-black text-base py-1">Engineered<br/>for<br/>Performance.<br/><span className="font-semibold">Trusted for Results.</span></p>
    //       </div>

    //       {/* Quick Links */}
    //       <div>
    //         <h4 className="text-lg font-display font-semibold mb-4 uppercase">
    //           Quick Links
    //         </h4>
    //         <ul className="space-y-2 text-base">
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-buy"
    //               className="text-black hover:underline transition-colors"
    //             >
    //               Equipment for Sale
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-rent"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Equipment for Rent
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/categories?taxonomy=equipment-buy"
    //               className="text-black hover:underline transition-colors"
    //             >
    //               Categories
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/brands"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Brands
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/blog"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Blogs
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/contact"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Contact
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Categories */}
    //       <div>
    //         <h4 className="text-lg font-display font-semibold mb-4 uppercase">
    //           Categories
    //         </h4>
    //         <ul className="space-y-2 text-base">
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-buy&pa_equipment-type=excavator"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Excavators
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-buy&pa_equipment-type=bulldozer"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Bulldozers
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-buy&pa_equipment-type=crane"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Cranes
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/products?taxonomy=equipment-buy&pa_equipment-type=loader"
    //               className="text-black  hover:underline transition-colors"
    //             >
    //               Loaders
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Contact Info */}
    //       <div>
    //         <h4 className="text-lg font-display font-semibold mb-4 uppercase">
    //           Contact Us
    //         </h4>
    //         <ul className="space-y-2 text-base text-black">
    //           <li className="flex items-center">
    //             <a
    //               href="mailto:admin@goldensparrowuae.com"
    //               className="flex items-center hover:underline transition-colors"
    //             >
    //               <Mail className="w-4 h-4 mr-2 " />
    //               admin@goldensparrowuae.com
    //             </a>
    //           </li>
    //           <li className="flex items-center">
    //             <a href="tel:+971 54 232 0624" className="flex items-center hover:underline transition-colors">
    //               <Phone className="w-4 h-4 mr-2 " />
    //               +971 54 232 0624
    //             </a>
    //           </li>
    //           <li className="flex items-center">
    //             <a href="https://maps.app.goo.gl/8CQna9FwzyK4So8s5" target="blank" className="flex items-center hover:underline transition-colors">
    //             <MapPin className="w-4 h-4 mr-2 " />
    //             Donna Towers, Silicon Oasis Dubai, UAE
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-base text-black">
    //       <p>
    //         &copy; {new Date().getFullYear()} Golden Sparrow Trading CO LLC. <br className="block md:hidden"/>All
    //         rights reserved.
    //       </p>

    //       {/* Professional WhatsApp Floating Button */}
    //       <div className="fixed bottom-6 right-12 z-50">
    //         <button
    //           onClick={handleWhatsAppClick}
    //           className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group relative hover:animate-none"
    //           aria-label="Contact us on WhatsApp"
    //           style={{
    //             background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
    //             boxShadow:
    //               "0 8px 25px rgba(37, 211, 102, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)",
    //           }}
    //         >
    //           <WhatsAppIcon />

    //           {/* Pulse Animation Ring */}
    //           <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"></div>

    //           {/* Tooltip */}
    //           <div className="absolute right-full -mr-14 -top-14 opacity-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
    //             <div
    //               className="bg-white text-[#202020] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border"
    //               style={{ boxShadow: "2px 3px 0px #00e785" }}
    //             >
    //               Chat with us!
    //               {/* <div className="absolute left-full top-0 w-0 h-0 border-l-[6px] border-l-white border-y-[6px] border-y-transparent"></div> */}
    //             </div>
    //           </div>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-white text-black py-8 sm:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    {/* Grid setup */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 py-6">
     
      {/* Company Info (make it span 5 columns on large screens) */}
      {/* <div className="lg:col-span-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-start">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/Golden_Sparrow_Logo.webp"
              alt="Golden Sparrow"
              className="w-auto object-contain max-w-[180px]"
              loading="eager"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden items-center space-x-2">
              <span className="font-bold text-xl text-neutral-800">
                Golden Sparrow
              </span>
            </div>
          </Link>
        </div>
        <p className="text-black text-lg py-1 mt-1">
          Engineered<br />for<br />Performance.<br />
          <span className="font-semibold">Trusted for Results.</span>
        </p>
      </div> */}

      <div className="lg:col-span-3 flex flex-col gap-2 sm:items-start sm:justify-start">
        {/* Logo/Brand */}
        <div className="flex items-center mb-4 sm:mb-0">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/new_footer_logo.png"
              alt="Golden Sparrow"
              className="w-auto object-contain max-w-[135px]"
              loading="eager"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden items-center space-x-2">
              <span className="font-bold text-xl text-neutral-800">
                Golden Sparrow
              </span>
            </div>
          </Link>
        </div>
        <p className="text-black text-lg py-1 mt-1">
          Engineered for<br />Performance.<br />
          <span className="font-semibold">Trusted for Results.</span>
        </p>
      </div>
 
      {/* Quick Links */}
      <div className="lg:col-span-3">
        <h4 className="text-lg font-display font-semibold mb-4 uppercase">
          Quick Links
        </h4>
        <ul className="space-y-2 text-base">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/categories?taxonomy=equipment-buy" className="hover:underline">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/brands" className="hover:underline">Brands</Link>
          </li>
          {/* <li>
            <Link to="/blog" className="hover:underline">Blogs</Link>
          </li> */}
          <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link>
          </li>
        </ul>
      </div>
 
      {/* Pages */}
      <div className="lg:col-span-3">
        <h4 className="text-lg font-display font-semibold mb-4 uppercase">
          Pages
        </h4>
        <ul className="space-y-2 text-base">
          <li><Link to="/forklifts" className="hover:underline">Forklifts</Link></li>
          <li><Link to="/bulldozers" className="hover:underline">Bulldozers</Link></li>
          <li><Link to="/all-terrain-cranes" className="hover:underline">Cranes</Link></li>
          <li><Link to="/wheel-loaders" className="hover:underline">Loaders</Link></li>
          <li><Link to="/skid-steer" className="hover:underline">Skid Steer</Link></li>
          <li><Link to="/air-compressors" className="hover:underline">Compressor</Link></li>
          <li><Link to="/lighting-towers" className="hover:underline">Towers</Link></li>

        </ul>
      </div>
 
      {/* Contact Info */}
      <div className="lg:col-span-3">
        <h4 className="text-lg font-display font-semibold mb-4 uppercase">
          Contact Us
        </h4>
        <ul className="space-y-2 text-base">
          <li className="flex items-center">
            <a href="mailto:admin@goldensparrowuae.com" className="flex items-center hover:underline">
              <Mail className="w-4 h-4 mr-2" />admin@goldensparrowuae.com
            </a>
          </li>
          <li className="flex items-center">
            <a href="tel:+971542320624" className="flex items-center hover:underline">
              <Phone className="w-4 h-4 mr-2" /> +971 54 232 0624
            </a>
          </li>
          <li className="flex items-center">
            <a href="https://maps.app.goo.gl/8CQna9FwzyK4So8s5" target="_blank" className="flex items-center hover:underline">
              <MapPin className="w-4 h-4 mr-2" /> Donna Towers, Silicon Oasis Dubai, UAE
            </a>
          </li>
        </ul>
      </div>
    </div>
    {/* Bottom bar */}
    <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-base text-black">
      <p>
        &copy; {new Date().getFullYear()} Golden Sparrow Trading CO LLC.{" "}
        <br className="block md:hidden" />
        All rights reserved.
      </p>
          {/* Professional WhatsApp Floating Button */}
    <div className="fixed bottom-16 right-18 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group relative hover:animate-none"
        aria-label="Contact us on WhatsApp"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #20BA5A 100%)",
          boxShadow:
            "0 8px 25px rgba(37, 211, 102, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <WhatsAppIcon />

        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping"></div>

        {/* Tooltip */}
        <div className="absolute right-full -mr-14 -top-14 opacity-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div
            className="bg-white text-[#202020] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border"
            style={{ boxShadow: "2px 3px 0px #00e785" }}
          >
            Chat with us!
            {/* <div className="absolute left-full top-0 w-0 h-0 border-l-[6px] border-l-white border-y-[6px] border-y-transparent"></div> */}
          </div>
        </div>
      </button>
    </div>
    </div>
  </div>
</footer>
  );
}

export default Footer;
