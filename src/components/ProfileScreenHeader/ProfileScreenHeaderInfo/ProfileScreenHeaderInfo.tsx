import { useState } from "react";
import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getUserFollowers, getUserFollowing } from "@/api/profileScreen";
import { FollowListModal } from "@/components";
import { numberFormatter } from "@/scripts/scripts";
import type { FollowingInfo } from "@/types";
import "./ProfileScreenHeaderInfo.css";

interface StateType {
  following: boolean;
  followers: boolean;
}

// Just setting these variables to make sure the keys are for sure equal
const FOLLOWING = "following";
const FOLLOWERS = "followers";

export const ProfileScreenHeaderInfo: React.FC<FollowingInfo> = (followingInfo) => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const [showModal, setShowModal] = useState<StateType>({ following: false, followers: false });

  const closeModals = () => setShowModal({ following: false, followers: false });

  const handleShowModals = (queryKeyString: string, modalState: StateType) => {
    queryClient.removeQueries([queryKeyString, userId]);
    setShowModal(modalState);
  };

  return (
    <>
      <div className="profile-screen-header-follow-info">
        <span className="follow-info underline" onClick={() => handleShowModals(FOLLOWING, { following: true, followers: false })}>
          {numberFormatter.format(followingInfo.following)} Following
        </span>
        <span className="follow-info underline" onClick={() => handleShowModals(FOLLOWERS, { following: false, followers: true })}>
          {numberFormatter.format(followingInfo.followers)} Followers
        </span>
      </div>
      <span className="profile-screen-posts-number">{numberFormatter.format(followingInfo.numberOfPosts)} Personal Ratings</span>
      <FollowListModal
        show={showModal.following}
        onClose={closeModals}
        title="Following"
        queryKey={[FOLLOWING, userId]}
        queryFn={({ pageParam = undefined }) => getUserFollowing({ next: pageParam, userId })}
      />
      <FollowListModal
        show={showModal.followers}
        onClose={closeModals}
        title="Followers"
        queryKey={[FOLLOWERS, userId]}
        queryFn={({ pageParam = undefined }) => getUserFollowers({ next: pageParam, userId })}
      />
    </>
  );
};
