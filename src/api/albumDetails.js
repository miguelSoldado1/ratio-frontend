import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;

export const getAlbum = async (album_id, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getAlbum`, {
    params: { album_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const getRelatedAlbums = async (album_id, artist_id, accessToken) => {
  const response = await axios.get(`${BACK_END_URL}/getRelatedAlbums`, {
    params: { artist_id, album_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
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

export const handleLikes = (ratingId, accessToken, liked) => {
  axios.patch(
    `${BACK_END_URL}/handleLikes`,
    { liked: liked, ratingId: ratingId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getPostLikes = async (post_id, accessToken, cursor, page_size) => {
  const response = await axios.get(`${BACK_END_URL}/getPostLikes`, {
    params: { post_id, cursor, page_size },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
