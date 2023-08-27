import axios from "axios";
import type * as types from "./types";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/profileScreen`;

export const getUserProfile = async ({ userId }: types.GetUserProfileParams) => {
  const response = await axios.get(`${BACK_END_URL}/getUserProfile`, { params: { user_id: userId } });
  return response.data;
};

export const followUser = async ({ followingId }: types.FollowMutationParams) => {
  const response = await axios.get(`${BACK_END_URL}/followUser`, { params: { following_id: followingId } });
  return response.data;
};

export const unfollowUser = async ({ followingId }: types.FollowMutationParams) => {
  const response = await axios.get(`${BACK_END_URL}/unfollowUser`, { params: { following_id: followingId } });
  return response.data;
};

export const getFollowingInfo = async ({ followingId }: types.GetFollowingInfoParams) => {
  const response = await axios.get(`${BACK_END_URL}/getFollowingInfo`, { params: { following_id: followingId } });
  return response.data;
};

export const getUserRatings = async ({ userId, next, filter }: types.GetUserRatingsParams) => {
  const response = await axios.get(`${BACK_END_URL}/getUserRatings`, { params: { user_id: userId, next: next, filter: filter } });
  return response.data;
};

export const getUserFollowing = async ({ userId, next }: types.GetUserFollowingParams) => {
  const response = await axios.get(`${BACK_END_URL}/getUserFollowing`, { params: { user_id: userId, next: next } });
  return response.data;
};

export const getUserFollowers = async ({ userId, next }: types.GetUserFollowersParams) => {
  const response = await axios.get(`${BACK_END_URL}/getUserFollowers`, { params: { user_id: userId, next: next } });
  return response.data;
};
