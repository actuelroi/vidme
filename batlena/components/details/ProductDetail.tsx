import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const ProductDetail = () => {



    return (
        <div className=" w-full flex flex-col md:flex-row justify-between my-10">
            <div className="w-1/2">
            <h1 className="m-4 text-2xl font-semibold">Product details</h1>
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="shipping"
                    className="max-w-lg"
                >
                    <AccordionItem value="shipping">
                        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
                        <AccordionContent>
                            We offer standard (5-7 days), express (2-3 days), and overnight
                            shipping. Free shipping on international orders.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger>What is your return policy?</AccordionTrigger>
                        <AccordionContent>
                            Returns accepted within 30 days. Items must be unused and in original
                            packaging. Refunds processed within 5-7 business days.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="support">
                        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                        <AccordionContent>
                            Reach us via email, live chat, or phone. We respond within 24 hours
                            during business days.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="flex flex-1 flex-col">
                {/* Shipping */}
                <div className="border-t pt-4 space-y-3 text-sm">
                    <div>
                        <p className="font-medium">Flat rate shipping</p>
                        <p className="text-gray-600">
                            €3.49 — Free over €10 <br />
                            Estimated delivery: Feb 6–20
                        </p>
                    </div>

                    <div>
                        <p className="font-medium">Ship to Store</p>
                        <p className="text-gray-600">
                            €0.99 <br />
                            Estimated delivery: Feb 24–Mar 1
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="border-t pt-4">
                    <h2 className="font-semibold mb-2">Product Description</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Waterproof, windproof winter gloves designed for cycling, driving,
                        and outdoor activities. Touchscreen compatible and suitable for
                        temperatures down to -10°C.
                    </p>
                </div>
            </div>
        </div>
    )
}




export default ProductDetail
