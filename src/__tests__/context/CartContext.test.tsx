import { describe, test, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { CartProvider, useCartContext } from '@context/CartContext';
import { CartItem } from '@/types';

const product: CartItem = {
  id: 1,
  name: 'Producto Test',
  specification: 'Pan blanco',
  specificationId: 'E1',
  version: 'Queso y tomate',
  versionId: 'V2',
  quantity: 2,
  total_price: 2500,
};

const TestComponent = () => {
  const { cart, addItem, clearCart } = useCartContext();

  return (
    <div>
      <p data-testid="count">{cart.length}</p>
      <button onClick={() => addItem(product)}>Add</button>
      <button onClick={clearCart}>Clear</button>
      <button onClick={() => addItem({ ...product, quantity: 5 }, 0)}>Add at index</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('cart starts empty', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('count').textContent).toBe('0');
  });

  test('addItem adds a product to cart', () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(getByText('Add'));
    expect(getByTestId('count').textContent).toBe('1');
  });

  test('clearCart empties the cart and clears localStorage', () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(getByText('Add'));
    expect(getByTestId('count').textContent).toBe('1');

    fireEvent.click(getByText('Clear'));
    expect(getByTestId('count').textContent).toBe('0');
    expect(localStorage.getItem('cart')).toBeNull();
  });

  test('addItem with index replaces the product', () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(getByText('Add'));
    expect(getByTestId('count').textContent).toBe('1');

    fireEvent.click(getByText('Add at index'));
    expect(getByTestId('count').textContent).toBe('1');
  });

  test('addItem updates localStorage', () => {
    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(getByText('Add'));
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(saved).toHaveLength(1);
    expect(saved[0].name).toBe('Producto Test');
  });
});
