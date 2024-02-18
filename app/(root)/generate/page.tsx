import CreatePromptForm from '@/components/CreatePrompt/CreatePromptForm'
import UserPrompt from '@/components/CreatePrompt/UserPrompt'
import React from 'react'

const page = () => {
    return (
        <div className=' p-5'>
            <CreatePromptForm />
            <div className=' pt-5'>
                <UserPrompt />
            </div>
        </div>
    )
}

export default page