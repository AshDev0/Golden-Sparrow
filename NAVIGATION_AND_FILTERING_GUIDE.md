# Navigation and Filtering System Guide

## Overview

The Buy Forklift Truck application implements a robust navigation and filtering system that provides seamless user experience with URL-driven state management, persistent filters, and responsive design.

## System Architecture

### 1. URL-Driven State Management
- **URL Parameters Control State**: All filter states, pagination, and navigation are reflected in the URL
- **Browser Navigation Support**: Back/forward buttons work correctly
- **Bookmarkable URLs**: Users can bookmark and share filtered results
- **SEO Friendly**: Search engines can crawl different filtered states

### 2. Key Components

#### ProductListingPage.jsx
- **Main Controller**: Orchestrates filtering, pagination, and product display
- **URL Synchronization**: Watches URL changes and updates component state
- **Debounced Search**: Prevents excessive API calls during search input
- **State Management**: Manages filters, sort options, and pagination

#### NavBar.jsx  
- **Navigation Hub**: Central navigation with filter-aware links
- **Taxonomy Navigation**: Supports equipment-buy and equipment-rent taxonomies
- **Brand/Condition Filters**: Pre-configured navigation with specific filters
- **Mobile Responsive**: Collapsible mobile menu

#### FiltersPanel.jsx
- **Dynamic Filtering**: Renders filters based on API response
- **Multiple Filter Types**: Checkbox, search, price range filters
- **Real-time Updates**: Updates URL parameters immediately on change

## Navigation System

### Primary Navigation Routes

```
/                     - Home page
/products             - Main product listing (default: equipment-buy)
/product/:productId   - Product detail page
/attachments         - Equipment attachments (Coming Soon)
/brands              - Equipment brands (Coming Soon) 
/parts               - Spare parts (Coming Soon)
/services            - Services (Coming Soon)
/about               - About page (Coming Soon)
/contact             - Contact page (Coming Soon)
```

### Filter Navigation Examples

```
/products?taxonomy=equipment-buy
/products?taxonomy=equipment-rent  
/products?taxonomy=equipment-buy&pa_condition=new
/products?taxonomy=equipment-buy&pa_condition=used,like-new
/products?taxonomy=equipment-buy&pa_brand=jcb&pa_condition=new
```

### Navigation Functions

#### navigateWithFilters() in NavBar.jsx
```javascript
const navigateWithFilters = (taxonomy, filters = {}, label = '') => {
  const params = new URLSearchParams();
  params.set('taxonomy', taxonomy);
  params.set('page', '1');
  
  // Add filters
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(','));
    } else if (!Array.isArray(value)) {
      params.set(key, String(value));
    }
  });
  
  navigate(`/products?${params.toString()}`);
};
```

## Filtering System

### Filter Types

1. **Taxonomy Filters**
   - `equipment-buy`: Equipment for sale
   - `equipment-rent`: Equipment for rent

2. **Attribute Filters** (WooCommerce product attributes)
   - `pa_brand`: Equipment brand (JCB, Caterpillar, Komatsu, etc.)
   - `pa_condition`: Equipment condition (new, used, like-new)
   - `pa_equipment-type`: Type of equipment (excavator, bulldozer, etc.)
   - `pa_industry`: Industry category
   - `pa_model`: Equipment model
   - `pa_year-of-manufacture`: Manufacturing year
   - `pa_operating-weight`: Operating weight range

3. **Special Filters**
   - `search`: Text search across product titles and descriptions
   - `min_price`: Minimum price filter
   - `max_price`: Maximum price filter
   - `page`: Current page number
   - `sort`: Sort field (date, price, title, etc.)
   - `order`: Sort order (asc, desc)

### Filter State Management

#### URL Parameter Parsing
```javascript
// Parse filters from URL
const newFilters = {};
const reservedParams = ['taxonomy', 'term', 'termName', 'label', 'page', 'sort', 'order'];

searchParams.forEach((value, key) => {
  if (!reservedParams.includes(key)) {
    if (value && value.includes(',')) {
      newFilters[key] = value.split(',').map(v => v.trim()).filter(v => v);
    } else if (value) {
      newFilters[key] = value;
    }
  }
});
```

#### Filter Updates
```javascript
const handleFilterChange = (newFilters) => {
  const params = new URLSearchParams(searchParams);
  
  // Remove existing filter params
  const keysToRemove = [];
  params.forEach((value, key) => {
    if (!reservedParams.includes(key)) {
      keysToRemove.push(key);
    }
  });
  keysToRemove.forEach(key => params.delete(key));
  
  // Add new filters
  Object.entries(newFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(','));
    } else if (value !== null && value !== undefined && value !== '') {
      params.set(key, String(value));
    }
  });
  
  // Reset to page 1
  params.set('page', '1');
  
  setSearchParams(params);
};
```

## API Integration

### Endpoints
- **Products API**: `/custom/v1/products` - Fetch filtered products
- **Filters API**: `/custom/v1/filters` - Get available filter options

### Request Parameters
```javascript
{
  taxonomy: 'equipment-buy',
  page: 1,
  per_page: 12,
  orderby: 'date',
  order: 'desc',
  search: 'excavator',
  min_price: 10000,
  max_price: 50000,
  pa_brand: ['jcb', 'caterpillar'],
  pa_condition: ['new']
}
```

## Error Handling

### API Error Handling
- **Timeout Protection**: 10-second timeout on API requests
- **Custom ApiError Class**: Structured error handling
- **User-Friendly Messages**: Display readable error messages
- **Fallback States**: Graceful degradation when API fails

### Error Boundary
- **React Error Boundary**: Catches JavaScript errors in components
- **Retry Functionality**: Users can retry failed operations
- **Error Logging**: Errors logged to console (production: external service)

## Performance Optimizations

### Debouncing
- **Search Input**: 500ms debounce to prevent excessive API calls
- **Filter Changes**: Immediate URL updates with debounced API calls

### Caching
- **React Query**: Built-in caching for API responses
- **URL State**: URL serves as cache key for filter states

### Loading States
- **Skeleton Components**: Show loading placeholders
- **Progressive Loading**: Filters and products load independently

## Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layout, collapsed filters
- **Tablet**: 768px - 1024px - Adjusted grid layouts
- **Desktop**: > 1024px - Full grid layout, sidebar filters

### Mobile Optimizations
- **Collapsible Mobile Menu**: Hamburger menu for navigation
- **Touch-Friendly**: Large tap targets for filters and buttons
- **Swipe Navigation**: Touch-friendly product cards

## Troubleshooting

### Common Issues

1. **Filters Not Working**
   - Check API endpoint configuration in `config.js`
   - Verify filter attribute names match WooCommerce setup
   - Check browser console for API errors

2. **Navigation Broken**
   - Ensure all routes are defined in `App.js`
   - Check for missing components in navigation links
   - Verify React Router configuration

3. **URL State Issues**
   - Check `useSearchParams` implementation
   - Verify URL parameter parsing logic
   - Ensure all state changes update URL

### Debug Mode
Enable debug mode by setting `REACT_APP_DEBUG_MODE=true`:
```javascript
// Logs detailed information about:
- URL parameter changes
- API requests and responses  
- Filter state updates
- Component re-renders
```

## Best Practices

### URL Parameters
- Use descriptive parameter names (`pa_brand` not `b`)
- Handle arrays with comma separation (`brand1,brand2`)
- Always validate and sanitize parameters
- Provide defaults for missing parameters

### State Management
- Keep URL as single source of truth
- Update URL for all navigational state changes
- Use debouncing for performance-sensitive updates
- Handle edge cases (empty arrays, invalid values)

### Error Handling
- Always provide fallback states
- Display user-friendly error messages
- Log errors for debugging
- Allow retry mechanisms

## Future Enhancements

### Planned Features
- **Advanced Filtering**: Date ranges, location-based filters
- **Search Suggestions**: Autocomplete search functionality
- **Filter Presets**: Save and load filter combinations
- **Comparison Tool**: Compare multiple products
- **Wishlist**: Save products for later

### Performance Improvements
- **Virtual Scrolling**: For large product lists
- **Image Optimization**: Lazy loading and WebP support
- **CDN Integration**: Static asset optimization
- **Service Worker**: Offline functionality

---

This documentation provides a comprehensive guide to the navigation and filtering system. For specific implementation details, refer to the individual component files and their inline documentation.