import { useEffect, useState, useRef } from "react";
import { Button } from "..";
import "./ScrollDownButton.css";

interface ScrollDownButtonProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

export const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ scrollRef }) => {
  const [showButton, setShowButton] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (scrollRef?.current) {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowButton(false);
            observerRef.current?.disconnect();
          }
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersection, { root: null, rootMargin: "150px", threshold: 0 });
      observerRef.current.observe(scrollRef.current);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [scrollRef]);

  const handleClick = () => {
    setShowButton(false);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!scrollRef?.current) {
    return null;
  }

  return (
    <div className={`scroll-down-button${showButton ? " show" : ""}`}>
      <Button onClick={handleClick}>Give it a rating</Button>
    </div>
  );
};
