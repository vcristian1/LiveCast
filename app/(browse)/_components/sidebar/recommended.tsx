"use client";

import { User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";

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
            <ul className="px-2 mb-4">
                {data.map((user) => (
                    <UserItem 
                    key={user.id} 
                    username={user.username}
                    imageUrl={user.imageUrl}
                    isLive={true}
                    />
                ))}
            </ul>
        </div>
    )
}