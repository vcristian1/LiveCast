"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";
import { Follow, User } from "@prisma/client";

interface FollowingProps {
    data: (Follow & {following: User})[];
}

export const Following = ({
    data,
}: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);

    // This will only show the label 'Following' if the sidebar is not collapsed, and if there is users in the database. If there is 0 then it will not render
    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mt-4 mb-4 text-muted-foreground">
                    <p>Following</p>
                </div>
            )}
            <ul className={cn(
                collapsed && "px-0 lg:px-0",
                !collapsed && "lg:px-2"
            )}>
                {data.map((follow) => (
                    <UserItem 
                    key={follow.following.id} 
                    username={follow.following.username}
                    imageUrl={follow.following.imageUrl}
                    isLive={false}
                    />
                ))}
            </ul>
        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    );
};
