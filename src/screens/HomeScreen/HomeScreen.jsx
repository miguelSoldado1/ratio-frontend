import React, { useEffect } from "react";
import { Rail } from "../../components";
import { useCookies } from "react-cookie";
import { useRailsStore } from "../../stores";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const [myTopArtists, getMyTopArtists] = useRailsStore((state) => [state.myTopArtists, state.getMyTopArtists]);
  const [latestReviews, getLatestReviews] = useRailsStore((state) => [state.latestReviews, state.getLatestReviews]);
  const [recentlyListened, getRecentlyListened] = useRailsStore((state) => [
    state.recentlyListened,
    state.getRecentlyListened,
  ]);
  const [recentlyReleased, getRecentlyReleased] = useRailsStore((state) => [
    state.recentlyReleased,
    state.getRecentlyReleased,
  ]);
  const [cookies, , removeCookie] = useCookies();

  useEffect(() => {
    try {
      const access_token = cookies?.access_token;
      getMyTopArtists(access_token);
      getLatestReviews(access_token);
      getRecentlyListened(access_token);
      getRecentlyReleased(access_token);
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }, [getMyTopArtists, getLatestReviews, getRecentlyListened, getRecentlyReleased, cookies.access_token, removeCookie]);

  return (
    <>
      <Rail content={myTopArtists} />
      <Rail content={latestReviews} />
      <Rail content={recentlyListened} />
      <Rail content={recentlyReleased} />
    </>
  );
};
