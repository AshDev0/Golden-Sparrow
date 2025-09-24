/**
 * ProductListingPage Component - Fixed Version with Smooth Navigation
 * Now properly responds to URL parameter changes without needing to hit Enter
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Package, Home, ChevronRight, Grid, List, Filter, X } from 'lucide-react';
import FilterPanel from '../components/FiltersPanel';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchProducts, fetchFilterOptions } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import { API_CONFIG, SORT_OPTIONS, debugLog } from '../constants/config';

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State for taxonomy selection
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('equipment-buy');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ orderby: 'date', order: 'desc' });
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Prevent body scroll when mobile filters are open and handle escape key
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setShowMobileFilters(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);
  
  // Data State
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterOptions, setFilterOptions] = useState(null);
  
  // Loading States
  const [productsLoading, setProductsLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Debounced search
  const debouncedSearch = useDebounce(filters.search, 500);
  
  // Count active filters (excluding search)
  const activeFilterCount = Object.keys(filters).filter(key => {
    if (key === 'search') return false;
    const value = filters[key];
    return value !== undefined && value !== '' && 
           (Array.isArray(value) ? value.length > 0 : true);
  }).length;
  
  // CRITICAL FIX: Watch URL changes and update state accordingly
  useEffect(() => {
    // Parse URL parameters whenever they change
    const taxonomy = searchParams.get('taxonomy') || 'equipment-buy';
    const term = searchParams.get('term') || '';
    const termName = searchParams.get('termName') || '';
    const label = searchParams.get('label') || '';
    const pageFromUrl = Math.max(1, parseInt(searchParams.get('page')) || 1); // Ensure page is at least 1
    const sortFromUrl = searchParams.get('sort') || 'date';
    const orderFromUrl = searchParams.get('order') || 'desc';
    
    // Parse filters from URL
    const newFilters = {};
    const reservedParams = ['taxonomy', 'term', 'termName', 'label', 'page', 'sort', 'order'];
    
    searchParams.forEach((value, key) => {
      if (!reservedParams.includes(key)) {
        // Handle comma-separated values
        if (value && value.includes(',')) {
          newFilters[key] = value.split(',').map(v => v.trim()).filter(v => v);
        } else if (value) {
          newFilters[key] = value;
        }
      }
    });
    
    debugLog('URL Parameters parsed:', {
      taxonomy,
      newFilters,
      page: pageFromUrl
    });
    
    // Only update state if values have actually changed to prevent loops
    if (selectedTaxonomy !== taxonomy) {
      setSelectedTaxonomy(taxonomy);
    }
    
    // Compare filters properly
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(newFilters);
    if (filtersChanged) {
      setFilters(newFilters);
    }
    
    if (sort.orderby !== sortFromUrl || sort.order !== orderFromUrl) {
      setSort({ orderby: sortFromUrl, order: orderFromUrl });
    }
    
    if (page !== pageFromUrl) {
      setPage(pageFromUrl);
    }
    
    // Clear error when URL changes (new navigation)
    if (error) {
      setError(null);
    }
    
  }, [searchParams]); // Re-run whenever URL parameters change
  
  // Taxonomy toggle configuration
  const taxonomyOptions = [
    { 
      value: 'equipment-buy', 
      label: 'Sale',
      icon: '',
      color: ''
    },
    { 
      value: 'equipment-rent', 
      label: 'Rental',
      icon: '',
      color: ''
    }
  ];
  
  // Handle taxonomy change
  const handleTaxonomyChange = (newTaxonomy) => {
    // Build new URL params
    const params = new URLSearchParams();
    params.set('taxonomy', newTaxonomy);
    // Navigate with new params, clearing filters
    setSearchParams(params);
    
    // Close mobile filters after changing taxonomy
    if (showMobileFilters) {
      setShowMobileFilters(false);
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    // Create new URL parameters
    const params = new URLSearchParams(searchParams);
    const reservedParams = ['taxonomy', 'term', 'termName', 'label', 'page', 'sort', 'order'];
    
    // Remove all existing filter params first
    const keysToRemove = [];
    params.forEach((value, key) => {
      if (!reservedParams.includes(key)) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(key => params.delete(key));
    
    // Add new filters to URL
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','));
          }
        } else {
          params.set(key, String(value));
        }
      }
    });
    
    // Reset page to 1 when filters change
    if (page !== 1) {
      params.set('page', '1');
    } else {
      params.delete('page');
    }
    
    // Update URL (this will trigger the useEffect to update state)
    setSearchParams(params);
    
    // Close mobile filters after applying a filter (better UX)
    if (showMobileFilters) {
      setShowMobileFilters(false);
    }
  };
  
  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      setFiltersLoading(true);
      try {
        const data = await fetchFilterOptions(selectedTaxonomy);
        setFilterOptions(data);
      } catch (err) {
        debugLog('Failed to load filter options:', err);
        setError(`Failed to load filters: ${err.message}`);
      } finally {
        setFiltersLoading(false);
      }
    };
    
    loadFilterOptions();
  }, [selectedTaxonomy]);
  
  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      setError(null);
      
      try {
        // Get all values from URL/state
        const term = searchParams.get('term') || '';
        
        const params = {
          taxonomy: selectedTaxonomy,
          term,
          page,
          per_page: API_CONFIG.DEFAULT_PER_PAGE,
          orderby: sort.orderby,
          order: sort.order,
          ...filters
        };
        
        // Use debounced search
        if (debouncedSearch) {
          params.search = debouncedSearch;
        } else {
          delete params.search;
        }
        
        debugLog('Loading products with params:', params);
        
        const data = await fetchProducts(params);
        setProducts(data.products);
        setTotalProducts(data.total);
        setTotalPages(data.totalPages);
        
      } catch (err) {
        debugLog('Failed to load products:', err);
        setError(`Failed to load products: ${err.message}`);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };
    
    loadProducts();
  }, [selectedTaxonomy, page, sort.orderby, sort.order, debouncedSearch, JSON.stringify(filters), searchParams.get('term')]);
  
  // Handle sort change
  const handleSortChange = (value) => {
    const [orderby, order] = value.split('-');
    const newSort = { orderby, order: order || 'desc' };
    setSort(newSort);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    params.set('sort', orderby);
    params.set('order', order || 'desc');
    setSearchParams(params);
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    setSearchParams(params);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Build breadcrumb
  const getBreadcrumb = () => {
    const parts = [{ label: (<Home className="w-4 h-4" />), path: '/' }];
    const termName = searchParams.get('termName') || '';
    const label = searchParams.get('label') || '';
    
    if (selectedTaxonomy === 'equipment-buy') {
      parts.push({ label: 'For Sale', path: '/products?taxonomy=equipment-buy' });
    } else {
      parts.push({ label: 'For Rent', path: '/products?taxonomy=equipment-rent' });
    }
    
    if (termName) {
      parts.push({ label: termName, path: null });
    } else if (label) {
      parts.push({ label: label, path: null });
    }
    
    // Add condition-based breadcrumb
    if (filters.pa_condition) {
      const conditions = Array.isArray(filters.pa_condition) ? filters.pa_condition : [filters.pa_condition];
      if (conditions.includes('used') || conditions.includes('like-new')) {
        parts.push({ label: 'Used Equipment', path: null });
      } else if (conditions.includes('new')) {
        parts.push({ label: 'New Equipment', path: null });
      }
    }
    
    return parts;
  };
  
  const breadcrumb = getBreadcrumb();
  const termName = searchParams.get('termName') || '';
  const label = searchParams.get('label') || '';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
              {item.path ? (
                <Link to={item.path} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {termName || label || (selectedTaxonomy === 'equipment-buy' ? 'Equipment for Sale' : 'Equipment for Rent')}
          </h1>
          
          {/* Controls Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Results Count */}
              <div className="flex items-center">
                <span className="text-gray-600">
                  {productsLoading ? (
                    <span className="flex items-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Loading...</span>
                    </span>
                  ) : (
                    <span>
                      <span className="font-semibold text-gray-900">{totalProducts}</span> products found
                    </span>
                  )}
                </span>
              </div>
            
              {/* Mobile Filter Button and View Mode/Sort Controls */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white rounded-md hover:from-[#F7971E] hover:to-[#FFD200] transition-colors relative"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {activeFilterCount > 9 ? '9+' : activeFilterCount}
                    </span>
                  )}
                </button>
                
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-md p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="Grid view"
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title="List view"
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 hidden sm:inline">Sort by:</label>
                  <select
                    value={`${sort.orderby}-${sort.order}`}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Sort products"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
            {error}
          </div>
        )}
        
        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
              onClick={() => setShowMobileFilters(false)}
            ></div>
            
            {/* Filter Panel */}
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0">
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Sales/Rentals Toggle Buttons */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex flex-col gap-2">
                    {taxonomyOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleTaxonomyChange(option.value)}
                        className={`
                          px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
                          ${selectedTaxonomy === option.value
                            ? option.color === 'blue' 
                              ? 'bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white shadow-md' 
                              : 'bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }
                        `}
                        aria-pressed={selectedTaxonomy === option.value}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-sm font-semibold">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Filter Panel */}
                <FilterPanel
                  filters={filters}
                  setFilters={handleFilterChange}
                  filterOptions={filterOptions}
                  isLoading={filtersLoading}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              {/* Sales/Rentals Toggle Buttons */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex gap-2">
                  {taxonomyOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleTaxonomyChange(option.value)}
                      className={`
                        w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
                        ${selectedTaxonomy === option.value
                          ? option.color === 'blue' 
                            ? 'bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white shadow-md transform scale-105 hover:from-[#F7971E] hover:to-[#FFD200] transition-colors' 
                            : 'bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white shadow-md transform scale-105 hover:from-[#F7971E] hover:to-[#FFD200] transition-colors'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                      aria-pressed={selectedTaxonomy === option.value}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-semibold">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                setFilters={handleFilterChange}
                filterOptions={filterOptions}
                isLoading={filtersLoading}
              />
            </div>
          </aside>
          
          {/* Products Grid */}
          <main className="lg:col-span-3">
            {productsLoading ? (
              // Loading skeleton
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} viewMode={viewMode} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                {/* Products Grid/List */}
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                      taxonomy={selectedTaxonomy}
                      onClick={() => navigate(`/product/${product.slug || 'product'}/GS${product.id}`)}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      isLoading={productsLoading}
                    />
                  </div>
                )}
              </>
            ) : (
              // No Products Found
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                {Object.keys(filters).length > 0 && (
                  <button
                    onClick={() => handleFilterChange({})}
                    className="px-4 py-2 bg-gradient-to-br from-[#FFD200] to-[#F7971E] text-white rounded-xl hover:from-[#F7971E] hover:to-[#FFD200] transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}