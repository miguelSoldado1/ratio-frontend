import React from "react";
import "./ProfileScreenHeaderPL.css";

export const ProfileScreenHeaderPL = () => {
  return (
    <div className="profile-screen-header">
      <div className="profile-screen-header-image gradient" />
      <div>
        <div className="profile-screen-header-name preloader gradient" />
        <div className="profile-screen-header-num-ratings preloader gradient" />
      </div>
    </div>
  );
};
