import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsersProfile } from "../../../../../api/albumDetails";
import { getMe } from "../../../../../api/navigationBar";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";

export const RatingPostsAvatar = ({ userId }) => {
  const { data: userData } = useQuery({ queryKey: ["userInfo"], queryFn: getMe, staleTime: 60 * 6000, cacheTime: 60 * 6000 });

  const { data: profileData } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => handleUserProfile(userId),
  });

  const handleUserProfile = async (userId) => {
    if (userData?.id === userId) return userData;
    return await getUsersProfile({ user_id: userId });
  };

  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.displayName }}>
      <img className="post-avatar-img" alt={profileData?.displayName} src={profileData?.imageUrl ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profileData?.displayName}</p>
    </Link>
  );
};
