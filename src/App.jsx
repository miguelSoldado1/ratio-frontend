import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { NavigationBar, Footer } from "./components";

const HomeScreen = lazy(() => import("./screens/HomeScreen/HomeScreen"));
const AlbumDetails = lazy(() => import("./screens/AlbumDetails/AlbumDetails"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen/ProfileScreen"));
const NotFound = lazy(() => import("./screens/NotFound/NotFound"));
const LandingPage = lazy(() => import("./screens/LandingPage/LandingPage"));

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
      <Suspense fallback={null}>
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
      </Suspense>
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
