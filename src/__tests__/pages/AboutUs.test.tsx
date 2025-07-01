import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AboutUs from '@pages/AboutUs';

describe('AboutUs', () => {
  test('renders the heading and paragraph', () => {
    render(<AboutUs />);
    expect(
      screen.getByRole('heading', { name: /sobre nosotros/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/comprometida en ofrecer los mejores productos/i)
    ).toBeInTheDocument();
  });
});
