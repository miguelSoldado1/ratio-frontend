import moment from "moment";
import axios from "axios";

const HOMESCREEN_URL = `${process.env.REACT_APP_BACK_END_URL}/homeScreen`;

export const handleRailRequests = async (get, mapping, accessToken, userId = "null") => {
  const { data, expiryDate } = get()[mapping];
  if (!data || moment(expiryDate).isBefore(moment())) {
    let requestUrl = `${HOMESCREEN_URL}${RailMapping[mapping].url}`;
    if (RailMapping[mapping] === RailMapping.latestReviews) requestUrl += userId;
    const response = await axios.get(requestUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (response.data.length > 0) return { data: response.data, description: RailMapping[mapping].description, expiryDate: RailMapping[mapping].expiryDate };
    return { error: "no data" };
  }
};

const RailMapping = {
  myTopArtists: {
    description: "From your favourite artists",
    url: "/getMyTopArtists",
    expiryDate: moment().add(1, "days"),
  },
  latestReviews: {
    description: "People have been rating",
    url: "/getLatestPosts?user_id=",
    expiryDate: moment().add(30, "minutes"),
  },
  recentlyListened: {
    description: "From music you've recently listened",
    url: "/getRecentlyListened",
    expiryDate: moment().add(5, "minutes"),
  },
  recentlyReleased: {
    description: "From my release radar",
    url: "/getMyReleaseRadar",
    expiryDate: moment().add(1, "days"),
  },
};
