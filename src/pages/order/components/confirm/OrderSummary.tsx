import { CartItem } from "@/types";

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

const OrderSummary = ({ cart, subtotal, shippingCost, total }: OrderSummaryProps) => (
  <>
    <h3 className="text-lg font-bold mt-6 mb-2">Pedido/s:</h3>

    <ul className="mb-4">
      {cart.map((item, index) => (
        <li key={index} className="border-b border-[#d6d0c4] py-2 text-sm">
          {item.quantity}x {item.name} ({item.specification}, {item.version})
        </li>
      ))}
    </ul>

    <div className="bg-gradient-to-br space-y-1">
      <div className="flex justify-between">
        <span className="text-sm text-black font-medium">Cantidad total</span>
        <span className="text-sm text-gray-800">
          {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-black font-medium">Subtotal</span>
        <span className="text-sm text-gray-800">${subtotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-xs text-gray-600">Envío</span>
        <span className="text-xs text-gray-600">${shippingCost.toLocaleString()}</span>
      </div>

      <div className="flex justify-between pt-2 border-t mt-2 border-[#d6d0c4]">
        <span className="font-semibold text-base">Total</span>
        <span className="font-semibold text-base text-black">${total.toLocaleString()}</span>
      </div>
    </div>
  </>
);

export default OrderSummary;
