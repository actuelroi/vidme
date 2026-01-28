import { Star } from "lucide-react";
import { BsQuestion } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";

const RightSideProduct = () => {
  return (
    <div className="p-6 flex flex-col gap-5 max-w-xl">
      {/* Title */}
      <h1 className="text-2xl font-semibold leading-snug">
        Hot Winter Gloves For Men & Women – Touchscreen, Windproof & Warm
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        <Star className="h-4 w-4 text-gray-300" />
        <span className="ml-2 text-sm text-gray-500">(198 ratings)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">€4.95</span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          Prices hors TVA
          <BsQuestion className="cursor-pointer" />
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
          Flat rate eligible
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
          30-day return
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm text-gray-500">Size</p>
          <p className="font-medium">M</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Color</p>
          <p className="font-medium">Orange</p>
          
        </div>
        <div>
          <p className="text-sm text-gray-500">Quantity</p>
          <p className="font-medium">8</p>
          
        </div>
      </div>

      {/* Add to cart */}
      <button className="mt-2 flex items-center cursor-pointer justify-center gap-3 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-md">
        <span className="text-lg font-semibold">Ajouter au panier</span>
        <FaCartShopping size={22} />
      </button>

     
    </div>
  );
};

export default RightSideProduct;
