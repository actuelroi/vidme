
import { PropsWithChildren } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'
import { SanityLive } from '@/sanity/lib/live'
import Navbar from '@/components/Navbar/Navbar'
import SaleHero from '@/components/hero-image'
import { Toaster } from 'react-hot-toast'




const layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            <Navbar />
            <SaleHero />
            <main>
                {children}
                <SanityLive />
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#000000",
                            color: "#fff",
                        },
                    }}
                />
            </main>
            <Footer />
        </>
    )
}

export default layout
