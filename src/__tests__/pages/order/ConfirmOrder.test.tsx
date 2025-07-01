import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmOrder from '@pages/order/ConfirmOrder';
import { BrowserRouter } from 'react-router-dom';

const handleSubmitMock = vi.fn();
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('@pages/order/hooks', () => ({
  useConfirmOrder: () => ({
    cart: [
      {
        id: 1,
        name: 'Sandwich de miga',
        specification: 'Pan blanco',
        specificationId: 'E1',
        version: 'Queso y tomate',
        versionId: 'V2',
        quantity: 2,
        total_price: 2500,
        uid: 'mock-uid-123',
      },
    ],
    sending: false,
    handleSubmit: handleSubmitMock,
  }),
  useValidateOrder: () => ({
    missingFields: [],
    ready: true,
    subtotal: 5000,
    total: 7000,
  }),
}));

vi.mock('@pages/order/components/confirm', async () => {
  const actual = await vi.importActual('@pages/order/components/confirm');
  return {
    ...actual,
    DeliveryDateTime: ({ onChange }: { onChange: (val: string) => void }) => (
      <input
        aria-label="fecha y hora"
        type="datetime-local"
        onChange={(e) => onChange(e.target.value)}
      />
    ),
  };
});

describe('ConfirmOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all main form elements', () => {
    render(
      <BrowserRouter>
        <ConfirmOrder />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/nombre:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección de entrega/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmar pedido/i, { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText(/cancelar/i, { selector: 'button' })).toBeInTheDocument();
  });

  test('calls handleSubmit with form data when submitting', () => {
    render(
      <BrowserRouter>
        <ConfirmOrder />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre:/i), {
      target: { value: 'Tzipi' },
    });

    fireEvent.change(screen.getByLabelText(/dirección de entrega/i), {
      target: { value: 'Calle Falsa 123' },
    });

    fireEvent.change(screen.getByLabelText(/fecha y hora/i), {
      target: { value: '2025-06-30T12:00' },
    });

    fireEvent.click(screen.getByLabelText(/efectivo/i));

    fireEvent.submit(screen.getByTestId('form-confirm-order'));

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  test('navigates back when clicking cancel', () => {
    render(
      <BrowserRouter>
        <ConfirmOrder />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(navigateMock).toHaveBeenCalledWith('/carrito');
  });
});
