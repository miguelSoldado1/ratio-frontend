import React from "react";

const intervals = [
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const handleDate = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds <= seconds);
  if (interval.label === intervals[0].label) {
    return date.toLocaleDateString("EN", { year: "numeric", month: "long", day: "numeric" });
  }
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
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
