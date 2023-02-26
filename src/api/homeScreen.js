import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/homeScreen`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getRails = async ({ railKey, access_token }) => {
  const description = railTitles[railKey];
  const response = await api.get(railKey, { headers: { Authorization: `Bearer ${access_token}` } });
  return { data: response.data, description };
};

const railTitles = {
  getMyTopArtists: "From your favourite artists",
  getLatestPosts: "People have been rating",
  getRecentlyListened: "From music you've recently listened",
  getMyReleaseRadar: "From my release radar",
};
