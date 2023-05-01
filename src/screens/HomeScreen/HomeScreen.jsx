import { useQueries } from "@tanstack/react-query";
import { getRails } from "../../api/homeScreen";
import { Rail } from "../../components";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const results = useQueries({
    queries: [
      { queryKey: ["getMyTopArtists"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }), staleTime: 4 * 60 * 60000 },
      { queryKey: ["getLatestPosts"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }), staleTime: 5 * 60000 },
      { queryKey: ["getRecentlyListened"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }), staleTime: 5 * 60000 },
      { queryKey: ["getMyReleaseRadar"], queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }), staleTime: 4 * 60 * 60000 },
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
