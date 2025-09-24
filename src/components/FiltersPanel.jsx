/**
 * FilterPanel Component
 * 
 * Displays all available filters including search, price range, and dynamic filters
 * Handles filter state management and provides clear all functionality
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Filter, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  X, 
  RefreshCw 
} from 'lucide-react';

const FilterPanel = ({ 
  filters, 
  setFilters, 
  filterOptions, 
  isLoading,
  onRefresh 
}) => {
  // State for expanded/collapsed filter sections
  const [expandedSections, setExpandedSections] = useState({
    price: false,
    // Other sections will be collapsed by default
  });

  // Toggle section expansion
  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Handle checkbox filter change
  const handleCheckboxChange = useCallback((filterKey, value, isChecked) => {
    const currentValues = Array.isArray(filters[filterKey]) ? filters[filterKey] : [];
    
    let newFilters;
    if (isChecked) {
      // Add value to filter
      newFilters = {
        ...filters,
        [filterKey]: [...currentValues, value]
      };
    } else {
      // Remove value from filter
      const newValues = currentValues.filter(v => v !== value);
      
      // If no values left, remove the filter key entirely
      if (newValues.length === 0) {
        const { [filterKey]: removed, ...rest } = filters;
        newFilters = rest;
      } else {
        newFilters = {
          ...filters,
          [filterKey]: newValues
        };
      }
    }
    
    setFilters(newFilters);
  }, [filters, setFilters]);

  // Handle price input change
  const handlePriceChange = useCallback((type, value) => {
    // Only allow numbers and empty string
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const newFilters = {
        ...filters,
        [type]: value
      };
      setFilters(newFilters);
    }
  }, [filters, setFilters]);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    const newFilters = {
      ...filters,
      search: value
    };
    setFilters(newFilters);
  }, [filters, setFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, [setFilters]);

  // Clear specific filter
  const clearFilter = (filterKey, value = null) => {
    let newFilters;
    if (value !== null && Array.isArray(filters[filterKey])) {
      // Remove specific value from array
      const newValues = filters[filterKey].filter(v => v !== value);
      if (newValues.length === 0) {
        const { [filterKey]: removed, ...rest } = filters;
        newFilters = rest;
      } else {
        newFilters = { ...filters, [filterKey]: newValues };
      }
    } else {
      // Remove entire filter
      const { [filterKey]: removed, ...rest } = filters;
      newFilters = rest;
    }
    setFilters(newFilters);
  };

  // Count active filters (excluding search)
  const activeFilterCount = Object.keys(filters).filter(key => {
    if (key === 'search') return false;
    const value = filters[key];
    return value !== undefined && value !== '' && 
           (Array.isArray(value) ? value.length > 0 : true);
  }).length;


  // Auto-expand sections with active filters
  useEffect(() => {
    const sectionsWithActiveFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key] !== '')) {
        sectionsWithActiveFilters[key] = true;
      }
    });
    
    // Only update if there are changes to prevent unnecessary re-renders
    const currentExpanded = Object.keys(sectionsWithActiveFilters);
    const needsUpdate = currentExpanded.some(key => !expandedSections[key]);
    
    if (needsUpdate) {
      setExpandedSections(prev => ({ 
        ...prev, 
        ...sectionsWithActiveFilters
      }));
    }
  }, [filters]); // Re-run when filters change, not just on mount

  return (
    <aside role="complementary" aria-label="Product filters" className="bg-white rounded-xl border border-neutral-200 shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold text-neutral-800 flex items-center">
            <Filter className="w-5 h-5 mr-2" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-accent-100 text-accent-800 text-xs font-medium px-2 py-1 rounded-full" aria-label={`${activeFilterCount} filters active`}>
                {activeFilterCount}
              </span>
            )}
          </h2>
          
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Refresh filters"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            )}
            
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Field */}
        <div>
          <label className="block text-sm font-display font-semibold text-gray-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {filters.search && (
              <button
                onClick={() => clearFilter('search')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-sm font-display font-semibold text-gray-700 hover:text-gray-900 py-1"
            aria-expanded={expandedSections.price}
            aria-controls="price-filter-content"
            aria-label={`${expandedSections.price ? 'Collapse' : 'Expand'} price range filter`}
          >
            <span className="flex items-center">
              {/* <DollarSign className="w-4 h-4 mr-2" /> */}
              Price Range
              {(filters.min_price || filters.max_price) && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </span>
            {expandedSections.price ? 
              <ChevronUp className="w-4 h-4" aria-hidden="true" /> : 
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            }
          </button>
          
          {expandedSections.price && (
            <div id="price-filter-content" className="mt-3 flex gap-2">
              <div className="flex-1">
                <label htmlFor="min-price" className="sr-only">Minimum price</label>
                <input
                  id="min-price"
                  type="text"
                  placeholder="Min"
                  value={filters.min_price || ''}
                  onChange={(e) => handlePriceChange('min_price', e.target.value)}
                  aria-label="Minimum price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="max-price" className="sr-only">Maximum price</label>
                <input
                  id="max-price"
                  type="text"
                  placeholder="Max"
                  value={filters.max_price || ''}
                  onChange={(e) => handlePriceChange('max_price', e.target.value)}
                  aria-label="Maximum price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Filters from API */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          filterOptions?.filters && Object.entries(filterOptions.filters).map(([taxonomyKey, filterData]) => {
            if (!filterData.options || filterData.options.length === 0) {
              return null;
            }

            const isExpanded = expandedSections[taxonomyKey] === true;
            const selectedCount = filters[taxonomyKey]?.length || 0;

            return (
              <div key={taxonomyKey}>
                <button
                  onClick={() => toggleSection(taxonomyKey)}
                  className="w-full flex items-center justify-between text-sm font-display font-semibold text-gray-700 hover:text-gray-900 py-1"
                >
                  <span>
                    {filterData.label}
                    {selectedCount > 0 && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {selectedCount}
                      </span>
                    )}
                  </span>
                  {isExpanded ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </button>

                {isExpanded && (
                  <div className="mt-2 space-y-1 max-h-48 overflow-y-auto pr-2">
                    {filterData.options.map(option => (
                      <label
                        key={option.slug}
                        className="flex items-center py-1 px-2 hover:bg-gray-50 rounded cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters[taxonomyKey]?.includes(option.slug) || false}
                          onChange={(e) => handleCheckboxChange(taxonomyKey, option.slug, e.target.checked)}
                          className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">
                          {option.name}
                        </span>
                        {/* <span className="text-xs text-gray-500">
                          ({option.count})
                        </span> */}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="pt-3 border-t">
            <h3 className="text-xs font-medium text-gray-600 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {/* Price filters */}
              {filters.min_price && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Min: ${filters.min_price}
                  <button
                    onClick={() => clearFilter('min_price')}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.max_price && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Max: ${filters.max_price}
                  <button
                    onClick={() => clearFilter('max_price')}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {/* Dynamic filters */}
              {Object.entries(filters).map(([key, value]) => {
                if (key === 'search' || key === 'min_price' || key === 'max_price' || !value) {
                  return null;
                }

                if (Array.isArray(value)) {
                  return value.map(val => {
                    const filterOption = filterOptions?.filters?.[key];
                    const optionName = filterOption?.options?.find(opt => opt.slug === val)?.name || val;

                    return (
                      <span
                        key={`${key}-${val}`}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {optionName}
                        <button
                          onClick={() => clearFilter(key, val)}
                          className="ml-1 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  });
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Summary */}
      {filterOptions?.total > 0 && (
        <div className="px-4 pb-4">
          <div className="text-xs text-gray-500 text-center">
            Filtering from {filterOptions.total} total products
          </div>
        </div>
      )}
    </aside>
  );
};

// Optimize re-renders with React.memo
export default React.memo(FilterPanel, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.filters) === JSON.stringify(nextProps.filters) &&
    prevProps.isLoading === nextProps.isLoading &&
    JSON.stringify(prevProps.filterOptions) === JSON.stringify(nextProps.filterOptions)
  );
});