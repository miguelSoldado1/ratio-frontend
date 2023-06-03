import { useQuery } from "@tanstack/react-query";
import useAccessToken from "./useAuthentication";
import { getMe } from "../api/navigationBar";

const CACHE_TIME = 60 * 6000;

const useUserInfo = (queryProps) => {
  const { accessToken } = useAccessToken();
  return useQuery({ queryKey: ["userInfo", accessToken], queryFn: getMe, staleTime: CACHE_TIME, cacheTime: CACHE_TIME, ...queryProps });
};

export default useUserInfo;
