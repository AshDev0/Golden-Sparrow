/**
 * SEO Component
 * Manages meta tags for better SEO
 * Uses react-helmet-async for dynamic meta tag management
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Equipment Store - Buy & Rent Industrial Equipment',
  description = 'Find the best deals on industrial equipment. Buy, rent, or lease excavators, bulldozers, cranes, and more.',
  keywords = 'industrial equipment, construction equipment, equipment rental, equipment sale, excavators, bulldozers, cranes',
  image = '/default-og-image.jpg',
  url = window.location.href,
  type = 'website'
}) => {
  const siteTitle = 'Equipment Store';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": siteTitle,
    "description": description,
    "url": url,
    "logo": `${window.location.origin}/logo.png`,
    // Only include social links if they exist in environment variables
    ...(process.env.REACT_APP_FACEBOOK_URL || process.env.REACT_APP_TWITTER_URL || process.env.REACT_APP_LINKEDIN_URL ? {
      "sameAs": [
        process.env.REACT_APP_FACEBOOK_URL,
        process.env.REACT_APP_TWITTER_URL,
        process.env.REACT_APP_LINKEDIN_URL
      ].filter(Boolean) // Remove any undefined values
    } : {}),
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={siteTitle} />
      <meta name="publisher" content={siteTitle} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;