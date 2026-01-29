
import { client } from '@/sanity/lib/client'

// Regular queries without live functionality
export const getMyOrders = async (userId: string) => {
  try {
    const query = `*[_type == "order" && userId == $userId] | order(_createdAt desc) {
      _id,
      _createdAt,
      items,
      total,
      status
    }`;
    
    const orders = await client.fetch(query, { userId });
    return orders || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export const getAllCategories = async (limit?: number) => {
  try {
    const query = `*[_type == "category"] | order(name asc) ${limit ? `[0...${limit}]` : ''} {
      _id,
      name,
      "slug": slug.current,
      description,
      image
    }`;
    
    const categories = await client.fetch(query);
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}