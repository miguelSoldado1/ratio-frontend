import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "@/hooks";
import { getFollowingInfo, getUserProfile } from "@/api/profileScreen";
import { ProfileScreenHeaderInfo } from "./ProfileScreenHeaderInfo/ProfileScreenHeaderInfo";
import { FollowButton } from "../FollowButton/FollowButton";
import { ProfileScreenHeaderPL } from "@/preloaders";
import avatarPlacehoder from "@/icons/avatar-placeholder.svg";
import type { FollowingInfo, User } from "@/types";
import "./ProfileScreenHeader.css";

export const ProfileScreenHeader = () => {
  const { userId } = useParams();
  const { removeAccessToken } = useAccessToken();

  const { data: user, status: userStatus } = useQuery<User>({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile({ userId }),
    onError: () => removeAccessToken(),
  });

  const { data: followingInfo, status: infoStatus } = useQuery<FollowingInfo>({
    queryKey: ["getFollowingInfo", userId],
    queryFn: () => getFollowingInfo({ followingId: userId }),
    onError: () => removeAccessToken(),
  });

  if (userStatus !== "success" || infoStatus !== "success") {
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
