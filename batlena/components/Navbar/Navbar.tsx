import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/helpers";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";


const Navbar = async () => {
    const data = await getAllCategories()
    return (
        <section className="bg-gray-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
            <div className="overflow-x-auto hide-scrollbar">

                <div className="max-w-7xl mx-auto md:mx-6">
                    <div className="flex items-center gap-6 py-3 whitespace-nowrap">
                        <Link href={'/'} className="flex items-center gap-2  font-semibold">
                            <FaArrowTrendUp className="w-4 h-4" />
                            <span>Best seller</span>
                        </Link>

                        <div className="flex items-center md:gap-10">

                            {
                                data?.length > 0  && (
                                    data.map((category : Category) => (

                                        <Link
                                            key={category._id}
                                           href={`/category/${category.slug?.current}`}
                                            className="text-gray-600 dark:text-gray-300 hover:font-bold  font-medium"
                                        >
                                            {category.title}
                                        </Link>

                                    ))
                                )
                            }

                        </div>

                        <Link href={'/more'} className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:font-bold  font-medium">
                            <span>Plus</span>
                            <ChevronDown className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Navbar