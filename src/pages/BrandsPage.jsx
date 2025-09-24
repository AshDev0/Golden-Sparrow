/**
 * BrandsPage Component
 * Displays all available brands with filtering by taxonomy
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2, Grid, Search, AlertCircle } from 'lucide-react';
import { fetchBrands } from '../services/api';
import { TAXONOMY_CONFIG } from '../constants/config';
import BrandCard, { BrandCardSkeleton } from '../components/BrandCard';
import SEO from '../components/SEO';

export default function BrandsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taxonomy, setTaxonomy] = useState('equipment-buy');
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize taxonomy from URL
  useEffect(() => {
    const taxonomyFromUrl = searchParams.get('taxonomy') || 'equipment-buy';
    setTaxonomy(taxonomyFromUrl);
  }, [searchParams]);

  // Fetch brands using TanStack Query with fallback to filter options
  const {
    data: brandsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['brands', taxonomy],
    queryFn: async () => {
      try {
        // Try new brands endpoint first
        return await fetchBrands(taxonomy);
      } catch (error) {
        // Fallback to filter options if brands endpoint is not available
        const { fetchFilterOptions } = await import('../services/api');
        const filterData = await fetchFilterOptions(taxonomy);
        const brandFilter = filterData.filters?.pa_brand;
        
        if (brandFilter && brandFilter.options) {
          return {
            brands: brandFilter.options.map(option => ({
              id: `brand-${option.slug}`,
              name: option.name,
              slug: option.slug,
              description: '',
              count: option.count,
              url: `/brands/${option.slug}`,
              products_url: `/products?taxonomy=${taxonomy}&pa_brand=${option.slug}`,
              logo: '' // Will be empty in fallback mode, but structure is consistent
            })),
            total: brandFilter.options.reduce((sum, opt) => sum + opt.count, 0),
            taxonomy: taxonomy
          };
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Handle taxonomy change
  const handleTaxonomyChange = (newTaxonomy) => {
    setTaxonomy(newTaxonomy);
    setSearchParams({ taxonomy: newTaxonomy });
  };

  // Filter brands based on search term
  const filteredBrands = brandsData?.brands?.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Get current taxonomy config
  const currentTaxonomyConfig = TAXONOMY_CONFIG.find(t => t.value === taxonomy);

  return (
    <>
      <SEO 
        title={`Equipment Brands - ${currentTaxonomyConfig?.label || 'Browse All Brands'}`}
        description={`Discover top equipment brands for ${currentTaxonomyConfig?.label?.toLowerCase() || 'industrial equipment'}. Find products from leading manufacturers.`}
      />
      
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-accent-600 to-accent-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Building2 className="w-12 h-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-display font-bold">
                  Equipment Brands
                </h1>
              </div>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Discover products from leading equipment manufacturers worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Taxonomy Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-neutral-700">Browse:</label>
                <div className="flex gap-2">
                  {TAXONOMY_CONFIG.map((config) => (
                    <button
                      key={config.value}
                      onClick={() => handleTaxonomyChange(config.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        taxonomy === config.value
                          ? 'bg-accent-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {config.icon} {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-neutral-600" />
              <h2 className="text-xl font-display font-semibold text-neutral-800">
                {isLoading ? 'Loading brands...' : 
                 error ? 'Error loading brands' :
                 `${filteredBrands.length} Brand${filteredBrands.length !== 1 ? 's' : ''}`}
              </h2>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Failed to Load Brands
              </h3>
              <p className="text-neutral-600 mb-4">
                {error.message || 'Something went wrong while fetching brands.'}
              </p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <BrandCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Brands Grid */}
          {!isLoading && !error && (
            <>
              {filteredBrands.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {filteredBrands.map((brand) => (
                    <BrandCard 
                      key={brand.id} 
                      brand={brand} 
                      taxonomy={taxonomy}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    No Brands Found
                  </h3>
                  <p className="text-neutral-600">
                    {searchTerm 
                      ? `No brands match "${searchTerm}". Try adjusting your search.`
                      : 'No brands available for the selected category.'
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-4 py-2 text-accent-600 hover:text-accent-700 font-medium"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}