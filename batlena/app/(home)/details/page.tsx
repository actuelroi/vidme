import CustomerReviews from '@/components/details/CustomerReview'
import ProductImage from '@/components/details/productImage'
import RighSideProduct from '@/components/details/RighSideProduct'
import ShipWithConfidence from '@/components/details/ShipWithConfidence'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col p-6'>
      <div className='flex p-6'>
        <ProductImage />
        <RighSideProduct />
      </div>
      <div className='flex justify-between flex-row'>
        <ShipWithConfidence/>
        <CustomerReviews/>
        
      </div>
      <p>Solde by CUsto u</p>
    </div>
  )
}

export default page
