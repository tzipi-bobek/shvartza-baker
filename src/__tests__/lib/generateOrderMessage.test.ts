import { describe, test, expect } from 'vitest';
import { generateOrderMessage } from '@lib';

const baseProduct = {
  name: 'Sandwich de miga',
  specification: 'Jamón y queso',
  version: 'Grande',
  specificationId: '1',
  versionId: '3',
  total_price: 2500,
};

const product1 = {
  ...baseProduct,
  id: 2,
  quantity: 2,
};

const product2 = {
  ...baseProduct,
  id: 4,
  quantity: 3,
};

function expectBasicHeader(
  message: string,
  clientName: string,
  address: string,
  time: string,
  method: string
) {
  expect(message).toContain(`Nombre: ${clientName}`);
  expect(message).toContain(`Dirección: ${address}`);
  expect(message).toContain(`Día / Horario: ${time}`);
  expect(message).toContain(`Método de pago: ${method}`);
}

describe('generateOrderMessage', () => {
  describe('normal cases', () => {
    test('generates the message correctly with one product', () => {
      const message = generateOrderMessage(
        'Tzipi',
        'Israel 123',
        'Lunes 05/02 16:30',
        'cash',
        [product1],
        'https://example.com/comprobante.jpg'
      );

      expectBasicHeader(message, 'Tzipi', 'Israel 123', 'Lunes 05/02 16:30', 'Efectivo');
      expect(message).toContain('Comprobante: https://example.com/comprobante.jpg');
      expect(message).toContain('- 2x #213');
      expect(message).toContain('Cantidad total: 2');
    });

    test('works with multiple products', () => {
      const message = generateOrderMessage(
        'Tzipi',
        'Tel Aviv 456',
        'Martes 06/02 10:00',
        'transfer',
        [product1, product2]
      );

      expect(message).toContain('- 2x #213');
      expect(message).toContain('- 3x #413');
      expect(message).toContain('Cantidad total: 5');
    });
  });

  describe('edge cases', () => {
    test('generates message with empty cart', () => {
      const message = generateOrderMessage(
        'Tzipi',
        'Calle vacía 0',
        'Miércoles 07/02 12:00',
        'cash',
        []
      );

      expectBasicHeader(message, 'Tzipi', 'Calle vacía 0', 'Miércoles 07/02 12:00', 'Efectivo');
      expect(message).toContain('Pedido:');
      expect(message).toContain('Cantidad total: 0');
    });

    test('falls back to original method if not in dictionary', () => {
      const message = generateOrderMessage(
        'Tzipi',
        'Calle Ficticia 123',
        'Jueves 08/02 15:00',
        'bitcoin',
        [product1]
      );

      expect(message).toContain('Método de pago: bitcoin');
    });
  });
});
