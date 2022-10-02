import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

export const Modal = (props) => {
  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        props.onClose();
      }
    },
    [props]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return ReactDOM.createPortal(
    <CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button className="modal-button" onClick={props.onSave}>
              Delete
            </button>
            <button onClick={props.onClose} className="modal-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};
