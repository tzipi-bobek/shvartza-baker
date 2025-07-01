import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentMethodDetails from '@pages/order/components/confirm/PaymentMethodDetails';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@pages/order/components/confirm/CopyButton', () => ({
  default: ({ label, value }: { label: string; value: string }) => (
    <button data-testid="copy">{label}: {value}</button>
  ),
}));

describe('PaymentMethodDetails', () => {
  const renderComponent = (
    method: 'transfer' | 'mercado_pago' | 'cash',
    onReceiptChange = vi.fn()
  ) => {
    render(
      <BrowserRouter>
        <PaymentMethodDetails
          selectedMethod={method}
          onReceiptChange={onReceiptChange}
        />
      </BrowserRouter>
    );
    return onReceiptChange;
  };

  test('displays alias and CBU for bank transfer', () => {
    renderComponent('transfer');

    const aliasElement = screen.getByText('Alias:', { selector: 'strong' });
    expect(aliasElement).toBeInTheDocument();
    expect(screen.getByText('shvartse.baker')).toBeInTheDocument();
    const cbuElement = screen.getByText('CBU:', { selector: 'strong' });
    expect(cbuElement).toBeInTheDocument();
    expect(screen.getByText('0000000000000000000000')).toBeInTheDocument();
    expect(screen.getAllByTestId('copy')).toHaveLength(2);
  });

  test('displays Mercado Pago text and alias', () => {
    renderComponent('mercado_pago');

    expect(screen.getByText(/Alias Mercado Pago:/i)).toBeInTheDocument();
    expect(screen.getByText('shvartsebaker.mp')).toBeInTheDocument();
    expect(screen.getByText(/saldo o débito/i)).toBeInTheDocument();
    expect(screen.getByTestId('copy')).toBeInTheDocument();
  });

  test('displays cash message without alias or CBU', () => {
    renderComponent('cash');

    expect(screen.getByText(/Pagás en efectivo/i)).toBeInTheDocument();
    expect(screen.queryByTestId('copy')).not.toBeInTheDocument();
  });

  test('displays and processes selected file', () => {
    const mockChange = renderComponent('transfer');

    const file = new File(['content'], 'receipt.pdf', { type: 'application/pdf' });

    const input = screen.getByLabelText(/Adjuntar comprobante de pago/i);
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(mockChange).toHaveBeenCalledWith(file);
    expect(screen.getByText(/Archivo seleccionado:/i)).toBeInTheDocument();
    expect(screen.getByText('receipt.pdf')).toBeInTheDocument();
  });

  test('clears file if removed', () => {
    const mockChange = renderComponent('transfer');

    const input = screen.getByLabelText(/Adjuntar comprobante de pago/i);
    fireEvent.change(input, {
      target: { files: null },
    });

    expect(mockChange).toHaveBeenCalledWith(null);
    expect(screen.queryByText(/Archivo seleccionado:/i)).not.toBeInTheDocument();
  });
});
