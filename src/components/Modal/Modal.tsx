import React, { useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
  show: boolean;
  children?: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ onClose, show, children }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }} nodeRef={nodeRef}>
      <div className="modal" onClick={onClose} ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById("root")!
  );
};
