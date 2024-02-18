import React from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { deletePrompt } from '@/lib/actions/prompt.action'
import { toast } from '../ui/use-toast'

const DeletePrompt = ({ id }: { id: string }) => {
    const onDelete = async () => {
        const res = await deletePrompt(id);
        if (res.error) {
            toast({ title: res.error })
            return;
        }
        toast({ title: "prompt deleted!" })
        return;
    }
    return (
        <Button onClick={onDelete} variant={"ghost"} size={"icon"} className='ml-2'>
            <Trash2 className=' h-4 w-4' />
        </Button>
    )
}

export default DeletePrompt