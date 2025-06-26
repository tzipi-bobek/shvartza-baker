import { PaymentMethod } from "@/types";
import PaymentMethodDetails from "./PaymentMethodDetails";

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod | "";
  setPaymentMethod: (m: PaymentMethod) => void;
  onReceiptChange: (file: File | null) => void;
}

const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
  onReceiptChange,
}: PaymentMethodSelectorProps) => {
  const availableMethods: PaymentMethod[] = ["transfer", "mercado_pago", "cash"];

  return (
    <>
      <h3 className="text-lg font-bold mb-2 mt-6">Método de pago:</h3>
      <div className="space-y-1.5 mb-4">
        {availableMethods.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2 font-serif cursor-pointer"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option}
              checked={paymentMethod === option}
              onChange={() => setPaymentMethod(option)}
              className="w-3 h-3 border border-[#d6d0c4] appearance-none rounded-none checked:bg-[#6b8b74] checked:border-[#6b8b74] transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6b8b74]/30 align-middle"
              required
            />
            {option === "transfer" && "Transferencia bancaria"}
            {option === "mercado_pago" && "Mercado Pago"}
            {option === "cash" && "Efectivo al recibir"}
          </label>
        ))}
      </div>

      {paymentMethod && (
        <PaymentMethodDetails
          selectedMethod={paymentMethod}
          onReceiptChange={onReceiptChange}
        />
      )}
    </>
  );
};

export default PaymentMethodSelector;
