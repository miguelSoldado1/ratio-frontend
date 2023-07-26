import { useQueries } from "@tanstack/react-query";
import { getRails } from "../../api/homeScreen";
import useUserInfo from "../../hooks/useUserInfo";
import { Rail, PostsFeed } from "../../components";
import "./HomeScreen.css";

export const HomeScreen = () => {
  const { data: userData } = useUserInfo();
  const userId = userData?.id;

  const results = useQueries({
    queries: [
      {
        queryKey: ["getMyTopArtists", userId],
        queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }),
        staleTime: 4 * 60 * 60000,
        enabled: !!userId,
      },
      {
        queryKey: ["getRecentlyListened", userId],
        queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }),
        staleTime: 5 * 60000,
        enabled: !!userId,
      },
    ],
  });

  return (
    <>
      <div className="rails-container">
        {results.map((rail, idx) => (
          // I hate having index as key but it doesn't really matter in here
          <Rail {...rail} key={idx} />
        ))}
      </div>
      <PostsFeed userId={userId} />
    </>
  );
};
