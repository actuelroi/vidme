
import toast from "react-hot-toast";
import useCartStore from "@/store";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import { twMerge } from "tailwind-merge";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
  className?: string;
  borderStyle?: string;
  selectedSize?: string;
  selectedColor?: string;
  selectedShoesSize?: string;

}

const QuantityButtons = ({ 
  product, 
  className, 
  borderStyle, 
  selectedSize, 
  selectedColor,
  selectedShoesSize
}: Props) => {
  const { addItem, removeItem, getItemCount } = useCartStore();
 
  if(!product){
    return
  }


  const itemCount = getItemCount(product?._id, selectedSize, selectedColor,selectedShoesSize);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id, selectedSize, selectedColor,selectedShoesSize);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };

  const handleAddProduct = () => {
    addItem(product, selectedSize, selectedColor,selectedShoesSize);
    toast.success("Quantity increased successfully!");
  };

  return (
    <div
      className={twMerge(
        "flex items-center gap-1 pb-1 text-base",
        borderStyle,
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 cursor-pointer"
        onClick={handleAddProduct}
        disabled={isOutOfStock}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;