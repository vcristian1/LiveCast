import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser, isBlockingUser } from "@/lib/block-service";
import { User } from "@clerk/nextjs/server";

interface UserPageProps {
  params: {
    username: string;
  }
}

const UserPage = async ({
  params,
}: UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if(!user) {
      notFound();
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocking = await isBlockingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)


    //Renders 404 if the logged in user manually enters url for a user that has blocked them
    if(isBlocked) {
      notFound();
    }
    

    return (
      <div className="flex flex-col gap-y-4 h-screen">
          <p>Username: {user.username}</p>
          <p>user ID: {user.id}</p>
          <p>is following: {`${isFollowing}`}</p>
          <p>am I blocking {user.username}: {`${isBlocking}`}</p>
          <p>is {user.username} blocking me: {`${isBlocked}`}</p>
          <Actions userId={user.id} isFollowing={isFollowing} isBlocking={isBlocking}/>
      </div>
    )
}

export default UserPage;