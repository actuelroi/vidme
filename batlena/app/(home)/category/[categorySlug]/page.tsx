
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/sanity/helpers";
import { Suspense } from "react";

interface Props {
  params: Promise<
    { categorySlug: string }
  >
}

const page = async ({params}:Props) => {

  const param = await params;
  const slug = param.categorySlug

  const data = await getProductsByCategory(slug)


  return (
       <Suspense fallback={<Loading/>}>
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
    </Suspense>
  )
}

export default page
