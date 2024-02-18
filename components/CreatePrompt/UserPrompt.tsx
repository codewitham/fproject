import { getUsersPrompt } from '@/lib/actions/prompt.action';
import React from 'react'
import PromptCard from '../Dashboard/PromptCard';

const UserPrompt = async () => {
    const prompts = await getUsersPrompt() as { data: prompt[] };
    return (
        <div className='flex flex-col gap-5'>
            <h1 className=' text-3xl font-bold'>Showcase Prompts</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {prompts && prompts.data.map((prompt, index) => (
                    <PromptCard key={index} prompt={prompt} />
                ))}
            </div>
        </div>
    )
}

export default UserPrompt