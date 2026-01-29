// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, PRODUCT_BY_ID_QUERY_RESULT } from "./sanity.types";

export interface CartItem {
  product: PRODUCT_BY_ID_QUERY_RESULT;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedShoesSize?: string;
  basePrice: number;
}

interface CartState {
  items: CartItem[];

  addItem: (
    product: PRODUCT_BY_ID_QUERY_RESULT,
    selectedSize?: string,
    selectedColor?: string,
    selectedShoesSize?: string,
   
  ) => void;

  removeItem: (
    productId: string,
    selectedSize?: string,
    selectedColor?: string,
    selectedShoesSize?: string
  ) => void;

  deleteCartProduct: (
    productId: string,
    selectedSize?: string,
    selectedColor?: string,
    selectedShoesSize?: string
  ) => void;

  resetCart: () => void;

  getItemCount: (
    productId: string,
    selectedSize?: string,
    selectedColor?: string,
    selectedShoesSize?: string
  ) => number;

  getTotalPrice: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, selectedSize, selectedColor, selectedShoesSize) => {
        const basePrice = product?.price ?? 0;

        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.product?._id === product?._id &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor &&
              item.selectedShoesSize === selectedShoesSize
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item === existing
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
                selectedSize,
                selectedColor,
                selectedShoesSize,
                basePrice,
              },
            ],
          };
        });
      },

      removeItem: (productId, selectedSize, selectedColor, selectedShoesSize) => {
        set((state) => ({
          items: state.items.flatMap((item) => {
            const match =
              item.product?._id === productId &&
              item.selectedSize === selectedSize &&
              item.selectedColor === selectedColor &&
              item.selectedShoesSize === selectedShoesSize;

            if (!match) return [item];

            if (item.quantity > 1) {
              return [{ ...item, quantity: item.quantity - 1 }];
            }

            return [];
          }),
        }));
      },

      deleteCartProduct: (productId, selectedSize, selectedColor, selectedShoesSize) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.product?._id !== productId ||
              item.selectedSize !== selectedSize ||
              item.selectedColor !== selectedColor ||
              item.selectedShoesSize !== selectedShoesSize
          ),
        })),

      resetCart: () => set({ items: [] }),

      getItemCount: (productId, selectedSize, selectedColor, selectedShoesSize) => {
        const item = get().items.find(
          (item) =>
            item.product?._id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor &&
            item.selectedShoesSize === selectedShoesSize
        );
        return item?.quantity ?? 0;
      },

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const discount = item.product?.discount ?? 0;
          const discountedPrice =
            item.basePrice - (item.basePrice * discount) / 100;

          return total + discountedPrice * item.quantity;
        }, 0),
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export default useCartStore;
