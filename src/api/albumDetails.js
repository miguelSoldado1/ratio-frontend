import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

export const getAlbum = async (albumId, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getAlbum?album_id=${albumId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getCommunityAlbumRating = async (album_id, page_number, order) => {
  const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRating`, { params: { album_id, page_number, order } });
  return response.data;
};

export const getMyAlbumRating = async (album_id, user_id) => {
  const response = await axios.get(`${BACK_END_URL}/getMyAlbumRating`, { params: { album_id, user_id } });
  return response.data.rating;
};

export const getAverageAlbumRating = async (album_id) => {
  const response = await axios.get(`${BACK_END_URL}/getAverageAlbumRating`, { params: { album_id } });
  return { rating: response.data.rating, sum: response.data.sum };
};

export const getUsersProfile = async (user_id, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getUsersProfile`, {
    params: { user_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const deletePost = async (ratingId, accessToken) => {
  const response = await axios.delete(`${BACK_END_URL}/${ratingId}/deletePost`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const handleLikes = (ratingId, accessToken, liked) => {
  axios.patch(
    `${BACK_END_URL}/${ratingId}/handleLikes`,
    { liked: liked },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const createPost = async (data, accessToken) => {
  const response = await axios.post(`${BACK_END_URL}/createPost`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
