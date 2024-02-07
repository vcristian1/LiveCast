"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

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
            onFollow('123');
        });  
    };
    return (
       <Button disabled={isFollowing || isPending} onClick={onClick} variant="primary">
        Follow
       </Button>
    )
}