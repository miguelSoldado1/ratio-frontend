import axios from "axios";
import type { RailResponse } from "@/types";
import type * as types from "./types";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/homeScreen`;

export enum RailTitles {
  getMyTopArtists = "From your favourite artists",
  getLatestPosts = "People have been rating",
  getRecentlyListened = "From music you've recently listened",
  getMyReleaseRadar = "From my release radar",
}

export const getFollowingRatings = async ({ next }: types.GetFollowingRatingsParams) => {
  const response = await axios.get(`${BACK_END_URL}/getFollowingRatings`, { params: { next: next } });
  return response.data;
};

export const getRails = async ({ railKey }: types.GetRailsParams): Promise<RailResponse> => {
  const description = RailTitles[railKey];
  const response = await axios.get(`${BACK_END_URL}/${railKey}`);
  return { data: response.data, description };
};
