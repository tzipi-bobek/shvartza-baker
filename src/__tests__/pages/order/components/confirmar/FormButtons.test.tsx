import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormButtons } from '@pages/order/components/confirm';

describe('FormButtons', () => {
  const renderComponent = (props = {}) => {
    const onCancel = vi.fn();

    render(
      <FormButtons
        onCancel={onCancel}
        confirmText="Send order"
        cancelText="Go back"
        ready={true}
        sending={false}
        {...props}
      />
    );

    return { onCancel };
  };

  test('renders buttons with custom labels', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: /send order/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  test('shows spinner and "Sending..." text when sending is true', () => {
    renderComponent({ sending: true });

    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();
  });

  test('disables confirm button if not ready', () => {
    renderComponent({ ready: false });

    expect(screen.getByRole('button', { name: /send order/i })).toBeDisabled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    const { onCancel } = renderComponent();

    const cancelButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });
});
