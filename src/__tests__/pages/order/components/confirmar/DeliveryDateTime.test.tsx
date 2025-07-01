import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeliveryDateTime } from '@pages/order/components/confirm';
import { useState } from 'react';

vi.mock('@pages/order/hooks', () => {
  return {
    useDeliveryDate: () => {
      const [time, setTime] = useState('');
      const date = '2025-06-22';
      const availableTimes = ['10:00', '12:00'];
      const updateAvailableTimes = vi.fn();
      const formatDelivery = (d = date, t = time) => `${d} ${t}`;

      return {
        date,
        time,
        availableTimes,
        setTime,
        updateAvailableTimes,
        formatDelivery
      };
    }
  };
});

describe('DeliveryDateTime', () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders date and time inputs', () => {
    render(<DeliveryDateTime onChange={onChangeMock} />);

    expect(screen.getByLabelText(/Día de entrega/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument();
  });

  test('calls onChange and displays delivery message when time is selected', () => {
    render(<DeliveryDateTime onChange={onChangeMock} />);

    fireEvent.change(screen.getByLabelText(/Hora/i), {
      target: { value: '10:00' }
    });

    expect(onChangeMock).toHaveBeenCalledWith('2025-06-22 10:00');
    expect(screen.getByText('Entrega: 2025-06-22 10:00')).toBeInTheDocument();
  });

  test('shows error if selected date is in the past', () => {
    render(<DeliveryDateTime onChange={onChangeMock} />);

    const input = screen.getByLabelText(/Día de entrega/i);
    fireEvent.change(input, { target: { value: '2024-01-01' } });

    expect(screen.getByText(/no puede ser anterior a hoy/i)).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith('');
  });
});
