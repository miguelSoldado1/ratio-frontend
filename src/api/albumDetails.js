import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getAlbum = async (album_id, accessToken) => {
  const response = await api.get("getAlbum", { params: { album_id }, headers: { Authorization: `Bearer ${accessToken}` } });
  return response.data;
};

export const getRelatedAlbums = async (album_id, artist_id, accessToken) => {
  const response = await api.get("getRelatedAlbums", {
    params: { artist_id, album_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getAverageAlbumRating = async (album_id) => {
  const response = await api.get("getAverageAlbumRating", { params: { album_id } });
  return { rating: response.data.rating, sum: response.data.sum };
};

export const getUsersProfile = async (user_id, accessToken) => {
  const response = await api.get("getUsersProfile", {
    params: { user_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const handleLikes = (ratingId, accessToken, liked) => {
  api.patch(`handleLikes`, { liked: liked, ratingId: ratingId }, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const getPostLikes = async (post_id, accessToken, cursor, page_size) => {
  const response = await api.get("getPostLikes", {
    params: { post_id, cursor, page_size },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
