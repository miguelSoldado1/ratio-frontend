import React, { useContext, useEffect } from "react";
import { Rail } from "../../components";
import { useCookies } from "react-cookie";
import { useRailsStore } from "../../stores";
import "./HomeScreen.css";
import { ShepherdTourContext } from "react-shepherd";

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
  const tour = useContext(ShepherdTourContext);

  useEffect(() => {
    try {
      const access_token = cookies?.access_token;
      getMyTopArtists(access_token);
      getLatestReviews(access_token);
      getRecentlyListened(access_token);
      getRecentlyReleased(access_token);
      tour.start();
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }, [getMyTopArtists, getLatestReviews, getRecentlyListened, getRecentlyReleased, cookies.access_token, removeCookie]);

  return (
    <div className="rails-container">
      <Rail content={myTopArtists} />
      <Rail content={latestReviews} />
      <Rail content={recentlyListened} />
      <Rail content={recentlyReleased} />
    </div>
  );
};
