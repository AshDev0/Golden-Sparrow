// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.scrollTo for tests (not implemented in JSDOM)
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console.error for specific React Router warnings during tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' && 
    (args[0].includes('React Router Future Flag Warning') ||
     args[0].includes('ReactDOMTestUtils.act') ||
     args[0].includes('Not implemented: window.scrollTo'))
  ) {
    return;
  }
  originalError(...args);
};

// Mock fetch for API tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      products: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
      perPage: 12
    }),
    headers: {
      get: jest.fn(() => '0')
    }
  })
);

// Mock react-slick to prevent slider issues in tests
jest.mock('react-slick', () => {
  // Import React inside the mock factory to avoid hoisting issues
  const React = require('react');
  return function MockSlider({ children, ...props }) {
    return React.createElement('div', {
      'data-testid': 'slider-mock',
      ...props
    }, children);
  };
});

