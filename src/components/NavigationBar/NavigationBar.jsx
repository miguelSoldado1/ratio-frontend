import React, { useEffect, useCallback } from "react";
import { useUserDataStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SearchBar, Avatar } from "../";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout-icon.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const getUserData = useUserDataStore((state) => state.getUserData);

  const handleHome = () => navigate("/");

  const handleLogOut = useCallback(() => {
    removeCookie("access_token", { path: "/" });
    navigate("/");
  }, [navigate, removeCookie]);

  useEffect(() => {
    const accessToken = cookies?.access_token;
    if (accessToken) {
      getUserData(accessToken).catch(() => handleLogOut());
    }
  }, [cookies.access_token, getUserData, handleLogOut]);

  return (
    <nav className="nav-bar">
      <div className="nav-bar-container left-nav">
        <RatioLogo className="ratio-logo" onClick={handleHome} />
        <SearchBar />
      </div>
      <div className="nav-bar-container">
        <LogOutIcon className="logout-icon" onClick={handleLogOut} />
        <Avatar />
      </div>
    </nav>
  );
};
