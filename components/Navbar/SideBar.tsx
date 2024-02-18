'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { Home, NotebookPen } from 'lucide-react';

const SideBar = () => {
    const path = usePathname();

    const isLinkActive = (href: string) => {
        return path === href;
    }
    return (
        <div className='hidden lg:flex flex-col h-screen p-5 border-r max-w-[300px] w-full'>
            <Link href={"/"}>
                <h1 className=' text-3xl font-bold p-2 text-orange-500'>
                    F<span className=' text-primary'>Pro</span>
                </h1>
            </Link>
            <div className=' pt-5 flex flex-col gap-2 border-t'>
                <Link href={"/"}>
                    <Button className=' w-full' variant={isLinkActive("/") ? "default" : "ghost"}>
                        <Home className=' h-4 w-4 mr-2' />  Dashboard
                    </Button>
                </Link>
                <Link href={"/generate"}>
                    <Button className=' w-full' variant={isLinkActive("/generate") ? "default" : "ghost"}>
                        <NotebookPen className=' h-4 w-4 mr-2' /> Generate
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SideBar