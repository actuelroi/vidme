import CustomerReviews from '@/components/details/CustomerReview'
import ProductDetail from '@/components/details/ProductDetail'
import ProductImage from '@/components/details/productImage'
import ReferencePrices from '@/components/details/ReferencePrices'
import RelatedProduct from '@/components/details/RelatedProduct'
import RighSideProduct from '@/components/details/RighSideProduct'
import ShipWithConfidence from '@/components/details/ShipWithConfidence'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col p-6'>
      <div className='flex flex-col md:flex-row p-6'>
        <ProductImage />
        <RighSideProduct />
       
      </div>
       <ProductDetail/>
      <div className='flex gap-2 flex-row flex-wrap md:flex-nowrap'>
        <ShipWithConfidence/>
        <CustomerReviews/>
        <ReferencePrices/>
        
      </div>
     
      <RelatedProduct/>
    </div>
  )
}

export default page
