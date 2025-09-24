/**
 * ProductCard Component - Fixed Version with Debugging
 * Fixed currency symbol HTML entity and badge display
 */

import React, { useState } from 'react';
import { Package, Phone, Eye, Star, MapPin, ChevronRight } from 'lucide-react';
import EnquiryPopup from './EnquiryPopup';
const ProductCard = ({ product, viewMode = 'grid', onClick, taxonomy }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Safe HTML entity decoding function
  const decodeHtmlEntities = (html) => {
    if (!html) return '';

    // Safe HTML entity decoding without XSS risk
    const entityMap = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&cent;': '¢',
      '&pound;': '£',
      '&yen;': '¥',
      '&euro;': '€',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&#8211;': '–', // en dash
      '&#8212;': '—', // em dash
      '&#8220;': '"', // left double quotation mark
      '&#8221;': '"', // right double quotation mark
      '&#8230;': '…', // horizontal ellipsis
      '&#8482;': '™', // trademark
      '&#169;': '©',  // copyright
      '&#174;': '®'   // registered
    };

    return html.replace(/&[#\w]+;/g, (entity) => {
      return entityMap[entity] || entity;
    });
  };

  // Safe HTML entity decoding for currency symbol
  const decodeCurrency = (html) => {
    if (!html) return '$'; // Default to $ if no currency
    return decodeHtmlEntities(html);
  };

  // Get the clean currency symbol
  const currencySymbol = decodeCurrency(product.currency_symbol || product.currency || '$');

  // Determine stock status color
  const getStockStatusColor = (status) => {
    switch (status) {
      case 'instock':
        return 'bg-green-100 text-green-800';
      case 'outofstock':
        return 'bg-red-100 text-red-800';
      case 'onbackorder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get Tags - Optimized for backend structure
  const getTags = () => {
    // Handle the backend tag structure: array of objects with {id, name, slug}
    if (!product.tags || !Array.isArray(product.tags)) return [];
    
    return product.tags.map(tag => {
      // Backend provides objects with {id, name, slug}
      if (typeof tag === 'object' && tag.name) return tag.name;
      if (typeof tag === 'object' && tag.slug) return tag.slug;
      if (typeof tag === 'string') return tag;
      return String(tag);
    }).filter(tag => tag && tag.trim()); // Filter out empty tags
  };

  // Format stock status text
  const formatStockStatus = (status) => {
    switch (status) {
      case 'instock':
        return 'In Stock';
      case 'outofstock':
        return 'Out of Stock';
      case 'onbackorder':
        return 'On Backorder';
      default:
        return status || 'Unknown';
    }
  };

  // Get badge info based on taxonomy
  const getBadgeInfo = () => {
    // Force string comparison and handle undefined
    const currentTaxonomy = String(taxonomy || '').toLowerCase();
    
    // Check for equipment-buy
    if (currentTaxonomy.includes('buy')) {
      return {
        show: true,
        text: 'SALE',
        bgColor: 'bg-red-500'
      };
    }
    
    // Check for equipment-rent
    if (currentTaxonomy.includes('rent')) {
      return {
        show: true, // Always show for rent
        text: 'RENT',
        bgColor: 'bg-accent-600'
      };
    }
    
    // Default: no badge
    return {
      show: false,
      text: '',
      bgColor: ''
    };
  };

  const badgeInfo = getBadgeInfo();

  // List View
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-48 h-48 sm:h-auto bg-gray-100 flex-shrink-0">
            {/* Dynamic Badge */}
            {badgeInfo.show && (
              <div className="absolute top-2 left-2 z-10">
                <span className={`${badgeInfo.bgColor} text-white px-3 py-1 text-xs font-bold rounded shadow-lg uppercase`}>
                  {badgeInfo.text}
                </span>
              </div>
            )}
            
            {!imageError && product.images && product.images[0] ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-display font-semibold text-neutral-800 mb-2 group-hover:text-accent-600 transition-colors">
                {decodeHtmlEntities(product.name)}
              </h3>
              
              {product.short_description && (
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {product.short_description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              {/* <div>
                {product.on_sale && product.regular_price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {currencySymbol}{product.sale_price || product.price || '0.00'}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {currencySymbol}{product.regular_price}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-gray-900">
                    {currencySymbol}{product.price || '0.00'}
                  </span>
                )}
              </div> */}
              
              <span className={`px-2 py-1 text-xs rounded-full ${getStockStatusColor(product.stock_status)}`}>
                {formatStockStatus(product.stock_status)}
              </span>
            </div>
            {/* Product Tags */}
            {getTags().length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {getTags().slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md capitalize"
                  >
                    {tag}
                  </span>
                ))}
                {getTags().length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{getTags().length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      className="bg-white rounded-xl border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {/* Dynamic Badge - Always visible for testing */}
        {badgeInfo.show && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`${badgeInfo.bgColor} text-white px-3 py-1 text-xs font-bold rounded shadow-lg uppercase`}>
              {badgeInfo.text}
            </span>
          </div>
        )}

        {/* Stock Badge */}
        {product.stock_status === 'outofstock' && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-gray-800 text-white px-2 py-1 text-xs font-bold rounded shadow-md">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Image */}
        {!imageError && product.images && product.images[0] ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <Eye className="w-4 h-4" />
            <span className="font-medium">Quick View</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-display font-semibold text-neutral-800 line-clamp-2 mb-2 min-h-[2.5rem] transition-colors">
          {decodeHtmlEntities(product.name)}
        </h3>

        {/* Price Section */}
        {/* <div className="mb-3">
          {taxonomy === 'equipment-rent' ? (
            // Rental pricing
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                {currencySymbol}{product.price || '0.00'}
              </span>
              <span className="text-xs text-gray-500">per day</span>
            </div>
          ) : (
            // Sale pricing
            product.on_sale && product.regular_price ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold text-blue-600">
                  {currencySymbol}{product.sale_price || product.price || '0.00'}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {currencySymbol}{product.regular_price}
                </span>
                {product.regular_price && product.sale_price && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)}% OFF
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {currencySymbol}{product.price || '0.00'}
              </span>
            )
          )}
        </div> */}

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(product.stock_status)}`}>
            {formatStockStatus(product.stock_status)}
          </span>
          
          {/* Product Tags */}
          {getTags().length > 0 && (
            <div className="flex flex-wrap gap-1">
              {getTags().slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-md capitalize"
                >
                  {tag}
                </span>
              ))}
              {getTags().length > 2 && (
                <span className="text-xs text-gray-500">
                  +{getTags().length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        {/* <button
          className="w-full bg-accent-600 text-white text-center py-2 px-3 rounded-lg hover:bg-accent-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Contact clicked for product:', product.id);
          }}
        >
          <Phone className="w-4 h-4" />
          <span>Request a Quote</span>
        </button> */}

        <div className="mt-3">
                      <span className="inline-flex items-center text-xs view-details font-medium">
                        View Details
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
      </div>
    </div>
  );
};

// Skeleton loader
export const ProductCardSkeleton = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="flex">
          <div className="w-48 h-48 bg-gray-200" />
          <div className="flex-1 p-4">
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
            <div className="h-3 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

// Optimize re-renders with React.memo
export default React.memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.taxonomy === nextProps.taxonomy &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.stock_status === nextProps.product.stock_status &&
    JSON.stringify(prevProps.product.tags) === JSON.stringify(nextProps.product.tags)
  );
});