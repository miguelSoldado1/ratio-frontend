import React from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsersProfile } from "../../../../../api/albumDetails";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";

export const RatingPostsAvatar = ({ userId }) => {
  const [{ access_token }] = useCookies();
  const { data: userData } = useQuery({ queryKey: ["userInfo", access_token], staleTime: 60 * 6000 });

  const { data: profileData } = useQuery({
    queryKey: ["profile", userId, access_token],
    queryFn: () => handleUserProfile(userId, access_token),
  });

  const handleUserProfile = async (userId, accessToken) => {
    if (userData.id === userId) return userData;
    return await getUsersProfile(userId, accessToken);
  };

  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.display_name }}>
      <img className="post-avatar-img" alt={profileData?.display_name} src={profileData?.image_url ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profileData?.display_name}</p>
    </Link>
  );
};
