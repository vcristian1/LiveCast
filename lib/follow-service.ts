import { getSelf } from "./auth-service";
import { db } from "./db";

// Goes through the db and looks at all the Users which have a matching followerId of the currently logged in user, meaning that its followed by that user.
// We need this function to display on our sidebar the users which the logged in user currently follows.
export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: true,
            },
        })
        return followedUsers;
        } catch (error) {
        return [];
    }
}

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
};

// Define a function to follow another user
export const followUser = async (id: string) => {
    // Retrieve information about the currently authenticated user
    const self = await getSelf();

    // Retrieve information about the user to be followed
    const otherUser = await db.user.findUnique({
        where: { id },
    });

    // Check if the user to be followed exists
    if (!otherUser) {
        throw new Error("User Not Found");
    }

    // Ensure the user is not trying to follow themselves
    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself!");
    }

    // Check if the user is already following the other user
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    // If the user is already following the other user, throw an error
    if (existingFollow) {
        throw new Error("You are already following this user");
    }

    // Create a new follow relationship in the database
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true, // Include the following user in the response
            follower: true, // Include the follower user in the response
        },
    });

    // Return the created follow relationship
    return follow;
}

// Define a function to unfollow a user
export const unfollowUser = async (id: string) => {
    // Retrieve information about the currently authenticated user
    const self = await getSelf();

    // Retrieve information about the user to be unfollowed
    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    // Check if the user to be unfollowed exists
    if (!otherUser) {
        throw new Error("User Not Found!");
    }

    // Ensure the user is not trying to unfollow themselves
    if (otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself!");
    }

    // Check if the user is currently following the other user
    const existingFollow = await db.follow.findFirst({
        where: {
           followerId: self.id,
           followingId: otherUser.id, 
        },
    });

    // If there's no existing follow relationship, throw an error
    if (!existingFollow) {
        throw new Error("Not Following!");
    }

    // Delete the existing follow relationship from the database
    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true, // Include the following user in the response
            follower: true,
        },
    });

    // Return the deleted follow relationship
    return follow;
}