import { describe, expect, test, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConfirmOrder } from '@pages/order/hooks';

const clearCartMock = vi.fn();
const navigateMock = vi.fn();
const openMock = vi.fn();

vi.stubGlobal('open', openMock);

vi.mock('@context/CartContext', () => ({
    useCartContext: () => ({
        cart: [
            {
                id: 1,
                name: 'Producto',
                specification: 'Tipo',
                specificationId: 'E1',
                version: 'Versión',
                versionId: 'V1',
                quantity: 2,
                total_price: 3000,
                uid: 'abc123',
            },
        ],
        clearCart: clearCartMock,
    }),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: () => navigateMock,
}));

vi.mock('@lib', () => ({
    uploadReceipt: vi.fn(() => Promise.resolve('https://receipt.com')),
    generateOrderMessage: vi.fn(() => 'Mensaje de WhatsApp'),
}));

describe('useConfirmOrder with full cart', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('calls uploadReceipt, generateOrderMessage, opens WhatsApp, clears cart, navigates', async () => {
        const { result } = renderHook(() => useConfirmOrder());

        await act(async () => {
            await result.current.handleSubmit(
                { preventDefault: vi.fn() } as any,
                {
                    clientName: 'Tzipi',
                    address: 'Calle Falsa 123',
                    deliveryTime: 'Lunes 24/06 18:00',
                    paymentMethod: 'transfer',
                    receiptFile: new File(['dummy'], 'recibo.jpg'),
                }
            );
        });

        const { uploadReceipt, generateOrderMessage } = await import('@lib');

        expect(uploadReceipt).toHaveBeenCalled();
        expect(generateOrderMessage).toHaveBeenCalled();
        expect(openMock).toHaveBeenCalledWith(
            expect.stringContaining('https://wa.me/'),
            '_blank'
        );
        expect(clearCartMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith('/');
        expect(result.current.sending).toBe(false);
    });

    test('places order without receipt if payment is cash', async () => {
        const { result } = renderHook(() => useConfirmOrder());

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: vi.fn() } as any, {
                clientName: 'Tzipi',
                address: 'Casa',
                deliveryTime: 'Ahora',
                paymentMethod: 'cash',
                receiptFile: null,
            });
        });

        const { uploadReceipt, generateOrderMessage } = await import('@lib');

        expect(uploadReceipt).not.toHaveBeenCalled();
        expect(generateOrderMessage).toHaveBeenCalled();
        expect(openMock).toHaveBeenCalled();
    });
});
