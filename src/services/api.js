/**
 * API Service Layer - FIXED VERSION
 * 
 * Fixed price filter handling and parameter formatting
 */

import { API_CONFIG, debugLog } from '../constants/config';

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Base fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408, null);
    }
    throw error;
  }
}

/**
 * Build query string from parameters object
 * FIXED: Better handling of price parameters and arrays
 */
function buildQueryString(params) {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    // Skip null, undefined, or empty string values
    if (value === null || value === undefined || value === '') {
      return;
    }
    
    // Handle arrays - convert to comma-separated string
    if (Array.isArray(value)) {
      if (value.length > 0) {
        queryParams.append(key, value.join(','));
      }
    } 
    // Handle price fields specifically - ensure they're sent as numbers
    else if (key === 'min_price' || key === 'max_price') {
      // Convert to number and only add if it's a valid number
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        queryParams.append(key, numValue.toString());
      }
    }
    // Handle all other parameters
    else {
      queryParams.append(key, value.toString());
    }
  });
  
  return queryParams.toString();
}

/**
 * Fetch products from the API - FIXED VERSION
 */
export async function fetchProducts(params) {
  try {
    debugLog('Fetching products with params:', params);
    
    // Validate required parameters
    if (!params.taxonomy) {
      throw new ApiError('Taxonomy is required', 400, null);
    }
    
    // Clean and prepare parameters
    const cleanParams = {
      taxonomy: params.taxonomy,
      page: params.page || 1,
      per_page: params.per_page || API_CONFIG.DEFAULT_PER_PAGE,
      orderby: params.orderby || 'date',
      order: params.order || 'desc'
    };
    
    // Add search if present
    if (params.search && params.search.trim()) {
      cleanParams.search = params.search.trim();
    }
    
    // Add price filters - ensure they're properly formatted
    if (params.min_price !== undefined && params.min_price !== '') {
      const minPrice = parseFloat(params.min_price);
      if (!isNaN(minPrice) && minPrice >= 0) {
        cleanParams.min_price = minPrice;
      }
    }
    
    if (params.max_price !== undefined && params.max_price !== '') {
      const maxPrice = parseFloat(params.max_price);
      if (!isNaN(maxPrice) && maxPrice >= 0) {
        cleanParams.max_price = maxPrice;
      }
    }
    
    // Add all other filter parameters (pa_brand, pa_condition, etc.)
    Object.keys(params).forEach(key => {
      // Skip already handled parameters
      if (!['taxonomy', 'page', 'per_page', 'orderby', 'order', 'search', 'min_price', 'max_price'].includes(key)) {
        const value = params[key];
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value) && value.length > 0) {
            cleanParams[key] = value;
          } else if (!Array.isArray(value)) {
            cleanParams[key] = value;
          }
        }
      }
    });
    
    // Build the query string
    const queryString = buildQueryString(cleanParams);
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}?${queryString}`;
    
    debugLog('Clean params:', cleanParams);
    debugLog('Query string:', queryString);
    debugLog('Full API URL:', url);
    
    // Make the API request
    const response = await fetchWithTimeout(url);
    
    // Check if response is ok
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    // Parse the response
    const data = await response.json();
    
    debugLog('Products fetched successfully:', {
      count: data.products?.length,
      total: data.total
    });
    
    // Validate and format the response
    return {
      products: data.products || [],
      total: data.total || 0,
      totalPages: data.total_pages || 0,
      currentPage: data.current_page || cleanParams.page,
      perPage: data.per_page || cleanParams.per_page,
    };
  } catch (error) {
    debugLog('Error fetching products:', error);
    
    // Re-throw ApiError as is
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Wrap other errors
    throw new ApiError(
      'Failed to fetch products: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch available filter options for a taxonomy
 */
export async function fetchFilterOptions(taxonomy) {
  try {
    debugLog('Fetching filter options for taxonomy:', taxonomy);
    
    if (!taxonomy) {
      throw new ApiError('Taxonomy is required', 400, null);
    }
    
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FILTERS}?taxonomy=${taxonomy}`;
    
    debugLog('Filter API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Filter options fetched successfully:', {
      taxonomy: data.taxonomy,
      filterCount: Object.keys(data.filters || {}).length,
      filters: data.filters
    });
    
    // Log each filter's options count for debugging
    if (data.filters) {
      Object.entries(data.filters).forEach(([key, filter]) => {
        debugLog(`Filter ${key} (${filter.label}):`, {
          optionsCount: filter.options?.length || 0,
          options: filter.options?.map(o => o.name) || []
        });
      });
    }
    
    return {
      taxonomy: data.taxonomy || taxonomy,
      filters: data.filters || {},
      total: data.total || 0,
    };
  } catch (error) {
    debugLog('Error fetching filter options:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch filter options: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Test API connection
 */
export async function testApiConnection() {
  try {
    const testTaxonomy = 'equipment-buy';
    const response = await fetchFilterOptions(testTaxonomy);
    
    debugLog('API Connection Test Success:', response);
    
    return {
      success: true,
      message: 'API connection successful',
      data: response
    };
  } catch (error) {
    debugLog('API Connection Test Failed:', error);
    
    return {
      success: false,
      message: error.message,
      status: error.status
    };
  }
}

/**
 * Fetch all brands for a taxonomy
 */
export async function fetchBrands(taxonomy = 'equipment-buy') {
  try {
    debugLog('Fetching brands for taxonomy:', taxonomy);
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/brands?taxonomy=${taxonomy}`;
    
    debugLog('Brands API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Brands fetched successfully:', {
      count: data.brands?.length,
      total: data.total,
      taxonomy: data.taxonomy
    });
    
    return {
      brands: data.brands || [],
      total: data.total || 0,
      taxonomy: data.taxonomy || taxonomy,
    };
  } catch (error) {
    debugLog('Error fetching brands:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch brands: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch single brand details
 */
export async function fetchBrand(brandSlug, taxonomy = 'equipment-buy') {
  try {
    debugLog('Fetching brand details:', brandSlug, 'for taxonomy:', taxonomy);
    
    if (!brandSlug) {
      throw new ApiError('Brand slug is required', 400, null);
    }
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/brands/${brandSlug}?taxonomy=${taxonomy}`;
    
    debugLog('Brand API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Brand fetched successfully:', {
      name: data.name,
      slug: data.slug,
      count: data.count
    });
    
    return data;
  } catch (error) {
    debugLog('Error fetching brand:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch brand: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch all categories for a taxonomy with images
 */
export async function fetchCategories(taxonomy = 'equipment-buy') {
  try {
    debugLog('Fetching categories for taxonomy:', taxonomy);
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/categories?taxonomy=${taxonomy}`;
    
    debugLog('Categories API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Categories fetched successfully:', {
      count: data.categories?.length,
      total: data.total,
      taxonomy: data.taxonomy
    });
    
    return {
      categories: data.categories || [],
      total: data.total || 0,
      taxonomy: data.taxonomy || taxonomy,
    };
  } catch (error) {
    debugLog('Error fetching categories:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch categories: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch single category details with image
 */
export async function fetchCategory(categorySlug, taxonomy = 'equipment-buy') {
  try {
    debugLog('Fetching category details:', categorySlug, 'for taxonomy:', taxonomy);
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/categories/${categorySlug}?taxonomy=${taxonomy}`;
    
    debugLog('Category API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Category fetched successfully:', {
      name: data.name,
      slug: data.slug,
      count: data.count
    });
    
    return data;
  } catch (error) {
    debugLog('Error fetching category:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch category: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch all terms for a custom taxonomy with images
 */
export async function fetchTaxonomyTerms(taxonomy) {
  try {
    debugLog('Fetching taxonomy terms for:', taxonomy);
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/taxonomy-terms/${taxonomy}`;
    
    debugLog('Taxonomy terms API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Taxonomy terms fetched successfully:', {
      count: data.terms?.length,
      total: data.total,
      taxonomy: data.taxonomy
    });
    
    return {
      terms: data.terms || [],
      total: data.total || 0,
      taxonomy: data.taxonomy || taxonomy,
      taxonomy_label: data.taxonomy_label || taxonomy
    };
  } catch (error) {
    debugLog('Error fetching taxonomy terms:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch taxonomy terms: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch single taxonomy term details with image
 */
export async function fetchTaxonomyTerm(taxonomy, termSlug) {
  try {
    debugLog('Fetching taxonomy term details:', termSlug, 'for taxonomy:', taxonomy);
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/taxonomy-terms/${taxonomy}/${termSlug}`;
    
    debugLog('Taxonomy term API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const data = await response.json();
    
    debugLog('Taxonomy term fetched successfully:', {
      name: data.name,
      slug: data.slug,
      taxonomy: data.taxonomy,
      count: data.count
    });
    
    return data;
  } catch (error) {
    debugLog('Error fetching taxonomy term:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch taxonomy term: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch blog posts
 */
export async function fetchBlogPosts(params = {}) {
  try {
    const {
      per_page = 6,
      page = 1,
      orderby = 'date',
      order = 'desc',
      search = '',
      category = ''
    } = params;

    debugLog('Fetching blog posts with params:', params);
    
    const queryParams = new URLSearchParams();
    queryParams.append('per_page', per_page);
    queryParams.append('page', page);
    queryParams.append('orderby', orderby);
    queryParams.append('order', order);
    
    if (search) queryParams.append('search', search);
    if (category) queryParams.append('categories', category);
    
    const url = `${API_CONFIG.BASE_URL}/wp/v2/posts?${queryParams.toString()}&_embed`;
    
    debugLog('Blog API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const posts = await response.json();
    
    // Get total count from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    
    debugLog('Blog posts fetched successfully:', {
      count: posts.length,
      total: totalPosts,
      totalPages,
      currentPage: page,
      samplePost: posts[0] ? {
        id: posts[0].id,
        title: posts[0].title?.rendered,
        hasFeaturedImage: !!posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url,
        featuredImageUrl: posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url
      } : null
    });
    
    // Transform posts to include featured image and excerpt
    const transformedPosts = posts.map(post => {
      // Try multiple methods to get featured image
      let featuredImage = null;
      
      // Method 1: From _embedded (most reliable)
      if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
      }
      // Method 2: From featured_media ID (fallback)
      else if (post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
      }
      // Method 3: Try medium size image
      else if (post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
        featuredImage = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      }
      
      return {
        id: post.id,
        title: post.title?.rendered || '',
        excerpt: post.excerpt?.rendered || '',
        content: post.content?.rendered || '',
        slug: post.slug,
        date: post.date,
        modified: post.modified,
        featuredImage,
        categories: post._embedded?.['wp:term']?.[0] || [],
        tags: post._embedded?.['wp:term']?.[1] || [],
        author: post._embedded?.author?.[0] || {},
        link: post.link,
        status: post.status
      };
    });
    
    return {
      posts: transformedPosts,
      total: totalPosts,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages
    };
  } catch (error) {
    debugLog('Error fetching blog posts:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch blog posts: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch single blog post by slug
 */
export async function fetchBlogPost(slug) {
  try {
    debugLog('Fetching blog post:', slug);
    
    if (!slug) {
      throw new ApiError('Post slug is required', 400, null);
    }
    
    const url = `${API_CONFIG.BASE_URL}/wp/v2/posts?slug=${slug}&_embed`;
    
    debugLog('Single Blog Post API URL:', url);
    
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const posts = await response.json();
    
    if (!posts.length) {
      throw new ApiError('Blog post not found', 404, null);
    }
    
    const post = posts[0];
    
    debugLog('Blog post fetched successfully:', {
      id: post.id,
      title: post.title?.rendered,
      slug: post.slug
    });
    
    // Transform post data with featured image fallbacks
    let featuredImage = null;
    
    // Try multiple methods to get featured image
    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
    }
    else if (post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url) {
      featuredImage = post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    }
    else if (post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) {
      featuredImage = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    }
    
    const transformedPost = {
      id: post.id,
      title: post.title?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      content: post.content?.rendered || '',
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      featuredImage,
      categories: post._embedded?.['wp:term']?.[0] || [],
      tags: post._embedded?.['wp:term']?.[1] || [],
      author: post._embedded?.author?.[0] || {},
      link: post.link,
      status: post.status,
      seo: {
        title: post.yoast_head_json?.title || post.title?.rendered,
        description: post.yoast_head_json?.description || post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160),
      }
    };
    
    return transformedPost;
  } catch (error) {
    debugLog('Error fetching blog post:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch blog post: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Fetch single product by ID
 */
export async function fetchProduct(productId) {
  try {
    debugLog('Fetching product with ID:', productId);
    
    if (!productId) {
      throw new ApiError('Product ID is required', 400, null);
    }
    
    // Clean productId - remove GS prefix if present
    const actualProductId = productId.startsWith('GS') ? productId.substring(2) : productId;
    
    // Try the custom endpoint first
    let url = `${API_CONFIG.BASE_URL}/custom/v1/product/${actualProductId}`;
    
    debugLog('Product API URL:', url);
    
    let response = await fetchWithTimeout(url);
    
    // If custom endpoint fails, try the WooCommerce REST API
    if (!response.ok) {
      url = `${API_CONFIG.BASE_URL}/wc/v3/products/${actualProductId}`;
      debugLog('Trying WooCommerce API:', url);
      response = await fetchWithTimeout(url);
    }
    
    // If still not working, try WordPress REST API
    if (!response.ok) {
      url = `${API_CONFIG.BASE_URL}/wp/v2/product/${actualProductId}`;
      debugLog('Trying WordPress API:', url);
      response = await fetchWithTimeout(url);
    }
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const product = await response.json();
    
    debugLog('Product fetched successfully:', {
      id: product.id,
      name: product.name,
      slug: product.slug
    });
    
    return product;
  } catch (error) {
    debugLog('Error fetching product:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to fetch product: ' + error.message,
      500,
      null
    );
  }
}

/**
 * Submit enquiry form data
 */
export async function submitEnquiry(formData) {
  try {
    debugLog('Submitting enquiry:', formData);
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      throw new ApiError('Name, email, and phone are required', 400, null);
    }
    
    // Prepare the submission data - only send fields WordPress expects
    const submissionData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      interest: formData.interest || 'Buying',
      // category: formData.category || '',
      page_url: formData.page_url || (typeof window !== "undefined" ? window.location.href : "")
    };

    // Add source page information if provided
    if (formData.source_page) {
      submissionData.source_page = formData.source_page;
    }
    
    const url = `${API_CONFIG.BASE_URL}/custom/v1/enquiries`;
    
    debugLog('Enquiry submission URL:', url);
    debugLog('Submission data:', submissionData);
    
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData)
    });
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use default error message
      }
      
      throw new ApiError(errorMessage, response.status, errorData);
    }
    
    const result = await response.json();
    
    debugLog('Enquiry submitted successfully:', {
      id: result.id,
      status: result.status,
      message: result.message
    });
    
    return {
      success: true,
      id: result.id || null,
      message: result.message || 'Thank you for your enquiry! We\'ll get back to you within 1 hour.',
      data: result.data || null
    };
  } catch (error) {
    debugLog('Error submitting enquiry:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Failed to submit enquiry: ' + error.message,
      500,
      null
    );
  }
}

// Export the ApiError class for use in components
export { ApiError };