import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '@pages/cart/components/ConfirmationModal';
import { describe, expect, test, vi } from 'vitest';

describe('ConfirmationModal', () => {
  test('does not render when "open" is false', () => {
    const { container } = render(
      <ConfirmationModal
        open={false}
        message="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders the message correctly when open', () => {
    render(
      <ConfirmationModal
        open={true}
        message="Delete this item?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText(/Delete this item\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Aceptar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  test('calls onConfirm when "Aceptar" is clicked', () => {
    const confirmMock = vi.fn();

    render(
      <ConfirmationModal
        open={true}
        message="Confirm?"
        onConfirm={confirmMock}
        onCancel={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Aceptar/i));
    expect(confirmMock).toHaveBeenCalled();
  });

  test('calls onCancel when "Cancelar" is clicked', () => {
    const cancelMock = vi.fn();

    render(
      <ConfirmationModal
        open={true}
        message="Confirm?"
        onConfirm={vi.fn()}
        onCancel={cancelMock}
      />
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(cancelMock).toHaveBeenCalled();
  });

  test('matches snapshot when open', () => {
    const { container } = render(
      <ConfirmationModal
        open={true}
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
