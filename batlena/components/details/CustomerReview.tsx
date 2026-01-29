"use client";

import { Star } from "lucide-react";
import { PRODUCT_BY_ID_QUERY_RESULT } from "@/sanity.types";

interface Props {
  product: PRODUCT_BY_ID_QUERY_RESULT;
}

const CustomerReviews = ({ product }: Props) => {
  if (!product?.reviews || product.reviews.length === 0) return null;

  return (
    <div className="mt-8 border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Avis client</h2>

      <div className="space-y-5">
        {product.reviews.map((review) => {
          const name = review.name ?? "Client";
          const rating = review.rating ?? 0;
          const feedback = review.message ?? "";

          return (
            <div key={review._key} className="border-b pb-4 last:border-none">
              {/* Name + Rating */}
              <div className="flex items-center justify-between">
                <p className="font-medium">{name}</p>

                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <p className="text-sm text-gray-600 mt-2">{feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerReviews;
