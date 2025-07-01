import { describe, test, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '@pages/products/Products';
import { BrowserRouter } from 'react-router-dom';

const mockUseProducts = vi.fn();

vi.mock('@pages/products/hooks/useProducts', () => ({
  default: () => mockUseProducts(),
}));

vi.mock('@pages/products/components/ProductItem', () => ({
  default: ({ product }: { product: any }) => (
    <div data-testid="product-item">{product.name}</div>
  ),
}));

describe('Products', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading message if loading is true', () => {
    mockUseProducts.mockReturnValue({ products: [], loading: true });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();
  });

  test('renders products when loading is false', () => {
    mockUseProducts.mockReturnValue({
      loading: false,
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const items = screen.getAllByTestId('product-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Product 1');
    expect(items[1]).toHaveTextContent('Product 2');

    expect(screen.getByText('Product 1', { selector: 'li' })).toBeInTheDocument();
    expect(screen.getByText('Product 2', { selector: 'li' })).toBeInTheDocument();
  });

  test('calls scrollTo when clicking a product name', () => {
    const scrollToMock = vi.fn();
    vi.stubGlobal('scrollTo', scrollToMock);

    const productMock = { id: 1, name: 'Scroll Product' };

    mockUseProducts.mockReturnValue({
      loading: false,
      products: [productMock],
    });

    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    const item = screen.getByText('Scroll Product', { selector: 'li' });
    fireEvent.click(item);

    expect(scrollToMock).toHaveBeenCalled();
    expect(item).toBeInTheDocument();
  });
});
