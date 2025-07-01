import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartList } from '@pages/cart/components';
import { CartItem } from '@/types';

const cartMock: CartItem[] = [
  {
    id: 1,
    name: 'Sandwich de miga',
    specification: 'Pan blanco',
    specificationId: 'E1',
    version: 'Queso y tomate',
    versionId: 'V2',
    quantity: 2,
    total_price: 2500,
  },
];

describe('CartList', () => {
  test('renders cart products', () => {
    render(
      <CartList
        cart={cartMock}
        openDeleteModal={vi.fn()}
        editProduct={vi.fn()}
      />
    );

    expect(screen.getByText('Sandwich de miga')).toBeInTheDocument();
    expect(screen.getByText(/Pan blanco/)).toBeInTheDocument();
    expect(screen.getByText(/Queso y tomate/)).toBeInTheDocument();
    expect(screen.getByText(/x\s*2/)).toBeInTheDocument();
  });

  test('calls editProduct when edit icon is clicked', () => {
    const editMock = vi.fn();

    render(
      <CartList
        cart={cartMock}
        openDeleteModal={vi.fn()}
        editProduct={editMock}
      />
    );

    const editButton = screen.getByLabelText(/editar/i);
    fireEvent.click(editButton);

    expect(editMock).toHaveBeenCalledWith(0);
  });

  test('calls openDeleteModal when delete icon is clicked', () => {
    const deleteMock = vi.fn();

    render(
      <CartList
        cart={cartMock}
        openDeleteModal={deleteMock}
        editProduct={vi.fn()}
      />
    );

    const deleteButton = screen.getByLabelText(/eliminar/i);
    fireEvent.click(deleteButton);

    expect(deleteMock).toHaveBeenCalledWith(0);
  });
});
