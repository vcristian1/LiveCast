// This service is using the current user from Clerk and then fetch the matching user in the database, that way we have the exact information we need. 

import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized User")
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id}
    });

    if (!user) {
        throw new Error("User Not Found")
    }

    return user;
}