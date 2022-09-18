import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

export const getAlbum = async (albumId, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getAlbum?album_id=${albumId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};

export const getCommunityAlbumRating = async (albumId, page, filter) => {
  const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRating?album_id=${albumId}&&page_number=${page}&&order=${filter}`);
  return response.data;
};

export const getMyAlbumRating = async (albumId, id) => {
  const response = await axios.get(`${BACK_END_URL}/getMyAlbumRating?album_id=${albumId}&&user_id=${id}`);
  return response.data.rating;
};

export const getAverageAlbumRating = async (albumId) => {
  const response = await axios.get(`${BACK_END_URL}/getAverageAlbumRating?album_id=${albumId}`);
  return { rating: response.data.rating, sum: response.data.sum };
};

export const getUsersProfile = async (userId, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getUsersProfile?user_id=${userId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};

export const deletePost = async (ratingId, accessToken) => {
  const response = await axios.delete(`${BACK_END_URL}/${ratingId}/deletePost`, { headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};

export const handleLikes = (ratingId, accessToken, liked) => {
  axios.patch(`${BACK_END_URL}/${ratingId}/handleLikes`, { liked: liked }, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const createPost = async (data, accessToken) => {
  const response = await axios.post(`${BACK_END_URL}/createPost`, data, { headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};
