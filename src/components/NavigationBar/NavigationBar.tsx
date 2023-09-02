import { Link, Outlet } from "react-router-dom";
import { useAccessToken, useUserInfo } from "@/hooks";
import { SearchBar, Avatar } from "..";
import { ReactComponent as RatioLogo } from "@/icons/ratio-logo.svg";
import { ReactComponent as LogOutIcon } from "@/icons/logout-icon.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const { removeAccessToken } = useAccessToken();
  const { userData, isLoading } = useUserInfo({ onError: removeAccessToken });

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-bar-container left-nav">
          <Link to="/" title="Home" className="ratio-logo-container">
            <RatioLogo />
          </Link>
          <SearchBar />
        </div>
        <div className="nav-bar-container">
          <LogOutIcon className="logout-icon" onClick={removeAccessToken} />
          <Avatar userData={userData} userLoading={isLoading} />
        </div>
      </nav>
      <Outlet />
    </>
  );
};
