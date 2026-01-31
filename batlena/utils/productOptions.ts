




// utils/discount.ts
export const getDiscountLabel = (discount?: number) => {
  if (!discount || discount <= 0) return null
  return `Up to ${discount}% off`
}




type VariantOptions = Record<string, string[] | undefined>

export const countAllVariantOptions = (
  variants: { options: VariantOptions | null }[] | null
): Record<string, number> => {
  if (!variants) return {}

  const optionMap: Record<string, Set<string>> = {}

  variants.forEach(variant => {
    if (!variant.options) return

    Object.entries(variant.options).forEach(([optionName, values]) => {
      if (!Array.isArray(values)) return

      if (!optionMap[optionName]) {
        optionMap[optionName] = new Set()
      }

      values.forEach(value => optionMap[optionName].add(value))
    })
  })

  // Convert Set → count
  return Object.fromEntries(
    Object.entries(optionMap).map(([key, set]) => [key, set.size])
  )
}
