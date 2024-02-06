import { db } from "./db";

// Define a function to fetch a user by their username
export const getUserByUsername = async (username: string) => {
    // Attempt to retrieve a user from the database by their username
    const user = await db.user.findUnique({
        where: {
            username,
        }
    });

    // Return the retrieved user (or null if not found)
    return user;
}
