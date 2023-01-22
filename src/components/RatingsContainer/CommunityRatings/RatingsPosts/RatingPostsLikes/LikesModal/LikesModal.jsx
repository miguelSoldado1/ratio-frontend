import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "../../../../..";
import { getPostLikes } from "../../../../../../api";
import { useInfiniteScroller } from "../../../../../../hooks/useInfiniteScroller";
import avatarPlaceholder from "../../../../../../icons/avatar-placeholder.svg";
import "./LikesModal.css";

export const LikesModal = ({ onClose, show, ratingId }) => {
  const [cookies, , removeCookie] = useCookies();
  const contentRef = useRef(null);
  useInfiniteScroller(loadMoreData, contentRef, show);
  const [userProfiles, setUserProfiles] = useState({ users: [], cursor: undefined, count: undefined });

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
      setUserProfiles((oldData) => ({ cursor: cursor, users: [...oldData.users, ...postLikes], count: count }));
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className="likes-modal-content" onClick={(e) => e.stopPropagation()} ref={contentRef}>
        <ol className="likes-users-list">
          {userProfiles.users.map((user) => (
            <LikesAvatar user={user} key={user?.id} />
          ))}
        </ol>
      </div>
    </Modal>
  );
};

const LikesAvatar = ({ user }) => {
  return (
    <li className="likes-avatar" to={`/profile/${user?.id}`} state={{ display_name: user?.display_name }}>
      <img className="likes-avatar-img" alt={user?.display_name} src={user?.image_url ?? avatarPlaceholder} loading="lazy" />
      <p className="likes-avatar-name">{user?.display_name}</p>
    </li>
  );
};
