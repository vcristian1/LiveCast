"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Block, User } from "@prisma/client";
import { Ban } from "lucide-react";
import { Hint } from "@/components/hint";

interface BlockingProps {
    data: (Block & {blocked: User})[];
}

export const Blocking = ({
    data,
}: BlockingProps) => {
    const { collapsed } = useSidebar((state) => state);

    // This will only show the label 'Following' if the sidebar is not collapsed, and if there is users in the database. If there is 0 then it will not render
    const showLabel = !collapsed && data.length > 0;
    const showIcon = collapsed && data.length > 0;
    const label = "Blocked"

    return (
        <div>
            {showLabel && (
                <div className="pl-6 lg:mt-4 mb-4 text-muted-foreground">
                    <p>Blocked</p>
                </div>
            )}
            {showIcon && (
                <div className="pl-7 mt-8 mb-4 text-muted-foreground items-center justify-center">
                    <Hint label={label} side="right" asChild>
                        <Ban className="text-white h-4 w-4"/>
                    </Hint>
                </div>
            )}
            <ul className={cn(
                collapsed && "px-0 lg:px-0",
                !collapsed && "lg:px-2"
            )}>
                {data.map((block) => (

                    <UserItem 
                    key={block.blocked.id} 
                    username={block.blocked.username}
                    imageUrl={block.blocked.imageUrl}
                    isLive={false}
                    />
                ))}
            </ul>
        </div>
    )
}

export const BlockingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    );
};
