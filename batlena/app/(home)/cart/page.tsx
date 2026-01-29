"use client"

import FormattedPrice from '@/components/FormattedPrice';
import Loading from '@/components/Loading';
import EmptyCart from '@/components/product/EmptyCart'
import NoAccessToCart from '@/components/product/NoAccessToCart'
import PriceFormatter from '@/components/product/PriceFormatter';
import QuantityButtons from '@/components/product/QuantityButtons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { urlFor } from '@/sanity/lib/image';
import useCartStore from '@/store';
import { useAuth } from '@clerk/nextjs';
import { Heart, ShoppingBag, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const page = () => {

    const { deleteCartProduct, getTotalPrice, resetCart, getGroupedItems } = useCartStore();
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const groupedItems = getGroupedItems();
    const { isSignedIn } = useAuth();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <Loading />;
    }

    const handleResetCart = () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir vider votre panier ?");
        if (confirmed) {
            resetCart();
            toast.success("Votre panier a été vidé avec succès !");
        }
    };


    const handleCheckout = async () => {
        setLoading(true);
        try {

        } catch (error) {
            console.error("Error creating checkout session:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = (id: string, selectedSize?: string, selectedColor?: string, selectedShoesSize?: string) => {
        deleteCartProduct(id, selectedSize, selectedColor, selectedShoesSize);
        toast.success("Produit supprimé avec succès !");
    };


    const totalPrice = getTotalPrice();

    return (
        <div className="bg-gray-50 pb-52 md:pb-10">

            {isSignedIn ? (
                <>
                    {groupedItems?.length ? (
                        <>
                            <div className="flex items-center gap-2 py-5">
                                <ShoppingBag className="h-6 w-6 text-darkColor" />
                                <h1 className="text-2xl font-semibold">Panier</h1>
                            </div>
                            <div className="grid lg:grid-cols-3 md:gap-8">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="border bg-white rounded-md">
                                        {groupedItems?.map(({ product, selectedSize, selectedColor, selectedShoesSize, quantity }, i) =>
                                            <div
                                                key={i}
                                                className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                                            >
                                                <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                                                    {product?.images && (
                                                        <div className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                                                            <Image
                                                                src={urlFor(product.images[0]).url()}
                                                                alt="productImage"
                                                                width={500}
                                                                height={500}
                                                                loading="lazy"
                                                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="h-full flex flex-1 flex-col justify-between py-1">
                                                        <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                            <h2 className="text-base font-semibold line-clamp-1">
                                                                {product?.name}
                                                            </h2>
                                                            <p className="text-sm text-lightColor font-medium">
                                                                {product?.intro}
                                                            </p>
                                                            {selectedSize && (
                                                                <p className="text-sm capitalize">
                                                                    Taille:{" "}
                                                                    <span className="font-semibold">
                                                                        {selectedSize.toUpperCase()}
                                                                    </span>
                                                                </p>
                                                            )}
                                                            {selectedShoesSize && (
                                                                <p className="text-sm capitalize">
                                                                    Taille:{" "}
                                                                    <span className="font-semibold">
                                                                        {selectedShoesSize.toUpperCase()}
                                                                    </span>
                                                                </p>
                                                            )}
                                                            {selectedColor && (
                                                                <p className="text-sm capitalize">
                                                                    Couleur:{" "}
                                                                    <span className="font-semibold">
                                                                        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                                                                    </span>
                                                                </p>
                                                            )}
                                                            <p className="text-sm capitalize">
                                                                Status:{" "}
                                                                <span className="font-semibold">
                                                                    {product?.status}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <Heart className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="font-bold">
                                                                        Ajouter aux favorite
                                                                    </TooltipContent>
                                                                </Tooltip>

                                                                {product?._id && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger>

                                                                            <Trash
                                                                                onClick={() =>
                                                                                    handleDeleteProduct(
                                                                                        product._id,
                                                                                        selectedSize,
                                                                                        selectedColor,
                                                                                        selectedShoesSize
                                                                                    )
                                                                                }
                                                                                className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold bg-red-600">
                                                                            Supprimer le produit
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}
                                                            </TooltipProvider>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                                                    <PriceFormatter
                                                        amount={(product?.price as number) * quantity}
                                                        className="font-bold text-lg"
                                                    />
                                                    <QuantityButtons
                                                        product={product}
                                                        selectedSize={selectedSize}
                                                        selectedColor={selectedColor}
                                                        selectedShoesSize={selectedShoesSize}
                                                    />
                                                </div>

                                            </div>
                                        )}
                                        <Button
                                            onClick={handleResetCart}
                                            className="m-5 font-semibold"
                                            variant="destructive"
                                        >
                                            Vider le pannier
                                        </Button>

                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Récapitulatif de commande
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Total:</span>
                                                <FormattedPrice
                                                    amount={totalPrice}
                                                    className="text-lg font-bold text-black"
                                                />
                                            </div>
                                            <Button
                                                onClick={handleCheckout}
                                                disabled={loading}
                                                className="w-full cursor-pointer rounded-full font-semibold tracking-wide"
                                                size="lg"
                                            >
                                                {loading ? "Traitement en cours" : "Passer à la caisse"}
                                            </Button>
                                            <div
                                                className="text-center text-sm text-darkColor hover:underline border border-darkColor/50 rounded-full flex items-center justify-center py-2 hover:bg-darkColor/5 hover:border-darkColor hoverEffect"
                                            >
                                                <span className="ml-2">Payer avec PayPal</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Order summary mobile view */}
                                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 z-999">
                                    <div className="bg-white p-4 rounded-lg border mx-4">
                                        <h2 className="text-lg font-semibold mb-2">
                                            Récapitulatif de commande
                                        </h2>
                                        <div className="space-y-2">
                                           
                                            <Separator />
                                            <div className="flex justify-between font-semibold text-lg">
                                                <span>Total</span>
                                                <FormattedPrice
                                                    amount={totalPrice}
                                                    className="text-lg font-bold text-black"
                                                />
                                            </div>
                                            <Button
                                                onClick={handleCheckout}
                                                disabled={loading}
                                                className="w-full rounded-full font-semibold tracking-wide"
                                                size="lg"
                                            >
                                                 {loading ? "Traitement en cours" : "Passer à la caisse"}
                                            </Button>
                                            <Link
                                                href="/"
                                                className="text-center text-sm text-darkColor hover:underline border border-darkColor/50 rounded-full flex items-center justify-center py-2 hover:bg-darkColor/5 hover:border-darkColor hoverEffect"
                                            >
                                                <Image
                                                    src={'/paypalLogo.png'}
                                                    className="w-20"
                                                    width={100}
                                                    height={100}
                                                    alt="paypalLogo"
                                                />
                                                <span className="ml-2">Payer avec PayPal</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </>) : (
                        <EmptyCart />
                    )}
                </>
            ) : (
                <NoAccessToCart />
            )}






        </div>
    )
}

export default page
