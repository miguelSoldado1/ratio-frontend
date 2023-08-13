import React, { useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../hooks/useUserInfo";
import { followUser, unfollowUser } from "../../api/profileScreen";
import "./FollowButton.css";

export const FollowButton = ({ isFollowing, profileId }) => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const [followingStatus, setFollowingStatus] = useState(isFollowing);
  const { data: userData } = useUserInfo();

  const ownProfile = userData?.id === profileId;

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followingStatus ? unfollowUser : followUser,
    onMutate: () => setFollowingStatus(!followingStatus),
    onSuccess: (data) => {
      setFollowingStatus(data.isFollowing);

      const isMyUser = userId === userData?.id;
      if (isMyUser || profileId === userId)
        queryClient.setQueryData(["getFollowingInfo", userId], (oldData) => {
          const increment = followingStatus ? -1 : 1;
          return {
            ...oldData,
            followers: isMyUser ? oldData.followers : oldData.followers + increment,
            following: isMyUser ? oldData.following + increment : oldData.following,
          };
        });
    },
  });

  if (ownProfile) {
    return <div className="follow-button-container" />;
  }

  return (
    <div className="follow-button-container">
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
