import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import { Loading } from "../../Loading/Loading";
import avatarPlaceholder from "../../../icons/avatar-placeholder.svg";

export const FollowListModal = ({ show, onClose, title, queryKey, queryFn }) => {
  const { userId } = useParams();
  const { data: followData, isLoading } = useQuery({ queryKey: [queryKey, userId], queryFn: () => queryFn({ userId }), enabled: show });

  return (
    <Modal show={show} onClose={onClose} title={title}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="likes-modal-list">{!isLoading ? followData.users?.map((user) => <FollowAvatar {...user} key={user.id} />) : <Loading />}</div>
      </div>
    </Modal>
  );
};

const FollowAvatar = ({ profile, isFollowing }) => {
  return (
    <Link className="likes-avatar-container" to={`/profile/${profile?.id}`} state={{ display_name: profile?.displayName }}>
      <img className="likes-avatar-img" alt="" src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
      <div className="likes-avatar-text">
        <p className="likes-avatar-name">{profile?.displayName}</p>
      </div>
    </Link>
  );
};
