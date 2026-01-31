// utils/variantOptions.ts

export type Variant = {
  _key: string 
  price: number | null;
  stock: number | null;
  options?: Record<string, string | undefined> |null;
};





export const getOptionValues = (variants: Variant[], key: string) => {
  const values = variants.flatMap(v => {
    const val = v.options?.[key as keyof typeof v.options];
    if (!val) return [];
    // If the option is an array (like color), flatten it
    return Array.isArray(val) ? val : [val];
  });

  // Remove duplicates
  return Array.from(new Set(values));
};

export const isOptionAvailable = (
  variants: Variant[],
  optionKey: string,
  value: string,
  selectedOptions: Record<string, string>
) => {
  return variants.some(v => {
    if (v.options?.[optionKey] !== value) return false;

    return Object.entries(selectedOptions).every(
      ([key, selectedValue]) =>
        !selectedValue || v.options?.[key] === selectedValue
    );
  });
};


type VariantOptionObject = { name?: string; values?: string[] }

export const countAllVariantOptions = (
  variants: { options: VariantOptionObject[] | null }[] | null
): Record<string, number> => {
  if (!variants) return {}

  const optionMap: Record<string, Set<string>> = {}

  variants.forEach(variant => {
    if (!variant.options) return

    variant.options.forEach(option => {
      const key = option.name
      const values = option.values
      if (!key || !Array.isArray(values)) return

      if (!optionMap[key]) optionMap[key] = new Set()
      values.forEach(value => optionMap[key].add(value))
    })
  })

  return Object.fromEntries(
    Object.entries(optionMap).map(([key, set]) => [key, set.size])
  )
}

export function convertSanityOptionsToArray(
  options: { name?: string; values?: string[]; _type?: string; _key?: string }[] | null
): { name?: string; values?: string[] }[] | null {
  if (!options) return null

  return options.map(opt => ({
    name: opt.name,
    values: opt.values,
  }))
}

