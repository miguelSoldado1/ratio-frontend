import React from "react";
import { Link } from "react-router-dom";
import { useUserDataStore } from "../../stores";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./Avatar.css";

export const Avatar = () => {
  const userData = useUserDataStore((state) => state.userData);

  return (
    <Link className="avatar" to={`/profile/${userData?.id}`} state={{ display_name: userData?.display_name }}>
      <img className="avatar-image" src={userData?.image_url ?? avatarPlacehoder} alt={userData?.display_name} />
      <p className="avatar-name">{userData?.display_name}</p>
    </Link>
  );
};
