import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import useAccessToken from "./useAuthentication";
import { getMe } from "../api/navigationBar";
import { User } from "../types";

const CACHE_TIME = 60 * 6000;

const useUserInfo = (queryProps?: UseQueryOptions<User>) => {
  const { accessToken } = useAccessToken();
  return useQuery<User>({ ...queryProps, queryKey: ["userInfo", accessToken], queryFn: getMe, staleTime: CACHE_TIME, cacheTime: CACHE_TIME });
};

export default useUserInfo;
