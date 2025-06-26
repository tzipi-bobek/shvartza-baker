import { Upload } from "lucide-react";
import { useState } from "react";
import { type PaymentMethod } from "@/types";
import CopyButton from "./CopyButton";

interface PaymentMethodDetailsProps {
  selectedMethod: PaymentMethod;
  onReceiptChange: (file: File | null) => void;
}

const PaymentMethodDetails = ({
  selectedMethod,
  onReceiptChange,
}: PaymentMethodDetailsProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const paymentOptions: Record<PaymentMethod, {
    label?: string;
    value?: string;
    extra?: JSX.Element;
    cbu?: string;
  }> = {
    transfer: {
      label: "Alias",
      value: "shvartse.baker",
      extra: <p><strong>CBU:</strong> 0000000000000000000000</p>,
      cbu: "0000000000000000000000",
    },
    mercado_pago: {
      label: "Alias Mercado Pago",
      value: "shvartsebaker.mp",
      extra: <p>Recordá pagar desde saldo o débito, no con tarjeta de crédito.</p>,
    },
    cash: {
      extra: <p>Pagás en efectivo cuando recibís el pedido. ¡Gracias!</p>,
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onReceiptChange(file);
      setFileName(file.name);
    } else {
      onReceiptChange(null);
      setFileName(null);
    }
  };

  const method = paymentOptions[selectedMethod];
  const value = method.value;
  const extra = method.extra;

  return (
    <div className="border-l-2 border-[#d6d0c4] pl-4 pr-4 py-4 mt-4 space-y-4 shadow-[0_4px_3px_-2px_rgba(0,0,0,0.08)]">
      <h3 className="text-lg font-bold">Datos para el pago:</h3>

      {value && (
        <div className="space-y-2">
          <p><strong>{method.label}:</strong> {value}</p>
          {extra}
          <div className="flex gap-2 flex-wrap">
            <CopyButton label="Copiar alias" value={value} />
            {method.cbu && (
              <CopyButton label="Copiar CBU" value={method.cbu} />
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="payment-receipt" className="block mb-1 font-medium">Adjuntar comprobante de pago:</label>
            <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 border border-[#d6d0c4] font-serif rounded hover:bg-[#e3f3e3] transition-colors">
              <Upload size={16} /> Subir archivo
              <input
                id="payment-receipt"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {fileName && (
              <p className="text-sm text-gray-600 mt-2">
                Archivo seleccionado: <span className="font-medium">{fileName}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {!value && extra}
    </div>
  );
};

export default PaymentMethodDetails;
