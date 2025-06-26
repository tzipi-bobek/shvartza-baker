import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "./hooks/useCart";
import { CartList, ConfirmationModal } from "./components";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    editProduct,
    deleteProduct,
    clearCart
  } = useCart();

  const [modalContext, setModalContext] = useState<{
    type: "removeOne" | "clearAll";
    index?: number;
  } | null>(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const openClearModal = () => {
    setModalContext({ type: "clearAll" });
  };

  const handleConfirm = () => {
    if (modalContext?.type === "removeOne" && modalContext.index !== undefined) {
      deleteProduct(modalContext.index);
      setToastMessage("Producto eliminado con éxito.");
    } else if (modalContext?.type === "clearAll") {
      clearCart();
      setToastMessage("Carrito vaciado.");
    }

    setModalContext(null);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <main className="mx-auto w-full max-w-7xl pt-10 px-4 relative">
      <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
        Mi carrito
      </h1>

      {
        cart.length === 0 ? (
          <p className="font-serif italic text-lg text-gray-500">
            El carrito está vacío.
          </p>
        ) : (
          <>
            <CartList
              cart={cart}
              editProduct={editProduct}
              openDeleteModal={(index) =>
                setModalContext({ type: "removeOne", index })
              }
            />

            <div className="mt-10 space-y-4">
              <button
                onClick={() => navigate('/carrito/confirmar')}
                className="btn-cremita btn-cremita-primario"
              >
                Enviar pedido
              </button>

              <button
                onClick={openClearModal}
                className="btn-cremita btn-cremita-secundario"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )
      }

      <ConfirmationModal
        open={modalContext !== null}
        message={
          modalContext?.type === "clearAll"
            ? "¿Querés vaciar todo el carrito?"
            : "¿Querés eliminar este producto?"
        }
        onConfirm={handleConfirm}
        onCancel={() => setModalContext(null)}
      />

      {toastVisible && (
        <div className="fixed bottom-6 right-6 bg-white border border-[#d6d0c4] text-black px-4 py-2 rounded shadow transition-opacity duration-300 font-serif text-sm">
          {toastMessage}
        </div>
      )}
    </main>
  );
};

export default Cart;
