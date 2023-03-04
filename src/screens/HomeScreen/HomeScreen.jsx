import { useQueries } from "@tanstack/react-query";
import useAccessToken from "../../hooks/useAccessToken";
import { getRails } from "../../api/homeScreen";
import { Rail } from "../../components";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const [accessToken] = useAccessToken();
  const results = useQueries({
    queries: [
      { queryKey: ["getMyTopArtists"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0], accessToken }), staleTime: 4 * 60 * 60000 },
      { queryKey: ["getLatestPosts"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0], accessToken }), staleTime: 5 * 60000 },
      { queryKey: ["getRecentlyListened"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0], accessToken }), staleTime: 5 * 60000 },
      { queryKey: ["getMyReleaseRadar"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0], accessToken }), staleTime: 4 * 60 * 60000 },
    ],
  });

  return (
    <div className="rails-container">
      {results.map((rail, idx) => (
        // I hate having index as key but it doesn't really matter in here
        <Rail content={rail} key={idx} />
      ))}
    </div>
  );
};
