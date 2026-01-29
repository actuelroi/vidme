"use client";

import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import Image from "next/image";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const ProductImage = ({ product }: Props) => {
  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {product.images.map((img, index) => (
          <button
            key={img._key}
            onClick={() => setActiveImage(img)}
            className={`relative w-22 h-22 border rounded-md overflow-hidden
              ${activeImage._key === img._key ? "border-black" : "border-gray-300"}
            `}
          >
            <Image
              src={urlFor(img).width(150).height(150).url()}
              alt={img.alt ?? `Product thumbnail ${index + 1}`}
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full md:w-127 h-75 md:h-127 order-1 md:order-2 border rounded-md hover:scale-105 transition cursor-pointer">
        <Image
          src={urlFor(activeImage).width(600).height(600).url()}
          alt={activeImage.alt ?? product.name ?? "Product image"}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default ProductImage;
