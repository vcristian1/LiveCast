import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
                <AvatarImage src={imageUrl} className="object-cover">
                    
                </AvatarImage>
            </Avatar>
        </div>
    )
}