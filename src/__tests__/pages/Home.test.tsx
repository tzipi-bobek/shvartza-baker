import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@pages/Home';

const renderHome = () =>
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );

describe('Home', () => {
    test('renders the video', () => {
        const { container } = renderHome();
        const video = container.querySelector('video');
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('src', '/home-banner.mp4');
    });

    test('displays the main title', () => {
        renderHome();
        expect(
            screen.getByRole('heading', {
                name: /sandwiches kasher con sabor a casa/i,
            })
        ).toBeInTheDocument();
    });

    test('displays the descriptive text', () => {
        renderHome();
        expect(
            screen.getByText(/elaboramos productos lácteos y parve/i)
        ).toBeInTheDocument();
    });

    test('shows the link button to products', () => {
        renderHome();
        const link = screen.getByRole('link', { name: /ver productos/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/productos');
    });

    test('displays the supervision note', () => {
        renderHome();
        expect(
            screen.getAllByText((_, element) =>
                !!element?.textContent?.includes('supervisión del Rab Bobek')
            )[0]
        ).toBeInTheDocument();
    });
});
