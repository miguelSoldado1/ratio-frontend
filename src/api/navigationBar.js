import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/navigationBar`;

export const getMe = async () => {
  const response = await axios.get(`${BACK_END_URL}/getMe`);
  return response.data;
};

export const searchForAlbum = async ({ search_query }) => {
  const response = await axios.get(`${BACK_END_URL}/searchForAlbum`, {
    params: { search_query: search_query.trim() },
  });
  return response.data;
};
