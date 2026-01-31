


import { getRelatedProducts } from "@/sanity/helpers";

import ProductCard from "../ProductCard";



interface Props {
  categoryId?: string;
  currentProductId: string;
}

const RelatedProducts = async ({ categoryId, currentProductId }: Props) => {

  if (!categoryId) return;

  const data =  await getRelatedProducts(categoryId, currentProductId)
  
  

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-6">Produits similaires</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-4">
        {data.map((product)=>(
          <ProductCard 
          key={product._id}
          product={product}
           />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
