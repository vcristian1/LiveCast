"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useSidebar((state) => state)

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">For you</p>
                    <Hint label={label} side="right" asChild>
                        <Button onClick={onCollapse} className="h-auto p-2 ml-auto transition duration-500" variant="ghost">
                            <ArrowLeftFromLine className="h-4 w-4"/>
                        </Button>
                    </Hint>
                </div>
            )}
            {collapsed && (
                <div className="hidden lg:flex items-center w-full justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button onClick={onExpand} className="h-auto p-2 transition duration-500" variant="ghost">
                            <ArrowRightFromLine className="h-4 w-4"/>
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]"/>            
            <Skeleton className="h-6 w-[100px]"/>
        </div>
    )
}