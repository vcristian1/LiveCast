"use client";

import { User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";
import { cn } from "@/lib/utils";

interface RecommendedProps {
    data: User[];
}

export const Recommended = ({
    data, 
}: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4 text-muted-foreground">
                    <p>For you</p>
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