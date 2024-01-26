
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 h-screen">
      <h1 className="text-white">Dashboard</h1>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
