import React, { useEffect, useState, useRef } from "react";
import { Button } from "..";
import "./ScrollDownButton.css";

export const ScrollDownButton = ({ textAreaRef }) => {
  const [showButton, setShowButton] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowButton(false);
          observerRef.current.disconnect();
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
  }, [textAreaRef]);

  const handleClick = () => {
    setShowButton(false);
    textAreaRef?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (!showButton || !textAreaRef) {
    return null;
  }

  return (
    <div className="scroll-down-button">
      <Button onClick={handleClick}>Give it a rating</Button>
    </div>
  );
};
