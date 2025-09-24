/**
 * CategoryListing Page - Modified to show Level 2 categories
 * Shows categories like "Machinery" instead of their children like "Loader"
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Package, 
  ChevronRight, 
  Grid, 
  List, 
  Search,
  Home,
  Loader
} from 'lucide-react';
import { buildHierarchy } from '../utils/buildHierarchy';
import { debugLog } from '../constants/config';
import { fetchTaxonomyTerms } from '../services/api';

const WP_API_BASE = process.env.REACT_APP_WP_BASE || 'https://goldensparrowuae.com/wordpress/wp-json';

export default function CategoryListing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [taxonomy, setTaxonomy] = useState('equipment-buy');
  const [categories, setCategories] = useState([]);
  const [level2Categories, setLevel2Categories] = useState([]); // Store only level 2 categories
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Initialize taxonomy from URL
  useEffect(() => {
    const taxonomyFromUrl = searchParams.get('taxonomy') || 'equipment-buy';
    setTaxonomy(taxonomyFromUrl);
  }, [searchParams]);

  // Fetch categories when taxonomy changes
  useEffect(() => {
    fetchCategories();
  }, [taxonomy]);

  // Filter level 2 categories based on search term
  useEffect(() => {
    let filtered = level2Categories;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(category => 
        category.name.toLowerCase().includes(searchLower) ||
        category.description?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredCategories(filtered);
  }, [level2Categories, searchTerm]);

  /**
   * Extract Level 2 categories from the hierarchy
   * This function traverses the category tree and collects only level 2 categories
   */
  const extractLevel2Categories = (categories, level = 1, parentInfo = null) => {
    let level2Cats = [];
    
    categories.forEach(category => {
      // Create an enhanced category object with parent information and child count
      const enhancedCategory = {
        ...category,
        level: level,
        parentInfo: parentInfo,
        childCount: category.children ? category.children.length : 0
      };

      if (level === 2) {
        // This is a level 2 category (the ones we want to display)
        level2Cats.push(enhancedCategory);
      } else if (level === 1 && category.children && category.children.length > 0) {
        // Continue traversing from level 1 to get to level 2
        const parentData = {
          id: category.id,
          name: category.name,
          slug: category.slug,
          level: level
        };
        level2Cats = [...level2Cats, ...extractLevel2Categories(category.children, level + 1, parentData)];
      }
    });
    
    return level2Cats;
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try the custom API first for better image support
      try {
        const response = await fetchTaxonomyTerms(taxonomy);
        if (response && response.terms) {
          const hierarchy = buildHierarchy(response.terms);
          
          setCategories(hierarchy);
          
          // Extract only level 2 categories (like "Machinery")
          const extractedLevel2 = extractLevel2Categories(hierarchy);
          setLevel2Categories(extractedLevel2);
          
          debugLog('Full hierarchy:', hierarchy);
          debugLog('Extracted Level 2 categories:', extractedLevel2);
          return;
        }
      } catch (apiError) {
        debugLog('Custom API failed, falling back to WordPress API:', apiError);
      }

      // Fallback to WordPress API
      const endpoint = taxonomy === 'equipment-buy' ? 'equipment-buy' : 'equipment-rent';
      const response = await fetch(`${WP_API_BASE}/wp/v2/${endpoint}?per_page=100&_embed`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${taxonomy} categories`);
      }
      
      const data = await response.json();
      
      // Enhance data with image information from _embedded
      const enhancedData = data.map(term => {
        let featured_image = null;
        
        // Try to get featured image from different sources
        if (term._embedded && term._embedded['wp:featuredmedia'] && term._embedded['wp:featuredmedia'][0]) {
          const media = term._embedded['wp:featuredmedia'][0];
          featured_image = {
            id: media.id,
            url: media.source_url,
            alt: media.alt_text || term.name,
            sizes: media.media_details?.sizes || {}
          };
        }
        
        return {
          ...term,
          featured_image,
          // Also try ACF fields if they exist
          image: term.acf?.category_image || term.meta?.category_image || null
        };
      });
      
      const hierarchy = buildHierarchy(enhancedData);
      
      setCategories(hierarchy);
      
      // Extract only level 2 categories (like "Machinery")
      const extractedLevel2 = extractLevel2Categories(hierarchy);
      setLevel2Categories(extractedLevel2);
      
      debugLog('Full hierarchy:', hierarchy);
      debugLog('Extracted Level 2 categories:', extractedLevel2);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(`Failed to load categories: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    // Navigate to products page with the selected category
    const queryParams = new URLSearchParams({
      taxonomy,
      term: category.slug,
      termName: category.name
    });
    navigate(`/products?${queryParams.toString()}`);
  };

  const handleTaxonomySwitch = (newTaxonomy) => {
    setTaxonomy(newTaxonomy);
    navigate(`/categories?taxonomy=${newTaxonomy}`);
  };

  // Get total subcategories count
  const getTotalSubcategoriesCount = () => {
    return level2Categories.reduce((total, cat) => total + (cat.childCount || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <button
            onClick={() => navigate('/')}
            className="hover:text-accent-600 transition-colors flex items-center"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Equipment Categories</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Equipment Categories
              </h1>
              <p className="text-gray-600">
                Browse {level2Categories.length} main categories with {getTotalSubcategoriesCount()} total subcategories {taxonomy === 'equipment-buy' ? 'for sale' : 'for rent'}
              </p>
            </div>
          </div>

          {/* Taxonomy Toggle */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => handleTaxonomySwitch('equipment-buy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                taxonomy === 'equipment-buy'
                  ? 'bg-accent-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Equipment for Sale
            </button>
            <button
              onClick={() => handleTaxonomySwitch('equipment-rent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                taxonomy === 'equipment-rent'
                  ? 'bg-accent-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Equipment for Rent
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-accent-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-accent-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p>{error}</p>
            <button
              onClick={fetchCategories}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-accent-600 mr-3" />
            <span className="text-gray-600">Loading categories...</span>
          </div>
        )}

        {/* Categories Content */}
        {!loading && !error && (
          <>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No categories available.'}
                </p>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }`}>
                {filteredCategories.map((category) => (
                  <Level2CategoryCard
                    key={category.id}
                    category={category}
                    viewMode={viewMode}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Level 2 Category Card Component
function Level2CategoryCard({ category, viewMode, onClick }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  // Get the featured image URL, fallback to placeholder if not available
  const getImageUrl = () => {
    // Try multiple image sources in order of preference
    
    // 1. Featured image with URL property
    if (category.featured_image && category.featured_image.url) {
      return category.featured_image.url;
    }
    
    // 2. Featured image as direct URL string
    if (category.featured_image && typeof category.featured_image === 'string') {
      return category.featured_image;
    }
    
    // 3. Image field (for custom fields)
    if (category.image && typeof category.image === 'string') {
      return category.image;
    }
    
    // 4. Image field as object with URL
    if (category.image && category.image.url) {
      return category.image.url;
    }
    
    // 5. ACF image field
    if (category.acf && category.acf.category_image) {
      if (typeof category.acf.category_image === 'string') {
        return category.acf.category_image;
      }
      if (category.acf.category_image.url) {
        return category.acf.category_image.url;
      }
    }
    
    // 6. Meta image field
    if (category.meta && category.meta.category_image) {
      return category.meta.category_image;
    }
    
    // 7. Try WordPress media sizes if available
    if (category.featured_image && category.featured_image.sizes) {
      const sizes = category.featured_image.sizes;
      if (sizes.medium && sizes.medium.source_url) {
        return sizes.medium.source_url;
      }
      if (sizes.thumbnail && sizes.thumbnail.source_url) {
        return sizes.thumbnail.source_url;
      }
      if (sizes.full && sizes.full.source_url) {
        return sizes.full.source_url;
      }
    }
    
    // Debug: Log what's available for this category
    debugLog('No image found for category:', category.name, {
      featured_image: category.featured_image,
      image: category.image,
      acf: category.acf,
      meta: category.meta
    });
    
    // Fallback placeholder if no featured image
    return `https://via.placeholder.com/300x200/f3f4f6/6b7280?text=${encodeURIComponent(category.name)}`;
  };

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const imageUrl = getImageUrl();
  const isPlaceholder = imageUrl.includes('via.placeholder.com');

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center p-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 mr-4 relative overflow-hidden">
            {!isPlaceholder && imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <Loader className="w-4 h-4 animate-spin text-gray-400" />
              </div>
            )}
            <img
              src={imageUrl}
              alt={category.name}
              className={`w-full h-full object-cover rounded-lg transition-opacity ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
          
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-200 overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {/* Category Image */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {!isPlaceholder && imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <Loader className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={category.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>

      {/* Category Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent-600 transition-colors mb-1">
          {category.name}
        </h3>
      </div>
    </div>
  );
}