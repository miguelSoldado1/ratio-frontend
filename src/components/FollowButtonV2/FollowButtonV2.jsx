import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import useUserInfo from "../../hooks/useUserInfo";
import { followUser, unfollowUser } from "../../api/profileScreen";
import "./FollowButtonV2.css";

export const FollowButtonV2 = ({ isFollowing, profileId }) => {
  // const queryClient = useQueryClient();
  const [followStatus, setFollowingStatus] = useState(null);
  const { data: userData } = useUserInfo();
  const { removeAccessToken } = useAccessToken();

  useEffect(() => {
    setFollowingStatus(isFollowing);
  }, [isFollowing]);

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: followStatus ? unfollowUser : followUser,
    onMutate: () => setFollowingStatus(!followStatus),
    onSuccess: (data) => setFollowingStatus(data.isFollowing),
    onError: () => removeAccessToken(),
    // onSuccess: ({ message, ...data }) => queryClient.setQueryData(["getFollowingInfo", userId], (oldData) => ({ ...oldData, ...data })),
  });

  const handleClick = () => changeFollowStatus({ followingId: profileId });

  if (userData.id === profileId) return null;

  return (
    <button className={`new-follow-button ${followStatus ? "following" : ""}`} onClick={handleClick} disabled={isLoading}>
      {followStatus ? "Following" : "Follow"}
    </button>
  );
};
