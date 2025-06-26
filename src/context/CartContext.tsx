import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  readCart,
  saveCart,
  clearCart as clearCartFromStorage,
} from "@lib";
import { CartItem } from "@/types";

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  saveCart: (cart: CartItem[]) => void;
  clearCart: () => void;
  addItem: (item: CartItem, index?: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = readCart();
    setCart(storedCart);
  }, []);

  const clearCart = () => {
    clearCartFromStorage();
    setCart([]);
  };

  const addItem = (item: CartItem, index?: number) => {
    setCart((prev) => {
      const updated = [...prev];

      const itemWithUid = {
        ...item,
        uid: item.uid || uuidv4(),
      };

      if (index !== undefined) {
        updated[index] = itemWithUid;
      } else {
        updated.push(itemWithUid);
      }
      saveCart(updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, saveCart, clearCart, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within a CartProvider");
  return context;
}
