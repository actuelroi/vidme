import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";


export async function POST(req: NextRequest) {
    console.log("🟢 WEBHOOK RECEIVED - Checking if endpoint is hit");
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json(
            {
                error: "No signature",
            },
            { status: 400 }
        );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.log("Stripe webhook secret is not set");
        return NextResponse.json(
            {
                error: "Stripe webhook secret is not set",
            },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        console.log("Webhook event received:", event.type);
    } catch (error) {
        console.error("Webhook signature verification failed:", error);
        return NextResponse.json(
            {
                error: `Webhook Error: ${error}`,
            },
            { status: 400 }
        );
    }

    if (event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"

    ) {
        // ✅ IMPORTANT: Retrieve the full session with shipping details
        const sessionId = (event.data.object as Stripe.Checkout.Session).id;

        try {
            // Retrieve the complete session with shipping details expanded
            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ['shipping_cost', 'total_details.breakdown', 'customer']
            });

            console.log("Processing checkout.session.completed:", session.id);
            console.log("Full session with shipping:", JSON.stringify(session, null, 2));

            const invoice = session.invoice
                ? await stripe.invoices.retrieve(session.invoice as string)
                : null;

            console.log("Session metadata:", session.metadata);
            console.log("Invoice:", invoice?.id);

            const order = await createOrderInSanity(session, invoice);
            console.log("✅ Order created in Sanity:", order._id);

            return NextResponse.json({
                success: true,
                orderId: order._id,
                message: "Order created successfully"
            });
        } catch (error) {
            console.error("❌ Error creating order in Sanity:", error);
            return NextResponse.json(
                {
                    error: `Error creating order: ${error}`,
                },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ received: true });
}



async function createOrderInSanity(
    session: Stripe.Checkout.Session,
    invoice: Stripe.Invoice | null
) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
        shipping_cost,

    } = session;

    console.log("Creating order in Sanity with metadata:", metadata);



    console.log("🔍 Raw customer value:", customer);
    console.log("🔍 Type of customer:", typeof customer);

    // ✅ FIX: Extract the customer ID properly
    let stripeCustomerId: string;

    if (typeof customer === 'string') {
        // If customer is already a string ID
        stripeCustomerId = customer;
    } else if (customer && typeof customer === 'object' && 'id' in customer) {
        // If customer is an expanded object
        stripeCustomerId = (customer as any).id;
    } else {
        // Fallback or error handling
        console.error("❌ Could not extract stripeCustomerId from:", customer);
        stripeCustomerId = 'unknown';
    }

    console.log("✅ Extracted stripeCustomerId:", stripeCustomerId);





    const shippingDetails = (session as any).collected_information?.shipping_details;
    console.log("Shipping details from collected_information:", shippingDetails);


    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as unknown as Metadata;

    // Validate required metadata
    if (!orderNumber || !customerEmail || !clerkUserId) {
        throw new Error("Missing required metadata: orderNumber, customerEmail, or clerkUserId");
    }

    try {
        const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
            id,
            { expand: ["data.price.product"] }
        );

        console.log("Line items retrieved:", lineItemsWithProduct.data.length);

        // Create sanity product references
        const sanityProducts = lineItemsWithProduct.data.map((item) => {
            const productMetadata = (item.price?.product as Stripe.Product)?.metadata;
            const productId = productMetadata?.productId;

            const optionsArray = Object.entries(productMetadata || {})
                .filter(([key, value]) => value) // remove empty values
                .map(([key, value]) => ({
                    _key: crypto.randomUUID(),
                    key,
                    value: String(value), // ensure value is a string
                }));

            // Use the actual price charged by Stripe (already converted)
            const actualUnitPrice = item.price?.unit_amount ? item.price.unit_amount / 100 : 0;
            const actualPrice = item.amount_total ? item.amount_total / 100 : 0;

            console.log(`Product ${productId}: unitPrice=${actualUnitPrice}, total=${actualPrice}, quantity=${item.quantity}`);

            if (!productId) {
                console.warn("Product missing ID metadata:", item.price?.product);
            }

            return {
                _key: crypto.randomUUID(),
                product: {
                    _type: "reference",
                    _ref: productId,
                },
                quantity: item?.quantity || 0,
                price: actualPrice, // Use the actual total price for this line item
                unitPrice: actualUnitPrice, // Use the actual unit price (already converted)
                 options: optionsArray,
            };
        });

        // ✅ Extract shipping address with phone
        const shippingDetails = (session as any).collected_information?.shipping_details;
        const customerDetails = session.customer_details;


        // ✅ CORRECT: Extract shipping address from collected_information.shipping_details
        const shippingAddress = shippingDetails?.address ? {
            name: shippingDetails.name || customerName,
            line1: shippingDetails.address.line1 || "",
            line2: shippingDetails.address.line2 || "",
            city: shippingDetails.address.city || "",
            state: shippingDetails.address.state || "",
            postal_code: shippingDetails.address.postal_code || "",
            country: shippingDetails.address.country || "",
            phone: customerDetails?.phone || "", // Get phone from customer_details
        } : undefined;


        console.log("Extracted shipping address:", shippingAddress);

        console.log("Creating Sanity order document...");

        const orderData = {
            _type: "order",
            orderNumber,
            stripeCheckoutSessionId: id,
            stripePaymentIntentId: payment_intent as string,
            customerName: customerName || "Unknown",
            stripeCustomerId: stripeCustomerId, // ✅ Now this is a string, not an object,
            clerkUserId: clerkUserId,
            email: customerEmail,
            currency,
            amountDiscount: total_details?.amount_discount
                ? total_details.amount_discount / 100
                : 0,
            products: sanityProducts,
            totalPrice: amount_total ? amount_total / 100 : 0, // ✅ Use Stripe's total
            status: "paid",
            orderDate: new Date().toISOString(),
            // ✅ Shipping address is now required
            shippingAddress: shippingAddress,
            shippingCost: shipping_cost ? shipping_cost.amount_total / 100 : 0,
            shippingMethod: shipping_cost && shipping_cost.amount_total > 0 ? "Paid Shipping" : "Free Shipping",
            // Add shipping information
            // Invoice is optional
            ...(invoice && {
                invoice: {
                    id: invoice.id,
                    number: invoice.number,
                    hosted_invoice_url: invoice.hosted_invoice_url,
                }
            })
        };




        console.log("Order data to create:", orderData);





        const existing = await backendClient.fetch(
            `*[_type=="order" && stripeCheckoutSessionId==$id][0]`,
            { id: session.id }
        );

        if (existing) {
            console.log("⚠️ Order already exists:", existing._id);
            return existing;
        }


        const order = await backendClient.create(orderData);
        return order;
    } catch (error) {
        console.error("Error in createOrderInSanity:", error);
        throw error;
    }
}