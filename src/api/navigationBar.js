import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/navigationBar`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getMe = async ({ accessToken }) => {
  const response = await api.get("getMe", { headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};

export const searchForAlbum = async ({ accessToken, search_query }) => {
  const response = await api.get("searchForAlbum", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { search_query: search_query.trim() },
  });
  return response.data;
};
