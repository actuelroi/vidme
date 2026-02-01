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
      className="w-65 rounded-xl border bg-white shadow-sm overflow-hidden group cursor-pointer"
      role="button"
      onClick={() => router.push(`/product/${product?.slug?.current || ''}`)}
    >
      {/* Image */}
      <div className="relative h-45 bg-gray-100 group-hover:scale-105 transition-transform">
        {discountLabel && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
            {discountLabel}
          </span>
        )}

        {product?.images?.[0] ? (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.images[0].alt || 'Product Image'}
              fill
              className="object-contain"
            />
          </Link>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 group-hover:scale-105 transition-transform">
        {/* Options */}
        {Object.keys(optionCounts).length > 0 && (
          <p className="text-sm text-gray-500">
            {Object.entries(optionCounts)
              .map(([key, count]) => `${count} ${key}${count > 1 ? "s" : ""}`)
              .join(", ")}
          </p>
        )}

        {/* Name */}
        <h3 className="mt-1 text-base font-semibold truncate">{product.name}</h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="h-4 w-4 text-gray-300" />
          <span className="ml-1 text-sm text-gray-500">{product.reviewCount ?? 0}</span>
        </div>

        {/* Price + Vendor */}
        <div className="flex justify-between mt-2 items-center">
          <h1 className="text-lg font-bold">€{product.price ?? 'N/A'}</h1>
          <AvatarGroup className="grayscale flex items-center gap-2">
            <Avatar>
              {product.vendor?.image ? (
                <AvatarImage
                  src={urlFor(product.vendor.image).width(40).height(40).url()}
                  alt={product.vendor.name || 'Vendor Image'}
                />
              ) : (
                <AvatarFallback>{product.vendor?.name?.charAt(0) ?? '?'}</AvatarFallback>
              )}
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
