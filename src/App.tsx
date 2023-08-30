import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAccessToken from "./hooks/useAuthentication";
import { NavigationBar, Footer } from "./components";
import { HomeScreen, LandingPage, NotFound, AlbumDetails, ProfileScreen } from "./screens";

const MainRouteElement = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/album/:albumId" element={<AlbumDetails />} />
        <Route path="/profile/:userId" element={<ProfileScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  const { accessToken, getAccessToken } = useAccessToken();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return (
    <>
      <Helmet>
        <title>Ratio</title>
      </Helmet>
      {accessToken ? <MainRouteElement /> : <LandingPage />}
    </>
  );
};

export default App;
