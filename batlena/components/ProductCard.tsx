'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Star } from 'lucide-react'

import { urlFor } from "@/sanity/lib/image"
import { countAllVariantOptions, getDiscountLabel } from '@/utils/productOptions'
import { convertSanityOptionsToArray } from '@/utils/variantOptions'
import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'

type ProductFromQuery = PRODUCTS_QUERY_RESULT[number]

interface Props {
  product: ProductFromQuery
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter()

  if (!product) return null

  const optionCounts = countAllVariantOptions(
    product.variants?.map(variant => ({
      ...variant,
      options: convertSanityOptionsToArray(variant.options),
    })) ?? []
  )

  const discountLabel = getDiscountLabel(product.discount)

  // Only scroll if 'sale-hero' exists
  useEffect(() => {
    const hero = document.getElementById('sale-hero')
    if (hero) {
      const height = hero.offsetHeight
      window.scrollTo({ top: height, behavior: 'smooth' })
    }
  }, [])

  return (
   <div
  className="flex h-full flex-col rounded-xl border bg-white shadow-sm overflow-hidden cursor-pointer"
  onClick={() => router.push(`/product/${product.slug?.current}`)}
>
  {/* Image */}
  <div className="relative aspect-3/4 bg-gray-100">
    {discountLabel && (
      <span className="absolute top-2 left-2 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
        {discountLabel}
      </span>
    )}

    {product.images?.[0] && (
      <Image
        src={urlFor(product.images[0]).url()}
        alt={product.images[0].alt || 'Image'}
        fill
        className="object-contain"
      />
    )}
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 p-4">
    <p className="text-sm text-gray-500">
      {Object.entries(optionCounts)
        .map(([key, count]) => `${count} ${key}${count > 1 ? "s" : ""}`)
        .join(", ")}
    </p>

    <h3 className="mt-1 text-base font-semibold line-clamp-2">
      {product.name}
    </h3>

    {/* Rating */}
    <div className="mt-2 flex items-center gap-1">
      {[...Array(4)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      <Star className="h-4 w-4 text-gray-300" />
      <span className="ml-1 text-sm text-gray-500">
        {product.reviewCount ?? 0}
      </span>
    </div>

    {/* Push price to bottom */}
    <div className="mt-auto flex justify-between items-center pt-3">
      <h1 className="text-lg font-bold">€{product.price}</h1>

      <Avatar>
        {product.vendor?.image ? (
          <AvatarImage
            src={urlFor(product.vendor.image).width(40).height(40).url()}
          />
        ) : (
          <AvatarFallback>
            {product.vendor?.name?.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  </div>
</div>

  )
}

export default ProductCard
