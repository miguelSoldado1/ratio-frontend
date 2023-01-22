import { useEffect, useCallback } from "react";

export const useInfiniteScroller = (callback, ref, stopFetching = false) => {
  const handleScroll = useCallback(() => {
    if (ref.current.scrollHeight - ref.current.scrollTop === ref.current.clientHeight) {
      callback();
    }
  }, [callback, ref]);

  useEffect(() => {
    if (ref.current !== null && stopFetching) {
      const currentRef = ref.current;
      currentRef.addEventListener("scroll", handleScroll);
      return () => {
        currentRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, ref, stopFetching]);
};
