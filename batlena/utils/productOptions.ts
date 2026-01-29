




export const countOptions = (options?: unknown[]) =>
  Array.isArray(options) ? options.length : 0



// utils/discount.ts
export const getDiscountLabel = (discount?: number) => {
  if (!discount || discount <= 0) return null
  return `Up to ${discount}% off`
}
