import Link from "next/link";
import { FaChampagneGlasses } from "react-icons/fa6";


const Logo = () => {
  return (
    <Link href={'/'} className="flex items-center gap-2 cursor-pointer">
      <h2 className="font-bold text-xl md:text-2xl ">BatleNA</h2>
      <FaChampagneGlasses  className="w-8 h-8  md:w-10 mdh-10 text-purple-600"/>
    </Link>
  )
}

export default Logo