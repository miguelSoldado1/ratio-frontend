import React from "react";
import avatarPlaceholder from "../../../../icons/avatar-placeholder.svg";
import { FollowButtonV2 } from "../../../FollowButtonV2/FollowButtonV2";
import "./FollowListAvatar.css";
import { Link } from "react-router-dom";

export const FollowListAvatar = ({ profile, isFollowing, onClose }) => {
  return (
    <div className="follow-avatar-container" to={`/profile/${profile?.id}`} state={{ display_name: profile?.displayName }}>
      <Link to={`/profile/${profile?.id}`} className="follow-avatar-user overflow-ellipsis" onClick={onClose}>
        <img className="follow-avatar-img" alt="" src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
        <p className="follow-avatar-name overflow-ellipsis">{profile?.displayName}</p>
      </Link>
      <FollowButtonV2 isFollowing={isFollowing} profileId={profile.id} />
    </div>
  );
};
