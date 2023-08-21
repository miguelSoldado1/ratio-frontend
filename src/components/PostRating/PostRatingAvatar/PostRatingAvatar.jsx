import React from "react";
import { Link, useLocation } from "react-router-dom";
import avatarPlacehoder from "../../../icons/avatar-placeholder.svg";
import "./PostRatingAvatar.css";

export const PostRatingAvatar = ({ user, children }) => {
  const location = useLocation();
  const pathName = `/profile/${user.id}`;

  return (
    <div className="header-container">
      <div className="avatar-container">
        <img src={user.imageUrl ?? avatarPlacehoder} alt={user.displayName} loading="lazy" />
        <Link to={location.pathname !== pathName && pathName} className="underline overflow-ellipsis">
          {user.displayName}
        </Link>
      </div>
      {children}
    </div>
  );
};
