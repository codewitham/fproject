import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const Banner = () => {
    return (
        <div className=' w-full shadow-xl relative p-5 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-500 text-white overflow-hidden'>
            <div className=' flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>Generate Anime Like Art.</h1>
                <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br />
                    Sequi perferendis dolores aut! Excepturi dolorum culpa.</p>

                <Link href={"/generate"}>
                    <Button className='text-primary' variant={"outline"} size={"lg"}>Generate <ArrowRight className=' h-4 w-4 ml-2' /></Button>
                </Link>
            </div>


            <div className=' hidden lg:block absolute left-auto right-0 bottom-0 h-full w-auto'>
                <img src="/banner.png" className="h-full w-auto" alt="banner" />
            </div>
        </div>
    )
}

export default Banner