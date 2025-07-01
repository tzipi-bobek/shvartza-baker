import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CartIcon from '@components/CartIcon';

vi.mock('@context/CartContext', () => ({
    useCartContext: vi.fn(),
}));

const mockUseCartContext = vi.mocked(
    await import('@context/CartContext')
).useCartContext;

const renderCartIcon = () =>
    render(
        <BrowserRouter>
            <CartIcon />
        </BrowserRouter>
    );

describe('CartIcon', () => {
    test('shows only the icon when cart is empty', () => {
        mockUseCartContext.mockReturnValue({
            cart: [],
            setCart: vi.fn(),
            saveCart: vi.fn(),
            clearCart: vi.fn(),
            addItem: vi.fn(),
        });

        renderCartIcon();

        expect(screen.getByLabelText(/carrito/i)).toBeInTheDocument();
        expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
    });

    test('shows the cart item count when cart is not empty', () => {
        mockUseCartContext.mockReturnValue({
            cart: [
                {
                    id: 1,
                    name: 'Producto A',
                    specification: 'Grande',
                    specificationId: '101',
                    version: 'Clásica',
                    versionId: '202',
                    quantity: 2,
                    total_price: 4000,
                },
            ],
            setCart: vi.fn(),
            saveCart: vi.fn(),
            clearCart: vi.fn(),
            addItem: vi.fn(),
        });
        renderCartIcon();

        expect(screen.getByLabelText(/carrito/i)).toBeInTheDocument();
        expect(screen.getByText(/^\d+$/)).toBeInTheDocument();
    });
});
