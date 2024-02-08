import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, UserButton, currentUser } from "@clerk/nextjs";
import { Clapperboard, LogOut } from "lucide-react";
import Link from "next/link";


export const Actions = () => {
    return (
        <div className="flex items-center justify-end gap-x-2">
            <Button
             size="sm"
             variant="ghost"
             className="text-muted-foreground hover:text-primary transition duration-500"
             >
                <Link className="flex" href={'/'}>
                    <LogOut className="h-5 w-5 mr-2"/>
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}