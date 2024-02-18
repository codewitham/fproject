import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt, user } = await req.json();

        const response = await fetch(
            "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to generate image");
        }

        console.log(response);
        return NextResponse.json({ message: "image generated!", image: response }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server Error!" }, { status: 500 })
    }
}