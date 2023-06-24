import React from "react";
import { Link } from "react-router-dom";
import avatarPlacehoder from "../../../icons/avatar-placeholder.svg";

import "./HomeRatingAvatar.css";

export const HomeRatingAvatar = ({ user, children }) => {
  return (
    <div className="header-container">
      <div className="avatar-container">
        <img src={user.imageUrl ?? avatarPlacehoder} alt={user.displayName} />
        <Link to={`/profile/${user.id}`} className="overflow-ellipsis">
          {user.displayName}
        </Link>
      </div>
      {children}
    </div>
  );
};
