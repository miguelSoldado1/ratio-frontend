import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowUp } from "../../icons/arrow-up.svg";
import "./ScrollToTop.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return <>{showButton && <ArrowUp className="scroll-top-button" onClick={scrollToTop} />}</>;
};
