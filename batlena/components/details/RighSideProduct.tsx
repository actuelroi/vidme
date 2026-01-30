"use client";

import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { Star } from "lucide-react";
import { BsQuestion } from "react-icons/bs";

import { useState } from "react";
import OptionSelector from "./OptionSelector";
import AddToCartButton from "../product/AddToCartButton";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const RightSideProduct = ({ product }: Props) => {
  if (!product) return null;
   const minQty = product.minOrder ?? 1;
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTaille, setSelectedTaille] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(minQty);

  return (
    <div className="p-6 flex flex-col gap-5 max-w-xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-semibold leading-snug">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[...Array(Math.round(product.rating ?? 4))].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="ml-2 text-sm text-gray-500">
          ({product.reviewCount ?? 0} ratings)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">
          €{product.price}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          Prices hors TVA
          <BsQuestion />
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product.freeShipping && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
            Free shipping
          </span>
        )}
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
          30-day return
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-4">
        {product.sizes && (
          <OptionSelector
            label="Size"
            options={product.sizes}
            value={selectedSizes}
            onChange={setSelectedSizes}
          />
        )}

        {product.colors && (
          <OptionSelector
            label="Color"
            options={product.colors}
            value={selectedColors}
            onChange={setSelectedColors}
            multiple
          />
        )}


        {product.taille && (
          <OptionSelector
            label="Taille"
            options={product.taille}
            value={selectedTaille}
            onChange={setSelectedTaille}
            multiple
          />
        )}

        <OptionSelector
          label="Quantity"
          options={Array.from(
            { length: (product.stock ?? 10) - (product.minOrder ?? 1) + 1 },
            (_, i) => String(i + (product.minOrder ?? 1))
          )}
          value={[String(quantity)]}
          onChange={(v) => setQuantity(Number(v[0]))}
        />

      </div>
      <AddToCartButton 
      product={product}
      selectedColor={selectedColors[0]}
       quantity={quantity}
      
      />
    </div>
  );
};

export default RightSideProduct;
