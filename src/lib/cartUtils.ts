import { CartItem } from "@/types";

export const readCart = (): CartItem[] =>
  JSON.parse(localStorage.getItem("cart") || "[]");

export const saveCart = (cart: CartItem[]) =>
  localStorage.setItem("cart", JSON.stringify(cart));

export const clearCart = () => localStorage.removeItem("cart");
