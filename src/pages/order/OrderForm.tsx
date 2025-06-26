import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Product, CartItem } from "@/types";
import { useCartContext } from "@context/CartContext";
import { supabase } from "@lib";
import OrderFormFields from "./components/item/OrderFormFields";

const OrderForm = () => {
  const navigate = useNavigate();
  const { idProducto, index } = useParams<string>();
  const location = useLocation();
  const productFromState = location.state?.product as Product | undefined;

  const [product, setProduct] = useState<Product | null>(productFromState ?? null);
  const [editingOrder, setEditingOrder] = useState<CartItem | null>(null);
  const { addItem } = useCartContext();

  useEffect(() => {
    if (productFromState) return;

    const fetchProduct = async (id: string | number) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error loading product:", error);
        return;
      }
      setProduct(data);
    };

    if (index !== undefined) {
      const indexInt = parseInt(index, 10);
      const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
      const order = cart[indexInt];

      if (!order) {
        navigate("/carrito");
        return;
      }

      setEditingOrder(order);
      fetchProduct(order.id);
    } else if (idProducto && index === undefined) {
      fetchProduct(idProducto);
    }
  }, [idProducto, index, productFromState, navigate]);

  const saveToCart = (newItem: CartItem) => {
    const indexInt = index !== undefined ? parseInt(index, 10) : undefined;

    const finalItem: CartItem = {
      ...newItem,
      uid: editingOrder?.uid,
    };

    addItem(finalItem, indexInt);
    navigate("/carrito");
  };

  if (!product) {
    return (
      <main className="flex justify-center py-10 font-serif text-lg text-gray-500 italic">
        Cargando producto…
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-8 pt-10 md:pt-14">
      <header>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
          {editingOrder ? "Editar pedido" : "Nuevo pedido"}
        </h1>
        <p className="mt-1 font-serif italic text-lg md:text-xl">
          {product.name}
        </p>
        <hr className="mt-4 mb-8 border-[#d6d0c4]" />
      </header>

      <section className="font-serif">
        <OrderFormFields
          product={product}
          editingOrder={editingOrder}
          saveToCart={saveToCart}
        />
      </section>
    </main>
  );
};

export default OrderForm;
