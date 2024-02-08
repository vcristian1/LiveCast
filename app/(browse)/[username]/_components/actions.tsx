"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
  isBlocking: boolean;
};

export const Actions = ({
  isFollowing,
  userId,
  isBlocking,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClickFollow = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  }

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
      .then((data) => toast.success(`Blocked ${data.blocked.username}`))
      .catch(() => toast.error('Something went wrong!'))
      if(isFollowing){
        onUnfollow(userId)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("Something went wrong"));
      }
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
      .then((data) => toast.success(`Unblocked ${data.blocked.username}`))
      .catch(() => toast.error('Something went wrong!'))
    });
  };

  const onClickBlock = () => {
    if (isBlocking) {
      handleUnblock();
    } else {
      handleBlock();
    }
  }

  return (
    <>
    <Button 
      disabled={isBlocking} 
      onClick={onClickFollow} 
      variant="primary"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
    <Button onClick={onClickBlock} disabled={isPending}>
      {isBlocking ? "Unblock" : "Block"}
    </Button>
    </>
  );
};