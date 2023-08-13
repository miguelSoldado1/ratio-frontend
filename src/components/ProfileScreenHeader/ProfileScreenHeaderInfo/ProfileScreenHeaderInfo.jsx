import React, { useState } from "react";
import { getUserFollowers, getUserFollowing } from "../../../api/profileScreen";
import { FollowListModal } from "../FollowListModal/FollowListModal";
import { numberFormatter } from "../../../scripts/scripts";
import "./ProfileScreenHeaderInfo.css";
import { useParams } from "react-router";

export const ProfileScreenHeaderInfo = (followingInfo) => {
  const { userId } = useParams();
  const [showModal, setShowModal] = useState({ following: false, followers: false });
  const closeModals = () => setShowModal({ following: false, followers: false });

  return (
    <>
      <div className="profile-screen-header-follow-info">
        <span className="follow-info underline" onClick={() => setShowModal({ following: true, followers: false })}>
          {numberFormatter.format(followingInfo.following)} Following
        </span>
        <span className="follow-info underline" onClick={() => setShowModal({ following: false, followers: true })}>
          {numberFormatter.format(followingInfo.followers)} Followers
        </span>
      </div>
      <span className="profile-screen-posts-number">{numberFormatter.format(followingInfo.numberOfPosts)} Personal Ratings</span>
      <FollowListModal
        show={showModal.following}
        onClose={closeModals}
        title="Following"
        queryKey={["following", userId]}
        queryFn={({ pageParam = undefined }) => getUserFollowing({ cursor: pageParam, userId })}
      />
      <FollowListModal
        show={showModal.followers}
        onClose={closeModals}
        title="Followers"
        queryKey={["followers", userId]}
        queryFn={({ pageParam = undefined }) => getUserFollowers({ cursor: pageParam, userId })}
      />
    </>
  );
};
