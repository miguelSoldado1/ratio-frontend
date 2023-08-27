import axios from "axios";
import type * as types from "./types";
import { LikeMutationResult, ListModal } from "@/types";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/albumDetails`;

export const getAlbum = async ({ albumId }: types.GetAlbumParams) => {
  const response = await axios.get(`${BACK_END_URL}/getAlbum`, { params: { album_id: albumId } });
  return response.data;
};

export const getRelatedAlbums = async ({ albumId, artistId }: types.GetRelatedAlbumsParams) => {
  const response = await axios.get(`${BACK_END_URL}/getRelatedAlbums`, {
    params: { artist_id: artistId, album_id: albumId },
  });
  return response.data;
};

export const getAverageAlbumRating = async ({ albumId }: types.GetAverageAlbumRatingParams) => {
  const response = await axios.get(`${BACK_END_URL}/getAverageAlbumRating`, { params: { album_id: albumId } });
  return response.data;
};

export const getPersonalRating = async ({ albumId, userId }: types.GetPersonalRatingParams) => {
  const response = await axios.get(`${BACK_END_URL}/getMyAlbumRating`, { params: { album_id: albumId, user_id: userId } });
  return response.data.personalRating;
};

export const getCommunityAlbumRatings = async ({ albumId, filter, next, previous }: types.GetCommunityAlbumRatingsParams) => {
  const response = await axios.get(`${BACK_END_URL}/getCommunityAlbumRatings`, {
    params: { album_id: albumId, filter, next, previous },
  });
  return response.data;
};

export const getUsersProfile = async ({ userId }: types.GetUsersProfileParams) => {
  const response = await axios.get(`${BACK_END_URL}/getUsersProfile`, {
    params: { user_id: userId },
  });
  return response.data;
};

export const getPostLikes = async ({ postId, next }: types.GetPostLikesParams): Promise<ListModal> => {
  const response = await axios.get(`${BACK_END_URL}/getPostLikes`, {
    params: { post_id: postId, next },
  });
  return response.data;
};

export const createLike = async ({ ratingId }: types.LikeMutationParams): Promise<LikeMutationResult> => {
  const response = await axios.post(`${BACK_END_URL}/createLike`, { rating_id: ratingId });
  return response.data;
};

export const deleteLike = async ({ ratingId }: types.LikeMutationParams): Promise<LikeMutationResult> => {
  const response = await axios.delete(`${BACK_END_URL}/deleteLike`, {
    data: { rating_id: ratingId },
  });
  return response.data;
};

export const deleteRating = async ({ ratingId }: types.DeleteRatingParams): Promise<LikeMutationResult> => {
  const response = await axios.delete(`${BACK_END_URL}/deletePost`, {
    data: { _id: ratingId },
  });
  return response.data;
};

export const createRating = async (data: types.CreateRatingParams) => {
  const response = await axios.post(`${BACK_END_URL}/createPost`, data);
  return response.data;
};
