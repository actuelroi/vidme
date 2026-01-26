import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './../ui/dropdown-menu'
import { Menu } from 'lucide-react'
import React from 'react'
import { GoTrophy } from "react-icons/go";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { ModeToggle } from './ModeToggle';


const MenuNav = () => {
  const menuItems = [
    {
      title: "Leaderboard",
      href: `/leaderboard`,
      icon: GoTrophy 
    },
    {
      title: "Rewards",
      href: `/rewards`,
      icon: RiMoneyEuroCircleFill 
    },
    {
      title: "API",
      href: `/api`,
      icon: VscDebugDisconnect
    }
  ]

  const menuTerms = [
    {
      title: 'Accuracy',
      href: '/accuracy'
    },
    {
      title: 'Terms of use',
      href: '/terms-of-use'
    },
    {
      title: 'Documentation',
      href: '/documentation'
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'>
        <Menu className='w-5 h-5'/>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className='w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-2'
        align="end"
      >
        {menuItems.map((item) => (
          <DropdownMenuItem 
            key={item.title} 
            className='flex items-center justify-between p-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
          >
            <span className='font-medium'>{item.title}</span>
            <item.icon className='w-4 h-4' />
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className='my-2' />
        
        <div className="p-2">
          <ModeToggle />
        </div>
        
        <DropdownMenuSeparator className='my-2' />
        
        {menuTerms.map((item) => (
          <DropdownMenuItem 
            className='p-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-600 dark:text-gray-400'
            key={item.title}
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuNav