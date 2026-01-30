

import { Suspense } from 'react'
import ProductCard from './ProductCard'
import { getAllProducts } from '@/sanity/helpers'
import Loading from './Loading'




const ProductGrid = async () => {
   const data = await getAllProducts()
  return (

     <Suspense fallback={<Loading/>}>
    
    <div className='grid grid-cols-1 sm:grid-cols-2 p-4 items-center m-3 gap-2 md:grid-cols-5 md:p-4 md:gap-4'>
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
    </Suspense>
  )
}

export default ProductGrid
