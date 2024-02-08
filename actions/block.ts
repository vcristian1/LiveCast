"use server";

import { blockUser, unblockUser } from "@/lib/block-service"; // Import the blockUser function from the block-service module
import { revalidatePath } from "next/cache"; // Import the revalidatePath function from the next/cache module

// Define a function to handle the blocking of a user
export const onBlock = async (id: string) => {
    const blockedUser = await blockUser(id);
    revalidatePath("/")

    if(blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`)
    }
    return blockedUser;
  };
  
  export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);
    revalidatePath("/")

    if(unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`)
    }
    return unblockedUser;
  };