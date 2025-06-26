import { useEffect, useState } from "react";
import { supabase } from "@lib";
import { Product } from "@/types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error loading products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export default useProducts;
