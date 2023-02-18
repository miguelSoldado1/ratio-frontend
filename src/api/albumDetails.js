import axios from "axios";

const BACK_END_URL = `${process.env.REACT_APP_BACK_END_URL}/albumDetails`;
const api = axios.create({ baseURL: BACK_END_URL });

export const getAlbum = async (album_id, access_token) => {
  const response = await api.get("getAlbum", { params: { album_id }, headers: { Authorization: `Bearer ${access_token}` } });
  return response.data;
};

export const getRelatedAlbums = async (album_id, artist_id, access_token) => {
  const response = await api.get("getRelatedAlbums", {
    params: { artist_id, album_id },
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return response.data;
};

export const getAverageAlbumRating = async (album_id) => {
  const response = await api.get("getAverageAlbumRating", { params: { album_id } });
  return response.data;
};

export const getPersonalRating = async (album_id, user_id) => {
  const response = await api.get("getMyAlbumRating", { params: { album_id, user_id } });
  return response.data.personalRating;
};

export const getAllRatings = async (album_id, page_number, order, page_size, user_id) => {
  const response = await api.get("getCommunityAlbumRating", {
    params: { album_id, page_number, order, page_size, user_id },
  });
  return response.data;
};

export const getUsersProfile = async (user_id, accessToken) => {
  const response = await api.get("getUsersProfile", {
    params: { user_id },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// export const handleLikes = (ratingId, accessToken, liked) => {
//   api.patch(`handleLikes`, { liked: liked, ratingId: ratingId }, { headers: { Authorization: `Bearer ${accessToken}` } });
// };

export const getPostLikes = async (post_id, accessToken, cursor, page_size) => {
  const response = await api.get("getPostLikes", {
    params: { post_id, cursor, page_size },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const createLike = async ({ ratingId, access_token }) => {
  const response = await api.post("createLike", { rating_id: ratingId }, { headers: { Authorization: `Bearer ${access_token}` } });
  return response.data;
};

export const deleteLike = async ({ ratingId, access_token }) => {
  const response = await api.delete("deleteLike", {
    headers: { Authorization: `Bearer ${access_token}` },
    data: { rating_id: ratingId },
  });
  return response.data;
};

export const deleteRating = async ({ albumId, ratingId, access_token }) => {
  const response = await api.delete("deletePost", {
    headers: { Authorization: `Bearer ${access_token}` },
    data: { album_id: albumId, _id: ratingId },
  });
  return response.data;
};

export const createRating = async ({ data, access_token }) => {
  const response = await api.post("createPost", data, { headers: { Authorization: `Bearer ${access_token}` } });
  return response.data;
};
