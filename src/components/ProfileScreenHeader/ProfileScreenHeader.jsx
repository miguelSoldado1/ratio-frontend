import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../api/profileScreen";
import { ProfileScreenHeaderPL } from "../../preloaders/ProfileScreenPL/ProfileScreenHeaderPL/ProfileScreenHeaderPL";
import useAccessToken from "../../hooks/useAuthentication";
import useUserInfo from "../../hooks/useUserInfo";
import avatarPlacehoder from "../../icons/avatar-placeholder.svg";
import FollowButton from "../FollowButton/FollowButton";
import { numberFormatter } from "../../scripts/scripts";
import "./ProfileScreenHeader.css";

const getPageTitle = (displayName) => {
  const formattedName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;
  return `${formattedName} Ratings`;
};

export const ProfileScreenHeader = () => {
  const { userId } = useParams();
  const { data: userData } = useUserInfo();
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
          <h1 className="profile-screen-header-num-followers">
            {numberFormatter.format(data.followers)} {data.followers === 1 ? "Follower" : "Followers"}
          </h1>
          {userData.id !== userId && <FollowButton userId={userId} isFollowing={data.isFollowing} />}
        </div>
      </div>
    </>
  );
};
