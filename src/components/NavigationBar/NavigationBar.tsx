import { Link, Outlet, useLocation } from "react-router-dom";
import { useAccessToken, useScrollDirection, useUserInfo } from "@/hooks";
import { SearchBar, Avatar } from "..";
import { ReactComponent as RatioLogo } from "@/icons/ratio-logo.svg";
import { ReactComponent as LogOutIcon } from "@/icons/logout-icon.svg";
import "./NavigationBar.css";

const REDIRECT_LINK = "/";

export const NavigationBar = () => {
  const { removeAccessToken } = useAccessToken();
  const { pathname } = useLocation();
  const { userData, isLoading } = useUserInfo({ onError: removeAccessToken });
  const scrollDirection = useScrollDirection();

  const handleLogoClick = () => {
    if (pathname === REDIRECT_LINK) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`nav-bar ${scrollDirection === "down" ? "hide" : "show"}`}>
        <div className="nav-bar-container left-nav">
          <Link to={REDIRECT_LINK} title="Home" className="ratio-logo-container" onClick={handleLogoClick}>
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
