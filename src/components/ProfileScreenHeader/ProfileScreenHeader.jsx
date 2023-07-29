import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import { getFollowingInfo, getUserProfile } from "../../api/profileScreen";
import { FollowButton } from "../FollowButton/FollowButton";
import { ProfileScreenHeaderPL } from "../../preloaders/ProfileScreenPL/ProfileScreenHeaderPL/ProfileScreenHeaderPL";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./ProfileScreenHeader.css";

export const ProfileScreenHeader = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const { data: followingInfo, isLoading: infoLoading } = useQuery({
    queryKey: ["getFollowingInfo", userId],
    queryFn: () => getFollowingInfo({ followingId: userId }),
  });

  if (userLoading || infoLoading) {
    return <ProfileScreenHeaderPL />;
  }

  return (
    <div className="profile-screen-header">
      <img className="profile-screen-header-image" src={user?.imageUrl ?? avatarPlacehoder} alt={user.displayName} />
      <div className="profile-screen-header-info">
        <h1 className="profile-screen-header-name">{user?.displayName}</h1>
        <FollowButton followingInfo={followingInfo} userId={userId} />
      </div>
    </div>
  );
};
