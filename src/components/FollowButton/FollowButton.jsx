import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../api/profileScreen";
import "./FollowButton.css";

const FollowButton = ({ userId, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  useEffect(() => {
    setFollowing(isFollowing);
    return () => {
      setFollowing(null);
    };
  }, [isFollowing]);

  const { mutate: follow, isLoading: loadingFollow } = useMutation({ mutationFn: followUser });
  const { mutate: unfollow, isLoading: loadingUnfollow } = useMutation({ mutationFn: unfollowUser });

  const handleClick = () => {
    following ? unfollow({ followingId: userId }) : follow({ followingId: userId });
    setFollowing(!following);
  };

  if (following === null) return null;

  return (
    <button className={`follow-button ${following ? "following" : ""}`} onClick={handleClick} disabled={loadingFollow || loadingUnfollow}>
      <span className="text">{following ? "Following" : "Follow"}</span>
    </button>
  );
};

export default FollowButton;
