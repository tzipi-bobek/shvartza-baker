import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadReceipt, generateOrderMessage } from "@lib";
import { useCartContext } from "@context/CartContext";

export const useConfirmOrder = () => {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCartContext();

  const getCustomReceiptName = (
    clientName: string,
    deliveryTime: string,
    extension: string
  ) => {
    const cleanName = clientName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const match = deliveryTime.match(/\d{2}\/\d{2}/);
    const hora = deliveryTime.match(/\d{2}:\d{2}/)?.[0].replace(":", "") || "0000";

    const [day, month] = match ? match[0].split("/") : ["00", "00"];

    const currentYear = new Date().getFullYear();
    const fecha = `${currentYear}-${month}-${day}`;

    return `${fecha}-${cleanName}-${hora}.${extension}`;
  };

  const placeOrder = async (
    clientName: string,
    address: string,
    deliveryTime: string,
    paymentMethod: string,
    receiptFile: File | null
  ) => {
    if (cart.length === 0) return;
    const receiptUrl = receiptFile
      ? await uploadReceipt(
        receiptFile,
        getCustomReceiptName(clientName, deliveryTime, receiptFile.name.split(".").pop() || "file")
      )
      : undefined;

    const message = generateOrderMessage(
      clientName,
      address,
      deliveryTime,
      paymentMethod,
      cart,
      receiptUrl ?? undefined
    );

    const url = `https://wa.me/${import.meta.env.VITE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    clearCart();
    navigate("/");
  };

  const handleSubmit = async (
    e: React.FormEvent,
    data: {
      clientName: string;
      address: string;
      deliveryTime: string;
      paymentMethod: string;
      receiptFile: File | null;
    }
  ) => {
    e.preventDefault();
    setSending(true);

    const {
      clientName,
      address,
      deliveryTime,
      paymentMethod,
      receiptFile,
    } = data;

    if (paymentMethod === "cash" || receiptFile) {
      await placeOrder(
        clientName,
        address,
        deliveryTime,
        paymentMethod,
        receiptFile
      );
    } else {
      console.error("Comprobante requerido para el método de pago seleccionado.");
    }

    setSending(false);
  };

  return {
    cart,
    sending,
    handleSubmit,
  };
};
