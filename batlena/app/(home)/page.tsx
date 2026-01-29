

import ProductGrid from '@/components/ProductGrid'
import { ShopByCategory } from '@/components/ShopByCategory'



const page = () => {

  return (
   <>
   <ProductGrid/>
     <ShopByCategory/>
     <ProductGrid/>
    <ShopByCategory/>
   
   </>
  )
}

export default page
