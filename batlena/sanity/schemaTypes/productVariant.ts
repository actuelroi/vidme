// schemas/productVariant.ts
import { defineField, defineType } from "sanity";

export const productVariant = defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",
  fields: [
    defineField({
      name: "options",
      title: "Variant Options",
      type: "object",
      fields: [
        defineField({
          name: "color",
          title: "Color",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags"
          },
        }),
        defineField({
          name: "size",
          title: "Size (Clothing)",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags"
          },
        }),
        defineField({
          name: "shoeSize",
          title: "Shoe Size",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags"
          },
        }),
        defineField({
          name: "ringSize",
          title: "Ring Size",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags"
          },
        }),
      ],
    }),


    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: Rule => Rule.min(0),
    }),

    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
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
      color: "options.color",
      size: "options.size",
      shoeSize: "options.shoeSize",
      ringSize: "options.ringSize",
      price: "price",
      media: "image",
    },
    prepare({ color, size, shoeSize, ringSize, price, media }) {
      const opts = [color, size, shoeSize, ringSize].filter(Boolean).join(" / ");
      return {
        title: opts || "Variant",
        subtitle: price ? `€${price}` : "",
        media,
      };
    },
  },
});
