import React from "react";

export const handleDate = (date) => {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const postDate = new Date(date);
  const today = new Date();
  const diff = today - new Date(date);
  const formatter = new Intl.RelativeTimeFormat("EN");

  if (today - postDate < minute) {
    return formatter.format(Math.round(-diff / 1000), "seconds");
  }
  if (today - postDate < hour) {
    return formatter.format(Math.round(-diff / minute), "minutes");
  }
  if (today - postDate < day) {
    return formatter.format(Math.round(-diff / hour), "hours");
  }
  if (today - postDate < month) {
    return formatter.format(Math.round(-diff / day), "days");
  }
  return postDate.toLocaleDateString("EN", { year: "numeric", month: "long", day: "numeric" });
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
