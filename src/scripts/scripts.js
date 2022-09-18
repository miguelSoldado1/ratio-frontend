import moment from "moment";
import React from "react";

export const handleDate = (date) => {
  const postDate = moment(date);
  const monthPrior = moment().subtract(1, "month");
  if (postDate.isSameOrAfter(monthPrior)) {
    return postDate.fromNow();
  }
  return postDate.format("MMMM D, YYYY");
};

export const getArtists = (artists) => {
  const names = artists.map((item) => item.name);
  return names.join(", ");
};

export const renderArtists = (artists) => {
  return artists?.map((item, index) => (
    <React.Fragment key={item.id}>
      <a href={item.uri}>{item.name}</a>
      {artists.length - 1 > index && <span>, </span>}
    </React.Fragment>
  ));
};
