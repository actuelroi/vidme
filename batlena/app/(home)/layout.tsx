
import  { PropsWithChildren } from 'react'
import Header from '@/components/header/Header'




const layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

export default layout
