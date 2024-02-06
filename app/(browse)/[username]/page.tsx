import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

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


    return (
      <div className="flex flex-col gap-y-4 h-screen">
        <nav className="p-1 items-center justify-between gap-y-8">
          <p>Userame: {user.username}</p>
          <p>user ID: {user.id}</p>
          <p>is following: {`${isFollowing}`}</p>
        </nav>
      </div>
    )
}

export default UserPage;