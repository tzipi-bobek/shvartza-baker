import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product, CartItem } from "@/types";
import SelectField from "./SelectField";

interface OrderFormFieldsProps {
  product: Product;
  editingOrder?: CartItem | null;
  saveToCart: (newItem: CartItem) => void;
}

const OrderFormFields = ({
  product,
  editingOrder,
  saveToCart,
}: OrderFormFieldsProps) => {
  const navigate = useNavigate();

  const [options, setOptions] = useState({
    specification: "",
    specificationId: "",
    version: "",
    versionId: "",
    quantity: 0,
  });

  useEffect(() => {
    if (editingOrder) {
      setOptions({
        specification: editingOrder.specification,
        specificationId: editingOrder.specificationId,
        version: editingOrder.version,
        versionId: editingOrder.versionId,
        quantity: editingOrder.quantity,
      });
    } else {
      setOptions({
        specification: product.specifications[0]?.name ?? "",
        specificationId: product.specifications[0]?.id ?? "",
        version: product.versions[0]?.name ?? "",
        versionId: product.versions[0]?.id ?? "",
        quantity: product.prices[0]?.quantity ?? 1,
      });
    }
  }, [product, editingOrder]);

  const fields = [
    {
      id: "specification",
      label: "Especificación",
      options: product.specifications,
      getValue: () => options.specification,
      onChange: (newValue: string) => {
        const selected = product.specifications.find((e) => e.name === newValue);
        setOptions((prev) => ({
          ...prev,
          specification: newValue,
          specificationId: selected?.id ?? "",
        }));
      },
    },
    {
      id: "version",
      label: "Versión",
      options: product.versions,
      getValue: () => options.version,
      onChange: (newValue: string) => {
        const selected = product.versions.find((v) => v.name === newValue);
        setOptions((prev) => ({
          ...prev,
          version: newValue,
          versionId: selected?.id ?? "",
        }));
      },
    },
    {
      id: "quantity",
      label: "Cantidad",
      options: product.prices.map((p) => ({
        id: p.quantity.toString(),
        name: p.quantity.toString(),
      })),
      getValue: () => options.quantity.toString(),
      onChange: (newValue: string) => {
        setOptions((prev) => ({
          ...prev,
          quantity: Number(newValue),
        }));
      },
    },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {fields.map((field) => (
        <SelectField
          key={field.id}
          id={field.id}
          label={field.label}
          options={field.options.map((o) => ({
            value: o.name || o.id,
            label: o.name || o.id,
          }))}
          selectedValue={field.getValue()}
          onChange={field.onChange}
        />
      ))}

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <button
          onClick={() => {
            const totalPrice =
              product.prices.find((p) => p.quantity === options.quantity)?.total_price ?? 0;

            saveToCart({
              ...options,
              id: product.id,
              name: product.name,
              total_price: totalPrice,
            });
          }}
          className="btn-cremita btn-cremita-primario"
        >
          {editingOrder ? "Guardar los cambios" : "Agregar al carrito"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-cremita btn-cremita-secundario"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default OrderFormFields;
