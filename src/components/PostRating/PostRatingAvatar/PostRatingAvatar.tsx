import { Link } from "react-router-dom";
import avatarPlacehoder from "@/icons/avatar-placeholder.svg";
import type { User } from "@/types";
import "./PostRatingAvatar.css";

interface PostRatingAvatarProps {
  user: User;
  children?: JSX.Element;
}

export const PostRatingAvatar: React.FC<PostRatingAvatarProps> = ({ user, children }) => {
  return (
    <div className="header-container">
      <div className="avatar-container">
        <img src={user.imageUrl ?? avatarPlacehoder} alt={user.displayName} loading="lazy" />
        <Link to={`/profile/${user.id}`} className="underline overflow-ellipsis">
          {user.displayName}
        </Link>
      </div>
      {children}
    </div>
  );
};
