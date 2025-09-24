import React, { useState, useEffect } from 'react';
import { testApiConnection } from '../services/api';
import { API_CONFIG } from '../constants/config';

const NetworkTest = ({ onClose }) => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const results = {};

    // Test 1: Basic connectivity
    try {
      const response = await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
      results.internetConnection = { success: true, message: 'Internet connection OK' };
    } catch (error) {
      results.internetConnection = { success: false, message: 'No internet connection' };
    }

    // Test 2: API server reachability
    try {
      const response = await fetch(API_CONFIG.BASE_URL, { mode: 'no-cors' });
      results.apiServerReach = { success: true, message: 'API server reachable' };
    } catch (error) {
      results.apiServerReach = { success: false, message: 'API server unreachable: ' + error.message };
    }

    // Test 3: API endpoint test
    try {
      const result = await testApiConnection();
      results.apiEndpoint = result;
    } catch (error) {
      results.apiEndpoint = { success: false, message: 'API endpoint failed: ' + error.message };
    }

    // Test 4: CORS test
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/custom/v1/products?taxonomy=equipment-buy&per_page=1`);
      if (response.ok) {
        results.corsTest = { success: true, message: 'CORS working correctly' };
      } else {
        results.corsTest = { success: false, message: `HTTP ${response.status}: ${response.statusText}` };
      }
    } catch (error) {
      if (error.message.includes('CORS')) {
        results.corsTest = { success: false, message: 'CORS blocked by server' };
      } else {
        results.corsTest = { success: false, message: 'Request failed: ' + error.message };
      }
    }

    setTestResults(results);
    setTesting(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Network Connectivity Test</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {testing ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto mb-2"></div>
            <p>Running network tests...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(testResults).map(([test, result]) => (
              <div key={test} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium capitalize">{test.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm text-gray-600">{result.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex space-x-3">
          <button
            onClick={runTests}
            disabled={testing}
            className="px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 disabled:opacity-50"
          >
            {testing ? 'Testing...' : 'Run Tests Again'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkTest;