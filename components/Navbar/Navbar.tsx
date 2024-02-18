import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MobileMenu from './MobileMenu'

const Navbar = () => {
    return (
        <header className=' w-full p-5 flex  items-center justify-between'>
            <div className=' block lg:hidden'>
                <MobileMenu />
            </div>
            <div className=' ml-auto mr-0'>
                <UserButton afterSignOutUrl='/sign-in' />
            </div>
        </header>
    )
}

export default Navbar