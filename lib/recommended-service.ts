import { db } from "./db"
import { getSelf } from "./auth-service"

export const getRecommended = async () => {
    //Adds a 3 second pause before loading users which enables us to see the Skeletons we created in recommended.
    // await new Promise(resolve => setTimeout(resolve, 500));
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    return users;
}