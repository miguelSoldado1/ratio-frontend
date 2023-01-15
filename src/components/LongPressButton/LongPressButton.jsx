import React, { useState } from "react";

export const LongPressButton = ({ className, onClick, onLongPress, children, holdTime = 500 }) => {
  const [timerId, setTimerId] = useState(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const handleMouseDown = () => {
    const id = setTimeout(() => {
      setLongPressTriggered(true);
      onLongPress();
    }, holdTime);
    setTimerId(id);
  };

  const handleMouseUp = () => {
    clearTimeout(timerId);
    if (!longPressTriggered) {
      onClick();
    }
    setLongPressTriggered(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleMouseDown();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleMouseUp();
  };

  return (
    <div
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};
