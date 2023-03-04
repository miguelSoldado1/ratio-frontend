import React from "react";
import { Link } from "react-router-dom";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./Avatar.css";

export const Avatar = ({ userData, userLoading }) => {
  if (userLoading) {
    return (
      <div className="avatar">
        <img className="avatar-image" src={avatarPlacehoder} alt="" />
        <p className="avatar-name">{"           "}</p>
      </div>
    );
  }

  return (
    <Link className="avatar" to={`/profile/${userData.id}`}>
      <img className="avatar-image" src={userData?.image_url ?? avatarPlacehoder} alt={userData.display_name} />
      <p className="avatar-name">{userData.display_name}</p>
    </Link>
  );
};
