import { getSelf } from "./auth-service";
import { db } from "./db";

//The isFollowingUser function is defined as an asynchronous function that takes a single parameter id of type string, representing the ID of the user being checked for follow status.
export const isFollowingUser = async (id: string) => {
    //The function wraps its operations in a try-catch block
    try {
        //Within the try block, it awaits the getSelf function, to retrieve information about the currently authenticated user (self).
        const self = await getSelf();
        //It then attempts to fetch information about the user identified by the id parameter from the database using db.user.findUnique.
        const otherUser = await db.user.findUnique({
            where: { id },
        });
        //If the user identified by id is not found in the database (otherUser is falsy), it throws an error with the message "User Not Found".
        if (!otherUser) {
            throw new Error("User Not Found")
        };
        //It checks if the user identified by id is the same as the current user (self). If so, it immediately returns true, indicating that the current user is following themselves.
        if (otherUser.id === self.id) {
            return true;
        }
        //If the user identified by id is not the current user, it queries the database to check if there's an existing follow relationship between the current user and the other user (existingFollow). It does so by using db.follow.findFirst with appropriate filter conditions.
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        });
        //Finally, the function returns true if an existing follow relationship is found (existingFollow is truthy), and false otherwise.
        return !!existingFollow
    } catch (error) {
        //If any error occurs during the execution of the function, it catches the error and returns false.
        return false
    }
}