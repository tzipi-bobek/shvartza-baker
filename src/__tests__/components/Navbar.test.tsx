import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@components';

vi.mock('@components/CartIcon', () => ({
    __esModule: true,
    default: () => <a aria-label="Carrito"></a>,
}));

const renderNavbar = () =>
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );

describe('Navbar', () => {
    test('shows desktop navigation links', () => {
        renderNavbar();

        const links = screen.getAllByRole('link', { name: /inicio/i });
        expect(links.length).toBeGreaterThan(0);
        expect(links[0]).toHaveAttribute('href', '/');

        const productosLinks = screen.getAllByRole('link', { name: /productos/i });
        expect(productosLinks[0]).toHaveAttribute('href', '/productos');
    });

    test('shows cart icon', () => {
        renderNavbar();
        const carritoLinks = screen.getAllByLabelText(/carrito/i);
        expect(carritoLinks.length).toBeGreaterThan(0);
    });

    test('toggles mobile menu on button click', () => {
        renderNavbar();

        const menuButton = screen.getByRole('button', { name: /abrir o cerrar menú/i });

        fireEvent.click(menuButton);

        const mobileLinks = screen.getAllByRole('link', { name: /inicio/i });
        expect(mobileLinks.length).toBeGreaterThan(1);

        fireEvent.click(menuButton);
    });
});
