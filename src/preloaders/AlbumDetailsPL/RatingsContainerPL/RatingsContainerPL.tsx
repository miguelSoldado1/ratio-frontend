import "./RatingsContainerPL.css";

export const RatingsContainerPL = () => {
  return (
    <div className="ratings-container">
      <div className="ratings-circles">
        <div className="rating-circle-preloader gradient" />
        <div className="rating-circle-preloader gradient" />
      </div>
      <div className="ratings-loader" />
    </div>
  );
};
