// src/components/RelatedProducts.jsx (Improved Version)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './ProductCard';
import { Package } from 'lucide-react';

const RelatedProducts = ({ productIds = [], currentProductId, taxonomy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (productIds.length > 0) {
      fetchRelatedProducts();
    }
  }, [productIds, currentProductId]);

  const fetchRelatedProducts = async () => {
    setLoading(true);
    
    try {
      // Filter out current product and limit to 5 IDs
      const filteredIds = productIds
        .filter(id => id !== currentProductId)
        .slice(0, 5);
      
      if (filteredIds.length === 0) {
        setProducts([]);
        return;
      }
      
      // Use batch endpoint for better performance
      const response = await fetch(
        `${process.env.REACT_APP_WP_BASE}/custom/v1/products/batch?ids=${filteredIds.join(',')}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Failed to fetch related products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    // Navigate to product detail page with GS prefix and slug
    navigate(`/product/${product.slug || 'product'}/GS${product.id}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Don't render if no products
  if (!productIds.length || productIds.length === 0) return null;

  return (
    <section className="">
      <div className="flex justify-between items-center mb-6">
        <div className='inline-flex items-center space-x-3'>
            <Package className="w-6 h-6 font-display font-bold text-neutral-900" />
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Related Products
                </h2>
        </div>
        {products.length > 4 && (
          <button 
            onClick={() => navigate(`/products?taxonomy=${taxonomy}`)}
            className="text-accent-600 hover:text-accent-700 text-sm font-medium"
          >
            View All →
          </button>
        )}
        
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} viewMode="grid" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="transform transition-transform hover:scale-105">
              <ProductCard
                product={product}
                taxonomy={taxonomy}
                viewMode="grid"
                onClick={() => handleProductClick(product)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-500 text-center py-8">No related products found</p>
      )}
    </section>
  );
};

export default RelatedProducts;