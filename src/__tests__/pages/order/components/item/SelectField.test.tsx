import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from '@pages/order/components/item/SelectField';

describe('SelectField', () => {
    const defaultProps = {
        id: 'specification',
        label: 'Especificación',
        selectedValue: 'white',
        options: [
            { value: 'white', label: 'Pan blanco' },
            { value: 'whole', label: 'Pan integral' },
        ],
        onChange: vi.fn(),
    };

    test('renders label and select with correct options', () => {
        render(<SelectField {...defaultProps} />);

        const select = screen.getByLabelText('Especificación');
        expect(select).toBeInTheDocument();

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveTextContent('Pan blanco');
        expect(options[1]).toHaveTextContent('Pan integral');
    });

    test('sets selected value correctly', () => {
        render(<SelectField {...defaultProps} />);
        const select = screen.getByLabelText('Especificación');
        expect(select).toHaveValue('white');
    });

    test('calls onChange when selecting a different option', () => {
        render(<SelectField {...defaultProps} />);
        const select = screen.getByLabelText('Especificación');

        fireEvent.change(select, { target: { value: 'whole' } });
        expect(defaultProps.onChange).toHaveBeenCalledWith('whole');
    });
});
