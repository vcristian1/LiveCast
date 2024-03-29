"use client";

import { User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";
import { cn } from "@/lib/utils";
import { UserPlus, UserRoundSearchIcon } from "lucide-react";
import { Hint } from "@/components/hint";

interface RecommendedProps {
    data: User[];
}

export const Recommended = ({
    data, 
}: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);

    // This will only show the label 'For you' if the sidebar is not collapsed, and if there is users in the database. If there is 0 then it will not render
    const showLabel = !collapsed && data.length > 0;
    const showIcon = collapsed && data.length > 0;
    const label = "Recommended"

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4 mt-4 text-muted-foreground">
                    <p>Recommended</p>
                </div>
            )}
            {showIcon && (
                <div className="pl-6 mb-4 mt-8 text-muted-foreground items-center justify-center">
                    <Hint label={label} side="right" asChild>
                        <UserPlus className="text-white ml-1 h-4 w-4"/>
                    </Hint>
                </div>
            )}
            <ul className={cn(
                collapsed && "px-0 lg:px-0",
                !collapsed && "lg:px-2"
            )}>
                {data.map((user) => (
                
                    <UserItem 
                    key={user.id} 
                    username={user.username}
                    imageUrl={user.imageUrl}
                    isLive={false}
                    />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    )
}