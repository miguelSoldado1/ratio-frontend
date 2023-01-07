import React, { useContext, useEffect } from "react";
import { Rail } from "../../components";
import { useCookies } from "react-cookie";
import { useRailsStore } from "../../stores";
import "./HomeScreen.css";
import { ShepherdTourContext } from "react-shepherd";

export const HomeScreen = () => {
  const getAllRails = useRailsStore((state) => state.getAllRails);
  const [myTopArtists, recentlyReleased, latestReviews, recentlyListened] = useRailsStore((state) => [
    state.myTopArtists,
    state.recentlyReleased,
    state.latestReviews,
    state.recentlyListened,
  ]);
  const [cookies, , removeCookie] = useCookies();
  const tour = useContext(ShepherdTourContext);
  const tourDisplayed = localStorage.getItem("tourDisplayed");

  useEffect(() => {
    try {
      getAllRails(cookies?.access_token);
    } catch (error) {
      removeCookie("access_token", { path: "/" });
    }
  }, [cookies?.access_token, getAllRails, removeCookie]);

  useEffect(() => {
    if (!tourDisplayed) {
      // tour.start();
      // localStorage.setItem("tourDisplayed", true);
    }
  }, [tour, tourDisplayed]);

  return (
    <div className="rails-container">
      <Rail content={myTopArtists} />
      <Rail content={latestReviews} />
      <Rail content={recentlyListened} />
      <Rail content={recentlyReleased} />
    </div>
  );
};
