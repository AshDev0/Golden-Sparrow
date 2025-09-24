// hooks/useDynamicFilters.js
import { useState, useEffect } from 'react';
import { fetchFilterOptions } from '../services/api';
import { debugLog } from '../constants/config';

export default function useDynamicFilters(taxonomy) {
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!taxonomy) {
      setFilterOptions(null);
      setLoading(false);
      return;
    }

    const loadFilterOptions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        debugLog(`Loading filter options for taxonomy: ${taxonomy}`);
        const options = await fetchFilterOptions(taxonomy);
        debugLog('Filter options received:', options);
        
        setFilterOptions(options);
      } catch (err) {
        debugLog('Error loading filter options:', err);
        setError(err.message || 'Failed to load filter options');
        setFilterOptions(null);
      } finally {
        setLoading(false);
      }
    };

    loadFilterOptions();
  }, [taxonomy]);

  return {
    filterOptions,
    loading,
    error,
    // Helper function to check if filters are available
    hasFilters: filterOptions?.filters && Object.keys(filterOptions.filters).length > 0,
    // Helper to get filter count
    filterCount: filterOptions?.filters ? Object.keys(filterOptions.filters).length : 0,
    // Helper to get specific filter options
    getFilterOptions: (filterTaxonomy) => {
      return filterOptions?.filters?.[filterTaxonomy]?.options || [];
    }
  };
}