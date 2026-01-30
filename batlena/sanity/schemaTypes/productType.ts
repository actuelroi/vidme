import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: "product",
    title: "Products",
    type: "document",
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
            description: "Product title for SEO (max 70 characters)"
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.max(160),
            description: "Meta description for SEO (max 160 characters)"
        }),
        defineField({
            name: "seoKeywords",
            title: "SEO Keywords",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags"
            },
            description: "Keywords for search engine optimization"
        }),

        defineField({
            name: "vendor",
            title: "Vendor",
            type: "reference",
            to: [{ type: "vendor" }],
            description: "Select the vendor for this product"
        }),

        defineField({
            name: "images",
            title: "Product Images",
            type: "array",
            of: [{
                type: "image",
                options: {
                    hotspot: true
                },
                fields: [
                    {
                        name: "alt",
                        type: "string",
                        title: "Alternative text",
                        description: "Important for SEO and accessibility",
                        validation: Rule => Rule.required()
                    }
                ]
            }],
        }),
        defineField({
            name: "intro",
            title: "Product Intro",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Full Description",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                    ],
                    lists: [{ title: 'Bullet', value: 'bullet' }],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                        ],
                    }
                }
            ],
            description: "Detailed product description for SEO and user engagement"
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "originalPrice",
            title: "Original Price",
            type: "number",
            description: "Original price for showing discount"
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "Euro (€)", value: "EUR" },
                    { title: "US Dollar ($)", value: "USD" },
                    { title: "British Pound (£)", value: "GBP" },
                    { title: "Canadian Dollar (C$)", value: "CAD" },
                    { title: "Australian Dollar (A$)", value: "AUD" },
                    { title: "UAE Dirham (AED)", value: "AED" },
                ]
            },
            initialValue: "EUR"
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "minOrder",
            title: "Minimum Order Quantity",
            type: "number",
            initialValue: 1,
            validation: (Rule) => Rule.min(1),
            description: "Minimum number of units a customer can order (e.g., 8)"
        }),

        defineField({
            name: "status",
            title: "Product Status",
            type: "string",
            options: {
                list: [
                    { title: "Best seller", value: "best" },
                    { title: "Tendance", value: "hot" },
                    { title: "Nouveaute", value: "new" },
                ],
            },
        }),
        // ✅ ADD SHOE SIZE FIELD
        defineField({
            name: "shoeSizes",
            title: "Shoe Sizes",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    // EU Sizes
                    { title: "EU 36", value: "eu-36" },
                    { title: "EU 36.5", value: "eu-36.5" },
                    { title: "EU 37", value: "eu-37" },
                    { title: "EU 38", value: "eu-38" },
                    { title: "EU 38.5", value: "eu-38.5" },
                    { title: "EU 39", value: "eu-39" },
                    { title: "EU 40", value: "eu-40" },
                    { title: "EU 40.5", value: "eu-40.5" },
                    { title: "EU 41", value: "eu-41" },
                    { title: "EU 42", value: "eu-42" },
                    { title: "EU 42.5", value: "eu-42.5" },
                    { title: "EU 43", value: "eu-43" },
                    { title: "EU 44", value: "eu-44" },
                    { title: "EU 45", value: "eu-45" },
                    { title: "EU 46", value: "eu-46" },
                    { title: "EU 47", value: "eu-47" },
                ],
            },
            description: "Select available shoe sizes for this product"
        }),

        // ✅ REGULAR CLOTHING SIZES FIELD
        defineField({
            name: "sizes",
            title: "Available Sizes (Clothing)",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    // Extended size ranges for global markets
                    { title: "XXS", value: "xxs" },
                    { title: "XS", value: "xs" },
                    { title: "S", value: "s" },
                    { title: "M", value: "m" },
                    { title: "L", value: "l" },
                    { title: "XL", value: "xl" },
                    { title: "XXL", value: "xxl" },
                    { title: "3XL", value: "3xl" },
                    { title: "4XL", value: "4xl" },
                    { title: "5XL", value: "5xl" },
                ],
            },
        }),



        defineField({
            name: "taille",
            title: "Available Taille (Ring)",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    // Extended size ranges for global markets
                    { title: "6", value: "6" },
                    { title: "7", value: "7" },
                    { title: "8", value: "8" },
                    { title: "9", value: "9" },
                    { title: "10", value: "10" },
                    
                ],
            },
        }),
        // ✅ ADD COLOR FIELD
        defineField({
            name: "colors",
            title: "Available Colors",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Black", value: "black" },
                    { title: "Or", value: "or" },
                    { title: "Or-rose", value: "or-rose" },
                    { title: "Argent", value: "argent" },
                    { title: "White", value: "white" },
                    { title: "Red", value: "red" },
                    { title: "Blue", value: "blue" },
                    { title: "Green", value: "green" },
                    { title: "Yellow", value: "yellow" },
                    { title: "Pink", value: "pink" },
                    { title: "Purple", value: "purple" },
                    { title: "Orange", value: "orange" },
                    { title: "Gray", value: "gray" },
                    { title: "Brown", value: "brown" },
                    { title: "Navy", value: "navy" },
                    { title: "Beige", value: "beige" },
                    { title: "Maroon", value: "maroon" },
                    { title: "Teal", value: "teal" },
                ],
            },
        }),
        defineField({
            name: "reviews",
            title: "Customer Reviews",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Customer Name",
                            type: "string",
                            validation: Rule => Rule.required()
                        }),
                        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
                        defineField({
                            name: "message",
                            title: "Review Message",
                            type: "text",
                            rows: 3,
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: "rating",
                            title: "Rating",
                            type: "number",
                            validation: Rule => Rule.required().min(0).max(5),
                        }),
                        defineField({
                            name: "date",
                            title: "Review Date",
                            type: "datetime",
                            initialValue: new Date().toISOString()
                        })
                    ]
                }
            ],
            description: "Customer reviews for this product"
        }),

        defineField({
            name: "productDetails",
            title: "Product Details",
            type: "object",
            fields: [
                defineField({
                    name: "characteristics",
                    title: "Characteristics",
                    type: "array",
                    of: [{ type: "string" }],
                    options: {
                        layout: "tags",
                    },
                    description: "Key features of the product"
                }),
                defineField({
                    name: "weight",
                    title: "Weight",
                    type: "string",
                    description: "Weight of the product (e.g., 1.2 kg)"
                }),
                defineField({
                    name: "material",
                    title: "Material",
                    type: "string",
                    description: "What the product is made of"
                }),
            ],
            description: "Detailed product specifications"
        }),

        defineField({
            name: "freeShipping",
            title: "Free Shipping Eligible",
            type: "boolean",
            initialValue: false,
            description: "Whether this product qualifies for free shipping"
        }),
        defineField({
            name: "likes",
            title: "Likes Count",
            type: "number",
            initialValue: 0,
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "rating",
            title: "Product Rating",
            type: "number",
            validation: (Rule) => Rule.min(0).max(5),
            initialValue: 0
        }),
        defineField({
            name: "reviewCount",
            title: "Review Count",
            type: "number",
            initialValue: 0
        }),

        defineField({
            name: "shippingTime",
            title: "Shipping Time",
            type: "string",
            options: {
                list: [
                    { title: "Express 1-3 days", value: "express" },
                    { title: "Standard 3-7 days", value: "standard" },
                    { title: "Economy 7-14 days", value: "economy" },
                    { title: "Global 10-21 days", value: "global" },
                ]
            }
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "images",
            subtitle: "price",
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            const image = media && media[0];
            return {
                title: title,
                subtitle: `$${subtitle}`,
                media: image,
            };
        },
    },
});