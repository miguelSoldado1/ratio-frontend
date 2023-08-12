import React from "react";
import { Link } from "react-router-dom";
import { FollowButton } from "../../../FollowButton/FollowButton";
import avatarPlaceholder from "../../../../icons/avatar-placeholder.svg";
import "./FollowListAvatar.css";

export const FollowListAvatar = ({ profile, isFollowing, onClose }) => {
  return (
    <div className="follow-avatar-container">
      <Link to={`/profile/${profile?.id}`} className="follow-avatar-user overflow-ellipsis" onClick={onClose}>
        <img className="follow-avatar-img" alt="" src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
        <p className="follow-avatar-name overflow-ellipsis">{profile?.displayName}</p>
      </Link>
      <FollowButton isFollowing={isFollowing} profileId={profile.id} />
    </div>
  );
};
