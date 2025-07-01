import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '@pages/order/components/confirm';

describe('InputField', () => {
  const props = {
    label: 'Full Name',
    value: 'Juan Pérez',
    placeholder: 'Enter your name',
    onChange: vi.fn(),
  };

  test('renders label, input, and placeholder correctly', () => {
    render(<InputField {...props} />);

    const input = screen.getByLabelText('Full Name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
    expect(input).toHaveValue('Juan Pérez');
  });

  test('calls onChange when typing', () => {
    render(<InputField {...props} />);

    const input = screen.getByLabelText('Full Name');
    fireEvent.change(input, { target: { value: 'New name' } });

    expect(props.onChange).toHaveBeenCalledWith('New name');
  });
});
