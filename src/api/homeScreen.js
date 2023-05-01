import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/homeScreen`;

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
