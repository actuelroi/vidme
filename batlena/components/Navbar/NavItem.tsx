import { Category } from "@/sanity.types"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { FaArrowTrendUp } from "react-icons/fa6"

interface Props{
    data:any
}

const NavItem = ({data}:Props) => {
  return (
    <div className="overflow-x-auto hide-scrollbar">
                <div className="hidden md:block md:max-w-7xl mx-auto md:mx-6">
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

                        <Link href={'/'} className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:font-bold  font-medium">
                            <span>Plus</span>
                            <ChevronDown className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
  )
}

export default NavItem
