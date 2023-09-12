import { useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "@/hooks";
import { followUser, unfollowUser } from "@/api/profileScreen";
import type { FollowingInfo } from "@/types";
import "./FollowButton.css";

interface FollowButtonProps {
  isFollowing: boolean;
  profileId?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, profileId }) => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const [followingStatus, setFollowingStatus] = useState(isFollowing);
  const { userData } = useUserInfo();

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followingStatus ? unfollowUser : followUser,
    onMutate: () => setFollowingStatus(!followingStatus),
    onSuccess: (data) => {
      setFollowingStatus(data.isFollowing);
      const isMyUser = userId === userData?.id;

      if (isMyUser || profileId === userId) {
        queryClient.setQueryData<FollowingInfo>(["getFollowingInfo", userId], (oldData) => {
          if (oldData) {
            const increment = followingStatus ? -1 : 1;
            return {
              ...oldData,
              followers: isMyUser ? oldData.followers : oldData.followers + increment,
              following: isMyUser ? oldData.following + increment : oldData.following,
            };
          }
        });
      }
    },
  });

  if (!userData?.id || userData?.id === profileId) {
    return <div className="follow-button-container" />;
  }

  return (
    <div className="follow-button-container" title={`Click to ${followingStatus ? "unfollow" : "follow"}`}>
      <button
        className={`follow-button ${followingStatus ? "following" : ""}`}
        onClick={() => changeFollowStatus({ followingId: profileId })}
        disabled={isLoading || followingStatus === null}
      >
        {followingStatus ? "Following" : "Follow"}
      </button>
    </div>
  );
};
