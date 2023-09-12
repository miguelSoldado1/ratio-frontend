import "./EmptyPostsFeed.css";

const EMPTY_POSTS_FEED_TITLE = "You are not following anyone yet!";
const EMPTY_POSTS_FEED_SUBTEXT = "This is your feed! Start by following some people so you can keep track of what they're reviewing...";

export const EmptyPostsFeed = () => {
  return (
    <div className="posts-feed-empty-content">
      <h2>{EMPTY_POSTS_FEED_TITLE}</h2>
      <span className="posts-feed-empty-subtext">{EMPTY_POSTS_FEED_SUBTEXT}</span>
    </div>
  );
};
