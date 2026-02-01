import { PRODUCTS_QUERY_RESULT } from '@/sanity.types'
import ProductCard from './ProductCard'
import { getAllProducts } from '@/sanity/helpers'


const ProductGrid = async () => {
  let data : PRODUCTS_QUERY_RESULT = []

  try {
    data = await getAllProducts()
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }

  if (!data || data.length === 0) {
    return <p className="p-4 text-center text-gray-500">No products found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 p-4 gap-4">
      {data.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
