import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import {
  readCart,
  saveCart,
  clearCart
} from '@lib';
import { CartItem } from '@/types';

const exampleItem: CartItem = {
  id: 1,
  name: 'Producto Test',
  specificationId: 'E1',
  specification: 'Pan blanco',
  versionId: 'V2',
  version: 'Queso y tomate',
  quantity: 2,
  total_price: 2500,
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('cartUtils', () => {
  test('saveCart and readCart work correctly', () => {
    saveCart([exampleItem]);
    const result = readCart();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(exampleItem);
  });

  test('readCart returns [] if nothing is in localStorage', () => {
    const result = readCart();
    expect(result).toEqual([]);
  });

  test('clearCart removes the cart from localStorage', () => {
    saveCart([exampleItem]);
    clearCart();

    const result = localStorage.getItem('cart');
    expect(result).toBeNull();
  });
});
