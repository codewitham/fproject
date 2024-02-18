'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';
import { Home, NotebookPen } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

const MobileMenu = () => {

    const path = usePathname();

    const isLinkActive = (href: string) => {
        return path === href;
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <Menu className='h-4 w-4' />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className=' text-3xl font-bold p-2 text-orange-500'>
                        F<span className=' text-primary'>Pro</span>
                    </SheetTitle>
                </SheetHeader>

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
            </SheetContent>
        </Sheet >
    )
}

export default MobileMenu