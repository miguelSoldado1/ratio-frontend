import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import useUserInfo from "../../hooks/useUserInfo";
import { followUser, unfollowUser } from "../../api/profileScreen";
import "./FollowButton.css";

export const FollowButton = ({ isFollowing, profileId }) => {
  // const queryClient = useQueryClient();
  const [followStatus, setFollowingStatus] = useState(isFollowing);
  const { data: userData } = useUserInfo();
  const { removeAccessToken } = useAccessToken();

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followStatus ? unfollowUser : followUser,
    onMutate: () => setFollowingStatus(!followStatus),
    onSuccess: (data) => {
      setFollowingStatus(data.isFollowing);
    },
    onError: () => removeAccessToken(),
    // onSuccess: ({ message, ...data }) => queryClient.setQueryData(["getFollowingInfo", userId], (oldData) => ({ ...oldData, ...data })),
  });

  const handleClick = () => changeFollowStatus({ followingId: profileId });

  return (
    <button
      className={`follow-button ${followStatus ? "following" : ""}`}
      onClick={handleClick}
      disabled={isLoading}
      style={{ visibility: userData?.id === profileId ? "hidden" : "visible" }}
    >
      {followStatus ? "Following" : "Follow"}
    </button>
  );
};
