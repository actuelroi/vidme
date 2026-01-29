"use client";
import useCartStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";

const CartIcon = () => {
  const { items } = useCartStore();

  return (
    <Link href={"/cart"} className="group relative">
      <div className='relative'>
             <FaCartShopping className='w-8 h-8'/>
             <span className='absolute -top-2 -right-2 bg-[#4B9DA3] text-[#f7ff07] text-sm rounded-full w-5 h-5 flex items-center font-bold justify-center border border-white'>
            {items?.length ? items?.length : 0}
             </span>
        </div>
    </Link>
  );
};

export default CartIcon;