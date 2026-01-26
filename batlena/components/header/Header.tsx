import Logo from './Logo'
import SearchBar from './SearchBar'
import HowItWork from './HowItWork'
import MenuNav from './Menu'
import Authorisation from './Authorisation'
import GetTheApp from './get-the-app'
import { Bell, Heart, ShoppingBag } from 'lucide-react'
import { FaCartShopping } from 'react-icons/fa6'

const Header = () => {
    return (
        <header className='sticky top-0 left-0 bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 z-50 border-b'>
            <nav className='flex items-center justify-between py-4  max-w-7xl mx-auto'>
                    <Logo />
                    <SearchBar />
                        <Bell size={20}/>
                        <Heart size={20}/>
                           <GetTheApp />
                    <HowItWork />
                    <Authorisation />
                    <FaCartShopping size={25} className='cursor-pointer'/>
            </nav>
        </header>
    )
}

export default Header