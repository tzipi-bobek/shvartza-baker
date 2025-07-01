import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OrderSummary from '@pages/order/components/confirm/OrderSummary';
import { CartItem } from '@/types';

describe('OrderSummary', () => {
  const cartMock: CartItem[] = [
    {
      id: 1,
      name: 'Sándwich especial',
      specificationId: 'e1',
      specification: 'Pan blanco',
      versionId: 'v1',
      version: 'Clásico',
      quantity: 2,
      total_price: 2000,
    },
    {
      id: 2,
      name: 'Veggie',
      specificationId: 'e2',
      specification: 'Integral',
      versionId: 'v2',
      version: 'Vegetariano',
      quantity: 1,
      total_price: 1500,
    },
  ];

  test('renders products in the summary', () => {
    render(
      <OrderSummary
        cart={cartMock}
        subtotal={3500}
        shippingCost={500}
        total={4000}
      />
    );

    expect(screen.getByText(/2x Sándwich especial/)).toBeInTheDocument();
    expect(screen.getByText(/Pan blanco, Clásico/)).toBeInTheDocument();

    expect(screen.getByText(/1x Veggie/)).toBeInTheDocument();
    expect(screen.getByText(/Integral, Vegetariano/)).toBeInTheDocument();

    expect(screen.getByText('Cantidad total')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('$3,500')).toBeInTheDocument();

    expect(screen.getByText('Envío')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$4,000')).toBeInTheDocument();
  });
});
