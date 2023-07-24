import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { NavigationBar, Footer } from "./components";
import { HomeScreen, LandingPage, NotFound, AlbumDetails, ProfileScreenV2 } from "./screens";
import useAccessToken from "./hooks/useAuthentication";

const mainRouteElement = (
  <>
    <NavigationBar />
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/album/:album_id" element={<AlbumDetails />} />
      <Route path="/profile/:userId" element={<ProfileScreenV2 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);

const App = () => {
  const { accessToken, getAccessToken } = useAccessToken();

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

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
