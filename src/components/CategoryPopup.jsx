/**
 * CategoryPopup Component - Fixed Version
 * Displays hierarchical category tree for Sales and Rentals
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, Package, Loader } from 'lucide-react';
import { buildHierarchy } from '../utils/buildHierarchy';
import { debugLog } from '../constants/config';

const WP_API_BASE = process.env.REACT_APP_WP_BASE || 'https://goldensparrowuae.com/wordpress/wp-json';

export default function CategoryPopup({ isOpen, onClose, onSelectCategory }) {
  const [activeTab, setActiveTab] = useState('sales');
  const [salesCategories, setSalesCategories] = useState([]);
  const [rentalCategories, setRentalCategories] = useState([]);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingRentals, setLoadingRentals] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch Sales categories
  useEffect(() => {
    if (isOpen && salesCategories.length === 0) {
      fetchSalesCategories();
    }
  }, [isOpen]);

  // Fetch Rental categories
  useEffect(() => {
    if (isOpen && activeTab === 'rentals' && rentalCategories.length === 0) {
      fetchRentalCategories();
    }
  }, [isOpen, activeTab]);

  const fetchSalesCategories = async () => {
    setLoadingSales(true);
    setError(null);
    try {
      const response = await fetch(`${WP_API_BASE}/wp/v2/equipment-buy?per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch sales categories');
      const data = await response.json();
      const hierarchy = buildHierarchy(data);
      setSalesCategories(hierarchy);
    } catch (err) {
      debugLog('Error fetching sales categories:', err);
      setError('Failed to load sales categories');
    } finally {
      setLoadingSales(false);
    }
  };

  const fetchRentalCategories = async () => {
    setLoadingRentals(true);
    setError(null);
    try {
      const response = await fetch(`${WP_API_BASE}/wp/v2/equipment-rent?per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch rental categories');
      const data = await response.json();
      const hierarchy = buildHierarchy(data);
      setRentalCategories(hierarchy);
    } catch (err) {
      debugLog('Error fetching rental categories:', err);
      setError('Failed to load rental categories');
    } finally {
      setLoadingRentals(false);
    }
  };

  const currentTree = useMemo(
    () => (activeTab === 'sales' ? salesCategories : rentalCategories),
    [activeTab, salesCategories, rentalCategories]
  );

  const currentLoading = activeTab === 'sales' ? loadingSales : loadingRentals;

  if (!isOpen) return null;

  const handleSelect = (node) => {
    const taxonomy = activeTab === 'sales' ? 'equipment-buy' : 'equipment-rent';
    
    // Call callback if provided
    if (onSelectCategory) {
      onSelectCategory({
        taxonomy,
        termId: node.id,
        termSlug: node.slug,
        name: node.name,
      });
    }
    
    // Navigate to products page with selected category
    navigate(`/products?taxonomy=${taxonomy}&term=${node.slug}&termName=${encodeURIComponent(node.name)}`);
    
    // Close popup immediately when category is selected
    onClose?.();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-start pt-16 px-4 pointer-events-none"
    >
      <style>{`
        .collapse-wrap {
          overflow: hidden;
          transition: max-height 240ms ease-in-out;
        }
        .chev {
          transition: transform 180ms ease;
        }
        .chev-open {
          transform: rotate(90deg);
        }
      `}</style>

      <div 
        className="bg-white w-full max-w-4xl rounded-xl shadow-elegant overflow-hidden pointer-events-auto"
        data-popup-container
      >
        {/* Header */}
        <div className="bg-[#1A1A1A] text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold font-display">Browse All Categories</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-neutral-50 border-b">
          <div className="flex">
            <button
              className={`flex-1 px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'sales'
                  ? 'bg-white text-black border-b-2 border-black'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              <span className="flex items-center justify-center gap-2">
                {/* <Package className="w-5 h-5" /> */}
                Equipment for Sale
              </span>
            </button>
            <button
              className={`flex-1 px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'rentals'
                  ? 'bg-white text-black border-b-2 border-black'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
              onClick={() => setActiveTab('rentals')}
            >
              <span className="flex items-center justify-center gap-2">
                {/* <Package className="w-5 h-5" /> */}
                Equipment for Rent
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {error ? (
            <div className="text-red-600 text-center py-8">
              <p>{error}</p>
              <button 
                onClick={activeTab === 'sales' ? fetchSalesCategories : fetchRentalCategories}
                className="mt-4 px-4 py-2 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : currentLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-black" />
              <span className="ml-3 text-neutral-600">Loading categories...</span>
            </div>
          ) : currentTree.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <Package className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
              <p>No categories found</p>
            </div>
          ) : (
            <CategoryTree
              categories={currentTree}
              onSelect={handleSelect}
              defaultOpenDepth={0}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Collapsible Tree Component ---------- */

function CategoryTree({ categories, onSelect, defaultOpenDepth = 0 }) {
  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <CategoryNode
          key={cat.id}
          category={cat}
          depth={0}
          defaultOpenDepth={defaultOpenDepth}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function CategoryNode({ category, depth, defaultOpenDepth, onSelect }) {
  const [isOpen, setIsOpen] = useState(depth <= defaultOpenDepth);

  const hasChildren = Array.isArray(category.children) && category.children.length > 0;

  const toggle = (e) => {
    e.stopPropagation();
    if (hasChildren) setIsOpen((v) => !v);
  };

  const onClickLabel = (e) => {
    e.stopPropagation();
    onSelect?.(category);
  };

  const maxH = isOpen ? '999px' : '0px';

  return (
    <li>
      <div 
        className={`
          flex items-center py-2 px-3 rounded-xl cursor-pointer
          hover:bg-neutral-50 transition-colors
          ${depth === 0 ? 'font-semibold' : ''}
        `}
      >
        {/* Chevron */}
        {hasChildren ? (
          <button
            className={`chev mr-2 text-neutral-400 hover:text-neutral-600 p-1 ${
              isOpen ? 'chev-open' : ''
            }`}
            onClick={toggle}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <span className="w-7 mr-2" />
        )}

        {/* Label */}
        <button
          onClick={onClickLabel}
          className="flex-1 text-left hover:transition-colors"
          title={`View ${category.name} products`}
        >
          <span>{category.name}</span>
          {category.count > 0 && (
            <span className="ml-2 text-xs text-neutral-500"></span>
          )}
        </button>
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className="ml-6 border-l-2 border-neutral-100 collapse-wrap"
          style={{ maxHeight: maxH }}
        >
          <ul className="pl-4 mt-1 space-y-1">
            {category.children.map((child) => (
              <CategoryNode
                key={child.id}
                category={child}
                depth={depth + 1}
                defaultOpenDepth={defaultOpenDepth}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}