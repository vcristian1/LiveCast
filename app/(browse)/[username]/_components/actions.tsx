"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
}

export const Actions = ({
    isFollowing,
}: ActionsProps) => {
    // Used for loading state
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onFollow('123')
                .then(() => toast.success("Followed Successfully!"))
                .catch(() => toast.error("Something went wrong!"));
        });  
    };
    return (
       <Button disabled={isFollowing || isPending} onClick={onClick} variant="primary">
        Follow
       </Button>
    )
}