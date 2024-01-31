import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, currentUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";


export const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button>
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary transition duration-500"
                    >
                        <Link href={`/u/${user.username}`} className="flex space-x-1">
                            <Clapperboard />
                            <span>
                                Dashboard
                            </span>
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}