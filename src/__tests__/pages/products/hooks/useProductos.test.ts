import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import useProducts from '@pages/products/hooks/useProducts';

const mockSelect = vi.fn();

vi.mock('@lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: mockSelect,
    }),
  },
}));

describe('useProducts', () => {
  const mockData = [
    { id: 1, name: 'Sándwich de miga' },
    { id: 2, name: 'Sándwich árabe' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns products and updates loading state correctly', async () => {
    mockSelect.mockResolvedValueOnce({ data: mockData, error: null });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockData);
  });

  test('handles error and leaves products empty', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    mockSelect.mockResolvedValueOnce({ data: null, error: { message: 'Something went wrong' } });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);

    consoleSpy.mockRestore();
  });
});
