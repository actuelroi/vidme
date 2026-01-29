"use client";
import {  PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";

import useCartStore from "@/store";
import QuantityButtons from "./QuantityButtons";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import Link from "next/link";


interface Props {
    product: PRODUCT_BY_ID_QUERY_RESULT;
    className?: string;
    selectedSize?: string;
    selectedColor?: string;
    selectedShoesSize?: string;
     quantity?: number;
}

const AddToCartButton = ({ product, className, selectedSize, selectedColor, selectedShoesSize, quantity }: Props) => {
    const { addItem, getItemCount } = useCartStore();
    const [isClient, setIsClient] = useState(false);

    if (!product) {
        return
    }




    const itemCount = getItemCount(product._id, selectedSize, selectedColor, selectedShoesSize);
    const isOutOfStock = product?.stock === 0;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }


    const handleAddToCart = () => {
        const minQty = product.minOrder ?? 1;

        // Check if size/color selection is required but not provided
        if ((product.sizes && product.sizes.length > 0) && !selectedSize) {
            toast.error('Failed, please select a size');
            return;
        }

        if ((product.colors && product.colors.length > 0) && !selectedColor) {
            toast.error('Failed, please select a color');
            return;
        }
        if ((product.shoeSizes && product.shoeSizes.length > 0) && !selectedShoesSize) {
            toast.error('Failed, please select a size and color first');
            return;
        }

        addItem(
            product, 
            selectedSize, 
            selectedColor, 
            selectedShoesSize,
            quantity ?? minQty
    );
        toast.success(`${product?.name?.substring(0, 12)}... ${'addedSuccess'}`);
    };

    return (
        <div className="w-full h-12 flex flex-col items-center">
            {itemCount ? (
                <div className="text-sm w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Quantity</span>
                        <QuantityButtons
                            product={product}
                            selectedSize={selectedSize}
                            selectedColor={selectedColor}
                            selectedShoesSize={selectedShoesSize}
                        />
                    </div>
                    <div className="flex items-center justify-between border-t pt-1">
                        <span className="text-xs font-semibold">Total</span>
                        <div className="flex items-center gap-x-2">
                            <span>€</span>
                            <PriceFormatter
                            amount={product?.price ? product.price * itemCount : 0}
                        />
                        </div>
                    </div>
                    {/* Add to cart */}

                </div>
            ) : (
                <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    size={'lg'}
                    className={cn(
                        "  mt-2 flex items-center justify-center bg-orange-500 w-full text-white shadow-none  py-3 border border-darkColor/30 font-semibold tracking-wide hover:text-white cursor-pointer hoverEffect",
                        className
                    )}
                >
                    <span className="text-lg font-semibold">Add to cart</span>
                    <FaCartShopping size={22} />
                </Button>


            )}
            {itemCount>0 && (
                <Link href={'/cart'}>
                <button className="mt-4 flex items-center justify-center gap-3 py-3 bg-orange-500 hover:bg-orange-600 transition text-white px-2 cursor-pointer rounded-md">
                    <span className="text-sm font-semibold">Checkout</span>
                    <ExternalLink size={22} />
                </button>
                </Link>
            )}

        </div>
    );
};

export default AddToCartButton;