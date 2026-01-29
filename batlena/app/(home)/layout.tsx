
import  { PropsWithChildren } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'
import { SanityLive } from '@/sanity/lib/live'
import Navbar from '@/components/Navbar/Navbar'
import SaleHero from '@/components/hero-image'




const layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
             <Navbar/>
            <SaleHero/>
            <main>
                {children}
                 <SanityLive />
            </main>
            <Footer/>
        </>
    )
}

export default layout
