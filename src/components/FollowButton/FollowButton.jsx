import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { followUser, getFollowingInfo, unfollowUser } from "../../api/profileScreen";
import useUserInfo from "../../hooks/useUserInfo";
import { numberFormatter } from "../../scripts/scripts";
import "./FollowButton.css";

export const FollowButton = ({ userId }) => {
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const { data: userData } = useUserInfo();

  const { isLoading } = useQuery({
    queryKey: ["getFollowingInfo", userId],
    queryFn: () => getFollowingInfo({ followingId: userId }),
    onSuccess: (data) => {
      setFollowers(data.followers);
      setFollowing(data.following);
    },
  });

  const { mutate: follow, isLoading: loadingFollow } = useMutation({
    mutationFn: followUser,
    onSuccess: (data) => setFollowers(data.numberOfFollowers),
    onError: () => setFollowing(!following),
  });

  const { mutate: unfollow, isLoading: loadingUnfollow } = useMutation({
    mutationFn: unfollowUser,
    onSuccess: (data) => setFollowers(data.numberOfFollowers),
    onError: () => setFollowing(!following),
  });

  const handleClick = () => {
    following ? unfollow({ followingId: userId }) : follow({ followingId: userId });
    setFollowing(!following);
  };

  if (isLoading || following === null || followers === null) return null;

  return (
    <>
      <h1 className="profile-screen-header-num-followers">
        {numberFormatter.format(followers)} {followers === 1 ? "Follower" : "Followers"}
      </h1>
      {userData.id !== userId && (
        <button className={`follow-button ${following ? "following" : ""}`} onClick={handleClick} disabled={loadingFollow || loadingUnfollow}>
          <span className="text">{following ? "Following" : "Follow"}</span>
        </button>
      )}
    </>
  );
};
