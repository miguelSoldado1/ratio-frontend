import React, { useEffect, useCallback } from "react";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

export const Modal = ({ onClose, show, children }) => {
  const nodeRef = useRef(null);

  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
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
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }} nodeRef={nodeRef}>
      <div className="modal" onClick={onClose} ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};
