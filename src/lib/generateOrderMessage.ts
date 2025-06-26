import { CartItem } from "@/types";

export function generateOrderMessage(
  name: string,
  address: string,
  schedule: string,
  paymentMethod: string,
  cart: CartItem[],
  receiptUrl?: string
): string {
  const paymentLabels: Record<string, string> = {
    transfer: "Transferencia",
    mercado_pago: "Mercado Pago",
    cash: "Efectivo",
  };

  let message = `Nombre: ${name}\n`;
  message += `Dirección: ${address}\n`;
  message += `Día / Horario: ${schedule}\n`;
  message += `Método de pago: ${paymentLabels[paymentMethod] || paymentMethod}\n`;

  if (receiptUrl) {
    message += `Comprobante: ${receiptUrl}\n`;
  }

  message += `\nPedido:\n`;
  let totalQuantity = 0;
  cart.forEach((item) => {
    const productCode = `#${item.id}${item.specificationId}${item.versionId}`;
    message += `- ${item.quantity}x ${productCode}\n`;
    totalQuantity += item.quantity;
  });
  message += `\nCantidad total: ${totalQuantity}`;
  return message;
}
