import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/profileScreen`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getUserPosts = async (user_id, page_number, order, page_size) => {
  const response = await api.get("getUserPosts", { params: { user_id, page_number, order, page_size } });
  return response.data;
};
