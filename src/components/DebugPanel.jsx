/**
 * Debug Panel Component
 * 
 * Temporary component to help debug API issues
 * Add this to your ProductListing component to see what's happening
 */

import React, { useState } from 'react';
import { testApiConnection } from '../services/api';
import { API_CONFIG } from '../constants/config';

const DebugPanel = ({ filters, filterOptions, taxonomy }) => {
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  
  // Test API Connection
  const handleTestConnection = async () => {
    setTestLoading(true);
    const result = await testApiConnection();
    setTestResult(result);
    setTestLoading(false);
  };
  
  // Test specific endpoints
  const testEndpoint = async (endpoint) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);
      const data = await response.json();
      console.log(`Test ${endpoint}:`, data);
      alert(`Check console for ${endpoint} response`);
    } catch (error) {
      console.error(`Error testing ${endpoint}:`, error);
      alert(`Error: ${error.message}`);
    }
  };
  
  // Test price filter
  const testPriceFilter = async () => {
    const testUrl = `${API_CONFIG.BASE_URL}/custom/v1/products?taxonomy=${taxonomy}&min_price=100&max_price=500`;
    try {
      const response = await fetch(testUrl);
      const data = await response.json();
      console.log('Price filter test:', data);
      alert(`Price filter test: Found ${data.products?.length || 0} products. Check console for details.`);
    } catch (error) {
      console.error('Price filter test error:', error);
      alert(`Price filter error: ${error.message}`);
    }
  };
  
  return (
    <div className="fixed bottom-4 left-4 bg-white border-2 border-red-500 p-4 rounded-xl shadow-elegant max-w-md z-50">
      <h3 className="font-bold text-red-600 mb-2">🔧 Debug Panel</h3>
      
      {/* Current State */}
      <div className="text-xs space-y-1 mb-3">
        <div><strong>API Base:</strong> {API_CONFIG.BASE_URL}</div>
        <div><strong>Current Taxonomy:</strong> {taxonomy}</div>
        <div><strong>Active Filters:</strong> {Object.keys(filters).join(', ') || 'None'}</div>
        {filters.min_price && <div><strong>Min Price:</strong> {filters.min_price}</div>}
        {filters.max_price && <div><strong>Max Price:</strong> {filters.max_price}</div>}
      </div>
      
      {/* Filter Options Info */}
      {filterOptions && (
        <div className="text-xs mb-3 p-2 bg-neutral-100 rounded-xl">
          <div className="font-semibold">Available Filters:</div>
          {Object.entries(filterOptions.filters || {}).map(([key, data]) => (
            <div key={key}>
              {data.label}: {data.options?.length || 0} options
              {key === 'pa_brand' && (
                <div className="ml-2 text-neutral-600">
                  Brands: {data.options?.map(o => o.name).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Test Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleTestConnection}
          disabled={testLoading}
          className="w-full text-xs bg-accent-500 text-white px-2 py-1 rounded-xl hover:bg-accent-600 transition-colors"
        >
          {testLoading ? 'Testing...' : 'Test API Connection'}
        </button>
        
        <button
          onClick={() => testEndpoint(`/custom/v1/filters?taxonomy=${taxonomy}`)}
          className="w-full text-xs bg-green-500 text-white px-2 py-1 rounded-xl hover:bg-green-600 transition-colors"
        >
          Test Filters Endpoint
        </button>
        
        <button
          onClick={() => testEndpoint(`/custom/v1/products?taxonomy=${taxonomy}`)}
          className="w-full text-xs bg-purple-500 text-white px-2 py-1 rounded-xl hover:bg-purple-600 transition-colors"
        >
          Test Products Endpoint
        </button>
        
        <button
          onClick={testPriceFilter}
          className="w-full text-xs bg-orange-500 text-white px-2 py-1 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Test Price Filter (100-500)
        </button>
      </div>
      
      {/* Test Result */}
      {testResult && (
        <div className={`mt-3 p-2 rounded-xl text-xs ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <strong>{testResult.success ? '✅ Success' : '❌ Failed'}</strong>
          <div>{testResult.message}</div>
          {testResult.data && (
            <div className="mt-1">
              Filters found: {Object.keys(testResult.data.filters || {}).length}
            </div>
          )}
        </div>
      )}
      
      {/* Console Instructions */}
      <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded-xl text-xs">
        <strong>💡 Tip:</strong> Open browser console (F12) to see detailed API responses
      </div>
    </div>
  );
};

export default DebugPanel;