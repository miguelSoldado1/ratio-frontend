import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { getUsersProfile, getUserPosts } from "../../api";
import { ProfileRating, Button, DatabaseFilters } from "../../components";
import { ProfileScreenPL, ProfileRatingPL } from "../../preloaders";
import "./ProfileScreen.css";

const NUMBER_OF_RATINGS = 8;

export const ProfileScreen = () => {
  const location = useLocation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();
  const [data, setData] = useState({ rows: [], totalRows: 0, page: 0, loading: true });
  const [filterActive, setFilterActive] = useState({ tag: "Latest", query: "latest" });
  const [displayName, setDisplayName] = useState(undefined);

  const updateData = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

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

    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      setData({ rows: [], totalRows: 0, page: 0, loading: true });
      setFilterActive({ tag: "Latest", query: "latest" });
      setDisplayName(undefined);
    };
  }, [cookies?.access_token, location?.state?.display_name, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserPosts(userId, data?.page, filterActive.query, NUMBER_OF_RATINGS);
        if (data?.page > 0) {
          setData((prev) => ({ ...prev, rows: [...(prev.rows || 0), ...(result.data || [])], totalRows: result?.count }));
        } else {
          setData((prev) => ({ ...prev, rows: result?.data, totalRows: result?.count }));
        }
        updateData("loading", false);
      } catch (error) {
        navigate("/");
      }
    };
    fetchData();
  }, [data?.page, filterActive?.query, navigate, removeCookie, userId]);

  if (data.loading) {
    return <ProfileScreenPL />;
  }

  const apostropheName = `${displayName}${displayName?.slice(-1) !== "s" ? "'s" : "'"}`;

  return (
    <>
      <Helmet>
        <title>{apostropheName} Ratings</title>
      </Helmet>
      <div className="profile-screen">
        {displayName && <h1 className="profile-screen-title">{apostropheName} Ratings</h1>}
        <DatabaseFilters
          setFilterActive={setFilterActive}
          filterActive={filterActive}
          setPage={(value) => updateData("page", value)}
          numberOfRatings={data?.rows?.length}
        />
        {data?.rows?.length > 0 ? (
          <ol>
            {data.rows.map((rating) => (
              <ProfileRating props={rating} key={rating?._id} />
            ))}
          </ol>
        ) : (
          <>
            <h3 className="profile-screen-no-ratings">No personal ratings yet...</h3>
            <ProfileRatingPL />
            <ProfileRatingPL />
            <ProfileRatingPL />
          </>
        )}
        {data?.totalRows > NUMBER_OF_RATINGS * (data?.page + 1) && (
          <Button onClick={() => updateData("page", data?.page + 1)}>Load more</Button>
        )}
      </div>
    </>
  );
};
