import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentMethodSelector from '@pages/order/components/confirm/PaymentMethodSelector';

vi.mock('@pages/order/components/confirm/PaymentMethodDetails', () => ({
  default: ({ selectedMethod }: { selectedMethod: string }) => (
    <div data-testid="payment-method-details">Render method: {selectedMethod}</div>
  ),
}));

describe('PaymentMethodSelector', () => {
  const renderComponent = (paymentMethod: string = '') => {
    const setPaymentMethod = vi.fn();
    const onReceiptChange = vi.fn();

    render(
      <PaymentMethodSelector
        paymentMethod={paymentMethod as any}
        setPaymentMethod={setPaymentMethod}
        onReceiptChange={onReceiptChange}
      />
    );

    return { setPaymentMethod, onReceiptChange };
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders available payment options', () => {
    renderComponent();

    expect(screen.getByLabelText('Transferencia bancaria')).toBeInTheDocument();
    expect(screen.getByLabelText('Mercado Pago')).toBeInTheDocument();
    expect(screen.getByLabelText('Efectivo al recibir')).toBeInTheDocument();
  });

  test('calls setPaymentMethod when an option is selected', () => {
    const { setPaymentMethod } = renderComponent();

    const radio = screen.getByLabelText('Mercado Pago');
    fireEvent.click(radio);

    expect(setPaymentMethod).toHaveBeenCalledWith('mercado_pago');
  });

  test('does not render PaymentMethodDetails if no method is selected', () => {
    renderComponent('');

    expect(screen.queryByTestId('payment-method-details')).not.toBeInTheDocument();
  });

  test('renders PaymentMethodDetails when a method is selected', () => {
    renderComponent('transfer');

    expect(screen.getByTestId('payment-method-details')).toHaveTextContent('Render method: transfer');
  });
});
