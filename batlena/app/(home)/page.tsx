import AdsImage from '@/components/AdsImage'
import SaleHero from '@/components/hero-image'
import Navbar from '@/components/Navbar/Navbar'
import ProductGrid from '@/components/ProductGrid'
import { ShopByCategory } from '@/components/ShopByCategory'
import React from 'react'

const page = () => {
  return (
   <>
   <Navbar/>
   <SaleHero/>
   <ProductGrid/>
     <ShopByCategory/>
     <ProductGrid/>
    <ShopByCategory/>
   </>
  )
}

export default page
