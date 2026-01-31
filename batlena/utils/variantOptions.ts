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
