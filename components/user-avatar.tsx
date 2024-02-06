import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LiveBadge } from "../components/live-badge";

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}
const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14"
            },
        },
        defaultVariants: {
            size: "default"
        },
    },
);


export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge,
    size
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar className={cn(
                // If the user isLive, red ring is around the avatar image
                isLive && "ring-2 ring-rose-500 border border-bg"
            )}>
                <AvatarImage src={imageUrl} className="object-cover" />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length -1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}