import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/navigationBar`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getMe = async ({ access_token }) => {
  const response = await api.get("getMe", { headers: { Authorization: `Bearer ${access_token}` } });
  return response.data;
};
