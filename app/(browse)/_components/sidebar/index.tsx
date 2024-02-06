import { getRecommended } from "@/lib/recommended-service"
import { Recommended } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = async () => {
    const recommended = await getRecommended();
    return (
        <Wrapper>
           <Toggle />
<<<<<<< HEAD
           <div className="space-y4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
           </div>
=======
           <p>Recommended!</p>
>>>>>>> e771627241d0075da3d7bac0cc6c078e3ce15407
        </Wrapper>
    )
}