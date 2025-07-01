import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { CartProvider } from '@context/CartContext';

vi.mock('@components/ScrollToTop', () => ({
    __esModule: true,
    default: () => null,
}));

describe('App integration', () => {
    test('renders Home page and navigates to Sobre Nosotros', async () => {
        render(
            <CartProvider>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </CartProvider>
        );

        const linkSobreNosotros = screen.getByRole('link', { name: /sobre nosotros/i });
        expect(linkSobreNosotros).toBeInTheDocument();

        await userEvent.click(linkSobreNosotros);

        const tituloSobreNosotros = await screen.findByRole('heading', { name: /sobre nosotros/i });
        expect(tituloSobreNosotros).toBeInTheDocument();
    });
});
