/**
 * CategoriesPage Component
 * Display categories with images for different taxonomies
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

// Components
import CategoryCard, { CategoryCardSkeleton } from '../components/CategoryCard';
import ErrorBoundary from '../components/ErrorBoundary';

// Services
import { fetchCategories, fetchTaxonomyTerms } from '../services/api';

// Constants
import { DEBUG_MODE } from '../constants/config';

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const taxonomy = searchParams.get('taxonomy') || 'equipment-buy';
  const [searchTerm, setSearchTerm] = useState('');

  // Determine which API to use based on taxonomy
  const isCustomTaxonomy = ['equipment-buy', 'equipment-rent'].includes(taxonomy);

  // Query for categories/taxonomy terms
  const { 
    data, 
    isLoading, 
    error, 
    isError 
  } = useQuery({
    queryKey: ['categories', taxonomy],
    queryFn: () => {
      if (isCustomTaxonomy) {
        return fetchTaxonomyTerms(taxonomy);
      } else {
        return fetchCategories(taxonomy);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2
  });

  const categories = isCustomTaxonomy ? data?.terms || [] : data?.categories || [];
  const total = data?.total || 0;
  const taxonomyLabel = data?.taxonomy_label || taxonomy;

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get taxonomy display name
  const getTaxonomyDisplayName = (tax) => {
    const displayNames = {
      'equipment-buy': 'Equipment for Sale',
      'equipment-rent': 'Equipment for Rent',
      'product_cat': 'Product Categories'
    };
    return displayNames[tax] || taxonomyLabel;
  };

  // Get taxonomy description
  const getTaxonomyDescription = (tax) => {
    const descriptions = {
      'equipment-buy': 'Browse our equipment categories available for purchase',
      'equipment-rent': 'Explore equipment categories available for rent',
      'product_cat': 'Browse all product categories'
    };
    return descriptions[tax] || `Browse ${taxonomyLabel} categories`;
  };

  if (DEBUG_MODE) {
    console.log('CategoriesPage:', {
      taxonomy,
      isCustomTaxonomy,
      categoriesCount: categories.length,
      filteredCount: filteredCategories.length,
      total
    });
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{`${getTaxonomyDisplayName(taxonomy)} | goldensparrowuae.com`}</title>
        <meta name="description" content={getTaxonomyDescription(taxonomy)} />
        <meta property="og:title" content={`${getTaxonomyDisplayName(taxonomy)} | goldensparrowuae.com`} />
        <meta property="og:description" content={getTaxonomyDescription(taxonomy)} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {getTaxonomyDisplayName(taxonomy)}
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                {getTaxonomyDescription(taxonomy)}
              </p>
              
              {/* Search */}
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 text-neutral-800 bg-white rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 py-12">
          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              <p className="font-semibold">Error loading categories</p>
              <p className="text-sm">{error?.message || 'Something went wrong. Please try again later.'}</p>
            </div>
          )}

          {/* Results header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-semibold text-neutral-800">
                {searchTerm ? 'Search Results' : 'All Categories'}
              </h2>
              <p className="text-neutral-600">
                {isLoading ? (
                  'Loading categories...'
                ) : searchTerm ? (
                  `${filteredCategories.length} categories found for "${searchTerm}"`
                ) : (
                  `${categories.length} categories available`
                )}
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  taxonomy={taxonomy}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {searchTerm ? 'No categories found' : 'No categories available'}
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm 
                  ? `Try adjusting your search term "${searchTerm}"`
                  : 'Categories will appear here once they are added.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CategoriesPage;