/**
 * BrandCard Component
 * Simple brand display with icon and name - clicks go directly to ProductListingPage
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const BrandCard = ({ brand, taxonomy = 'equipment-buy' }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    navigate(`/products?taxonomy=${taxonomy}&pa_brand=${brand.slug}`);
  };

  return (
    <div 
      onClick={handleBrandClick}
      className="bg-white rounded-xl border border-neutral-200 shadow-soft hover:shadow-md transition-all duration-300 cursor-pointer group p-6 text-center"
    >
      {/* Brand Icon */}
      <div className="flex justify-center mb-4">
        {brand.logo ? (
          <img 
            src={brand.logo} 
            alt={`${brand.name} logo`}
            className="rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center ${brand.logo ? 'hidden' : 'flex'}`}
          data-testid="brand-fallback-icon"
        >
          <Building2 className="w-8 h-8 text-accent-600" />
        </div>
      </div>

      {/* Brand Name */}
      <h3 className="text-lg font-display font-semibold text-neutral-800 group-hover:text-accent-600 transition-colors">
        {brand.name}
      </h3>
    </div>
  );
};

// Loading skeleton for BrandCard
export const BrandCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-soft p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-neutral-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="w-24 h-6 bg-neutral-200 rounded animate-pulse mx-auto"></div>
    </div>
  );
};

export default React.memo(BrandCard);