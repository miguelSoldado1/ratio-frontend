import axios from "axios";

const HOMESCREEN_URL = `${import.meta.env.VITE_BACK_END_URL}/homeScreen`;

const addMinutes = (minutes) => new Date(new Date().getTime() + minutes * 60000);
const isBeforeNow = (expiryDate) => new Date(expiryDate) < new Date();

export const handleRailRequests = async (get, mapping, accessToken, userId = "null") => {
  const { data, expiryDate } = get()[mapping];
  if (!data || isBeforeNow(expiryDate)) {
    let requestUrl = `${HOMESCREEN_URL}${RailMapping[mapping].url}`;
    if (RailMapping[mapping] === RailMapping.latestReviews) requestUrl += userId;
    const response = await axios.get(requestUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (response.data.length > 0)
      return {
        data: response.data,
        description: RailMapping[mapping].description,
        expiryDate: RailMapping[mapping].expiryDate,
      };
    return { error: "no data" };
  }
};

const RailMapping = {
  myTopArtists: {
    description: "From your favourite artists",
    url: "/getMyTopArtists",
    expiryDate: addMinutes(1440), //1 day
  },
  latestReviews: {
    description: "People have been rating",
    url: "/getLatestPosts?user_id=",
    expiryDate: addMinutes(30), //30 minutes
  },
  recentlyListened: {
    description: "From music you've recently listened",
    url: "/getRecentlyListened",
    expiryDate: addMinutes(5), //30 minutes
  },
  recentlyReleased: {
    description: "From my release radar",
    url: "/getMyReleaseRadar",
    expiryDate: addMinutes(1440), //1 day
  },
};
