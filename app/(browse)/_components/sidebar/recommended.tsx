"use client";

import { User } from "@prisma/client"
import { useSidebar } from "@/store/use-sidebar";

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
            <ul>
                {data.map((user) => (
                    <div key={user.id}>
                        {user.username}
                    </div>
                ))}
            </ul>
        </div>
    )
}