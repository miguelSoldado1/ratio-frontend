import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { getUsersProfile } from "../../../../../api";
import { useUserDataStore } from "../../../../../stores";
import avatarPlaceholder from "../../../../../icons/avatar-placeholder.svg";
import "./RatingPostsAvatar.css";

export const RatingPostsAvatar = ({ userId }) => {
  const [profileData, setProfileData] = useState();
  const userData = useUserDataStore((state) => state.userData);
  const [cookies] = useCookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData.id === userId) {
          setProfileData(userData);
        } else {
          const userData = await getUsersProfile(userId, cookies.access_token);
          setProfileData(userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => setProfileData();
  }, [cookies.access_token, userData, userId]);

  return (
    <Link className="post-avatar" to={`/profile/${profileData?.id}`} state={{ display_name: profileData?.display_name }}>
      <img
        className="post-avatar-img"
        alt={profileData?.display_name}
        src={profileData?.image_url ?? avatarPlaceholder}
        loading="lazy"
      />
      <p className="post-avatar-name">{profileData?.display_name}</p>
    </Link>
  );
};
