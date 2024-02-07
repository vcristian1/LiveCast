import { blockUser } from "@/lib/block-service"; // Import the blockUser function from the block-service module
import { revalidatePath } from "next/cache"; // Import the revalidatePath function from the next/cache module

// Define a function to handle the blocking of a user
export const onBlock = async (id: string) => {
    // Block the user identified by the provided id
    const blockedUser = await blockUser(id);

    // Invalidate and revalidate the cache for the root path ("/")
    revalidatePath("/");

    // If the blocking operation was successful and a blockedUser object is returned
    if (blockedUser) {
        // Invalidate and revalidate the cache for the blocked user's profile page
        revalidatePath(`/${blockedUser.blocked.username}`);
    }

    // Return the blockedUser object
    return blockedUser;
}
