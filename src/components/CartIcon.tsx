import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartContext } from "@context/CartContext";

const CartIcon = () => {
  const { cart } = useCartContext();

  return (
    <Link to="/carrito" aria-label="Carrito" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#6b8b74] text-white text-xs font-bold px-2 py-[1px] rounded-full shadow">
          {cart.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
