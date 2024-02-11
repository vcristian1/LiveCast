"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Hint } from "@/components/hint";

export const Navigation = () => {
    const pathname = usePathname();
    const { user } = useUser();
    const { collapsed } = useCreatorSidebar((state) => state);

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ]

    if(!user?.username) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }

    return  (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => {
                const navItem = (
                    <NavItem 
                     label={route.label}
                     icon={route.icon}
                     href={route.href}
                     isActive={pathname === route.href}
                    />
                );

                // Conditionally wrap NavItem with Hint based on the collapsed state
                return collapsed ? (
                    <Hint label={route.label} side="right" key={route.href}>
                        {navItem}
                    </Hint>
                ) : (
                    navItem
                );
            })}
        </ul>
    );
};