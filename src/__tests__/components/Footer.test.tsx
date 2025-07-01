import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '@components';

const renderFooter = () =>
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

describe('Footer', () => {
    test('renders navigation links', () => {
        renderFooter();

        expect(screen.getByText(/productos/i)).toBeInTheDocument();
        expect(screen.getByText(/sobre nosotros/i)).toBeInTheDocument();
        expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /^contacto$/i })
        ).toBeInTheDocument();
    });

    test('renders payment info', () => {
        renderFooter();
        expect(screen.getByText(/medios de pago/i)).toBeInTheDocument();
        expect(screen.getByText(/efectivo, transferencia/i)).toBeInTheDocument();
    });

    test('renders contact information', () => {
        renderFooter();
        expect(screen.getByText(/lunes a viernes/i)).toBeInTheDocument();
        expect(screen.getByText(/contacto@tuempresa.com/i)).toBeInTheDocument();
        expect(screen.getByText(/ciudad de buenos aires/i)).toBeInTheDocument();
    });

    test('has correct WhatsApp link', () => {
        const whatsappNumber = import.meta.env.VITE_NUMBER;
        renderFooter();
        const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
        expect(whatsappLink).toHaveAttribute('href', expect.stringContaining(whatsappNumber));
    });
});
