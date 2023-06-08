import { useQueries, useQuery } from "@tanstack/react-query";
import { getRails, getFollowingRatings } from "../../api/homeScreen";
import { Rail } from "../../components";
import useUserInfo from "../../hooks/useUserInfo";
import HomeRating from "../../components/HomeRating/HomeRating";
import "./HomeScreen.css";

const mockList = [
  {
    user: {
      image:
        "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-1/329297821_876186790367037_5512226610493972557_n.jpg?stp=dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=8pcTls6QQT8AX-ReulC&_nc_ht=scontent-ord5-2.xx&edm=AP4hL3IEAAAA&oh=00_AfDBEBJizANffWM8G_9XcnsXw9jMhR46CMh7vn5snt54zQ&oe=646BF32A",
      name: "Tiago Barbosa",
    },
    album: {
      image: "https://i.scdn.co/image/ab67616d00001e02d0bbd3ea2ec554f17a6603cc",
      name: "An Evening With Silk Sonic",
      artists: ["Bruno Mars", "Anderson .Paak", "Silk Sonic"],
      releaseDate: "2015",
    },
    post: {
      value: 9,
      comment: `A grown man saying "good job" every 2 min shouldn't have me enjoying this album this much but it sure does`,
      createdAt: new Date("2022-12-16T19:12:44.746Z"),
      likes: 16,
    },
  },
  {
    user: {
      image: "https://i.scdn.co/image/ab6775700000ee8552af90b7fae5404ceec6b862",
      name: "Manuel Casimiro",
    },
    album: {
      image: "https://i.scdn.co/image/ab67616d00001e02d0bbd3ea2ec554f17a6603cc",
      name: "An Evening With Silk Sonic",
      artists: ["Bruno Mars", "Anderson .Paak", "Silk Sonic"],
      releaseDate: "2015",
    },
    post: {
      value: 9,
      comment: "Best album in recent years.",
      createdAt: new Date("2022-12-16T12:51:52.125Z"),
      likes: 4,
    },
  },
];

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
        queryKey: ["getLatestPosts", userId],
        queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }),
        staleTime: 5 * 60000,
        enabled: !!userId,
      },
      {
        queryKey: ["getRecentlyListened", userId],
        queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }),
        staleTime: 5 * 60000,
        enabled: !!userId,
      },
      // {
      //   queryKey: ["getMyReleaseRadar", userId],
      //   queryFn: ({ queryKey }) => getRails({ railKey: queryKey[0] }),
      //   staleTime: 4 * 60 * 60000,
      //   enabled: !!userId,
      // },
    ],
  });

  const { data } = useQuery({ queryKey: ["getFollowingRatings", userId], queryFn: getFollowingRatings });

  console.log(data);

  return (
    <div className="rails-container">
      {results.map((rail, idx) => (
        // I hate having index as key but it doesn't really matter in here
        <Rail content={rail} key={idx} />
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {mockList.map((rating, idx) => (
          <HomeRating rating={rating} key={idx} />
        ))}
      </div>
    </div>
  );
};
