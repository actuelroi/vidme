import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

export const getAllProducts = async () => {
  const PRODUCTS_QUERY = defineQuery(`
    *[_type == "product"] | order(name asc) {
      ...,
      vendor->{
        _id,
          _type,
        name,
        image
      }
    }
  `);

  try {
    const products = await sanityFetch({ query: PRODUCTS_QUERY });
    return products.data || [];
  } catch (error) {
    console.log("Error fetching all products:", error);
    return [];
  }
};



export const getAllCategories = async (quantity?: number) => {
  const CATEGORIES_QUERY = `*[_type=="category"] | order(name asc)${quantity ? `[0...${quantity}]` : ""}`;

  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories?.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};


export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(
    `*[_type == "product" && name match $searchParam] | order(name asc)`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};


export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]
    {
      ...,
      vendor->{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  name,
  image,
  rating
}
    }`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};


export const getProductsByCategory = async (categorySlug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(
    `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
    {
      ...,
      vendor->{
        _id,
          _type,
        name,
        image
      }
    }`
  );
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};



export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      _id,
      orderNumber,
      stripeCheckoutSessionId,
      stripeCustomerId,
      clerkUserId,
      customerName,
      email,
      totalPrice,
      currency,
      status,
      orderDate,
      shippingAddress {
        name,
        line1,
        line2,
        city,
        state,
        postal_code,
        country,
        phone
      },
      shippingMethod,
      shippingCost,
      amountDiscount,
      products[] {
        _key,
        quantity,
        selectedSize,
        selectedColor,
        selectedShoesSize,
        unitPrice,
        price,
        product->{
          _id,
          name,
          images,
          price,
          currency,
          slug
        }
      },
      invoice {
        id,
        number,
        hosted_invoice_url
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    return [];
  }
};






export const getRelatedProducts = async (categoryId: string, currentProductId: string) => {
  const RELATED_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product" && references($categoryId) && _id != $currentProductId] | order(name asc)[0...5] {
      ...,
      vendor->{
        _id,
          _type,
        name,
        image
  }}
  `);

  try {
    const response = await sanityFetch({
      query: RELATED_PRODUCTS_QUERY,
      params: {
        categoryId,
        currentProductId
      }
    });

    // sanityFetch may return { data, sourceMap, tags }, we only want the array
    return response.data ?? [];
  } catch (error) {
    return [];
  }
};

