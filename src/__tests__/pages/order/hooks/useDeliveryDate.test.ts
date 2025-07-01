import { renderHook, act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useDeliveryDate } from '@pages/order/hooks';

describe('useDeliveryDate', () => {
    test('initial state is empty', () => {
        const { result } = renderHook(() => useDeliveryDate());
        expect(result.current.date).toBe('');
        expect(result.current.time).toBe('');
        expect(result.current.availableTimes).toEqual([]);
        expect(result.current.formatDelivery()).toBe('');
    });

    test('updateAvailableTimes sets correct times for Lunes', () => {
        const { result } = renderHook(() => useDeliveryDate());

        act(() => {
            result.current.updateAvailableTimes('2025-06-30');
        });

        expect(result.current.date).toBe('2025-06-30');
        expect(result.current.time).toBe('');
        expect(result.current.availableTimes).toEqual(['10:30', '12:30', '16:00']);
    });

    test('updateAvailableTimes sets times for Sábado', () => {
        const { result } = renderHook(() => useDeliveryDate());

        act(() => {
            result.current.updateAvailableTimes('2025-06-28');
        });

        expect(result.current.availableTimes).toEqual(['21:00']);
    });

    test('formatDelivery returns formatted string', () => {
        const { result } = renderHook(() => useDeliveryDate());

        act(() => {
            result.current.updateAvailableTimes('2025-06-30');
            result.current.setTime('16:00');
        });

        expect(result.current.formatDelivery()).toBe('Lunes 30/06 16:00');
    });

    test('formatDelivery with params works independently of internal state', () => {
        const { result } = renderHook(() => useDeliveryDate());

        const output = result.current.formatDelivery('2025-07-01', '12:30');
        expect(output).toBe('Martes 01/07 12:30');
    });

    test('formatDelivery returns empty string when date or time is missing', () => {
        const { result } = renderHook(() => useDeliveryDate());

        expect(result.current.formatDelivery('', '12:00')).toBe('');
        expect(result.current.formatDelivery('2025-06-30', '')).toBe('');
    });
});
