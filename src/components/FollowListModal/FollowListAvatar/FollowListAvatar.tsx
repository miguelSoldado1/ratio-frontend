import { Link } from "react-router-dom";
import { FollowButton } from "@/components";
import avatarPlaceholder from "@/icons/avatar-placeholder.svg";
import type { User } from "@/types";
import "./FollowListAvatar.css";

interface FollowListAvatarProps {
  profile: User;
  isFollowing: boolean;
  onClose: () => void;
}

export const FollowListAvatar: React.FC<FollowListAvatarProps> = ({ profile, isFollowing, onClose }) => {
  return (
    <div className="follow-avatar-container">
      <Link to={`/profile/${profile?.id}`} className="follow-avatar-user overflow-ellipsis" onClick={onClose} title={profile.displayName}>
        <img className="follow-avatar-img" alt="" src={profile?.imageUrl ?? avatarPlaceholder} loading="lazy" />
        <p className="follow-avatar-name overflow-ellipsis">{profile?.displayName}</p>
      </Link>
      <FollowButton isFollowing={isFollowing} profileId={profile.id} />
    </div>
  );
};
