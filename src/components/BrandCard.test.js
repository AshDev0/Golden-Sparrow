import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BrandCard from './BrandCard';

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BrandCard Component', () => {
  const mockBrand = {
    id: 1,
    name: 'Caterpillar',
    slug: 'caterpillar',
    logo: 'https://example.com/caterpillar-logo.png',
    count: 5
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderBrandCard = (brand = mockBrand, taxonomy = 'equipment-buy') => {
    return render(
      <BrowserRouter>
        <BrandCard brand={brand} taxonomy={taxonomy} />
      </BrowserRouter>
    );
  };

  test('renders brand name', () => {
    renderBrandCard();
    expect(screen.getByText('Caterpillar')).toBeInTheDocument();
  });

  test('renders brand logo when provided', () => {
    renderBrandCard();
    const logo = screen.getByAltText('Caterpillar logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'https://example.com/caterpillar-logo.png');
  });

  test('renders fallback icon when no logo provided', () => {
    const brandWithoutLogo = { ...mockBrand, logo: '' };
    renderBrandCard(brandWithoutLogo);
    
    // Should show the fallback Building2 icon
    const fallbackIcon = screen.getByTestId('brand-fallback-icon') || 
                         document.querySelector('svg'); // Building2 icon
    expect(fallbackIcon).toBeInTheDocument();
  });

  test('navigates to correct URL when clicked', () => {
    renderBrandCard();
    
    const brandCard = screen.getByText('Caterpillar').closest('div');
    fireEvent.click(brandCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/products?taxonomy=equipment-buy&pa_brand=caterpillar');
  });

  test('navigates with different taxonomy', () => {
    renderBrandCard(mockBrand, 'equipment-rent');
    
    const brandCard = screen.getByText('Caterpillar').closest('div');
    fireEvent.click(brandCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/products?taxonomy=equipment-rent&pa_brand=caterpillar');
  });

  test('has proper accessibility attributes', () => {
    renderBrandCard();
    
    const brandCard = screen.getByText('Caterpillar').closest('div');
    expect(brandCard).toHaveClass('cursor-pointer');
    
    const logo = screen.getByAltText('Caterpillar logo');
    expect(logo).toHaveAttribute('alt', 'Caterpillar logo');
  });
});