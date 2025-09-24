/**
 * CategoryCard Component
 * Category display with image and name - clicks go directly to ProductListingPage
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

const CategoryCard = ({ category, taxonomy = 'equipment-buy' }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Navigate to products with category filter
    const url = category.taxonomy 
      ? `/products?taxonomy=${category.taxonomy}&${category.taxonomy}=${category.slug}`
      : `/products?taxonomy=${taxonomy}&product_cat=${category.slug}`;
    navigate(url);
  };

  return (
    <div 
      onClick={handleCategoryClick}
      className="bg-white rounded-xl border border-neutral-200 shadow-soft hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Category Image */}
      <div className="aspect-video bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center overflow-hidden">
        {category.image ? (
          <img 
            src={category.image.medium || category.image.thumbnail || category.image.url} 
            alt={`${category.name} category`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center ${category.image ? 'hidden' : 'flex'}`}
          data-testid="category-fallback-icon"
        >
          <Package className="w-12 h-12 text-accent-600" />
        </div>
      </div>

      {/* Category Info */}
      <div className="p-4">
        <h3 className="text-lg font-display font-semibold text-neutral-800 group-hover:text-accent-600 transition-colors mb-1">
          {category.name}
        </h3>
        
        {category.description && (
          <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
            {category.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">
            {category.count || 0} products
          </span>
          <span className="text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
            View Products →
          </span>
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for CategoryCard
export const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-soft overflow-hidden">
      <div className="aspect-video bg-neutral-200 animate-pulse"></div>
      <div className="p-4">
        <div className="w-32 h-6 bg-neutral-200 rounded animate-pulse mb-2"></div>
        <div className="w-full h-4 bg-neutral-200 rounded animate-pulse mb-2"></div>
        <div className="flex items-center justify-between">
          <div className="w-20 h-4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-neutral-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);