import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderFormFields from '@pages/order/components/item/OrderFormFields';
import { Product, CartItem } from '@/types';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const productMock: Product = {
  id: 1,
  name: 'Sandwich de miga',
  specifications: [
    { id: 'es1', name: 'Pan blanco' },
    { id: 'es2', name: 'Pan integral' },
  ],
  versions: [
    { id: 'v1', name: 'Simple' },
    { id: 'v2', name: 'Doble' },
  ],
  prices: [
    { quantity: 1, total_price: 1000 },
    { quantity: 2, total_price: 1800 },
  ],
  image: 'url.jpg',
};

describe('OrderFormFields', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders default selected options', () => {
    render(
      <OrderFormFields
        product={productMock}
        saveToCart={vi.fn()}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByDisplayValue('Pan blanco')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Simple')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  test('allows changing options', () => {
    render(
      <OrderFormFields
        product={productMock}
        saveToCart={vi.fn()}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.change(screen.getByLabelText(/Especificación/i), {
      target: { value: 'Pan integral' },
    });

    expect(screen.getByDisplayValue('Pan integral')).toBeInTheDocument();
  });

  test('calls saveToCart with correct data', () => {
    const saveMock = vi.fn();

    render(
      <OrderFormFields
        product={productMock}
        saveToCart={saveMock}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByText(/Agregar al carrito/i));

    expect(saveMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: 'Sandwich de miga',
        specification: 'Pan blanco',
        version: 'Simple',
        quantity: 1,
        total_price: 1000,
      })
    );
  });

  test('calls navigate(-1) on cancel click', () => {
    render(
      <OrderFormFields
        product={productMock}
        saveToCart={vi.fn()}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('renders pedidoEditar if provided', () => {
    const editItem: CartItem = {
      id: 1,
      name: 'Sandwich de miga',
      specification: 'Pan integral',
      specificationId: 'es2',
      version: 'Doble',
      versionId: 'v2',
      quantity: 2,
      total_price: 1800,
    };

    render(
      <OrderFormFields
        product={productMock}
        editingOrder={editItem}
        saveToCart={vi.fn()}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByDisplayValue('Pan integral')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doble')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });
});
