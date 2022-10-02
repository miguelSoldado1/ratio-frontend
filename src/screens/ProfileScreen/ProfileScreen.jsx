import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ProfileRating, Button, DatabaseFilters } from "../../components";
import { getUsersProfile, getUserPosts } from "../../api";
import { ProfileScreenPL } from "../../preloaders";
import "./ProfileScreen.css";

const NUMBER_OF_RATINGS = 8;

export const ProfileScreen = () => {
  const location = useLocation();
  const { userId } = useParams();
  const [cookies] = useCookies();
  const [data, setData] = useState({
    rows: [],
    totalRows: 0,
    page: 0,
  });
  const [filterActive, setFilterActive] = useState({ tag: undefined, query: undefined });
  const [displayName, setDisplayName] = useState(undefined);

  useEffect(() => {
    const display_name = location?.state?.display_name;
    if (display_name) setDisplayName(display_name);
    else {
      const fetchUserData = async () => {
        const result = await getUsersProfile(userId, cookies?.access_token);
        setDisplayName(result?.display_name);
      };
      fetchUserData();
    }
    return () => {
      setData({
        rows: [],
        totalRows: 0,
        page: 0,
      });
    };
  }, [cookies?.access_token, location.state?.display_name, userId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserPosts(userId, data.page, filterActive.query, NUMBER_OF_RATINGS);
      if (data.page > 0) setData((prev) => ({ ...prev, rows: [...prev?.rows, ...result?.data], totalRows: result?.count }));
      else setData((prev) => ({ ...prev, rows: result?.data, totalRows: result?.count }));
    };
    if (filterActive?.query) fetchData();
  }, [data.page, filterActive.query, userId]);

  const setPage = (value) => setData((prev) => ({ ...prev, page: value }));

  return (
    <div className="profile-screen">
      {displayName ? <h1 className="profile-screen-title">{`${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`} Ratings</h1> : null}
      <DatabaseFilters
        setFilterActive={setFilterActive}
        filterActive={filterActive}
        setPage={(value) => setPage(value)}
        numberOfRatings={data?.rows?.length}
      />
      <ol>
        {data?.rows?.length > 0
          ? data?.rows?.map((rating) => <ProfileRating props={rating} key={rating?._id} />)
          : data?.totalRows <= 0 && <ProfileScreenPL />}
      </ol>
      {data?.totalRows > NUMBER_OF_RATINGS * (data?.page + 1) ? (
        <Button className="load-more-button" onPress={() => setPage(data?.page + 1)} title="Load more" />
      ) : null}
    </div>
  );
};
