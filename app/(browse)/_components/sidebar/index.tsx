import { getRecommended } from "@/lib/recommended-service"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = async () => {
    const recommended = await getRecommended();
    return (
        <Wrapper>
           <Toggle />
           <div className="space-y4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
           </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
            <RecommendedSkeleton />
        </aside>
    );
};