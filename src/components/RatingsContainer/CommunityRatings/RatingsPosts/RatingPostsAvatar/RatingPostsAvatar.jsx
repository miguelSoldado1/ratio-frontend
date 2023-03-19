import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsersProfile } from "../../../../../api/albumDetails";
import { getMe } from "../../../../../api/navigationBar";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";
import useAccessToken from "../../../../../hooks/useAuthentication";

export const RatingPostsAvatar = ({ userId }) => {
  const { accessToken } = useAccessToken();
  const { data: userData } = useQuery({ queryKey: ["userInfo", accessToken], queryFn: getMe, staleTime: 60 * 6000, cacheTime: 60 * 6000 });

  const { data: profileData } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => handleUserProfile(userId),
  });

  const handleUserProfile = async (userId) => {
    if (userData.id === userId) return userData;
    return await getUsersProfile({ user_id: userId });
  };

  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.display_name }}>
      <img className="post-avatar-img" alt={profileData?.display_name} src={profileData?.image_url ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profileData?.display_name}</p>
    </Link>
  );
};
