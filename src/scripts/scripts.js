import React from "react";

export const handleDate = (date) => {
  const postDate = new Date(date);
  const monthPrior = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30);

  if (postDate >= monthPrior) {
    const formatter = new Intl.RelativeTimeFormat("EN");
    const diff = new Date() - new Date(date);
    return formatter.format(Math.round(-diff / (1000 * 60 * 60 * 24)), "days");
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
