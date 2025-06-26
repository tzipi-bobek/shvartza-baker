import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  InputField,
  DeliveryDateTime,
  OrderSummary,
  PaymentMethodSelector,
  FormButtons
} from './components/confirm';

import {
  useValidateOrder,
  useConfirmOrder
} from './hooks';

import { type PaymentMethod } from "@/types";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const { cart, sending, handleSubmit } = useConfirmOrder();

  const { missingFields, ready, subtotal, total } = useValidateOrder(
    cart,
    clientName,
    address,
    formattedDate,
    paymentMethod,
    receiptFile
  );

  if (!clientName) missingFields.push("name");
  if (!address) missingFields.push("address");
  if (!formattedDate) missingFields.push("date/time");
  if (!paymentMethod) missingFields.push("payment method");
  if (paymentMethod !== "cash" && !receiptFile) missingFields.push("receipt");


  const shippingCost = 2000;

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-8 pt-10 md:pt-14">
      <form
        data-testid="form-confirm-order"
        className="mx-auto font-serif"
        onSubmit={(e) =>
          handleSubmit(e, {
            clientName,
            address,
            deliveryTime: formattedDate,
            paymentMethod,
            receiptFile,
          })
        }
      >
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">Confirmar pedido</h2>

        <InputField
          label="Nombre:"
          value={clientName}
          placeholder="Ingrese su nombre"
          onChange={setClientName}
        />

        <InputField
          label="Dirección de entrega:"
          value={address}
          placeholder="Ejemplo: Calle 123, Ciudad"
          onChange={setAddress}
        />

        <DeliveryDateTime onChange={setFormattedDate} />

        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
        />

        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onReceiptChange={setReceiptFile}
        />

        <FormButtons
          onCancel={() => navigate("/carrito")}
          confirmText="Confirmar pedido"
          cancelText="Cancelar"
          sending={sending}
          ready={ready}
        />
      </form>
    </div>
  );
};

export default ConfirmOrder;
