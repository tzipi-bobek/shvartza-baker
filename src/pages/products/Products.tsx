import { useRef } from "react";
import useProducts from "./hooks/useProducts";
import ProductItem from "./components/ProductItem";

const Products = () => {
  const { products, loading } = useProducts();
  const productsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const scrollToProduct = (id: number) => {
    const element = productsRefs.current[id];
    if (element) {
      const navbarHeight = 80;
      const position = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto pt-10 px-4">
      {loading && <p className="text-gray-500">Cargando productos...</p>}

      <nav className="mb-6">
        <ul className="flex flex-wrap gap-4 text-black font-semibold">
          {products.map((product) => (
            <li
              key={product.id}
              className="cursor-pointer"
              onClick={() => scrollToProduct(product.id)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        {products.map((product) => (
          <div
            key={product.id}
            ref={(el) => (productsRefs.current[product.id] = el)}
          >
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
