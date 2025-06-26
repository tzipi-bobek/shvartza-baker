export interface Product {
    id: number;
    name: string;
    specifications: { id: string; name: string }[];
    versions: { id: string; name: string }[];
    prices: { quantity: number; total_price: number }[];
    image: string;
}

export interface CartItem {
    id: number;
    name: string;
    specification: string;
    specificationId: string;
    version: string;
    versionId: string;
    quantity: number;
    total_price: number;
    uid?: string;
}

export const availableMethods = ["transfer", "mercado_pago", "cash"] as const;

export type PaymentMethod = typeof availableMethods[number];
