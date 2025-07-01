import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderForm } from '@pages/order';

const navigateMock = vi.fn();
const addItemMock = vi.fn();
let mockUseParams = vi.fn();
let mockUseLocation = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
        useParams: () => mockUseParams(),
        useLocation: () => mockUseLocation(),
    };
});

vi.mock('@context/CartContext', () => ({
    useCartContext: () => ({
        addItem: addItemMock,
    }),
}));

vi.mock('@lib', () => ({
    supabase: {
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
            data: {
                id: 2,
                name: 'Empanada',
                specifications: [],
                versions: [],
            },
            error: null,
        }),
    },
}));

vi.mock('@pages/order/components/item/OrderFormFields', () => ({
    default: ({ saveToCart }: { saveToCart: (item: any) => void }) => (
        <>
            <div data-testid="form-fields">Form Fields</div>
            <button onClick={() => saveToCart({ id: 1, quantity: 2 })}>Save</button>
        </>
    ),
}));

describe('OrderForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test('displays product from location.state and saves to cart', async () => {
        mockUseParams.mockReturnValue({ idProducto: '1', index: undefined });
        mockUseLocation.mockReturnValue({
            state: {
                product: {
                    id: 1,
                    name: 'Sandwich de miga',
                    specifications: [],
                    versions: [],
                },
            },
        });

        render(
            <BrowserRouter>
                <OrderForm />
            </BrowserRouter>
        );

        expect(screen.getByText(/nuevo pedido/i)).toBeInTheDocument();
        expect(screen.getByText(/sandwich de miga/i)).toBeInTheDocument();
        expect(screen.getByTestId('form-fields')).toBeInTheDocument();

        userEvent.click(screen.getByText(/save/i));

        await waitFor(() => {
            expect(addItemMock).toHaveBeenCalledWith(
                expect.objectContaining({ id: 1, quantity: 2 }),
                undefined
            );
            expect(navigateMock).toHaveBeenCalledWith('/carrito');
        });
    });

    test('loads product from localStorage and fetches data if editing', async () => {
        localStorage.setItem('cart', JSON.stringify([
            {
                id: 2,
                name: 'Empanada',
                specification: 'Carne',
                specificationId: 'E2',
                version: 'Picante',
                versionId: 'V1',
                quantity: 1,
                total_price: 1200,
                uid: 'uid-test-123',
            },
        ]));

        mockUseParams.mockReturnValue({ idProducto: undefined, index: '0' });
        mockUseLocation.mockReturnValue({ state: undefined });

        render(
            <BrowserRouter>
                <OrderForm />
            </BrowserRouter>
        );

        await screen.findByText(/editar pedido/i);
        expect(screen.getByText(/empanada/i)).toBeInTheDocument();
    });

    test('redirects to /carrito if order not found in localStorage', () => {
        localStorage.setItem('cart', JSON.stringify([]));

        mockUseParams.mockReturnValue({ idProducto: undefined, index: '0' });
        mockUseLocation.mockReturnValue({ state: undefined });

        render(
            <BrowserRouter>
                <OrderForm />
            </BrowserRouter>
        );

        expect(navigateMock).toHaveBeenCalledWith('/carrito');
    });

    test('shows loading message when product is null and no state or index', () => {
        mockUseParams.mockReturnValue({ idProducto: undefined, index: undefined });
        mockUseLocation.mockReturnValue({ state: undefined });

        render(
            <BrowserRouter>
                <OrderForm />
            </BrowserRouter>
        );

        expect(screen.getByText(/cargando producto/i)).toBeInTheDocument();
    });
});
