import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 h-screen">
      <nav className="p-1 items-center justify-between gap-y-8">
        <h1 className="text-white">Home Page</h1>
      </nav>
    </div>
  )
}
