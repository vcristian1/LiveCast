import { getRecommended } from "@/lib/recommended-service"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowedUsers } from "@/lib/follow-service"

export const Sidebar = async () => {
    //recommended is equal to a function used to get the recommended users under 'For you'
    const recommended = await getRecommended();
    //follows is equal to a function used to get the followed users under 'Following'
    const follows = await getFollowedUsers();
    
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
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};