import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Loading, Modal } from "../../../../..";
import { getPostLikes } from "../../../../../../api";
import { useInfiniteScroller } from "../../../../../../hooks/useInfiniteScroller";
import { LikesAvatar } from "./LikesAvatar/LikesAvatar";
import "./LikesModal.css";

const PAGE_SIZE = 8;

export const LikesModal = ({ onClose, show, ratingId }) => {
  const [cookies, , removeCookie] = useCookies();
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userProfiles, setUserProfiles] = useState({ users: [], cursor: undefined });
  useInfiniteScroller(loadMoreData, contentRef, show);

  useEffect(() => {
    if (show && userProfiles.users.length <= 0) loadMoreData();
  }, [show]);

  // I do prefer arrow functions but this needs to be hoisted at the top.
  async function loadMoreData() {
    try {
      if (!loading && userProfiles.cursor !== null) {
        setLoading(true);
        const { postLikes, cursor } = await getPostLikes(ratingId, cookies.access_token, userProfiles.cursor, PAGE_SIZE);
        setUserProfiles((oldData) => ({ cursor: cursor, users: [...oldData.users, ...postLikes] }));
        setLoading(false);
      }
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="likes-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="likes-modal-title">
          <h2>Liked by</h2>
        </div>
        <div className="likes-modal-list" ref={contentRef}>
          {userProfiles.users.map((user) => (
            <LikesAvatar user={user} key={user?.id} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </Modal>
  );
};
