import axios from "axios";
import { RailTitles } from "@/enums";
import type { RailResponse } from "@/types";
import type * as types from "./types";

const BACK_END_URL = `${import.meta.env.VITE_BACK_END_URL}/homeScreen`;

export const getFollowingRatings = async ({ next }: types.GetFollowingRatingsParams) => {
  const response = await axios.get(`${BACK_END_URL}/getFollowingRatings`, { params: { next: next } });
  return response.data;
};

export const getRails = async ({ railKey }: types.GetRailsParams): Promise<RailResponse> => {
  const description = RailTitles[railKey];
  const response = await axios.get(`${BACK_END_URL}/${railKey}`);
  return { data: response.data, description };
};
