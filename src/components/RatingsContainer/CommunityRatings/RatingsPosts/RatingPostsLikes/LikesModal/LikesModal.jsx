import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Modal } from "../../../../..";
import { getPostLikes } from "../../../../../../api";
import avatarPlaceholder from "../../../../../../icons/avatar-placeholder.svg";
import "./LikesModal.css";

export const LikesModal = ({ onClose, show, ratingId }) => {
  const [cookies] = useCookies();
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    if (show) {
      (async () => {
        const { postLikes } = await getPostLikes(ratingId, cookies.access_token);
        setUserProfiles(postLikes);
      })();
    }
  }, [cookies.access_token, ratingId, show]);

  return (
    <Modal show={show} onClose={onClose}>
      <div className="likes-modal-content" onClick={(e) => e.stopPropagation()}>
        <ol className="likes-users-list">
          {userProfiles.map((user) => (
            <LikesAvatar user={user} key={user.id} />
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
