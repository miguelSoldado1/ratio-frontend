import React from "react";
import "./HomeRatingAvatar.css";
import { Link } from "react-router-dom";

export const HomeRatingAvatar = ({ user, children }) => {
  return (
    <div className="header-container">
      <div className="avatar-container">
        <img src={user.imageUrl} alt={user.displayName} />
        <Link to={`/profile/${user.id}`} className="overflow-ellipsis">
          {user.displayName}
        </Link>
      </div>
      {children}
    </div>
  );
};
