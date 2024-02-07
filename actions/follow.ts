// This comment indicates that the following code should behave like an API route and not be bundled with client-side JavaScript.
"use server";

// Import the `revalidatePath` function from the `next/cache` module.
import { revalidatePath } from "next/cache"; 

// Import the `followUser` function from a local module located at `@/lib/follow-service`.
import { followUser } from "@/lib/follow-service";

// Define an asynchronous function named `onFollow` that takes an `id` parameter.
export const onFollow = async (id: string) => {
    try {
        // Attempt to follow the user identified by the provided `id` by calling the `followUser` function.
        const followedUser = await followUser(id);

        // Invalidate and revalidate the cache for the root path ("/").
        revalidatePath("/");

        // If the follow action was successful and `followedUser` is not null,
        // invalidate and revalidate the cache for the user's profile page based on the `username` of the user being followed.
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        // Return the result of the follow action (the `followedUser` object).
        return followedUser;
    } catch (error) {
        // If an error occurs during the follow action, throw a new Error with the message "Internal Error".
        throw new Error("Internal Error");
    }
};