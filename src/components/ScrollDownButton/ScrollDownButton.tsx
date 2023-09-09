import { useEffect, useState, useRef } from "react";
import { Button } from "..";
import "./ScrollDownButton.css";

interface ScrollDownButtonProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({ textAreaRef }) => {
  const [showButton, setShowButton] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowButton(false);
            observerRef.current?.disconnect();
          }
        });
      };

      observerRef.current = new IntersectionObserver(handleIntersection, { root: null, rootMargin: "150px", threshold: 0 });
      observerRef.current.observe(textAreaRef.current);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [textAreaRef]);

  const handleClick = () => {
    setShowButton(false);
    textAreaRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!textAreaRef.current) {
    return null;
  }

  return (
    <div className={`scroll-down-button${showButton ? " show" : ""}`}>
      <Button onClick={handleClick}>Give it a rating</Button>
    </div>
  );
};
