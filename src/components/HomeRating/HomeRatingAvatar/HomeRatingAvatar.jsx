import React from "react";
import "./HomeRatingAvatar.css";

export const HomeRatingAvatar = ({ user, children }) => {
  return (
    <div className="header-container">
      <div className="avatar-container">
        <img src={user.imageUrl} alt={user.displayName} />
        <a href="/">{user.displayName}</a>
      </div>
      {children}
    </div>
  );
};
