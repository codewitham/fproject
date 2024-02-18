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

const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const GenerateImages = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const response = await fetch("https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
                body: JSON.stringify({ inputs: values.prompt }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const blob = await response.blob();

            setOutput(URL.createObjectURL(blob));
            setImageFile(new File([blob], "art.png", { type: "image/png" }));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prompt</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Generated Image will be displayed below.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Generate</Button>
                </form>
            </Form>

            <div>
                {loading && <div className="loading"><p>loading</p></div>}
                {!loading && output && (
                    <div className="result-image">
                        <img src={output} alt="art" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default GenerateImages