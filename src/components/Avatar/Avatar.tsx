import { Link } from "react-router-dom";
import avatarPlacehoder from "@/icons/avatar-placeholder.svg";
import { AvatarPL } from "@/preloaders";
import type { User } from "@/types";
import "./Avatar.css";

interface AvatarProps {
  userData: User | undefined;
  userLoading: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ userData, userLoading }) => {
  if (userLoading || !userData) {
    return <AvatarPL />;
  }

  return (
    <Link className="avatar" to={`/profile/${userData.id}`} title={userData.displayName}>
      <img className="avatar-image" src={userData?.imageUrl ?? avatarPlacehoder} alt={userData.displayName} loading="lazy" />
      <p className="avatar-name overflow-ellipsis">{userData.displayName}</p>
    </Link>
  );
};
