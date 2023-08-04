import React, { useState } from "react";
import { Modal } from "../../Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getUserFollowers, getUserFollowing } from "../../../api/profileScreen";
import { LikesAvatar } from "../../RatingsContainer/CommunityRatings/RatingsPosts/RatingPostsLikes/LikesModal/LikesAvatar/LikesAvatar";
import { Loading } from "../../Loading/Loading";
import "./ProfileScreenHeaderInfo.css";

export const ProfileScreenHeaderInfo = (followingInfo) => {
  const [showModal, setShowModal] = useState({ following: false, followers: false });
  const closeModals = () => setShowModal({ following: false, followers: false });

  return (
    <>
      <div className="profile-screen-header-follow-info">
        <span className="underline" onClick={() => setShowModal({ following: true, followers: false })}>
          {followingInfo.following} Following
        </span>
        <span className="underline" onClick={() => setShowModal({ following: false, followers: true })}>
          {followingInfo.followers} Followers
        </span>
      </div>
      <FollowingModal show={showModal.following} onClose={closeModals} />
      <FollowersModal show={showModal.followers} onClose={closeModals} />
    </>
  );
};

const FollowingModal = ({ show, onClose }) => {
  const { userId } = useParams();
  const { data: following, isLoading } = useQuery({ queryKey: ["following", userId], queryFn: () => getUserFollowing({ userId }), enabled: show });

  return (
    <Modal show={show} onClose={onClose} title="Following">
      <div className="likes-modal-list">{!isLoading ? following.users?.map((user) => <LikesAvatar user={user} key={user.id} />) : <Loading />}</div>
    </Modal>
  );
};

const FollowersModal = ({ show, onClose }) => {
  const { userId } = useParams();
  const { data: followers, isLoading } = useQuery({ queryKey: ["followers", userId], queryFn: () => getUserFollowers({ userId }), enabled: show });

  return (
    <Modal show={show} onClose={onClose} title="Followers">
      <div className="likes-modal-list">{!isLoading ? followers.users?.map((user) => <LikesAvatar user={user} key={user.id} />) : <Loading />}</div>
    </Modal>
  );
};
