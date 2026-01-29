

import ProductCard from './ProductCard'
import { getAllProducts } from '@/sanity/helpers'




const ProductGrid = async () => {
   const data = await getAllProducts()
  return (
    
    <div className='grid grid-cols-2 gap-2 md:grid-cols-5 md:p-4 md:gap-4'>
    {
      data?.length > 0  && (
        data.map((product)=>(
           <ProductCard key={product._id}
           product={product}
           />
        ))
      )
    }
    </div>
  )
}

export default ProductGrid
