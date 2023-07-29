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

  useQuery({
    queryKey: ["getFollowingInfo", userId],
    queryFn: () => getFollowingInfo({ followingId: userId }),
    onSuccess: (data) => {
      setFollowers(data.followers);
      setFollowing(data.following);
    },
  });

  const { mutate: changeFollowStatus, isLoading } = useMutation({
    mutationFn: following ? unfollowUser : followUser,
    onSuccess: (data) => setFollowers(data.numberOfFollowers),
    onError: () => setFollowing(!following),
  });

  const handleClick = () => {
    changeFollowStatus({ followingId: userId });
    setFollowing(!following);
  };

  return (
    <>
      <h1 className="profile-screen-header-num-followers">
        {!!followers ? `${numberFormatter.format(followers)} ${followers === 1 ? "Follower" : "Followers"}` : ""}
      </h1>
      {userData.id !== userId && (
        <button className={`follow-button ${following ? "following" : ""}`} onClick={handleClick} disabled={isLoading}>
          <span className="text">{following ? "Following" : "Follow"}</span>
        </button>
      )}
    </>
  );
};
