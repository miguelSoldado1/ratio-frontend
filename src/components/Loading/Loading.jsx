import "./Loading.css";

export const Loading = ({ loadingRef }) => {
  return (
    <div className="loading-carousel" ref={loadingRef}>
      <div className="dot-carousel" />
    </div>
  );
};
