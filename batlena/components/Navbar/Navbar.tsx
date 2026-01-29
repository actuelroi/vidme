
import { getAllCategories } from "@/sanity/helpers";

import NavItem from "./NavItem";


const Navbar = async () => {
    const data = await getAllCategories()
    return (
        <section className="bg-gray-50 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 ">
           <NavItem
           data={data}
            />
        </section>

    )
}

export default Navbar