import axios from "axios";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/homeScreen`;

export const getFollowingRatings = async ({ next }) => {
  const response = await axios.get(`${BACK_END_URL}/getFollowingRatings`, { params: { next: next } });
  return response.data;
};

export const getRails = async ({ railKey }) => {
  const description = railTitles[railKey];
  const response = await axios.get(`${BACK_END_URL}/${railKey}`);
  return { data: response.data, description };
};

const railTitles = {
  getMyTopArtists: "From your favourite artists",
  getLatestPosts: "People have been rating",
  getRecentlyListened: "From music you've recently listened",
  getMyReleaseRadar: "From my release radar",
};
