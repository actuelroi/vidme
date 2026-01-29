"use client"

import { ClerkLoaded, ClerkLoading, SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { TbTruckDelivery } from 'react-icons/tb'
import Link from 'next/link'


const Authorisation = () => {
  return (
    <div className='flex items-center gap-4 mx-4'>

      <ClerkLoading>
        <Loader className='animate-spin w-5 h-5' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignUpButton mode='modal'>
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 border">
              S'inscrire
            </Button>
          </SignUpButton>
          <SignInButton mode='modal'>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Se connecter
            </Button>
          </SignInButton>
        </SignedOut>


        <SignedIn>
          <Link href={'/order'} className='flex items-center gap-3'>
            <TbTruckDelivery size={18} />
            <span>Mes commandes</span>
          </Link>

        </SignedIn>

      </ClerkLoaded>


    </div>
  )
}

export default Authorisation