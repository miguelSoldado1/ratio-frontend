import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import useAccessToken from "./useAuthentication";
import { getMe } from "@/api/navigationBar";
import type { User } from "@/types";

// 1hr cache time for the userInfo
const CACHE_TIME = 60 * 6000;

const useUserInfo = (queryProps?: UseQueryOptions<User>) => {
  const { accessToken } = useAccessToken();

  const { data, ...query } = useQuery<User>({
    ...queryProps,
    queryKey: ["userInfo", accessToken],
    queryFn: getMe,
    staleTime: CACHE_TIME + 1500,
    cacheTime: CACHE_TIME,
  });

  return { userData: data, ...query };
};

export default useUserInfo;
