import React from "react";
import "./ProfileScreenHeaderPL.css";

export const ProfileScreenHeaderPL = () => {
  return (
    <div className="profile-screen-header-wrapper">
      <div className="profile-screen-header">
        <div className="profile-screen-header-image gradient" />
        <div className="profile-screen-header-info">
          <div className="profile-screen-header-name preloader gradient" />
          <div className="profile-screen-header-follow-info preloader">
            <div className="follow-info preloader gradient" />
          </div>
          <div className="profile-screen-posts-number preloader gradient" />
        </div>
      </div>
      <div className="profile-screen-follow-button preloader" />
    </div>
  );
};
