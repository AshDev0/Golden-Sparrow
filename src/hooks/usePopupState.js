import { useState, useEffect } from 'react';

const usePopupState = (options = {}) => {
  const {
    autoShow = true,
    delay = 2000, // 2 seconds delay before showing popup
    showOnce = false, // If true, popup will only show once per session
    storageKey = 'enquiryPopupShown'
  } = options;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!autoShow) return;

    // Check if popup should be shown only once and has already been shown
    if (showOnce) {
      const hasBeenShown = localStorage.getItem(storageKey);
      if (hasBeenShown) return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [autoShow, delay, showOnce, storageKey]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    
    // If showOnce is enabled, mark popup as shown
    if (showOnce) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  const togglePopup = () => {
    if (isPopupOpen) {
      closePopup();
    } else {
      openPopup();
    }
  };

  return {
    isPopupOpen,
    openPopup,
    closePopup,
    togglePopup
  };
};

export default usePopupState;