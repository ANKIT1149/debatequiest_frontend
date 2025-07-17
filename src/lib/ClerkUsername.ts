"use server";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getClerkUsername = async () => {
    try {
        const { userId } = await auth();
    if (!userId) {
        throw new Error("User Not Authenticated")
    }

    const client = await currentUser();
    if (!client) {
        throw new Error("No Clerk user found");
    }

    return client.username
    } catch (error) {
        console.error("Error fetching Clerk username:", error);
        throw error;
    }
}