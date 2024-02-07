import { getSelf } from "./auth-service"; // Import the getSelf function from the auth-service module
import { db } from "./db"; // Import the db object from the db module

// Define a function to check if the current user is blocked by another user
export const isBlockedByUser = async (id: string) => {
    try {
        // Retrieve information about the current user
        const self = await getSelf();

        // Retrieve information about the other user based on the provided id
        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        });

        // Throw an error if the other user is not found
        if (!otherUser) {
            throw new Error("User not found");
        }

        // Check if the other user's id is equal to the current user's id
        // If true, return false (current user cannot block themselves)
        if (otherUser.id === self.id){
            return false;
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                },
            },
        });

        // Return a boolean indicating whether or not an existing block record was found
        return !!existingBlock;
    } catch (error) {
        // If an error occurs during the execution, return false
        return false;
    }
}