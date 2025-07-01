import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useCart from '@pages/cart/hooks/useCart';

const navigateMock = vi.fn();
const setCartMock = vi.fn();
const saveCartMock = vi.fn();
const clearCartMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

vi.mock('@context/CartContext', () => ({
  useCartContext: () => ({
    cart: [
      { id: 1, name: 'Producto 1', total_price: 1000 },
      { id: 2, name: 'Producto 2', total_price: 1500 },
    ],
    setCart: setCartMock,
    saveCart: saveCartMock,
    clearCart: clearCartMock,
  }),
}));

describe('useCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls navigate when editProduct is used', () => {
    const { result } = renderHook(() => useCart());
    result.current.editProduct(1);
    expect(navigateMock).toHaveBeenCalledWith('/carrito/editar/1');
  });

  test('removes product and saves new cart when deleteProduct is called', () => {
    const { result } = renderHook(() => useCart());
    result.current.deleteProduct(0);
    expect(setCartMock).toHaveBeenCalledWith([
      { id: 2, name: 'Producto 2', total_price: 1500 },
    ]);
    expect(saveCartMock).toHaveBeenCalledWith([
      { id: 2, name: 'Producto 2', total_price: 1500 },
    ]);
  });

  test('returns clearCart from context', () => {
    const { result } = renderHook(() => useCart());
    result.current.clearCart();
    expect(clearCartMock).toHaveBeenCalled();
  });
});
