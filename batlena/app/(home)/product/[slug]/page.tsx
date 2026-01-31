import CustomerReviews from "@/components/details/CustomerReview";
import ProductDetail from "@/components/details/ProductDetail";
import ProductImage from "@/components/details/productImage";
import ReferencePrices from "@/components/details/ReferencePrices";
import RelatedProducts from "@/components/details/RelatedProduct";

import RightSideProduct from "@/components/details/RighSideProduct";
import ShipWithConfidence from "@/components/details/ShipWithConfidence";
import Loading from "@/components/Loading";
import { getProductBySlug } from "@/sanity/helpers";
import { Suspense } from "react";


interface Props {
  params: Promise<
    { slug: string }
  >
}

const page = async ({ params }: Props) => {

  const param = await params;
  const slug = param.slug

  const data = await getProductBySlug(slug)



const firstCategoryRef = (data?.categories?.[0] as any)?._ref;

  return (
    <Suspense fallback={<Loading />}>

      <div className='flex flex-col p-6'>
        <div className='flex flex-col md:flex-row p-6 w-full gap-4'>
          <ProductImage
            product={data}
          />
          <RightSideProduct
            product={data}
          />
        </div>
        <ProductDetail
          product={data}
        />
        <div className='flex gap-2 flex-row flex-wrap md:flex-nowrap'>
          <ShipWithConfidence
            merchantName={data?.vendor?.name}
            image={data?.vendor?.image}
            rating={data?.vendor?.rating}
          />
          <CustomerReviews
            product={data}
          />
          <ReferencePrices
            merchantName={data?.vendor?.name}
          />

        </div>
        <RelatedProducts
          categoryId={firstCategoryRef} // Solution 1
          currentProductId={data?._id!}
        />


      </div>
    </Suspense>
  )
}

export default page
