import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAccessToken from "../../../../../hooks/useAccessToken";
import { getUsersProfile } from "../../../../../api/albumDetails";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";

export const RatingPostsAvatar = ({ userId }) => {
  const [accessToken] = useAccessToken();
  const { data: userData } = useQuery({ queryKey: ["userInfo", accessToken], staleTime: 60 * 6000 });

  const { data: profileData } = useQuery({
    queryKey: ["profile", userId, accessToken],
    queryFn: () => handleUserProfile(userId, accessToken),
  });

  const handleUserProfile = async (userId, accessToken) => {
    if (userData.id === userId) return userData;
    return await getUsersProfile({ user_id: userId, accessToken });
  };

  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.display_name }}>
      <img className="post-avatar-img" alt={profileData?.display_name} src={profileData?.image_url ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profileData?.display_name}</p>
    </Link>
  );
};
