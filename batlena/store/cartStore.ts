import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";

export interface CartItem {
    productId: string;
    variantKey: string;
    product: PRODUCT_BY_ID_QUERY_RESULT;
    quantity: number;
    options: Record<string, string>;
    basePrice: number;
}

interface CartState {
    items: CartItem[];

    addItem: (
        product: NonNullable<PRODUCT_BY_ID_QUERY_RESULT>,
        variantKey: string,
        options: Record<string, string>,
        quantity: number
    ) => void;

    removeItem: (
        productId: string,
        variantKey: string,
        options: Record<string, string>
    ) => void;

    deleteCartProduct: (
        productId: string,
        variantKey: string,
        options: Record<string, string>
    ) => void;

    getItemCount: (
        productId: string,
        variantKey: string,
        options?: Record<string, string>
    ) => number;

    getGroupedItems: () => CartItem[];

    getTotalPrice: () => number;

    resetCart: () => void;
}

// Helper to compare options objects
export const isSameOptions = (a: Record<string, string>, b: Record<string, string>) => {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(key => a[key] === b[key]);
};

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, variantKey, options, quantity) => {
                const basePrice = product?.price ?? 0;

                set((state) => {
                    const existing = state.items.find(
                        (item) =>
                            item.productId === product._id &&
                            item.variantKey === variantKey &&
                            isSameOptions(item.options, options)
                    );

                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item === existing
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            {
                                productId: product._id,
                                variantKey,
                                product,
                                quantity,
                                options,
                                basePrice,
                            },
                        ],
                    };
                });
            },

            removeItem: (productId, variantKey, options) => {
                set((state) => ({
                    items: state.items.flatMap((item) => {
                        if (
                            item.productId === productId &&
                            item.variantKey === variantKey &&
                            isSameOptions(item.options, options)
                        ) {
                            return item.quantity > 1
                                ? [{ ...item, quantity: item.quantity - 1 }]
                                : [];
                        }
                        return [item];
                    }),
                }));
            },

            deleteCartProduct: (productId, variantKey, options) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            item.productId !== productId ||
                            item.variantKey !== variantKey ||
                            !isSameOptions(item.options, options)
                    ),
                }));
            },

            getGroupedItems: () => {
                // Return items as-is because now each variant + options is already unique
                return get().items;
            },

            getItemCount: (productId, variantKey, options) =>
                get().items.find(
                    (item) =>
                        item.productId === productId &&
                        item.variantKey === variantKey &&
                        (!options || isSameOptions(item.options, options))
                )?.quantity ?? 0,

            getTotalPrice: () =>
                get().items.reduce((total, item) => {
                    const discount = item.product?.discount ?? 0;
                    const discountedPrice =
                        item.basePrice - (item.basePrice * discount) / 100;

                    return total + discountedPrice * item.quantity;
                }, 0),

            resetCart: () => {
                set({ items: [] });
                if (typeof window !== "undefined") {
                    localStorage.removeItem("cart-store-dynamic");
                    window.dispatchEvent(new Event("storage"));
                }
            },

        }),
        {
            name: "cart-store-dynamic",
        }
    )
);

export default useCartStore;
