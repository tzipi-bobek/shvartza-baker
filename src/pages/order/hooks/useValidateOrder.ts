import { useMemo } from "react";
import { CartItem, PaymentMethod } from "@/types";

const useValidateOrder = (
  cart: CartItem[],
  clientName: string,
  address: string,
  formattedDate: string,
  paymentMethod: PaymentMethod | "",
  receiptFile: File | null
) => {
  const shippingCost = 2000;

  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!clientName) missing.push("name");
    if (!address) missing.push("address");
    if (!formattedDate) missing.push("date / time");
    if (!paymentMethod) missing.push("payment method");
    if (paymentMethod !== "cash" && !receiptFile) missing.push("receipt");
    return missing;
  }, [clientName, address, formattedDate, paymentMethod, receiptFile]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.total_price, 0),
    [cart]
  );

  const total = useMemo(() => subtotal + shippingCost, [subtotal]);

  const ready = missingFields.length === 0;

  return { missingFields, ready, subtotal, total, shippingCost };
};

export default useValidateOrder;
