import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../hooks/useUserInfo";
import { followUser, unfollowUser } from "../../api/profileScreen";
import { numberFormatter } from "../../scripts/scripts";
import "./FollowButton.css";

export const FollowButton = ({ followingInfo, userId }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserInfo();

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followingInfo?.following ? unfollowUser : followUser,
    onSuccess: (data) => queryClient.setQueryData(["getFollowingInfo", userId], data),
  });

  const handleClick = () => changeFollowStatus({ followingId: userId });

  return (
    <>
      <h1 className="profile-screen-header-num-followers">
        {numberFormatter.format(followingInfo.followers)} {followingInfo.followers === 1 ? "Follower" : "Followers"}
      </h1>
      <div className="following-button-container">
        {userData.id !== userId && (
          <button className={`follow-button ${followingInfo.following ? "following" : ""}`} onClick={handleClick} disabled={isLoading}>
            <span className="text">{followingInfo.following ? "Following" : "Follow"}</span>
          </button>
        )}
      </div>
    </>
  );
};
