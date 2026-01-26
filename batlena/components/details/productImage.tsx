"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/im1.jpg",
  "/im2.jpg",
  "/im1.jpg",
  "/im2.jpg",
  "/im1.jpg",
];

const ProductImage = () => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`relative w-22 h-22 border rounded-md overflow-hidden
              ${activeImage === img ? "border-black" : "border-gray-300"}
            `}
          >
            <Image
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full md:w-127 h-75 md:h-127 order-1 md:order-2 border rounded-md">
        <Image
          src={activeImage}
          alt="Selected product image"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default ProductImage;
