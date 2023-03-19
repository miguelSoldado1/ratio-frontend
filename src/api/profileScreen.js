import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/profileScreen`;

export const getUserPosts = async ({ userId, pageParam, order, pageSize }) => {
  const response = await axios.get(`${BACK_END_URL}/getUserPosts`, {
    params: { user_id: userId, page_number: pageParam, order, page_size: pageSize },
  });
  return response.data;
};

export const getUserDisplayName = async ({ userId }) => {
  const response = await axios.get(`${BACK_END_URL}/getUserDisplayName`, { params: { user_id: userId } });
  return response.data;
};
