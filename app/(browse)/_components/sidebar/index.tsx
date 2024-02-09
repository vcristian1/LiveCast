import { getRecommended } from "@/lib/recommended-service"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following, FollowingSkeleton } from "./following"
import { getBlockedUsers } from "@/lib/block-service"
import { Blocking, BlockingSkeleton } from "./blocking"

export const Sidebar = async () => {
    //recommended is equal to a function used to get the recommended users under 'For you'
    const recommended = await getRecommended();
    //follows is equal to a function used to get the followed users under 'Following'
    const following = await getFollowedUsers();

    const blocking = await getBlockedUsers();

    return (
        <Wrapper>
           <Toggle />
           <div className="space-y4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended data={recommended} />
                <Blocking data={blocking} />
           </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
            <BlockingSkeleton />
        </aside>
    );
};