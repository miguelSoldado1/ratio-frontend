import axios from "axios";
import type * as types from "./types";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/navigationBar`;

export const getMe = async () => {
  const response = await axios.get(`${BACK_END_URL}/getMe`);
  return response.data;
};

export const searchForAlbum = async ({ searchQuery }: types.SearchForAlbumParams) => {
  const response = await axios.get(`${BACK_END_URL}/searchForAlbum`, {
    params: { search_query: searchQuery.trim() },
  });
  return response.data;
};
