"use client"


import Logo from './Logo'
import SearchBar from './SearchBar'
import HowItWork from './HowItWork'

import Authorisation from './Authorisation'
import GetTheApp from './get-the-app'
import { Bell, Heart, Menu } from 'lucide-react'
import { FaCartShopping } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { useState } from 'react'

import {Sheet,SheetContent} from "@/components/ui/sheet"
import { RiQuestionLine } from 'react-icons/ri'
import CartIcon from '../product/CartIcon'




const Header = () => {
    const [isOpen, setIsOpen]= useState(false)
     
    return (
        <header className='sticky top-0 left-0 bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 z-50 border-b'>
            <nav className='flex items-center justify-between py-4  max-w-7xl mx-auto'>
                <Logo />
                <SearchBar />
                <Button className='md:hidden' variant={'outline'} onClick={()=>setIsOpen(true)}>
                    <Menu size={18} />
                </Button>

                <div className='hidden md:flex md: gap-4 items-center'>
                    <Bell size={20} />
                    <Heart size={20} className='md:mx-4' />
                    <GetTheApp />

                    <HowItWork />
                    <Authorisation />
                    <CartIcon/>
                </div>

            <Sheet open={isOpen} onOpenChange={()=>setIsOpen(false)}>
                <SheetContent className='p-4'  >

                <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                        <Bell size={20} />
                        <span className='text-nowrap'>Notification</span>
                        
                    </div>

                     <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                       <Heart size={20}  />
                        <span className='text-nowrap'>Preferences</span>
                        
                    </div>
               
                   <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                       <RiQuestionLine className=" w-5 h-5" />
  
                        <span className='text-nowrap'>Comment ça marche?</span>
                        
                    </div>
                    
                    <GetTheApp />
                    <Authorisation />
                    <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                       <CartIcon/>
  
                        <span className='text-nowrap'>Pannier</span>
                        
                    </div>
                    
                </SheetContent>
            </Sheet>


            </nav>
        </header>
    )
}

export default Header