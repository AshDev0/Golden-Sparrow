# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based WooCommerce product filtering system for industrial equipment (forklifts, construction equipment, etc.). The application provides a responsive, SEO-friendly interface for browsing equipment available for sale or rent with advanced filtering capabilities.

## Development Commands

### Essential Commands
- `npm start` - Start development server (localhost:3000)
- `npm run build` - Build for production 
- `npm run build:prod` - Production build without source maps
- `npm test` - Run tests in watch mode
- `npm run analyze` - Analyze bundle size with source-map-explorer
- `npm run sitemap` - Generate sitemap (requires scripts/generate-sitemap.js)

### Testing & Development
- Tests use React Testing Library and Jest (via react-scripts)
- ESLint configuration extends react-app standards
- Development proxy points to `https://buyforklifttruck.com`

## Architecture Overview

### Core Structure
- **React Router** handles navigation with SEO-optimized routing
- **TanStack Query (@tanstack/react-query)** manages API state and caching
- **Tailwind CSS** for styling with custom configuration
- **React Helmet Async** for dynamic SEO meta tags

### Key Components Architecture
- `ProductListingPage.jsx` - Main listing page with URL parameter handling
- `ProductListing.jsx` - Core filtering orchestration component
- `FiltersPanel.jsx` - Dynamic filter rendering based on API responses
- `ProductCard.jsx` - Reusable product display component
- `api.js` - Centralized API service layer with error handling

### State Management Pattern
The app uses URL-driven state management where:
- URL parameters drive component state (taxonomy, filters, pagination)
- Components respond to URL changes without manual navigation
- Search and filter state is debounced for performance
- Filter options are dynamically fetched based on selected taxonomy

### API Integration
- WordPress REST API integration via custom endpoints
- Base URL: `https://buyforklifttruck.com/wp-json`
- Endpoints: `/custom/v1/products` and `/custom/v1/filters`
- Built-in timeout handling (10s default) and error boundaries
- Price filter handling with proper number formatting

### Key Configuration
- `src/constants/config.js` - Central configuration for API, UI, and taxonomies
- Taxonomy types: `equipment-buy` and `equipment-rent`
- Filter attributes map to WooCommerce product attributes (pa_brand, pa_condition, etc.)
- Debug mode available via `REACT_APP_DEBUG_MODE=true`

## Important Patterns

### URL Parameter Handling
Components watch `searchParams` changes and update state automatically. When modifying filters or navigation, always update URL parameters to maintain state consistency.

### Debounced Search
Search inputs use custom `useDebounce` hook (500ms delay) to prevent excessive API calls.

### Error Handling
- Custom `ApiError` class for structured error responses
- Components display user-friendly error messages
- Fallback loading states and skeleton components

### Responsive Design
- Mobile-first Tailwind CSS approach
- Grid/list view toggles for different screen sizes
- Accessible navigation with skip-to-content links

## File Organization
- `/components` - Reusable UI components
- `/pages` - Route-level page components  
- `/services` - API and external service integrations
- `/hooks` - Custom React hooks
- `/constants` - Configuration and constant values
- `/utils` - Utility functions

## Brand Management System

### Brand Pages Implementation
- `/brands` - Simple brand grid with icon and name only
- Click brand → Direct navigation to ProductListingPage with brand filter applied
- Clean, minimal design focused on brand selection

### Brand API Endpoints
- `GET /custom/v1/brands` - Fetch all brands for a taxonomy (with fallback to filter endpoint)
- Brand data includes: name, slug for filtering

### Brand Components
- `BrandCard.jsx` - Minimal brand display (icon + name only)
- `BrandsPage.jsx` - Clean brand grid with search and taxonomy filtering

### Integration Notes
- Direct navigation: Brand click → `/products?taxonomy=equipment-buy&pa_brand=brand-slug`
- Uses existing `pa_brand` taxonomy for filtering
- Maintains URL-driven state pattern for seamless integration
- Responsive grid: 2 cols mobile → 6 cols desktop
- TanStack Query caching with fallback to existing filter system

When working on this codebase, always consider the URL-driven state pattern and ensure filter changes are properly reflected in the browser URL for SEO and user experience.