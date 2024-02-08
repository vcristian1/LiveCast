import { db } from "./db"
import { getSelf } from "./auth-service"

export const getRecommended = async () => {
    //Adds a 3 second pause before loading users which enables us to see the Skeletons we created in recommended.
    // await new Promise(resolve => setTimeout(resolve, 500));
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        userId = null;
    }

    let users = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                  {// NOT including the logged in user
                    NOT: {
                      id: userId
                    },
                  },
                  {// NOT including users who are already followed by the logged in user
                    NOT: {
                        followedBy: {
                            some: {
                                followerId: userId,
                            }
                        }
                    }
                  },
                  {// NOT including users who have been blocked by the logged in user
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId,
                            }
                        }
                    }
                  }
              ]
                
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
      users = await db.user.findMany({
          orderBy: {
              createdAt: "desc"
          },
      });
    }
    return users;
}