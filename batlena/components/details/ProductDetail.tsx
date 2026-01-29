



"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { PortableText } from "@portabletext/react";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const ProductDetail = ({ product }: Props) => {
  if (!product) return null;

  const { productDetails, description } = product;

  const detailItems = [
    { label: "Characteristics", value: productDetails?.characteristics },
    { label: "Material", value: productDetails?.material ? [productDetails.material] : [] },
    { label: "Weight", value: productDetails?.weight ? [productDetails.weight] : [] },
  ].filter((item) => item.value && item.value.length > 0);

  return (
    <div className="w-full flex flex-col md:flex-row justify-between my-10 gap-6 mb-15">
      {/* Left: Product Details Accordion */}
      <div className="w-full md:w-1/2">
        <h1 className="m-4 text-2xl font-semibold">Product Details</h1>

        <Accordion type="single" collapsible defaultValue={detailItems[0]?.label || ""} className="max-w-lg">
          {detailItems.map((item) => (
            <AccordionItem key={item.label} value={item.label}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc ml-5 text-gray-700">
                  {item.value!.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Right: Description */}
      <div className="flex-1 flex flex-col">
         {/* Shipping */}
                <div className="border-t pt-4 space-y-3 text-sm">
                    <div>
                        <p className="font-medium">Flat rate shipping</p>
                        <p className="text-gray-600">
                            €3.49 — Free over €10 <br />
                            Estimated delivery: Feb 6–20
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">Ship to Store</p>
                        <p className="text-gray-600">
                            €0.99 <br />
                            Estimated delivery: Feb 24–Mar 1
                        </p>
                    </div>
                </div>
        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Product Description</h2>
          {description && description.length > 0 ? (
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
                  ),
                  h2: ({ children }) => <h3 className="text-lg font-semibold mt-4">{children}</h3>,
                  h3: ({ children }) => <h4 className="text-md font-medium mt-3">{children}</h4>,
                },
              }}
            />
          ) : (
            <p className="text-sm text-gray-600">No description available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
