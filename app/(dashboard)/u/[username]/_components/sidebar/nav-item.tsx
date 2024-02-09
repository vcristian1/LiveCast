import { Button } from "@/components/ui/button"; // Importing Button component
import { cn } from "@/lib/utils"; // Importing cn utility function for classname concatenation
import { useCreatorSidebar } from "@/store/use-creator-sidebar"; // Importing custom hook for creator sidebar functionality
import { LucideIcon } from "lucide-react"; // Importing LucideIcon component from lucide-react library
import Link from "next/link"; // Importing Link component from Next.js

interface NavItemProps {
    icon: LucideIcon; // Icon component to render
    label: string; // Label for the navigation item
    href: string; // URL for the navigation item
    isActive: boolean; // Flag indicating if the navigation item is active
}

export const NavItem = ({
    icon: Icon, // Destructuring Icon from props
    label, // Destructuring label from props
    href, // Destructuring href from props
    isActive, // Destructuring isActive from props
}: NavItemProps) => {
    const { collapsed } = useCreatorSidebar((state) => state); // Using custom hook to get sidebar state

    return (
        <Button
            asChild // Prop to render as child element
            variant="ghost" // Variant of the button
            className={cn( // Dynamically setting classnames based on conditions
                "w-full h-12", // Base classnames for button
                collapsed ? "justify-center" : "justify-start", // Conditionally setting button alignment
                isActive && "bg-accent", // Conditionally setting background color if item is active
            )}
        >
            <Link href={href}> {/* Link to navigate to specified URL */}
                <div className="flex items-center gap-x-4"> {/* Container for icon and label */}
                    <Icon className={cn( // Rendering icon component with dynamic classnames
                        "h-4 w-4", // Base classnames for icon
                        collapsed ? "mr-0" : "mr-2" // Conditionally setting margin based on sidebar state
                    )}/>
                    {!collapsed && ( // Rendering label only if sidebar is not collapsed
                        <span>
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    );
};
