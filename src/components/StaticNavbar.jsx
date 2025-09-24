import React from 'react'
import { Package, Phone } from "lucide-react";
import { Link } from "react-router-dom";
const StaticNavbar = () => {
  return (
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
                </div>
              </div>
            </div>
          </nav>
  )
}

export default StaticNavbar