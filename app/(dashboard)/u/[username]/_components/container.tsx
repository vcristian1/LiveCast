import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts"; // Importing useMediaQuery hook
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar"; // Importing custom hook for creator sidebar functionality

interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({
    children,
}: ContainerProps) => {
    // Destructuring collapsed, onExpand, and onCollapse from useCreatorSidebar hook
    const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);

    // Using useMediaQuery to check screen size
    const matches = useMediaQuery(`(max-width: 1024px)`);

    useEffect(() => {
        // Effect to handle sidebar behavior based on screen size
        if (matches) {
            // If screen width is less than or equal to 1024px, collapse sidebar
            onCollapse();
        } else {
            // If screen width is greater than 1024px, expand sidebar
            onExpand();
        }
    }, [matches, onCollapse, onExpand]); // Dependencies: matches, onCollapse, onExpand

    return (
        // Render children with dynamic margin left based on collapsed state and screen size
        <div className={cn(
            "flex-1",
            // Set margin left to 70px on mobile screens when sidebar is collapsed
            // Set margin left to 70px on mobile screens and 240px on large screens when sidebar is not collapsed
            collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
        )}>
            {children}
        </div>
    );
};
