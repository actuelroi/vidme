




// utils/discount.ts
export const getDiscountLabel = (discount?: number) => {
  if (!discount || discount <= 0) return null
  return `Up to ${discount}% off`
}


type VariantOptionObject = {
  name?: string
  values?: string[]
}

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

  // Convert Set → count
  return Object.fromEntries(
    Object.entries(optionMap).map(([key, set]) => [key, set.size])
  )
}
