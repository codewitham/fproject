import Navbar from '@/components/Navbar/Navbar'
import SideBar from '@/components/Navbar/SideBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' flex min-h-screen w-full'>
            <SideBar />
            <div className=' flex flex-col h-full w-full'>
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default layout