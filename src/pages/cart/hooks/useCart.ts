import { useNavigate } from "react-router-dom";
import { useCartContext } from "@context/CartContext";

const useCart = () => {
  const navigate = useNavigate();
  const { cart, setCart, saveCart, clearCart } = useCartContext();

  const editProduct = (index: number) => {
    navigate(`/carrito/editar/${index}`);
  };

  const deleteProduct = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    saveCart(newCart);
  };
  
  return {
    cart,
    editProduct,
    deleteProduct,
    clearCart,
  };  
};

export default useCart;
