import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '@pages/cart/Cart';
import { BrowserRouter } from 'react-router-dom';

const deleteProductMock = vi.fn();
const clearCartMock = vi.fn();
const editProductMock = vi.fn();

vi.mock('@pages/cart/hooks/useCart', () => ({
  default: () => ({
    cart: [
      {
        id: 1,
        name: 'Sandwich de miga',
        specification: 'Pan blanco',
        specificationId: 'E1',
        version: 'Queso y tomate',
        versionId: 'V2',
        quantity: 2,
        total_price: 2500,
        uid: 'mock-uid-123',
      },
    ],
    deleteProduct: deleteProductMock,
    clearCart: clearCartMock,
    editProduct: editProductMock,
  }),
}));

const renderCart = () => {
  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
};

describe('Cart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays the delete confirmation modal when "eliminar" is clicked', () => {
    renderCart();
    fireEvent.click(screen.getByLabelText(/eliminar/i));
    expect(screen.getByText(/¿Querés eliminar este producto/i)).toBeInTheDocument();
  });

  test('displays the clear cart confirmation modal', () => {
    renderCart();
    fireEvent.click(screen.getByText(/vaciar carrito/i));
    expect(screen.getByText(/¿Querés vaciar todo el carrito/i)).toBeInTheDocument();
  });

  test('calls deleteProduct and shows toast on confirm', () => {
    renderCart();
    fireEvent.click(screen.getByLabelText(/eliminar/i));
    fireEvent.click(screen.getByText(/aceptar/i));
    expect(deleteProductMock).toHaveBeenCalled();
    expect(screen.getByText(/Producto eliminado con éxito/i)).toBeInTheDocument();
  });

  test('calls clearCart and shows toast on confirm', () => {
    renderCart();
    fireEvent.click(screen.getByText(/vaciar carrito/i));
    fireEvent.click(screen.getByText(/aceptar/i));
    expect(clearCartMock).toHaveBeenCalled();
    expect(screen.getByText(/Carrito vaciado/i)).toBeInTheDocument();
  });

  test('does not delete if cancel is clicked', () => {
    renderCart();
    fireEvent.click(screen.getByLabelText(/eliminar/i));
    fireEvent.click(screen.getByText(/cancelar/i));
    expect(deleteProductMock).not.toHaveBeenCalled();
  });

  test('calls editProduct when clicking edit', () => {
    renderCart();
    fireEvent.click(screen.getByLabelText(/editar/i));
    expect(editProductMock).toHaveBeenCalledWith(0);
  });
});
