"use client";

import toast from "react-hot-toast";
import useCartStore, { isSameOptions } from "@/store/cartStore";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { twMerge } from "tailwind-merge";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, } from "react";

interface Props {
    product: PRODUCT_BY_ID_QUERY_RESULT;
    variantKey: string;
    variantStock?: number | null
    className?: string;
    borderStyle?: string;
    onQuantityChange?: (newQuantity: number) => void; // callback to parent
    selectedOptions: Record<string, string>
}

const QuantityButtons = ({ product, variantKey, variantStock, className, borderStyle, onQuantityChange, selectedOptions }: Props) => {
    const { addItem, removeItem } = useCartStore();

    const minQty = product?.minOrder ?? 1;
    const isOutOfStock = variantStock === 0;

    if (!product) return null;

    // subscribe directly to store
    const itemCount = useCartStore(
        (state) =>
            state.items.find(
                (item) =>
                    item.productId === product._id &&
                    item.variantKey === variantKey &&
                    (!selectedOptions || isSameOptions(item.options, selectedOptions))
            )?.quantity ?? 0
    );

    // call callback whenever itemCount changes
    useEffect(() => {
        onQuantityChange?.(itemCount);
    }, [itemCount, onQuantityChange]);

    const handleAdd = () => {
        if (isOutOfStock) return;
        addItem(product, variantKey, selectedOptions, 1);
        toast.success("Quantité augmentée avec succès !");
    };

    const handleRemove = () => {
        if (itemCount <= minQty) {
            toast.error(`La quantité minimum de commande est de ${minQty}`);
            return;
        }
        removeItem(product._id, variantKey, selectedOptions);

        toast.success(itemCount > 1 ? "Quantité diminuée avec succès !" : `${product.name?.substring(0, 12)} supprimé !`);
    };

    return (
        <div className={twMerge("flex items-center gap-1 pb-1 text-base", borderStyle, className)}>
            <Button
                variant="outline"
                size="icon"
                className="w-6 h-6"
                onClick={handleRemove}
                disabled={itemCount <= minQty || isOutOfStock}
            >
                <Minus />
            </Button>
            <span className="font-semibold w-8 text-center text-darkColor">{itemCount}</span>
            <Button
                variant="outline"
                size="icon"
                className="w-6 h-6"
                onClick={handleAdd}
                disabled={isOutOfStock}
            >
                <Plus />
            </Button>
        </div>
    );
};

export default QuantityButtons;
