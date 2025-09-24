/**
 * Configuration Constants for the WooCommerce Equipment Filter App
 * This file contains all the configuration settings used throughout the application
 */

// API Configuration
export const API_CONFIG = {
  // Base URL for WordPress REST API
  BASE_URL: process.env.REACT_APP_WP_BASE || 'https://goldensparrowuae.com/wordpress/wp-json',
  
  // API Endpoints
  ENDPOINTS: {
    PRODUCTS: process.env.REACT_APP_PRODUCTS_ENDPOINT || '/custom/v1/products',
    FILTERS: process.env.REACT_APP_FILTERS_ENDPOINT || '/custom/v1/filters',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  
  // Default pagination settings
  DEFAULT_PER_PAGE: 12,
  
  // Cache time in milliseconds (5 minutes)
  CACHE_TIME: 5 * 60 * 1000,
};

// Taxonomy Configuration
// These should match your WordPress custom taxonomies
export const TAXONOMY_CONFIG = [
  { 
    value: 'equipment-buy', 
    label: 'Equipment for Sale',
    icon: '🛒',
    description: 'Browse equipment available for purchase'
  },
  { 
    value: 'equipment-rent', 
    label: 'Equipment for Rent',
    icon: '📦',
    description: 'Find equipment available for rental'
  },
];

// Sort Options Configuration
export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Name: A to Z' },
  { value: 'title-desc', label: 'Name: Z to A' },
  { value: 'popularity-desc', label: 'Most Popular' },
  { value: 'rating-desc', label: 'Highest Rated' },
];

// Filter Configuration
// These should match your WooCommerce product attributes
export const FILTER_ATTRIBUTES = {
  'pa_availability': { label: 'Availability', type: 'checkbox' },
  'pa_brand': { label: 'Brand', type: 'checkbox' },
  'product_cat': { label: 'Categories', type: 'checkbox' },
  'pa_condition': { label: 'Condition', type: 'checkbox' },
  'pa_equipment-type': { label: 'Equipment Type', type: 'checkbox' },
  'pa_industry': { label: 'Industry', type: 'checkbox' },
  'pa_model': { label: 'Model', type: 'checkbox' },
  'pa_sales-method': { label: 'Sales Method', type: 'checkbox' },
  'pa_year-of-manufacture': { label: 'Year of Manufacture', type: 'checkbox' },
  'pa_operating-weight': { label: 'Operating Weight', type: 'checkbox' },
};

// UI Configuration
export const UI_CONFIG = {
  // Number of skeleton cards to show while loading
  SKELETON_CARDS: 6,
  
  // Debounce delay for search input (milliseconds)
  SEARCH_DEBOUNCE: 500,
  
  // Maximum number of filter options to show before adding scroll
  MAX_FILTER_OPTIONS_VISIBLE: 5,
  
  // Animation durations
  ANIMATION_DURATION: 300,
};

// Debug Mode
export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE === 'true';

// Helper function to log debug messages
export const debugLog = (message, data = null) => {
  if (DEBUG_MODE) {
    console.log(`[WooFilter Debug] ${message}`, data);
  }
};