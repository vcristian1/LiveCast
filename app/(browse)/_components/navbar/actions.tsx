import { Button } from "@/components/ui/button";
import { SignInButton, currentUser } from "@clerk/nextjs";

export const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            Actions!
            {!user &&
                <SignInButton>
                    <Button>
                        
                    </Button>
                </SignInButton>
            }
        </div>
    )
}