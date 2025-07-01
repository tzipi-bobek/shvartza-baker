import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ScrollToTop } from '@components';

const LocationDisplay = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <div>Path: {location.pathname}</div>
            <button onClick={() => navigate('/new-path')}>Go to new path</button>
        </div>
    );
};

describe('ScrollToTop', () => {
    beforeEach(() => {
        vi.spyOn(window, 'scrollTo').mockImplementation(() => { });
    });

    test('calls window.scrollTo on route change', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ScrollToTop />
                <Routes>
                    <Route path="*" element={<LocationDisplay />} />
                </Routes>
            </MemoryRouter>
        );

        expect(window.scrollTo).toHaveBeenCalledTimes(1);

        const button = screen.getByRole('button', { name: /go to new path/i });
        await userEvent.click(button);

        expect(window.scrollTo).toHaveBeenCalledTimes(2);
        expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });
    });
});
