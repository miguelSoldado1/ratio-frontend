import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../api/profileScreen";
import { useParams } from "react-router-dom";
import { ProfileRating, Button, DatabaseFilters } from "../../components";
import { ProfileScreenPL } from "../../preloaders";
import "./ProfileScreen.css";

export const ProfileScreen = () => {
  const { userId, username } = useParams();
  const [ratings, setRatings] = useState();
  const [ratingsCount, setRatingsCount] = useState();
  const [page, setPage] = useState(0);
  const [filterActive, setFilterActive] = useState();

  useEffect(() => {
    setPage(0);
    setRatings([]);
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserPosts(userId, page, filterActive.query);
      setRatings(page > 0 ? (oldArray) => [...oldArray, ...result?.data] : result?.data);
      if (page <= 0) setRatingsCount(result?.count);
    };

    if (filterActive?.query) {
      fetchData();
    }
  }, [userId, page, filterActive]);

  return (
    <div className="profile-screen">
      <h1 className="profile-screen-title">{`${username}${username.slice(-1) !== "s" ? "'s" : "'"}`} Ratings</h1>
      <DatabaseFilters setFilterActive={setFilterActive} filterActive={filterActive} setPage={setPage} numberOfRatings={ratings?.length} />
      <ol>{ratings?.length > 0 ? ratings?.map((rating) => <ProfileRating props={rating} key={rating.id} />) : ratingsCount <= 0 && <ProfileScreenPL />}</ol>
      {ratingsCount > 10 * (page + 1) ? <Button className="load-more-button" onPress={() => setPage(page + 1)} title="Load more" /> : null}
    </div>
  );
};
