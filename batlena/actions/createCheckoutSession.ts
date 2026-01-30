"use server";

import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";

export interface Metadata {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export async function createCheckoutSession(
    items: CartItem[],
    metadata: Metadata
) {
    if (!items.length) {
        throw new Error("Cart is empty");
    }

    const currency = "eur";

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        items.map((item) => {
            const discount = item.product?.discount ?? 0;
            const finalPrice =
                item.basePrice - (item.basePrice * discount) / 100;

            const unitAmount = Math.round(finalPrice * 100);

            let name = item.product?.name ?? "Product";

            const variants = [];
            if (item.selectedSize) variants.push(`Size: ${item.selectedSize}`);
            if (item.selectedShoesSize)
                variants.push(`Size: ${item.selectedShoesSize}`);
            if (item.selectedColor)
                variants.push(`Color: ${item.selectedColor}`);
            if (item.selectedTaille)
                variants.push(`Color: ${item.selectedTaille}`);

            if (variants.length) {
                name += ` (${variants.join(", ")})`;
            }

            return {
                quantity: item.quantity,
                price_data: {
                    currency,
                    unit_amount: unitAmount,
                    product_data: {
                        name,
                        images: item.product?.images?.length
                            ? [urlFor(item.product.images[0]).url()]
                            : undefined,
                        metadata: {
                            productId: item.product?._id ?? "",
                            selectedSize: item.selectedSize ?? "",
                            selectedColor: item.selectedColor ?? "",
                            selectedTaille: item.selectedTaille ?? "",
                            selectedShoesSize: item.selectedShoesSize ?? "",
                        },
                    },
                },
            };
        });

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        allow_promotion_codes: true,

        customer_email: metadata.customerEmail,

        shipping_address_collection: {
            allowed_countries: ["FR", "DE", "IT", "ES", "US", "CA"],
        },

        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency,
                    },
                    display_name: "Livraison gratuite",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 7 },
                        maximum: { unit: "business_day", value: 14 },
                    },
                },
            },
        ],

        metadata: {
            orderNumber: metadata.orderNumber,
            clerkUserId: metadata.clerkUserId,
            customerName: metadata.customerName,
            customerEmail: metadata.customerEmail,
        },

        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return session.url;
}
