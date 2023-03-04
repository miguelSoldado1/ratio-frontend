import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { NavigationBar, Footer } from "./components";
import { HomeScreen, LandingPage, ProfileScreen, NotFound, AlbumDetails } from "./screens";
import useAccessToken from "./hooks/useAccessToken";

const mainRouteElement = (
  <>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/album/:album_id" element={<AlbumDetails />} />
      <Route path="/profile/:userId" element={<ProfileScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);

const App = () => {
  const [accessToken, , setAccessToken] = useAccessToken();

  useEffect(() => {
    setAccessToken();
  }, [setAccessToken]);

  return (
    <>
      <Helmet>
        <title>Ratio</title>
      </Helmet>
      {accessToken ? mainRouteElement : <LandingPage />}
    </>
  );
};

export default App;
