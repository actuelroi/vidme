import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbMinusVertical } from "react-icons/tb";

const Navbar = () => {
    const navItems = [
        { title: 'Deals', href: '/politics' },
        { title: 'Fashion', href: '/sports' },
        { title: 'Accesoires', href: '/finance' },
        { title: 'Express', href: '/crypto' },
        { title: 'Gadget', href: '/geopolitics' },
        { title: 'Animaux', href: '/earnings' },
        { title: 'Pour bebe', href: '/tech' },
        { title: 'Marque', href: '/culture' },
        { title: 'Beauté', href: '/world' },
        { title: 'Art', href: '/economics' },
        { title: 'Meuble', href: '/elections' }
    ]

    return (
        <section className="bg-gray-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
            <div className="overflow-x-auto hide-scrollbar">

            <div className="max-w-7xl mx-auto md:mx-6">
                <div className="flex items-center gap-6 py-3 whitespace-nowrap">
                    <Link href={'/trending'} className="flex items-center gap-2  font-semibold">
                        <FaArrowTrendUp className="w-4 h-4" />
                        <span>Best seller</span>
                    </Link>

                    <Link href={'/breaking'} className="text-gray-600 dark:text-gray-300 hover:font-bold font-medium">
                        Tendance
                    </Link>

                    <Link href={'/new'} className="text-gray-600 dark:text-gray-300 hover:font-bold  font-medium">
                        Nouveauté
                    </Link>

                    <TbMinusVertical className="h-5 w-5 text-gray-300 dark:text-gray-600" />

                    <div className="flex items-center md:gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className="text-gray-600 dark:text-gray-300 hover:font-bold  font-medium"
                            >
                                {item.title}
                            </Link>
                        ))}
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