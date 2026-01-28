import React from "react";

// Reusable category card
interface Category {
  id: number;
  title: string;
  image: string;
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <div className="flex flex-col items-center gap-3 cursor-pointer">
    <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition">
      <img src={category.image} alt={category.title} className="w-14 h-14 object-contain" />
    </div>
    <span className="text-sm font-semibold text-gray-900">{category.title}</span>
  </div>
);

// Main reusable component
export const ShopByCategory: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      title: "Arts & crafts",
      image: "https://cdn-icons-png.flaticon.com/512/3082/3082032.png",
    },
    {
      id: 2,
      title: "Cars & auto",
      image: "https://cdn-icons-png.flaticon.com/512/741/741407.png",
    },
    {
      id: 3,
      title: "Bags & accessories",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    },
    {
      id: 4,
      title: "Beauty",
      image: "https://cdn-icons-png.flaticon.com/512/2964/2964514.png",
    },
    {
      id: 5,
      title: "Phones & accessories",
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965300.png",
    },
    {
      id: 6,
      title: "Office & tech",
      image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    },
  ];

  return (
    <section className="w-full p-6">
      <h2 className="text-xl font-bold">Shop by category</h2>
      <p className="text-gray-500 mb-6">Let's help you find something</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {categories.map((category) => (
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
