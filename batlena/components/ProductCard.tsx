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

const ProductCard = () => {

  const router = useRouter()
  return (
    <div className="w-65 rounded-xl border bg-white shadow-sm overflow-hidden group" role='button' onClick={()=>router.push('/details')}>
      {/* Image section */}
      <div className="relative h-45 bg-gray-100 group-hover:scale-105 cursor-pointer">
        <span className="absolute top-2 left-2 z-10 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
          Up to 8% off
        </span>
        <Image
          src="/im1.jpg"
          alt="Mini Metal Reading Glasses"
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 group-hover:scale-105 cursor-pointer">
        <p className="text-sm text-gray-500">7 colors, 7 sizes</p>
        <h3 className="mt-1 text-base font-semibold leading-snug">
          Mini Metal Reading Glasses Reader Spectacles
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <Star className="h-4 w-4 text-gray-300" />
          <span className="ml-1 text-sm text-gray-500">198</span>
        </div>

        {/* Price */}
        <div className='flex flex-row justify-between'>

          <h1 className="mt-2 text-lg font-bold">€4.95</h1>
          <AvatarGroup className="grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </div>
    </div>
  )
}

export default ProductCard














