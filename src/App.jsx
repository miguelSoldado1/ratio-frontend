import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LandingPage, HomeScreen, AlbumDetails, ProfileScreen, NotFound } from "./screens";
import { NavigationBar } from "./components";

const urlSearchParams = new URLSearchParams(window.location.search);
const access_token = urlSearchParams.get("access_token");
const expires_in = urlSearchParams.get("expires_in");
const redirect = urlSearchParams.get("redirect");

const App = () => {
  const [cookies, setCookies] = useCookies();
  let navigate = useNavigate();

  useEffect(() => {
    if (access_token && expires_in) {
      setCookies("access_token", access_token, { maxAge: expires_in });
      navigate(redirect ?? "/");
    }
  }, [setCookies]);

  return (
    <>
      {cookies?.access_token ? (
        <>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/album/:albumId" element={<AlbumDetails />} />
            <Route path="/profile/:userId/:username" element={<ProfileScreen />} />
            <Route element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default App;
