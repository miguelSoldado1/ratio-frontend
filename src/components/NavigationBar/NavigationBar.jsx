import React, { useCallback } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getMe } from "../../api/navigationBar";
import { SearchBar, Avatar } from "../";
import { ReactComponent as RatioLogo } from "../../icons/ratio-logo.svg";
import { ReactComponent as LogOutIcon } from "../../icons/logout-icon.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const [{ access_token }, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    removeCookie("access_token", { path: "/" });
    navigate("/");
  }, [navigate, removeCookie]);

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo", access_token],
    queryFn: () => getMe({ access_token }),
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
