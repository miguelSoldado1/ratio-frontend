import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useAccessToken from "../../hooks/useAuthentication";
import { getUserProfile } from "../../api/profileScreen";
import { ProfileScreenHeaderPL } from "../../preloaders/ProfileScreenPL/ProfileScreenHeaderPL/ProfileScreenHeaderPL";
import { FollowButton } from "../FollowButton/FollowButton";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import "./ProfileScreenHeader.css";

const getPageTitle = (displayName) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreenHeader = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onSuccess: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    onError: () => removeAccessToken(),
  });

  const title = !isLoading ? getPageTitle(data?.displayName) : "";

  if (isLoading) return <ProfileScreenHeaderPL />;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="profile-screen-header">
        <img className="profile-screen-header-image" src={data?.imageUrl ?? avatarPlacehoder} alt={data.displayName} />
        <div className="profile-screen-header-info">
          <h1 className="profile-screen-header-name">{data?.displayName}</h1>
          <FollowButton userId={userId} />
        </div>
      </div>
    </>
  );
};
