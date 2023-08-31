import { useState } from "react";

interface LongPressButtonProps {
  className: string;
  onClick: () => void;
  onLongPress: () => void;
  children?: JSX.Element;
  holdTime?: number;
  disabled?: boolean;
}

export const LongPressButton: React.FC<LongPressButtonProps> = ({ className, onClick, onLongPress, children, holdTime = 500, disabled = false }) => {
  const [timerId, setTimerId] = useState<number | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState<boolean>(false);

  const handleMouseDown = (e?: React.MouseEvent<HTMLDivElement>) => {
    if ((e === undefined || e?.button === 0) && !disabled) {
      const id = setTimeout(() => {
        setLongPressTriggered(true);
        onLongPress();
      }, holdTime);
      setTimerId(id);
    }
  };

  const handleMouseUp = (e?: React.MouseEvent<HTMLDivElement>) => {
    if ((e === undefined || e?.button === 0) && !disabled) {
      timerId && clearTimeout(timerId);
      if (!longPressTriggered) {
        onClick();
      }
      setLongPressTriggered(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      handleMouseDown();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!disabled) {
      e.preventDefault();
      handleMouseUp();
    }
  };

  return (
    <div className={className} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {children}
    </div>
  );
};
