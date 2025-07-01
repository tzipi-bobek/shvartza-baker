import { describe, expect, test, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConfirmOrder } from '@pages/order/hooks';

const clearCartMock = vi.fn();
const openMock = vi.fn();

vi.stubGlobal('open', openMock);

vi.mock('@context/CartContext', () => ({
    useCartContext: () => ({
        cart: [],
        clearCart: clearCartMock,
    }),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
}));

vi.mock('@lib', () => ({
    uploadReceipt: vi.fn(),
    generateOrderMessage: vi.fn(),
}));

describe('useConfirmOrder with empty cart', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('does not place order if cart is empty', async () => {
        const { result } = renderHook(() => useConfirmOrder());

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: vi.fn() } as any, {
                clientName: 'Test',
                address: 'Nowhere',
                deliveryTime: 'Domingo',
                paymentMethod: 'cash',
                receiptFile: null,
            });
        });

        expect(openMock).not.toHaveBeenCalled();
        expect(clearCartMock).not.toHaveBeenCalled();
    });
});
