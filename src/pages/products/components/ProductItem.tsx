import { useNavigate } from "react-router-dom";
import { Product } from "@/types";

const ProductItem = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <section
      id={`product-${product.id}`}
      className="
        border-t border-[#d6d0c4]
        py-6 md:py-14
        flex flex-col sm:flex-row gap-6 sm:gap-12
        scroll-mt-20 md:scroll-mt-32
      "
    >
      <figure className="w-full sm:w-28 md:w-[280px] shrink-0">
        <img
          src={`/products/${product.image || 'sandwitch.jpg'}`}
          alt={product.name}
          className="w-full h-32 sm:h-32 md:h-auto object-cover rounded-md"
        />
      </figure>

      <div className="flex-1">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight">
          {product.name}
        </h2>

        <p className="mt-1 font-serif italic text-lg md:text-xl">
          {product.specifications.map((s) => s.name).join(" / ")}
        </p>

        <hr className="mt-4 mb-2 border-[#d6d0c4]" />

        <div className="flex text-base md:text-xl">
          <div className="flex-1 min-w-0">
            {product.versions.map((v) => (
              <div key={v.id} className="px-4 md:px-6 py-1 break-words whitespace-normal">
                {v.name}
              </div>
            ))}
          </div>

          <div className="w-28 md:w-40 pl-3 md:pl-4 border-l border-[#d6d0c4] text-right font-medium">
            {product.prices.map((p) => (
              <div key={p.quantity} className="py-1">
                <div className="flex justify-between">
                  <span className="whitespace-nowrap">x{p.quantity}</span>
                  <span className="whitespace-nowrap">${p.total_price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/carrito/nuevo/${product.id}`, { state: { product } })}
          className="
            mt-8
            w-full
            border border-[#d6d0c4]
            py-3
            font-serif text-lg
            transition-colors
            hover:bg-[#f2f0eb]
          "
        >
          Agregar al carrito
        </button>
      </div>
    </section>
  );
};

export default ProductItem;
