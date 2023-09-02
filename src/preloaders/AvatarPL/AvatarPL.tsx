import avatarPlacehoder from "@/icons/avatar-placeholder.svg";
import "./AvatarPL.css";

export const AvatarPL = () => {
  return (
    <div className="avatar">
      <img className="avatar-image preloader" src={avatarPlacehoder} alt="" />
      <div className="avatar-name preloader" />
    </div>
  );
};
