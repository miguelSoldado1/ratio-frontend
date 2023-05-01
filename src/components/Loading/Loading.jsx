import { useInView } from "react-intersection-observer";
import "./Loading.css";
import { useEffect } from "react";

export const Loading = ({ fetchNextPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="loading-carousel" ref={ref}>
      <div className="dot-carousel" />
    </div>
  );
};
