import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

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

export const getAllRatings = async ({ album_id, page_number, order, page_size, user_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRating`, {
    params: { album_id, page_number, order, page_size, user_id },
  });
  return response.data;
};

export const getUsersProfile = async ({ user_id }) => {
  const response = await axios.get(`${BACK_END_URL}/getUsersProfile`, {
    params: { user_id },
  });
  return response.data;
};

export const getPostLikes = async ({ post_id, cursor, page_size }) => {
  const response = await axios.get(`${BACK_END_URL}/getPostLikes`, {
    params: { post_id, cursor, page_size },
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

export const deleteRating = async ({ albumId, ratingId }) => {
  const response = await axios.delete(`${BACK_END_URL}/deletePost`, {
    data: { album_id: albumId, _id: ratingId },
  });
  return response.data;
};

export const createRating = async ({ data }) => {
  const response = await axios.post(`${BACK_END_URL}/createPost`, data);
  return response.data;
};
