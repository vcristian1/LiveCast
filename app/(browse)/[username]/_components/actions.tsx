"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

export const Actions = () => {
    const onClick = () => {
        onFollow('123');
    }
    return (
       <Button onClick={onClick} variant="primary">
        Follow
       </Button>
    )
}