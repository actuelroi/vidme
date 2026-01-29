

import { defineField, defineType } from "sanity";


export const vendorType = defineType({
  name: "vendor",
  title: "Vendor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Vendor Name", type: "string", validation: Rule => Rule.required() }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
     defineField({name: "rating",title: "Rating",type: "number",validation: Rule => Rule.required().min(0).max(5),}),
  ]
});
