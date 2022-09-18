import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/profileScreen`;

export const getUserPosts = async (userId, page, filterActive) => {
  const response = await axios.get(`${BACK_END_URL}/getUserPosts?user_id=${userId}&&page_number=${page}&&order=${filterActive}`);
  return response.data;
};
