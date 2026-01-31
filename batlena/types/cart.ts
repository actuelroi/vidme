import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";


export interface CartItem {
  productId: string;
  variantKey: string; // variant._key
  product: PRODUCT_BY_ID_QUERY_RESULT;
  quantity: number;
  options: Record<string, string>; // dynamic options
  basePrice: number;
}


export function extractOptions(
  variants: {
    options: Record<string, unknown> | null;
  }[]
) {
  const result: Record<string, string[]> = {};

  variants.forEach((variant) => {
    if (!variant.options) return;

    Object.entries(variant.options).forEach(([key, values]) => {
      if (!Array.isArray(values) || values.length === 0) return;

      if (!result[key]) {
        result[key] = [];
      }

      values.forEach((v) => {
        if (typeof v === "string" && !result[key].includes(v)) {
          result[key].push(v);
        }
      });
    });
  });

  return result;
}
