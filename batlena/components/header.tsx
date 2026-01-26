import React from 'react'
import Logo from './Logo'
import { Input } from './ui/input'
import { Bell, Heart, Search, ShoppingBag } from 'lucide-react'

const Header = () => {
  return (
    <header className='p-4 top-0 left-0 sticky'>
        <div>

        <Logo/>
        <nav>
            <div>
               <Input
            placeholder='Que cherchez vous..'
            />
            <Search/>
            </div>

            <Bell />
            <Heart/>
            <ShoppingBag/>
            <h1>Obtenir l'app</h1>
            
        </nav>
            </div>
    </header>
  )
}

export default Header
