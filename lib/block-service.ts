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

// Define a function to block a user
export const blockUser = async (id: string) => {
    // Retrieve information about the current user
    const self = await getSelf();

    // Check if the current user is attempting to block themselves
    if (self.id === id) {
        throw new Error("Cannot Block Yourself");
    }

    // Retrieve information about the user to be blocked based on the provided id
    const otherUser = await db.user.findUnique({
        where: {
            id,
        }
    });

    // Throw an error if the user to be blocked is not found
    if (!otherUser) {
        throw new Error("User Not Found!");
    }

    // Check if there exists a block record where the current user is the blocker and the other user is blocked
    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            },
        },
    });

    // If an existing block record is found, throw an error indicating that the user is already blocked
    if (existingBlock) {
        throw new Error("This User is already blocked!");
    }

    // Create a new block record in the database with the current user as the blocker and the other user as blocked
    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true, // Include information about the blocked user in the response
        },
    });

    // Return the created block record
    return block;
}