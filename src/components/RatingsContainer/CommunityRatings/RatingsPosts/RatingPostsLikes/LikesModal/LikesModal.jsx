import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Loading, Modal } from "../../../../..";
import { getPostLikes } from "../../../../../../api";
import { useInfiniteScroller } from "../../../../../../hooks/useInfiniteScroller";
import { LikesAvatar } from "./LikesAvatar/LikesAvatar";
import "./LikesModal.css";

export const LikesModal = ({ onClose, show, ratingId }) => {
  const [cookies, , removeCookie] = useCookies();
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState({ users: [], cursor: undefined, count: undefined });
  const stopFetching = userProfiles.count >= userProfiles.users.length || userProfiles.cursor !== undefined || !show;
  useInfiniteScroller(loadMoreData, contentRef, stopFetching);

  useEffect(() => {
    if (show) {
      loadMoreData();
    } else {
      setUserProfiles({ users: [], cursor: undefined, count: undefined });
    }
  }, [show]);

  // I do prefer arrow functions but this needs to be hoisted at the top.
  async function loadMoreData() {
    try {
      const { postLikes, count, cursor } = await getPostLikes(ratingId, cookies.access_token, userProfiles.cursor);
      setLoading(cursor !== null);
      setUserProfiles((oldData) => ({ cursor: cursor, users: [...oldData.users, ...postLikes], count: count }));
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      {userProfiles.users.length > 0 && (
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
      )}
    </Modal>
  );
};
