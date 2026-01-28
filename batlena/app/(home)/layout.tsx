
import  { PropsWithChildren } from 'react'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'




const layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default layout
