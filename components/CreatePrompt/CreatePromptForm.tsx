"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreatePrompt } from '@/lib/actions/prompt.action'
import { useUser } from '@clerk/nextjs'
import { toast } from '../ui/use-toast'

const formSchema = z.object({
    text: z.string().min(2, {
        message: "text must be at least 2 characters.",
    }).max(200, { message: "text max 200." }),
})

const CreatePromptForm = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const res = await CreatePrompt({ text: values.text, email: user?.emailAddresses[0].emailAddress || "", user: user?.fullName || "" });
        setLoading(false);
        if (res.error) {
            return toast({ title: res.error })
        }
        return toast({ title: res.message });
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prompt</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    type your prompt here...
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} type="submit">create</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreatePromptForm