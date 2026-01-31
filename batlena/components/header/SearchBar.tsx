"use client"
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

import { Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from "../ui/dialog";

import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";
import PriceView from "../PriceView";
import Image from "next/image";
import Link from "next/link";

import { cn } from '@/lib/utils';
import { FaCartShopping } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


const SearchBar = () => {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<PRODUCT_BY_ID_QUERY_RESULT[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter()



  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);



  // Debounce input changes to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300); // Delay of 300ms

    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [search, fetchProducts]);


  const handleClick= (product: PRODUCT_BY_ID_QUERY_RESULT)=>{
    router.push(`/product/${product?.slug?.current}`)
    setShowSearch(false)
    return
  }



  return (
    <>
      <div className='relative flex items-center w-80' role='button' onClick={() => setShowSearch(true)}>
        <SearchIcon className='absolute left-3 h-4 w-4 text-gray-400' />
        <Input
          placeholder='Que recherchez vous..'
          className='pl-10 pr-4 h-10 border-gray-300 focus:border-purple-500'
        />
      </div>

      <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
        <DialogContent className="max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden bg-white">
          <DialogHeader>
            <DialogTitle className="mb-3">
              Barre de recherche de produits
            </DialogTitle>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Recherchez votre produit ici..."
                className="flex-1 rounded-md py-5 font-semibold lowercase"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <X
                  onClick={() => setSearch("")}
                  className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect"
                />
              )}
              <button
                type="submit"
                className="absolute right-0 top-0 bg-darkColor/10 w-10 h-full flex items-center justify-center rounded-tr-md hover:bg-darkColor hover:text-white hoverEffect"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </DialogHeader>
          <div className="w-full h-full overflow-y-scroll border border-darkColor/20 rounded-md bg-white">
            <div className="">
              {loading ? (
                <p className="flex items-center px-6 gap-1 py-10 text-center text-green-600 font-semibold">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Recherche en cours...
                </p>
              ) : products?.length ? (
                products.map((product) => (
                  <div
                    key={product?._id}
                    className="bg-white overflow-hidden border-b"
                  >
                    <div className="flex items-center p-1">
                      <Link
                        href={`/product/${product?.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                        className="h-20 w-20 md:h-24 md:w-24 shrink-0 border border-darkColor/20 rounded-md overflow-hidden group"
                      >
                        {product?.images && (
                          <Image
                            width={200}
                            height={200}
                            src={urlFor(product?.images[0]).url()}
                            alt={"productImage"}
                            className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
                          />
                        )}
                      </Link>
                      <div className="px-4 py-2 grow">
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            onClick={() => setShowSearch(false)}
                          >
                            <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                              {product?.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {product?.intro}
                            </p>
                          </Link>
                          <PriceView
                            price={product?.price}
                            discount={product?.discount}
                            className="md:text-lg"
                          />
                        </div>

                        <div className="w-60 mt-1">
                          <Button
                            onClick={()=>handleClick(product)}
                         
                            size="lg"
                            className={cn(
                              "mt-2 flex items-center justify-center bg-orange-500 w-full text-white py-3 border border-darkColor/30 font-semibold tracking-wide hover:text-white",
                            
                            )}
                          >
                            <span className="text-lg font-semibold">Ajouter au panier</span>
                            <FaCartShopping size={22} />
                          </Button>

                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 font-semibold tracking-wide">
                  {search && !products?.length ? (
                    <p>
                      Aucun résultat pour le mot-clé {" "}
                      <span className="underline text-red-600">"{search}"</span>.{" "}
                      Veuillez essayer autre chose.
                    </p>
                  ) : (
                    <p className="text-green-600 flex items-center justify-center gap-1">
                      <Search className="w-5 h-5" />
                      Recherchez et explorez vos produits sur Batle-NA.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchBar