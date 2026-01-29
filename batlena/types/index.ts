import { Product, Vendor } from "@/sanity.types";



export type ExpandedVendor = Pick<
  Vendor,
  "_id" | "_type" | "name" | "image"
>;



export type ProductWithVendor = Omit<Product, "vendor"> & {
  vendor?: Vendor | null
}

