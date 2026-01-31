// schemas/productVariant.ts
import { defineField, defineType, defineArrayMember } from "sanity";

export const productVariant = defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",
  fields: [
    defineField({
      name: "options",
      title: "Variant Options",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "option",
          title: "Option",
          fields: [
            defineField({
              name: "name",
              title: "Option Name",
              type: "string",
              description: "e.g., color, size, shoeSize",
            }),
            defineField({
              name: "values",
              title: "Option Values",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: {
              name: "name",
              values: "values",
            },
            prepare({ name, values }) {
              return {
                title: name,
                subtitle: values?.join(", "),
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
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
        ],
      },
    }),
  ],

  preview: {
    select: {
      options: "options",
      price: "price",
      media: "image",
    },
    prepare({ options, price, media }) {
      const opts = options
        ?.map((o: any) => `${o.name}: ${o.values?.join(", ")}`)
        .join(" / ");
      return {
        title: opts || "Variant",
        subtitle: price ? `€${price}` : "",
        media,
      };
    },
  },
});
