"use client";

import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { Star } from "lucide-react";
import { BsQuestion } from "react-icons/bs";

import { useCallback, useEffect, useMemo, useState } from "react";
import OptionSelector from "./OptionSelector";

import { extractOptions } from "@/types/cart";
import AddToCartButton from "./AddToCartButton";
import useCartStore from "@/store/cartStore";


interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const RightSideProduct = ({ product }: Props) => {

  const minQty = product?.minOrder ?? 1;

  const [quantity, setQuantity] = useState(minQty);
   const { addItem,getItemCount } = useCartStore();


  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});




  const variants = useMemo(
    () => product?.variants ?? [],
    [product?.variants]
  );

  const options = useMemo(
    () => extractOptions(variants),
    [variants]
  );


  const handleOptionChange = useCallback(
    (key: string, value: string[]) => {
      setSelectedOptions((prev) => ({
        ...prev,
        [key]: value[0],
      }));
    },
    []
  );


  const selectedVariant = useMemo(() => {
    return variants.find((variant) => {
      if (!variant.options) return false;

      return Object.entries(selectedOptions).every(
        ([key, value]) =>
          !value ||
          variant.options?.[key as keyof typeof variant.options]?.includes(value)
      );
    });
  }, [variants, selectedOptions]);


  useEffect(() => {
    setSelectedOptions({});
    setQuantity(product?.minOrder ?? 1);
  }, [product?._id]);

  return (
    <div className="p-6 flex flex-col gap-5 max-w-xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-semibold leading-snug">
        {product?.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[...Array(Math.round(product?.rating ?? 4))].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        <span className="ml-2 text-sm text-gray-500">
          ({product?.reviewCount ?? 0} ratings)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">
          €{product?.price}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          Prices hors TVA
          <BsQuestion />
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {product?.freeShipping && (
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
        <div className="flex flex-col gap-4">
          {Object.entries(options).map(([key, values]) => (
            <OptionSelector
              key={key}
              label={key}
              options={values ?? []}
              value={selectedOptions[key as keyof typeof selectedOptions]
                ? [selectedOptions[key as keyof typeof selectedOptions]!]
                : []}
              onChange={(v) => handleOptionChange(key, v)}
            />
          ))}

          <OptionSelector
            label="Quantity"
            options={Array.from(
              { length: (selectedVariant?.stock ?? 10) - minQty + 1 },
              (_, i) => String(i + minQty)
            )}
            value={[String(quantity)]}
            onChange={(v) => {
              const newQty = Number(v[0]);
              setQuantity(newQty);

              if (product && selectedVariant) {
                const itemCount = getItemCount(product?._id, selectedVariant._key);
                addItem(product, selectedVariant._key, selectedOptions, newQty - itemCount);

              }
            }}
          />

        </div>



      </div>
      {product && selectedVariant && (
        <AddToCartButton
          product={product} // TS now knows product is NOT null
          variant={selectedVariant} // can still be undefined if no options selected
          selectedOptions={selectedOptions}
          quantity={quantity}
        />
      )}
    </div>
  );
};

export default RightSideProduct;