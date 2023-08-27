import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Loading.css";

interface LoadingProps {
  fetchNextPage?: () => Promise<any>;
}

export const Loading: React.FC<LoadingProps> = ({ fetchNextPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="loading-carousel" ref={ref}>
      <div className="dot-carousel" />
    </div>
  );
};
