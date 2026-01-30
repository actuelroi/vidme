"use client"


import Logo from './Logo'
import SearchBar from './SearchBar'
import HowItWork from './HowItWork'

import Authorisation from './Authorisation'
import GetTheApp from './get-the-app'
import { Bell, CheckCircle, Heart, Menu, Package, ShoppingCart, Truck } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from '../ui/button'
import { useState } from 'react'

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { RiQuestionLine } from 'react-icons/ri'
import CartIcon from '../product/CartIcon'
import { UserButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/clerk-react'




const steps = [
    {
        icon: ShoppingCart,
        title: "Trouvez votre produit",
        description:
            "Parcourez notre catalogue et choisissez le produit qui correspond à vos besoins.",
    },
    {
        icon: Package,
        title: "Choisissez la quantité et commandez",
        description:
            "Sélectionnez la quantité souhaitée et passez commande en quelques clics.",
    },
    {
        icon: CheckCircle,
        title: "Suivez votre commande",
        description:
            "Visualisez l&apos;avancement de votre commande en temps réel, de la confirmation à l&apos;expédition.",
    },
    {
        icon: Truck,
        title: "Livraison rapide",
        description:
            "Nous livrons rapidement partout en Europe grâce à nos partenaires logistiques fiables.",
    },
]







const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [how, setHow] = useState(false)

    return (
        <header className='sticky top-0 left-0 bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 z-50 border-b'>
            <nav className='flex items-center justify-between py-4 gap-2  px-4'>
                <Logo />
                <SearchBar />
                <Button className='md:hidden' variant={'outline'} onClick={() => setIsOpen(true)}>
                    <Menu size={18} />
                </Button>

                <div className='hidden md:flex md:gap-4 items-center'>
                    <Bell size={20} className='cursor-pointer' />
                    <Heart size={20} className='md:mx-4 cursor-pointer' />
                    <GetTheApp />

                    <Tooltip>
                        <TooltipTrigger className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" 
                         onClick={()=>setHow(true)}
                        >
                            <RiQuestionLine className=" w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="hidden md:inline font-medium">Comment ça marche?</span>
                        </TooltipContent>
                    </Tooltip>

                    <Authorisation />
                    <CartIcon />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                </div>

                <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
                    <SheetContent className='p-4'  >

                        <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2 '>
                            <Bell size={20} />
                            <span className='text-nowrap'>Notification</span>

                        </div>

                        <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                            <Heart size={20} />
                            <span className='text-nowrap'>Preferences</span>

                        </div>

                        <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'

                         role='button'
                         onClick={()=>setHow(true)}
                           >
                            <RiQuestionLine className=" w-5 h-5" />

                            <span className='text-nowrap'>Comment ça marche?</span>

                        </div>

                        <GetTheApp />
                        <Authorisation />
                        <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                            <CartIcon />

                            <span className='text-nowrap'>Pannier</span>

                        </div>
                        <SignedIn>
                            <div className=' flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
                                <UserButton />
                            </div>
                        </SignedIn>

                    </SheetContent>
                </Sheet>


            </nav>


            <Dialog open={how} onOpenChange={() => setHow(false)}>

                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Comment ça marche</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <div key={index} className="flex items-start gap-4">
                                    <Icon className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h4 className="font-medium">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </header>
    )
}

export default Header