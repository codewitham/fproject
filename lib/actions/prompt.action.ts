'use server';
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { auth } from "@clerk/nextjs";

export const CreatePrompt = async ({ text, email, user }: createPrompt) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return { error: "unauthorized!" }
        }
        const data = await prisma.prompt.create({
            data: {
                text: text, email: email, user: user
            }
        });

        revalidatePath("/")
        revalidatePath("/generate")
        return { data: data, message: "data created!" };
    } catch (error) {
        console.error(error);
        return { error: "Server error!" };
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}

export const getAllPrompts = async () => {
    try {
        const data = await prisma.prompt.findMany();
        return { data: data as prompt[] };
    } catch (error) {
        console.error(error);
        return { error: "Server error!" };
    } finally {
        await prisma.$disconnect(); // Close Prisma connection
    }
}

export const deletePrompt = async (id: string) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return { error: "unauthorized!" }
        }
        const user = userId ? await clerkClient.users.getUser(userId) : null;

        const data = await prisma.prompt.delete({ where: { email: user?.emailAddresses[0].emailAddress, id: id } });
        revalidatePath("/")
        return { data: data, message: "data deleted!" };
    } catch (error) {
        console.error(error);
        return { error: "Server error!" };
    } finally {
        await prisma.$disconnect();
    }
}

export const updatePrompt = async (id: string, text: string) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return { error: "unauthorized!" }
        }
        const user = userId ? await clerkClient.users.getUser(userId) : null;
        const data = await prisma.prompt.update({ where: { email: user?.emailAddresses[0].emailAddress, id: id }, data: { text: text } });
        revalidatePath("/")
        return { data: data, message: "data updated!" };
    } catch (error) {
        console.error(error);
        return { error: "Server error!" };
    } finally {
        await prisma.$disconnect();
    }
}

export const getUsersPrompt = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            return { error: "unauthorized!" }
        }
        const user = userId ? await clerkClient.users.getUser(userId) : null;
        const data = await prisma.prompt.findMany({ where: { email: user?.emailAddresses[0].emailAddress } });
        return { data: data as prompt[] };
    } catch (error) {
        console.error(error);
        return { error: "Server error!" };
    } finally {
        await prisma.$disconnect();
    }
}