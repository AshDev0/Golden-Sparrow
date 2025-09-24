import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the HelmetProvider to avoid issues with react-helmet-async in tests
jest.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }) => children,
  Helmet: () => null,
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
  });

  test('renders main navigation', () => {
    render(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('renders homepage by default', async () => {
    render(<App />);
    
    // Wait for the homepage content to load
    await waitFor(() => {
      expect(screen.getByText(/Your One-Stop Equipment Solution/i)).toBeInTheDocument();
    });
  });

  test('renders footer with company information', () => {
    render(<App />);
    expect(screen.getAllByText(/goldensparrowuae/i).length).toBeGreaterThanOrEqual(2); // Should appear multiple times (navbar, footer, contact, copyright)
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
  });

  test('includes accessibility skip link', () => {
    render(<App />);
    const skipLink = screen.getByText(/Skip to main content/i);
    expect(skipLink).toBeInTheDocument();
  });
});
