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

    return (
      <div className="flex flex-col gap-y-4 h-screen">
        <nav className="p-1 items-center justify-between gap-y-8">
          <h1>{params.username}&apos;s Page</h1>
        </nav>
      </div>
    )
}

export default UserPage;