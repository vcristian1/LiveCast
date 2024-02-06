import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({}: UserAvatarProps) => {
    return (
        <div>
            UserAvatar
        </div>
    )
}