import axios from "axios";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/albumDetails`;

export const getAlbum = async ({ album_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getAlbum`, { params: { album_id } });
  return response.data;
};

export const getRelatedAlbums = async ({ album_id, artist_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getRelatedAlbums`, {
    params: { artist_id, album_id },
  });
  return response.data;
};

export const getAverageAlbumRating = async ({ album_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getAverageAlbumRating`, { params: { album_id } });
  return response.data;
};

export const getPersonalRating = async ({ album_id, user_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getMyAlbumRating`, { params: { album_id, user_id } });
  return response.data.personalRating;
};

export const getCommunityAlbumRatings = async ({ album_id, filter, next, previous }) => {
  const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRatings`, {
    params: { album_id, filter, next, previous },
  });
  return response.data;
};

export const getUsersProfile = async ({ user_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getUsersProfile`, {
    params: { user_id },
  });
  return response.data;
};

export const getPostLikes = async ({ post_id, next }) => {
  const response = await axios.get(`${BACK_END_URL}/getPostLikes`, {
    params: { post_id, next },
  });
  return response.data;
};

export const createLike = async ({ ratingId }) => {
  const response = await axios.post(`${BACK_END_URL}/createLike`, { rating_id: ratingId });
  return response.data;
};

export const deleteLike = async ({ ratingId }) => {
  const response = await axios.delete(`${BACK_END_URL}/deleteLike`, {
    data: { rating_id: ratingId },
  });
  return response.data;
};

export const deleteRating = async ({ ratingId }) => {
  const response = await axios.delete(`${BACK_END_URL}/deletePost`, {
    data: { _id: ratingId },
  });
  return response.data;
};

export const createRating = async ({ data }) => {
  const response = await axios.post(`${BACK_END_URL}/createPost`, data);
  return response.data;
};
