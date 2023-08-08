import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserInfo from "../../hooks/useUserInfo";
import { followUser, unfollowUser } from "../../api/profileScreen";
import "./FollowButton.css";

export const FollowButton = ({ followingInfo, userId }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useUserInfo();

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followingInfo?.isFollowing ? unfollowUser : followUser,
    onSuccess: (data) => queryClient.setQueryData(["getFollowingInfo", userId], data),
  });

  const handleClick = () => changeFollowStatus({ followingId: userId });

  return (
    <div className="following-button-container">
      {userData.id !== userId && (
        <button className={`follow-button ${followingInfo.isFollowing ? "following" : ""}`} onClick={handleClick} disabled={isLoading}>
          <span className="text">{followingInfo.isFollowing ? "Following" : "Follow"}</span>
        </button>
      )}
    </div>
  );
};
