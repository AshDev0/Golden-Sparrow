/**
 * Main App Component with React Router and SEO
 * Fully responsive and SEO-friendly setup
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ProductListingPage from './pages/ProductListingPage';
import HomePage from './pages/HomePage';
//import { CartPage } from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryListing from './pages/CategoryListing';
import CategoriesPage from './pages/CategoriesPage';
import BrandsPage from './pages/BrandsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ForkliftsPage from './static-page/ForkliftsPage';
import SkidSteerPage from './static-page/SkidSteerPage';
import TowerLightPage from './static-page/TowerLightPage';
import AirCompressorPage from './static-page/AirCompressorPage';
import TeleHandlerPage from './static-page/TeleHandlerPage';
import ExcavatorPage from './static-page/ExcavatorPage';
import BackhoePage from './static-page/BackhoePage';
import WheelLoaderPage from './static-page/WheelLoaderPage';
import CranePage from './static-page/CranePage';
import BulldozersPage from './static-page/BulldozersPage';
import ArialLiftsPage from './static-page/ArialLiftsPage';
import ContactPage from './pages/ContactPage';
import ThankYouPage from './pages/ThankYouPage';
import AboutPage from './pages/AboutPage';
// BrandDetailPage removed - brands now go directly to ProductListingPage
import { NotFoundPage } from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';
import EnquiryPopup from './components/EnquiryPopup';
import usePopupState from './hooks/usePopupState';
import './App.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import StaticNavbar from './components/StaticNavbar';

// Lazy loading for better performance
//const LazyAttachmentsPage = React.lazy(() => import('./pages/AttachmentsPage').catch(() => ({ default: ComingSoonPage })));
//const LazyBrandsPage = React.lazy(() => import('./pages/BrandsPage').catch(() => ({ default: ComingSoonPage })));

// Component to conditionally render Navbar based on page type
function ConditionalNavbars() {
  const location = useLocation();

  // Define static page routes where StaticNavbar should appear
  const staticPageRoutes = [
    '/forklifts',
    '/skid-steer',
    '/lighting-towers',
    '/air-compressors',
    '/telehandlers',
    '/excavators',
    '/backhoe-loaders',
    '/wheel-loaders',
    '/all-terrain-cranes',
    '/bulldozers',
    '/arial-lifts'
  ];

  // Check if current path is a static page
  const isStaticPage = staticPageRoutes.includes(location.pathname);

  return (
    <>
      {/* Regular Navbar - appears on all pages EXCEPT static pages */}
      {!isStaticPage && <Navbar />}
      {/* Static Navbar - appears ONLY on static pages */}
      {isStaticPage && <StaticNavbar />}
    </>
  );
}

