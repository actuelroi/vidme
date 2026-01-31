"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { PortableText } from "@portabletext/react";
import { calculateDeliveryRange } from "@/utils/shipping";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const ProductDetail = ({ product }: Props) => {
  if (!product) return null;

  const { productDetails, description, freeShipping, variants = [] } = product;

  // Track selected variant (default to first variant)

  const safeVariants: NonNullable<typeof product.variants> = product.variants || [];
 const [selectedVariant, setSelectedVariant] = useState(safeVariants[0] || null);

  // Calculate delivery range based on selected variant
  const deliveryRange = calculateDeliveryRange(selectedVariant?.shippingTime || "standard");

  // Prepare product detail items
  const detailItems = [
    { label: "Characteristics", value: productDetails?.characteristics },
    { label: "Materiel", value: productDetails?.material ? [productDetails.material] : [] },
    { label: "Poids", value: productDetails?.weight ? [productDetails.weight] : [] },
  ].filter((item) => item.value && item.value.length > 0);

  return (
    <div className="w-full flex flex-col md:flex-row justify-between my-10 gap-6 mb-15">
      
      {/* Left: Product Details Accordion */}
      <div className="w-full md:w-1/2">
        <h1 className="m-4 text-2xl font-semibold">Details du produit</h1>

        <Accordion type="single" collapsible defaultValue={detailItems[0]?.label || ""} className="max-w-lg">
          {detailItems.map((item) => (
            <AccordionItem key={item.label} value={item.label}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc ml-5 text-gray-700 md:text-xl">
                  {item.value!.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Right: Description + Shipping + Variant Selector */}
      <div className="flex-1 flex flex-col">
        
      

        {/* Shipping */}
        <div className="border-t pt-4 space-y-3 text-sm">
          <div>
            <p className="font-medium md:text-2xl">Livraison</p>
            <p className="text-gray-600 md:text-xl">
              {freeShipping ? (
                <> <span>Gratuit</span></>
              ) : (
                <>3,49 € — Gratuit à partir de 20 €</>
              )}
              <br />
              Livraison estimée : {deliveryRange}
            </p>
          </div>

          <div>
            <p className="font-medium md:text-xl">Retrait en magasin</p>
            <p className="text-gray-600 md:text-xl">
              0,99 € <br />
              Livraison estimée : {calculateDeliveryRange("standard")}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-4">
          <h2 className="font-semibold md:text-2xl text-xl mb-2">Description du produit</h2>
          {description && description.length > 0 ? (
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="md:text-lg text-gray-600 leading-relaxed">{children}</p>
                  ),
                  h2: ({ children }) => <h3 className="md:text-xl font-semibold mt-4">{children}</h3>,
                  h3: ({ children }) => <h4 className="md:text-xl font-medium mt-3">{children}</h4>,
                },
              }}
            />
          ) : (
            <p className="md:text-xl text-gray-600">Pas de description disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
