import { renderHook } from "@testing-library/react";
import { useValidateOrder } from "@pages/order/hooks";
import { describe, expect, test } from "vitest";

const sampleCart = [
    {
        id: 1,
        name: "Producto 1",
        specification: "Tipo A",
        specificationId: "A1",
        version: "V1",
        versionId: "V1",
        quantity: 2,
        total_price: 3000,
        uid: "abc",
    },
    {
        id: 2,
        name: "Producto 2",
        specification: "Tipo B",
        specificationId: "B1",
        version: "V2",
        versionId: "V2",
        quantity: 1,
        total_price: 2000,
        uid: "def",
    },
];

describe("useValidateOrder", () => {
    test("returns all fields correctly when order is complete with transfer", () => {
        const { result } = renderHook(() =>
            useValidateOrder(
                sampleCart,
                "Tzipi",
                "Calle Falsa",
                "Lunes 01/07 12:30",
                "transfer",
                new File(["test"], "comprobante.jpg")
            )
        );

        expect(result.current.ready).toBe(true);
        expect(result.current.missingFields).toEqual([]);
        expect(result.current.subtotal).toBe(5000);
        expect(result.current.shippingCost).toBe(2000);
        expect(result.current.total).toBe(7000);
    });

    test("flags missing fields when order is incomplete", () => {
        const { result } = renderHook(() =>
            useValidateOrder(
                [],
                "",
                "",
                "",
                "",
                null
            )
        );

        expect(result.current.ready).toBe(false);
        expect(result.current.missingFields).toContain("name");
        expect(result.current.missingFields).toContain("address");
        expect(result.current.missingFields).toContain("date / time");
        expect(result.current.missingFields).toContain("payment method");
        expect(result.current.missingFields).toContain("receipt");
        expect(result.current.subtotal).toBe(0);
        expect(result.current.total).toBe(2000);
    });

    test("does not require receipt for cash", () => {
        const { result } = renderHook(() =>
            useValidateOrder(
                sampleCart,
                "Nombre",
                "Dirección",
                "Martes 02/07 10:30",
                "cash",
                null
            )
        );

        expect(result.current.ready).toBe(true);
        expect(result.current.missingFields).not.toContain("receipt");
    });
});
