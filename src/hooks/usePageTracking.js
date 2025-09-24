/**
 * Custom hook for tracking page information
 * Captures current URL, pathname, and page title for form submissions
 */

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const usePageTracking = () => {
  const location = useLocation();
  const [pageInfo, setPageInfo] = useState({
    url: '',
    pathname: '',
    search: '',
    title: '',
    referrer: ''
  });

  useEffect(() => {
    // Update page information when location changes
    setPageInfo({
      url: window.location.href,
      pathname: location.pathname,
      search: location.search,
      title: document.title || '',
      referrer: document.referrer || ''
    });
  }, [location]);

  return pageInfo;
};

export default usePageTracking;