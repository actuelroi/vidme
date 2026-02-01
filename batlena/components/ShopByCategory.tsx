import { getAllCategories } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import React from "react";


// Reusable category card
interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    image: string;
    href: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <div className="flex flex-col items-center gap-3 cursor-pointer">
    <Link href={`/category/${category.href}`}>
    <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition">
      <img
        src={category.image}
        alt={category.title}
        className="w-14 h-14 object-contain"
        />
    </div>
    <span className="text-sm font-semibold text-gray-900">
      {category.title.toUpperCase()}
    </span>
        </Link>
  </div>
);

// Main component
export const ShopByCategory: React.FC = async () => {
  const data = await getAllCategories();

  // Map the Sanity data to the format our card expects
  const categories = data.map((cat: any) => ({
    id: cat._id,
    title: cat.title || "NO TITLE",
    image: cat.image ? urlFor(cat.image).url() : "", // using urlFor helper
    href: cat.slug?.current
  }));

  return (
    <section className="w-full p-6">
      <h2 className="text-xl font-bold">Achetez par catégorie</h2>
      <p className="text-gray-500 mb-6">Nous allons vous aider à trouver quelque chose</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {categories.map((category:any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

// Preview usage
export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center">
      <ShopByCategory />
    </div>
  );
}
