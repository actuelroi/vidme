



"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import useCartStore from "@/store/cartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import PriceFormatter from "../product/PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface AddToCartButtonProps {
  product: NonNullable<PRODUCT_BY_ID_QUERY_RESULT>;
  variant: {
    _key: string;
    stock: number | null;
    options: Record<string, string[] | undefined> | null;
  };
  selectedOptions: Record<string, string>;
  quantity: number;
  className?: string;
}

const AddToCartButton = ({ product, variant, selectedOptions, quantity, className }: AddToCartButtonProps) => {
  const { addItem, getItemCount } = useCartStore();

  const [isClient, setIsClient] = useState(false);

  const [itemCount, setItemCount] = useState(
    getItemCount(product._id, variant._key, selectedOptions)
  );


  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update itemCount whenever store changes
  useEffect(() => {
    setItemCount(getItemCount(product._id, variant._key, selectedOptions));
  }, [getItemCount, selectedOptions, product._id, variant._key]);


  const handleAddToCart = () => {
    if (!variant) {
        toast.error("Veuillez selectionner une option");
        return;
    }

    // Check if all required options are selected
    if (variant.options) {
        const missingOptions = Object.keys(variant.options).filter(
            (key) => !selectedOptions[key]
        );
        if (missingOptions.length > 0) {
            toast.error(
                `Veuillez selectionner: ${missingOptions.join(", ")}`
            );
            return;
        }
    }

    const minQty = product.minOrder ?? 1;
    addItem(product, variant._key, selectedOptions, quantity ?? minQty);
    toast.success(`${product.name} ajouté au panier`);
    setItemCount(getItemCount(product._id, variant._key, selectedOptions));
};


  if (!isClient || !variant) return null;


  

  const isDisabled = variant.stock === 0;




  return (
    <div className="w-full flex flex-col items-center gap-2">
      {itemCount > 0 ? (
        <div className="text-sm w-full">
          {/* Quantity Buttons */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantité</span>
            <QuantityButtons
              product={product}
              variantKey={variant._key}
              variantStock={variant.stock}
              onQuantityChange={(newQty) => setItemCount(newQty)}
               selectedOptions={selectedOptions}
            />
          </div>

          {/* Total price */}
          <div className="flex items-center justify-between border-t pt-1 mt-1">
            <span className="text-xs font-semibold">Total</span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isDisabled}
          size="lg"
          className={cn(
            "mt-2 flex items-center justify-center bg-orange-500 w-full text-white py-3 border border-darkColor/30 font-semibold tracking-wide hover:text-white",
            className
          )}
        >
          <span className="text-lg font-semibold">Ajouter au panier</span>
          <FaCartShopping size={22} />
        </Button>
      )}

      {/* Go to cart */}
      {itemCount > 0 && (
        <Link href="/cart">
          <button
            disabled={isDisabled}
            className="mt-4 flex items-center justify-center gap-3 py-3 bg-orange-500 hover:bg-orange-600 transition text-white px-2 cursor-pointer rounded-md"
          >
            <span className="text-sm font-semibold">Passer à la commande</span>
            <ExternalLink size={22} />
          </button>
        </Link>
      )}
    </div>
  );
};

export default AddToCartButton;
