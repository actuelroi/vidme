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
            name: "source",
            title: "Source Url",
            type: "string",
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
        // ⭐ THE IMPORTANT PART
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [{ type: "productVariant" }],
      validation: Rule => Rule.min(1).required(),
    }),
       defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required().min(0),
    }),

        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
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
            name: "minOrder",
            title: "Minimum Order Quantity",
            type: "number",
            initialValue: 1,
            validation: (Rule) => Rule.min(1),
            description: "Minimum number of units a customer can order (e.g., 8)"
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