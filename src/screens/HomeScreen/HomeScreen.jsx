import React, { useEffect } from "react";
import { Rail } from "../../components";
import { useCookies } from "react-cookie";
import { useRailsStore } from "../../stores";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const getAllRails = useRailsStore((state) => state.getAllRails);
  const [myTopArtists, recentlyReleased, latestReviews, recentlyListened] = useRailsStore((state) => [
    state.myTopArtists,
    state.recentlyReleased,
    state.latestReviews,
    state.recentlyListened,
  ]);
  const [cookies, , removeCookie] = useCookies();

  useEffect(() => {
    try {
      getAllRails(cookies?.access_token);
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }, [cookies?.access_token, getAllRails, removeCookie]);

  return (
    <div className="rails-container">
      <Rail content={myTopArtists} />
      <Rail content={latestReviews} />
      <Rail content={recentlyListened} />
      <Rail content={recentlyReleased} />
    </div>
  );
};
