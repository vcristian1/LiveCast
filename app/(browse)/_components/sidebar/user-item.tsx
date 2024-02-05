"use client";

interface UserItemProps {
    username: string;
    imageUrl: string;
    isLive: boolean;
}

export const UserItem = ({}: UserItemProps) => {
    return (
        <div>
            User Item
        </div>
    )
}