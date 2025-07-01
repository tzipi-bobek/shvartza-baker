import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '@pages/products/components/ProductItem';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProductItem', () => {
  const productMock = {
    id: 1,
    name: 'Sándwich especial',
    image: '',
    specifications: [
      { id: 'e1', name: 'Pan blanco' },
      { id: 'e2', name: 'Con semillas' },
    ],
    versions: [
      { id: 'v1', name: 'Clásico' },
      { id: 'v2', name: 'Vegetariano' },
    ],
    prices: [
      { quantity: 1, total_price: 1500 },
      { quantity: 3, total_price: 4000 },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders product details correctly', () => {
    render(
      <BrowserRouter>
        <ProductItem product={productMock} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sándwich especial');
    expect(screen.getByText('Pan blanco / Con semillas')).toBeInTheDocument();
    expect(screen.getByText('Clásico')).toBeInTheDocument();
    expect(screen.getByText('Vegetariano')).toBeInTheDocument();
    expect(screen.getByText('x1')).toBeInTheDocument();
    expect(screen.getByText('$1,500')).toBeInTheDocument();
    expect(screen.getByText('x3')).toBeInTheDocument();
    expect(screen.getByText('$4,000')).toBeInTheDocument();

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toMatch(/\/products\/sandwitch\.jpg$/);
    expect(img.alt).toBe('Sándwich especial');

    const section = document.getElementById('product-1');
    expect(section).toBeInTheDocument();
  });

  test('navigates correctly on "Agregar al carrito" button click', () => {
    render(
      <BrowserRouter>
        <ProductItem product={productMock} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/carrito/nuevo/1', {
      state: { product: productMock },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
