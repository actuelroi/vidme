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
    options: {
      _key: string;
      _type: "option";
      name?: string;
      values?: string[];
    }[] | null;
  }[]
) {
  const result: Record<string, string[]> = {};

  variants.forEach((variant) => {
    if (!variant.options) return;

    variant.options.forEach((option) => {
      const key = option.name;
      const values = option.values;

      if (!key || !Array.isArray(values) || values.length === 0) return;

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



export function optionsArrayToRecord(
  options: { name?: string; values?: string[] }[] | null
): Record<string, string[] | undefined> | null {
  if (!options) return null;

  return options.reduce((acc, opt) => {
    if (opt.name && opt.values) {
      acc[opt.name] = opt.values;
    }
    return acc;
  }, {} as Record<string, string[] | undefined>);
}

