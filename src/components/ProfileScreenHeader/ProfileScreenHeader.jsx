import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAuthentication";
import { getFollowingInfo, getUserProfile } from "../../api/profileScreen";
import { ProfileScreenHeaderInfo } from "./ProfileScreenHeaderInfo/ProfileScreenHeaderInfo";
import { ProfileScreenHeaderPL } from "../../preloaders/ProfileScreenPL/ProfileScreenHeaderPL/ProfileScreenHeaderPL";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./ProfileScreenHeader.css";
import { FollowButton } from "../FollowButton/FollowButton";

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
    onError: () => removeAccessToken(),
  });

  if (userLoading || infoLoading) {
    return <ProfileScreenHeaderPL />;
  }

  return (
    <div className="profile-screen-header-wrapper">
      <div className="profile-screen-header">
        <img className="profile-screen-header-image" src={user.imageUrl ?? avatarPlacehoder} alt={user.displayName} loading="lazy" />
        <div className="profile-screen-header-info overflow-ellipsis">
          <h1 className="profile-screen-header-name overflow-ellipsis">{user?.displayName}</h1>
          <ProfileScreenHeaderInfo {...followingInfo} />
        </div>
      </div>
      <FollowButton isFollowing={followingInfo.isFollowing} profileId={userId} />
    </div>
  );
};
