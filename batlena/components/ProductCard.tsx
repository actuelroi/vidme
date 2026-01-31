'use client'


import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { urlFor } from "@/sanity/lib/image";
import Link from 'next/link'
import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'
import { countAllVariantOptions, getDiscountLabel } from '@/utils/productOptions'


type ProductFromQuery = PRODUCTS_QUERY_RESULT[number]


interface Props {
  product: ProductFromQuery
}

const ProductCard = ({ product }: Props) => {




  const router = useRouter()

  if (!product) return null


 const optionCounts = countAllVariantOptions(product.variants)

  const discountLabel = getDiscountLabel(product.discount)


  return (
    <div className="w-65 rounded-xl border bg-white shadow-sm overflow-hidden group mx-3" role='button' onClick={() => router.push(`/product/${product?.slug?.current}`)}>
      {/* Image section */}
      <div className="relative h-45 bg-gray-100 group-hover:scale-105 cursor-pointer">
        {discountLabel && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
            {discountLabel}
          </span>
        )}
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              fill
              className="object-contain"
            />
          </Link>
        )}

      </div>

      {/* Content */}
      <div className="p-4 group-hover:scale-105 cursor-pointer">
        <p className="text-sm text-gray-500">
  {Object.entries(optionCounts)
    .map(([key, count]) => `${count} ${key}${count > 1 ? "s" : ""}`)
    .join(", ")}
</p>


        <h3 className="mt-1 text-base font-semibold leading-snug truncate">
          {product?.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="h-4 w-4 text-gray-300" />
          <span className="ml-1 text-sm text-gray-500">{product?.reviewCount}</span>
        </div>

        {/* Price */}
        <div className='flex flex-row justify-between'>

          <h1 className="mt-2 text-lg font-bold">€{product?.price}</h1>
          <AvatarGroup className="grayscale">
            <div className="flex items-center gap-2">
              
                <Avatar className="grayscale">
                  {product.vendor?.image ? (
                  <AvatarImage
                    src={urlFor(product.vendor.image).width(40).height(40).url()}
                    alt={product.vendor.name || 'product-vendor-image'}
                  />
                  ): (
                  <AvatarFallback>
                    {product.vendor?.name?.charAt(0)}
                  </AvatarFallback>
              )}
              </Avatar>
            </div>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </div>
  )
}

export default ProductCard














