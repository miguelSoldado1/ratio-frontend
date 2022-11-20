import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Footer } from "./components";
import { NavigationBar } from "./components";
import { HomeScreen, LandingPage, ProfileScreen, NotFound, AlbumDetails } from "./screens";

const urlSearchParams = new URLSearchParams(window?.location?.search);
const access_token = urlSearchParams.get("access_token");
const expires_in = urlSearchParams.get("expires_in");
const redirect = urlSearchParams.get("redirect");

const App = () => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  // DO NOT ADD NAVIGATE AS A DEPENDENCY, IT BREAKS THE PROFILE PAGE NAVIGATION
  useEffect(() => {
    if (access_token && expires_in) {
      setCookies("access_token", access_token, { maxAge: expires_in });
      navigate(redirect ?? "/");
    }
  }, [redirect]);

  return (
    <>
      {cookies?.access_token ? (
        <>
          <Routes>
            <Route element={mainRouteElement}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/album/:albumId" element={<AlbumDetails />} />
              <Route path="/profile/:userId" element={<ProfileScreen />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default App;

const mainRouteElement = (
  <>
    <NavigationBar />
    <Footer />
  </>
);
