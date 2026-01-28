
import ProductCard from '../ProductCard'

const RelatedProduct = () => {
  return (
    <>
    <div className='p-6 gap-5'>
 <h1 className='text-3xl font-bold p-4'>Related product</h1>
    <div className='grid grid-cols-1 md:grid-cols-5  gap-4'>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
    </div>
   
    </>
    
  )
}

export default RelatedProduct
