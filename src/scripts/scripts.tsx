import React from "react";
import { DatePrecision } from "@/enums";
import type { Artist } from "@/types";

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "week", seconds: 604800 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const handleDate = (dateString: string, currentTime = Date.now()) => {
  try {
    const date = new Date(dateString);
    if (date.getTime() > currentTime) {
      return `in ${Math.floor((date.getTime() - currentTime) / 1000)} seconds`;
    }
    const seconds = Math.floor((currentTime - date.getTime()) / 1000) || 1;
    let interval = intervals.find((i) => i.seconds <= seconds);
    if (!interval) {
      interval = intervals[intervals.length - 1];
    }
    const count = Math.floor(seconds / interval.seconds);
    if (interval.label === "month" || interval.label === "year") {
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
  } catch (e) {
    console.error(e);
    return "Invalid date";
  }
};

export const getArtists = (artists: Artist[]) => {
  const names = artists?.map((item) => item.name);
  return names?.join(", ");
};

export const renderArtists = (artists: Artist[]) => {
  if (!artists) return null;
  return artists.map((item, index) => (
    <React.Fragment key={item.id}>
      <a href={item.uri} className="underline">
        {item.name}
      </a>
      {artists.length - 1 > index && <span>, </span>}
    </React.Fragment>
  ));
};

export const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

export const handleDatePrecision = (release_date: string, release_date_precision: DatePrecision) => {
  const unformattedDate = new Date(release_date);
  switch (release_date_precision) {
    case DatePrecision.day:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long", day: "numeric" }).format(unformattedDate);
    case DatePrecision.month:
      return new Intl.DateTimeFormat("EN", { year: "numeric", month: "long" }).format(unformattedDate);
    case DatePrecision.year:
    default:
      return new Intl.DateTimeFormat("EN", { year: "numeric" }).format(unformattedDate);
  }
};
