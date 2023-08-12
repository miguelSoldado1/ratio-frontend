import { Link } from "react-router-dom";
import avatarPlaceholder from "../../../../../../../icons/avatar-placeholder.svg";
import { handleDate } from "../../../../../../../scripts/scripts";
import "./LikesAvatar.css";

export const LikesAvatar = ({ user }) => {
  return (
    <Link className="likes-avatar-container" to={`/profile/${user?.id}`} state={{ display_name: user?.displayName }}>
      <img className="likes-avatar-img" alt="" src={user?.imageUrl ?? avatarPlaceholder} loading="lazy" />
      <div className="likes-avatar-text">
        <p className="likes-avatar-name overflow-ellipsis">{user?.displayName}</p>
        {user.createdAt && <span className="likes-avatar-date">{handleDate(user.createdAt)}</span>}
      </div>
    </Link>
  );
};
