import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        })

        if (!otherUser) {
            throw new Error("User not found");
        }

        // If the otherUser.id is equal to our id return false
        if(otherUser.id === self.id){
            return false;
        }

        const existingBlock = await db.block.findFirst({
            where: {
                blockerId: otherUser.id,
                blockedId: self.id,
            },
        });

        //Return a boolean on whether or not existingBlock exists.
        return !!existingBlock
    } catch (error) {
        return false;
    }
}