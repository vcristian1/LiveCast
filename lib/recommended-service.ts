import { db } from "./db"
import { getSelf } from "./auth-service"

export const getRecommended = async () => {
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
                  {
                    NOT: {
                        OR: [
                            { // Exclude users who have blocked the logged-in user
                                blocking: { some: { blockedId: userId } }
                            },
                            { // Exclude users whom the logged-in user has blocked
                                blockedBy: { some: { blockerId: userId } }
                            }
                        ]
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