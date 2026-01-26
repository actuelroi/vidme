import CustomerReviews from '@/components/details/CustomerReview'
import ProductImage from '@/components/details/productImage'
import ReferencePrices from '@/components/details/ReferencePrices'
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
      <div className='flex gap-2 flex-row flex-wrap md:flex-nowrap'>
        <ShipWithConfidence/>
        <CustomerReviews/>
        <ReferencePrices/>
        
      </div>
      <p>Solde by CUsto u</p>
    </div>
  )
}

export default page