function App() {
  // Initialize popup state with 2 second delay
  const { isPopupOpen, closePopup } = usePopupState({
    autoShow: true,
    delay: 2000,
    showOnce: false // Set to true if you want popup to show only once per session
  });

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          {/* Conditional Navigation Bars */}
          <ConditionalNavbars />
          
          {/* Main Content Area */}
          <main id="main-content" className="min-h-screen">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={
                <>
                  <SEO 
                    title="Equipment Store - Buy & Rent Industrial Equipment"
                    description="Find the best deals on industrial equipment. Buy, rent, or lease excavators, bulldozers, cranes, and more."
                  />
                  <HomePage />
                </>
              } />
              
              {/* Products Listing Page */}
              <Route path="/products" element={
                <>
                  <SEO 
                    title="Browse Equipment - For Sale & Rent"
                    description="Browse our extensive collection of industrial equipment for sale and rent. Filter by brand, condition, and more."
                  />
                  <ProductListingPage />
                </>
              } />
              
              {/* Categories Listing Page */}
              <Route path="/categories" element={
                <>
                  <SEO 
                    title="Equipment Categories - Browse by Type"
                    description="Explore equipment categories and find exactly what you need. Browse organized listings of construction and industrial equipment."
                  />
                  <CategoryListing />
                </>
              } />
              
              {/* Product Detail Page */}
              <Route path="/product/:productSlug/:productId" element={
                <>
                  <SEO title="Product Details" />
                  <ProductDetailPage />
                </>
              } />
              
              {/* Cart Page */}
              {/* <Route path="/cart" element={
                <>
                  <SEO 
                    title="Shopping Cart"
                    description="Review your selected equipment and proceed to checkout."
                  />
                  <CartPage />
                </>
              } /> */}
              
              {/* Other Pages */}
              <Route path="/attachments" element={
                <>
                  <SEO title="Equipment Attachments" />
                  <ComingSoonPage title="Equipment Attachments" />
                </>
              } />
              
              <Route path="/brands" element={
                <>
                  <SEO title="Equipment Brands" />
                  <BrandsPage />
                </>
              } />

              {/* Categories Routes */}
              <Route path="/categories" element={
                <>
                  <SEO 
                    title="Equipment Categories - Buy & Rent Industrial Equipment"
                    description="Browse our comprehensive equipment categories. Find forklifts, excavators, cranes, and more industrial equipment for sale and rent."
                  />
                  <CategoriesPage />
                </>
              } />
              
              {/* Blog Routes */}
              <Route path="/blog" element={
                <>
                  <SEO 
                    title="Blog - Equipment News & Insights"
                    description="Stay updated with the latest industry trends, equipment insights, and news in the construction and industrial equipment sector."
                  />
                  <BlogPage />
                </>
              } />
              
              <Route path="/blog/:slug" element={
                <>
                  <BlogDetailPage />
                </>
              } />
              
              {/* Static Pages */}
              <Route path="/forklifts" element={
                <>
                  <SEO 
                    title="Forklifts for Sale & Rent - Industrial Equipment"
                    description="Premium diesel & electric forklifts from 2 ton to 52 ton capacity. Quality equipment for warehouses, construction, and logistics."
                  />
                  <ForkliftsPage />
                </>
              } />

              <Route path="/skid-steer" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <SkidSteerPage />
                </>
              } />

              <Route path="/lighting-towers" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <TowerLightPage />
                </>
              } />

              <Route path="/air-compressors" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <AirCompressorPage />
                </>
              } />


              <Route path="/telehandlers" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <TeleHandlerPage />
                </>
              } />

              <Route path="/excavators" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <ExcavatorPage />
                </>
              } />


              <Route path="/backhoe-loaders" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <BackhoePage />
                </>
              } />


              <Route path="/wheel-loaders" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <WheelLoaderPage />
                </>
              } />


              <Route path="/all-terrain-cranes" element={
                <>
                  <SEO 
                    title=""
                    description=""
                  />
                  <CranePage />
                </>
              } />


              <Route path='/bulldozers' element={
                <>
                <SEO title='' description=''/>
                <BulldozersPage />
                </>
              } />


              <Route path='/arial-lifts' element={
                <>
                <SEO title='' description=''/>
                <ArialLiftsPage />
                </>
              } />
              
              <Route path="/parts" element={
                <>
                  <SEO title="Spare Parts" />
                  <ComingSoonPage title="Spare Parts" />
                </>
              } />
              
              <Route path="/services" element={
                <>
                  <SEO title="Services" />
                  <ComingSoonPage title="Services" />
                </>
              } />
              
              <Route path="/about-us" element={
                <>
                  <SEO title="About Us" />
                  <AboutPage />
                </>
              } />

              <Route path='/privacy-policy' element={
                <>
                <SEO title='Privacy Policy' />
                <PrivacyPolicy />
                </>
              } />

              <Route path='/terms-and-conditions' element={
                <>
                <SEO title='Terms And Conditions' />
                <TermsAndConditions />
                </>
              } />
              
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Thank You Page */}
              <Route path="/thank-you" element={
                <>
                  <SEO 
                    title="Thank You - Golden Sparrow UAE"
                    description="Thank you for your enquiry. Our team will contact you shortly."
                  />
                  <ThankYouPage />
                </>
              } />
              
              {/* 404 Page */}
              <Route path="/404" element={
                <>
                  <SEO 
                    title="Page Not Found"
                    description="The page you're looking for doesn't exist."
                  />
                  <NotFoundPage />
                </>
              } />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />

          {/* Enquiry Popup */}
          <EnquiryPopup isOpen={isPopupOpen} onClose={closePopup} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

// Loading Page Component
function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  );
}

// Coming Soon Component for pages under development
function ComingSoonPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-800 mb-4">{title}</h1>
        <p className="text-neutral-600">This page is coming soon!</p>
      </div>
    </div>
  );
}


export default App;