import React from "react";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";

export const RatingPostsAvatar = ({ profile }) => {
  return (
    <Link className="post-avatar" to={`/profile/${profile?.id}`} state={{ display_name: profile?.displayName }}>
      <img className="post-avatar-img" alt={profile?.displayName} src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profile?.displayName}</p>
    </Link>
  );
};
