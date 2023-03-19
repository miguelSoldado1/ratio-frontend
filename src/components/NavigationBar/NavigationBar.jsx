import React, { useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/navigationBar";
import useAccessToken from "../../hooks/useAuthentication";
import { SearchBar, Avatar } from "../";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout-icon.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const { accessToken, removeAccessToken } = useAccessToken();

  const handleLogOut = useCallback(() => {
    removeAccessToken();
  }, [removeAccessToken]);

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: getMe,
    staleTime: 60 * 6000,
    onError: handleLogOut,
  });

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
          <LogOutIcon className="logout-icon" onClick={handleLogOut} title="Logout" />
          <Avatar userData={data} userLoading={isLoading} />
        </div>
      </nav>
      <Outlet />
    </>
  );
};
