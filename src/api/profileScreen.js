import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/profileScreen`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getUserPosts = async ({ userId, pageParam, order, pageSize, accessToken }) => {
  const response = await api.get("getUserPosts", {
    params: { user_id: userId, page_number: pageParam, order, page_size: pageSize },
  });
  return response.data;
};

export const getUserDisplayName = async ({ userId, accessToken }) => {
  const response = await api.get("getUserDisplayName", { params: { user_id: userId }, headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};
