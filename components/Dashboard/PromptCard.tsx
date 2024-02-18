'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from '../ui/use-toast';
import { useUser } from '@clerk/nextjs';
import UpdatePrompt from '../CreatePrompt/UpdatePrompt';
import DeletePrompt from '../CreatePrompt/DeletePrompt';

const PromptCard = ({ prompt }: { prompt: prompt }) => {
    const [copied, setCopied] = useState(false);
    const { user } = useUser();

    const handleCopy = () => {
        setCopied(true);
        toast({ title: "copied to clipboard!" })
        return;
    };

    return (
        <Card className=' relative h-fit w-full'>
            <CardHeader>
                <CardDescription>
                    {prompt.text}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-between'>
                <CardTitle className='text-sm'>
                    {prompt.user}
                </CardTitle>
                <CopyToClipboard text={prompt.text} onCopy={handleCopy}>
                    <Button className='px-2 py-2' size={"icon"} variant={"ghost"}>
                        <Copy className='h-3 w-3' />
                    </Button>
                </CopyToClipboard>
            </CardContent>
            {user?.emailAddresses[0].emailAddress === prompt.email &&
                <CardFooter>
                    <UpdatePrompt id={prompt.id} text={prompt.text} />
                    <DeletePrompt id={prompt.id} />
                </CardFooter>
            }
        </Card>
    );
};

export default PromptCard;
