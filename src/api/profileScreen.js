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

export const getUserProfile = async ({ userId }) => {
  const response = await axios.get(`${BACK_END_URL}/getUserProfile`, { params: { user_id: userId } });
  return response.data;
};

export const followUser = async ({ followingId }) => {
  const response = await axios.get(`${BACK_END_URL}/followUser`, { params: { following_id: followingId } });
  return response.data;
};

export const unfollowUser = async ({ followingId }) => {
  const response = await axios.get(`${BACK_END_URL}/unfollowUser`, { params: { following_id: followingId } });
  return response.data;
};

export const getFollowingInfo = async ({ followingId }) => {
  const response = await axios.get(`${BACK_END_URL}/getFollowingInfo`, { params: { following_id: followingId } });
  return response.data;
};
