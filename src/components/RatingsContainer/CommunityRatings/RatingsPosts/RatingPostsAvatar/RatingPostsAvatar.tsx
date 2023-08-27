import { Link } from "react-router-dom";
import avatarPlaceholder from "@/icons/avatar-placeholder.svg";
import type { User } from "@/types";
import "./RatingPostsAvatar.css";

interface RatingPostsAvatarProps {
  profile: User;
}

export const RatingPostsAvatar: React.FC<RatingPostsAvatarProps> = ({ profile }) => {
  return (
    <Link className="post-avatar" to={`/profile/${profile?.id}`}>
      <img className="post-avatar-img" alt={profile?.displayName} src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
      <p className="post-avatar-name">{profile?.displayName}</p>
    </Link>
  );
};
