import React from "react";
import { Link } from "react-router-dom";
import { useUserDataStore } from "../../stores";
import avatarPlacehoder from "../../icons/avatar-placeholder.png";
import "./Avatar.css";

export const Avatar = () => {
  const userData = useUserDataStore((state) => state.userData);

  return (
    <Link className="avatar" to={`/profile/${userData?.id}/${userData?.display_name}`}>
      <img className="avatar-image" src={userData?.image_url ?? avatarPlacehoder} alt="" />
      <p className="avatar-name">{userData?.display_name}</p>
    </Link>
  );
};
