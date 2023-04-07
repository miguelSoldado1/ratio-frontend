import React, { useState } from "react";
import { ProfileScreenHeader, ProfileScreenRatings } from "../../components";
import "./ProfileScreen.css";

export const ProfileScreen = () => {
  const [totalRatings, setTotalRatings] = useState("--");

  return (
    <div className="profile-screen">
      <ProfileScreenHeader numOfRatings={totalRatings} />
      <ProfileScreenRatings setTotalRatings={setTotalRatings} />
    </div>
  );
};
