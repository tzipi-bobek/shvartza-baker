import { describe, test, expect, vi, beforeEach } from 'vitest';
import { uploadReceipt } from '@lib';

const mockUpload = vi.fn();
const mockGetPublicUrl = vi.fn();

vi.mock('@lib/supabaseClient', () => ({
  supabase: {
    storage: {
      from: () => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
      }),
    },
  },
}));

describe('uploadReceipt', () => {
  const mockFile = new File(['test content'], 'My Cool File!.JPG', { type: 'image/jpeg' });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('uploads the file and returns the public URL', async () => {
    mockUpload.mockResolvedValueOnce({ error: null });
    mockGetPublicUrl.mockReturnValueOnce({ data: { publicUrl: 'https://mock.url/public.jpg' } });

    const result = await uploadReceipt(mockFile);

    expect(mockUpload).toHaveBeenCalled();
    const [uniqueName, file] = mockUpload.mock.calls[0];
    expect(uniqueName).toMatch(/^\d{13}-my-cool-file\.jpg$/);
    expect(file).toBe(mockFile);

    expect(result).toBe('https://mock.url/public.jpg');
  });

  test('returns null if upload fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    mockUpload.mockResolvedValueOnce({ error: { message: 'upload failed' } });

    const result = await uploadReceipt(mockFile);

    expect(mockUpload).toHaveBeenCalled();
    expect(result).toBeNull();

    consoleSpy.mockRestore();
  });

  test('returns null if no public URL is returned', async () => {
    mockUpload.mockResolvedValueOnce({ error: null });
    mockGetPublicUrl.mockReturnValueOnce({ data: null });

    const result = await uploadReceipt(mockFile);

    expect(result).toBeNull();
  });
});
