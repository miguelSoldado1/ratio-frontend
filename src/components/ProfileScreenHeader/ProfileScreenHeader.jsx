import React from "react";
import { useParams } from "react-router-dom";
import { FollowButton } from "../FollowButton/FollowButton";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./ProfileScreenHeader.css";

export const ProfileScreenHeader = ({ user }) => {
  const { userId } = useParams();

  return (
    <div className="profile-screen-header">
      <img className="profile-screen-header-image" src={user?.imageUrl ?? avatarPlacehoder} alt={user.displayName} />
      <div className="profile-screen-header-info">
        <h1 className="profile-screen-header-name">{user?.displayName}</h1>
        <FollowButton userId={userId} />
      </div>
    </div>
  );
};
