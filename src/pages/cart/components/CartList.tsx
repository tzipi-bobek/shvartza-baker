import { Trash2, Edit } from "lucide-react";
import { CartItem } from "@/types";

interface Props {
  cart: CartItem[];
  editProduct: (index: number) => void;
  openDeleteModal: (index: number) => void;
}

const CartList = ({ cart, editProduct, openDeleteModal }: Props) => {
  return (
    <div
      className="
        grid gap-6
        grid-cols-[repeat(auto-fill,minmax(230px,1fr))]
      "
    >
      {cart.map((item, index) => (
        <article
          key={item.uid || index}
          className="
            border border-[#d6d0c4]
            p-6
            flex flex-col justify-between
            font-serif
          "
        >
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-base italic text-gray-600">
              {item.specification}
            </p>
            {item.version && (
              <p className="text-base text-gray-600">Versión: {item.version}</p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-medium">x&nbsp;{item.quantity}</span>
            <div className="flex gap-6">
              <button
                onClick={() => editProduct(index)}
                className="hover:text-yellow-800 transition-colors"
                aria-label="Editar"
              >
                <Edit size={24} />
              </button>
              <button
                onClick={() => openDeleteModal(index)}
                className="hover:text-red-800 transition-colors"
                aria-label="Eliminar"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default CartList;
